import { RpgSystem } from "./rpgSystem";
import { crToString, getFromCreatureOrBestiary } from "..";
import type InitiativeTracker from "src/main";
import type { DifficultyLevel, GenericCreature, DifficultyThreshold } from ".";

const XP_THRESHOLDS_PER_LEVEL: {
    [level: number]: { [threshold: string]: number };
} = {
    1: { low: 50, moderate: 75, high: 100 },
    2: { low: 100, moderate: 150, high: 200 },
    3: { low: 150, moderate: 225, high: 400 },
    4: { low: 250, moderate: 375, high: 500 },
    5: { low: 500, moderate: 750, high: 1100 },
    6: { low: 600, moderate: 900, high: 1400 },
    7: { low: 750, moderate: 1100, high: 1700 },
    8: { low: 900, moderate: 1400, high: 2100 },
    9: { low: 1100, moderate: 1600, high: 2400 },
    10: { low: 1200, moderate: 1900, high: 2800 },
    11: { low: 1600, moderate: 2400, high: 3600 },
    12: { low: 2000, moderate: 3000, high: 4500 },
    13: { low: 2200, moderate: 3400, high: 5100 },
    14: { low: 2500, moderate: 3800, high: 5700 },
    15: { low: 2800, moderate: 4300, high: 6400 },
    16: { low: 3200, moderate: 4800, high: 7200 },
    17: { low: 3900, moderate: 5900, high: 8800 },
    18: { low: 4200, moderate: 6300, high: 9500 },
    19: { low: 4900, moderate: 7300, high: 10900 },
    20: { low: 5700, moderate: 8500, high: 12700 }
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

export class Dnd5e2024RpgSystem extends RpgSystem {
    plugin: InitiativeTracker;

    override systemDifficulties: [string, string, ...string[]] = [
        "Low",
        "Moderate",
        "High"
    ];

    constructor(plugin: InitiativeTracker) {
        super();
        this.plugin = plugin;
        this.displayName = "DnD 5e 2024";
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
        // Calculate total XP from creatures without multipliers (per 2024 rules)
        const totalXp = [...creatures].reduce(
            (acc, [creature, count]) =>
                acc + this.getCreatureDifficulty(creature) * count,
            0
        );
        
        // No creature count multipliers in 2024 rules
        const adjustedXp = playerLevels.length === 0 ? 0 : totalXp;

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
Total XP: ${totalXp}

Threshold
${thresholdSummary}`;

        return {
            displayName,
            summary,
            cssClass: displayName.toLowerCase(),
            value: adjustedXp,
            title: "Total XP",
            intermediateValues: [] // No intermediate values needed as there's no multiplier
        };
    }

    getDifficultyThresholds(playerLevels: number[]): DifficultyThreshold[] {
        // Updated to use "low", "moderate", and "high" terminology from 2024 rules
        const budget: Record<string, number> = {
            low: 0,
            moderate: 0,
            high: 0
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

}