import { RpgSystem } from "./rpgSystem";
import { crToString, getFromCreatureOrBestiary } from "..";
import type { DifficultyLevel, GenericCreature, DifficultyThreshold } from ".";
import type InitiativeTracker from "../../main";
import type { Condition } from "src/types/creatures";
import { Pf2eConditions } from "../conditions/pf2e";

// level without proficiency variant
// const xpVariantCreatureDifferences = new Map([
//   [-7, 9],
//   [-6, 12],
//   [-5, 14],
//   [-4, 18],
//   [-3, 21],
//   [-2, 26],
//   [-1, 32],
//   [0, 40],
//   [1, 48],
//   [2, 60],
//   [3, 72],
//   [4, 90],
//   [5, 108],
//   [6, 135],
//   [7, 160],
// ]);

const XP_CREATURE_DIFFERENCES: Record<string, number> = {
    "-4": 10,
    "-3": 15,
    "-2": 20,
    "-1": 30,
    "0": 40,
    "1": 60,
    "2": 80,
    "3": 120,
    "4": 160
};

const XP_SIMPLE_HAZARD_DIFFERENCES: Record<string, number> = {
    "-4": 2,
    "-3": 3,
    "-2": 4,
    "-1": 6,
    "0": 8,
    "1": 12,
    "2": 16,
    "3": 24,
    "4": 32
};

const PF2E_DND5E_DIFFICULTY_MAPPING: Record<string, string> = {
    trivial: "trivial",
    low: "easy",
    moderate: "medium",
    severe: "hard",
    extreme: "deadly"
};

export class Pathfinder2eRpgSystem extends RpgSystem {
    plugin: InitiativeTracker;
    systemConditions = Pf2eConditions;

    override systemDifficulties: [string, string, ...string[]] = [
        "Trivial",
        "Low",
        "Moderate",
        "Severe",
        "Extreme"
    ];

    constructor(plugin: InitiativeTracker) {
        super();
        this.plugin = plugin;
        this.displayName = "Pathfinder 2e";
    }

    getCreatureDifficulty(
        creature: GenericCreature,
        playerLevels?: number[]
    ): number {
        const lvl = getFromCreatureOrBestiary(
            this.plugin,
            creature,
            (c) => c?.level
        )
            ?.toString()
            .split(" ")
            .slice(-1);
        if (lvl == null || lvl == undefined) return 0;
        const partyLvl = Math.round(
            playerLevels?.length ?? 0 > 0
                ? playerLevels.reduce((a, b) => a + b) / playerLevels.length
                : 0
        );

        const creature_differences = String(lvl - partyLvl);

        return XP_CREATURE_DIFFERENCES[creature_differences] ?? 0;
    }

    getDifficultyThresholds(playerLevels: number[]): DifficultyThreshold[] {
        const budget = playerLevels.length * 20;
        const encounterBudget: Record<string, number> = {
            trivial: Math.floor(budget * 0.5),
            low: Math.floor(budget * 0.75),
            moderate: budget,
            severe: Math.floor(budget * 1.5),
            extreme: Math.floor(budget * 2)
        };
        return Object.entries(encounterBudget)
            .map(([name, value]) => ({
                displayName: name.charAt(0).toUpperCase() + name.slice(1),
                minValue: value
            }))
            .sort((a, b) => a.minValue - b.minValue);
    }

    getEncounterDifficulty(
        creatures: Map<GenericCreature, number>,
        playerLevels: number[]
    ): DifficultyLevel {
        const creatureXp = [...creatures].reduce(
            (acc, [creature, count]) =>
                acc +
                this.getCreatureDifficulty(creature, playerLevels) * count,
            0
        );
        const thresholds = this.getDifficultyThresholds(playerLevels);

        const displayName =
            thresholds.findLast((threshold) => creatureXp >= threshold.minValue)
                ?.displayName ?? "Trivial";

        const thresholdSummary = thresholds
            .map(
                (threshold) => `${threshold.displayName}: ${threshold.minValue}`
            )
            .join("\n");
        const summary = `Encounter is ${displayName}
    Total XP: ${creatureXp}
    Threshold
    ${thresholdSummary}`;

        return {
            displayName,
            summary,
            cssClass:
                PF2E_DND5E_DIFFICULTY_MAPPING[displayName.toLowerCase()] ??
                "trivial",
            value: creatureXp,
            title: "Total XP",
            intermediateValues: [{ label: "Total XP", value: creatureXp }]
        };
    }
}
