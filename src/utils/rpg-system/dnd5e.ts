import { RpgSystem } from "./rpgSystem";
import { crToString, Dnd5eConditions, getFromCreatureOrBestiary } from "..";
import type InitiativeTracker from "src/main";
import type { DifficultyLevel, GenericCreature, DifficultyThreshold } from ".";
import type { Condition } from "src/types/creatures";

const XP_THRESHOLDS_PER_LEVEL: {
    [level: number]: { [threshold: string]: number };
} = {
    1: { daily: 300, easy: 25, medium: 50, hard: 75, deadly: 100 },
    2: { daily: 600, easy: 50, medium: 100, hard: 150, deadly: 200 },
    3: { daily: 1200, easy: 75, medium: 150, hard: 225, deadly: 400 },
    4: { daily: 1700, easy: 125, medium: 250, hard: 375, deadly: 500 },
    5: { daily: 3500, easy: 250, medium: 500, hard: 750, deadly: 1100 },
    6: { daily: 4000, easy: 300, medium: 600, hard: 900, deadly: 1400 },
    7: { daily: 5000, easy: 350, medium: 750, hard: 1100, deadly: 1700 },
    8: { daily: 6000, easy: 450, medium: 900, hard: 1400, deadly: 2100 },
    9: { daily: 7500, easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
    10: { daily: 9000, easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
    11: { daily: 10500, easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
    12: { daily: 11500, easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
    13: { daily: 13500, easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
    14: { daily: 15000, easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
    15: { daily: 18000, easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
    16: { daily: 20000, easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
    17: { daily: 25000, easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
    18: { daily: 27000, easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
    19: { daily: 30000, easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
    20: { daily: 40000, easy: 2800, medium: 5700, hard: 8500, deadly: 12700 }
};

const XP_PER_CR: Record<string, number> = {
    "0": 0,
    "0.125": 25,
    "1/8": 25,
    "0.25": 50,
    "1/4": 50,
    "0.5": 100,
    "1/2": 100,
    "1": 200,
    "2": 450,
    "3": 700,
    "4": 1100,
    "5": 1800,
    "6": 2300,
    "7": 2900,
    "8": 3900,
    "9": 5000,
    "10": 5900,
    "11": 7200,
    "12": 8400,
    "13": 10000,
    "14": 11500,
    "15": 13000,
    "16": 15000,
    "17": 18000,
    "18": 20000,
    "19": 22000,
    "20": 25000,
    "21": 33000,
    "22": 41000,
    "23": 50000,
    "24": 62000,
    "25": 75000,
    "26": 90000,
    "27": 105000,
    "28": 120000,
    "29": 135000,
    "30": 155000
};

export class Dnd5eRpgSystem extends RpgSystem {
    plugin: InitiativeTracker;
    systemConditions = Dnd5eConditions;

    override systemDifficulties: [string, string, ...string[]] = [
        "Easy",
        "Medium",
        "Hard",
        "Deadly"
    ];

    constructor(plugin: InitiativeTracker) {
        super();
        this.plugin = plugin;
        this.displayName = "DnD 5e";
    }

    getCreatureDifficulty(creature: GenericCreature, _?: number[]): number {
        const xp = getFromCreatureOrBestiary(
            this.plugin,
            creature,
            (c) => c?.xp ?? 0
        );
        if (xp) return xp;
        const cr = getFromCreatureOrBestiary(
            this.plugin,
            creature,
            (c) => c?.cr ?? "0"
        );
        return XP_PER_CR[cr] ?? 0;
    }

    getAdditionalCreatureDifficultyStats(
        creature: GenericCreature,
        _?: number[]
    ): string[] {
        const cr = getFromCreatureOrBestiary(
            this.plugin,
            creature,
            (c) => c?.cr ?? 0
        );
        return [`${crToString(cr)} CR`];
    }

    getEncounterDifficulty(
        creatures: Map<GenericCreature, number>,
        playerLevels: number[]
    ): DifficultyLevel {
        const creatureXp = [...creatures].reduce(
            (acc, [creature, count]) =>
                acc + this.getCreatureDifficulty(creature) * count,
            0
        );
        const creatureCount = [...creatures.values()].reduce(
            (acc, cur) => acc + cur,
            0
        );
        const mult = this.#getXpMult(creatureCount, playerLevels.length);
        const adjustedXp =
            playerLevels.length == 0 || creatureCount == 0
                ? 0
                : creatureXp * mult;

        const thresholds = this.getDifficultyThresholds(playerLevels);
        const displayName =
            thresholds
                .reverse() // Should now be in descending order
                .find((threshold) => adjustedXp >= threshold.minValue)
                ?.displayName ?? "Trivial";

        const thresholdSummary = thresholds
            .map(
                (threshold) => `${threshold.displayName}: ${threshold.minValue}`
            )
            .join("\n");

        const summary = `Encounter is ${displayName}
Total XP: ${creatureXp}
Adjusted XP: ${adjustedXp} (x${mult})

Threshold
${thresholdSummary}`;

        return {
            displayName,
            summary,
            cssClass: displayName.toLowerCase(),
            value: adjustedXp,
            title: "Adjusted XP",
            intermediateValues: [{ label: "Total XP", value: creatureXp }]
        };
    }

    getDifficultyThresholds(playerLevels: number[]): DifficultyThreshold[] {
        const budget: Record<string, number> = {
            easy: 0,
            medium: 0,
            hard: 0,
            deadly: 0
        };
        const clampedLevels = playerLevels
            .filter((lvl) => lvl && lvl > 0)
            .map((lv) => Math.max(1, Math.min(lv, 20)));
        Object.keys(budget).forEach((key) => {
            budget[key] += clampedLevels.reduce(
                (acc, lv) => acc + (XP_THRESHOLDS_PER_LEVEL[lv]?.[key] ?? 0),
                0
            );
        });
        return Object.entries(budget)
            .map(([name, value]) => ({
                displayName: name.charAt(0).toUpperCase() + name.slice(1),
                minValue: value
            }))
            .sort((a, b) => a.minValue - b.minValue);
    }

    getAdditionalDifficultyBudgets(
        playerLevels: number[]
    ): DifficultyThreshold[] {
        return [
            {
                displayName: "Daily Budget",
                minValue: playerLevels
                    .filter((l) => l && l > 0)
                    .reduce(
                        (acc, lv) =>
                            acc +
                            XP_THRESHOLDS_PER_LEVEL[
                                Math.max(1, Math.min(lv, 20))
                            ].daily,
                        0
                    )
            }
        ];
    }

    #getXpMult(creatureCount: number, playerCount: number) {
        const mults = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];
        let index = 1;
        if (playerCount < 3) {
            index++;
        } else if (playerCount > 5) {
            index--;
        }
        switch (true) {
            case creatureCount >= 15: {
                index += 5;
                break;
            }
            case creatureCount >= 11: {
                index += 4;
                break;
            }
            case creatureCount >= 7: {
                index += 3;
                break;
            }
            case creatureCount >= 3: {
                index += 2;
                break;
            }
            case creatureCount >= 2: {
                index += 1;
                break;
            }
        }
        return mults[Math.min(index, mults.length - 1)];
    }
}
