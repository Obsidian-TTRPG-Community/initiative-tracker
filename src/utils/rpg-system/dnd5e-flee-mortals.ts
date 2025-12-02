import { RpgSystem } from "./rpgSystem";
import { DEFAULT_UNDEFINED, convertFraction, crToString, getFromCreatureOrBestiary } from "..";
import type InitiativeTracker from "src/main";
import type { DifficultyLevel, GenericCreature, DifficultyThreshold } from ".";

const ENCOUNTER_CR_PER_CHARACTER: {
  [avgCharacterLevel: number]: { easy: number, standard: number, hard: number, cap: number };
} = {
  1: { easy: 0.125, standard: 0.125, hard: 0.25, cap: 1 },
  2: { easy: 0.125, standard: 0.25, hard: 0.5, cap: 3 },
  3: { easy: 0.25, standard: 0.5, hard: 0.75, cap: 4 },
  4: { easy: 0.5, standard: 0.75, hard: 1, cap: 6 },
  5: { easy: 1, standard: 1.5, hard: 2.5, cap: 8 },
  6: { easy: 1.5, standard: 2, hard: 3, cap: 9 },
  7: { easy: 2, standard: 2.5, hard: 3.5, cap: 10 },
  8: { easy: 2.5, standard: 3, hard: 4, cap: 12 },
  9: { easy: 3, standard: 3.5, hard: 4.5, cap: 13 },
  10: { easy: 3.5, standard: 4, hard: 5, cap: 15 },
  11: { easy: 4, standard: 4.5, hard: 5.5, cap: 16 },
  12: { easy: 4.5, standard: 5, hard: 6, cap: 17 },
  13: { easy: 5, standard: 5.5, hard: 6.5, cap: 19 },
  14: { easy: 5.5, standard: 6, hard: 7, cap: 20 },
  15: { easy: 6, standard: 6.5, hard: 7.5, cap: 22 },
  16: { easy: 6.5, standard: 7, hard: 8, cap: 24 },
  17: { easy: 7, standard: 7.5, hard: 8.5, cap: 25 },
  18: { easy: 7.5, standard: 8, hard: 9, cap: 26 },
  19: { easy: 8, standard: 8.5, hard: 9.5, cap: 28 },
  20: { easy: 8.5, standard: 9, hard: 10, cap: 30 }
};

const MINION_CR_CONVERSION: {
  [minionCr: string]: { xp: number, minionsPerStandard: number };
} = {
  "0": { xp: 2, minionsPerStandard: 5 },
  "1/8": { xp: 5, minionsPerStandard: 5 },
  "1/4": { xp: 10, minionsPerStandard: 5 },
  "1/2": { xp: 20, minionsPerStandard: 5 },
  "1": { xp: 40, minionsPerStandard: 5 },
  "2": { xp: 90, minionsPerStandard: 5 },
  "3": { xp: 140, minionsPerStandard: 5 },
  "4": { xp: 220, minionsPerStandard: 5 },
  "5": { xp: 225, minionsPerStandard: 8 },
  "6": { xp: 285, minionsPerStandard: 8 },
  "7": { xp: 360, minionsPerStandard: 8 },
  "8": { xp: 485, minionsPerStandard: 8 },
  "9": { xp: 500, minionsPerStandard: 10 },
  "10": { xp: 590, minionsPerStandard: 10 },
  "11": { xp: 720, minionsPerStandard: 10 },
  "12": { xp: 840, minionsPerStandard: 10 },
  "13": { xp: 1000, minionsPerStandard: 10 },
  "14": { xp: 1150, minionsPerStandard: 10 },
  "15": { xp: 1300, minionsPerStandard: 10 },
  "16": { xp: 1500, minionsPerStandard: 10 },
  "17": { xp: 1800, minionsPerStandard: 10 },
  "18": { xp: 2000, minionsPerStandard: 10 },
  "19": { xp: 2200, minionsPerStandard: 10 },
  "20": { xp: 2500, minionsPerStandard: 10 },
  "21": { xp: 3300, minionsPerStandard: 10 },
  "22": { xp: 4100, minionsPerStandard: 10 },
  "23": { xp: 5000, minionsPerStandard: 10 },
  "24": { xp: 6200, minionsPerStandard: 10 },
  "25": { xp: 7500, minionsPerStandard: 10 },
  "26": { xp: 9000, minionsPerStandard: 10 },
  "27": { xp: 10500, minionsPerStandard: 10 },
  "28": { xp: 12000, minionsPerStandard: 10 },
  "29": { xp: 13500, minionsPerStandard: 10 },
  "30": { xp: 15500, minionsPerStandard: 10 }
};

const DIFFICULY_CONVERSIONS: {
  [difficulty: string]: { encounterPoints: number, cssClass: string };
} = {
  "Trivial": { encounterPoints: 0, cssClass: "trivial" },
  "Easy": { encounterPoints: 1, cssClass: "easy" },
  "Standard": { encounterPoints: 2, cssClass: "medium" },
  "Hard": { encounterPoints: 4, cssClass: "hard" },
  "Extreme": { encounterPoints: 8, cssClass: "deadly" }
};

export class Dnd5eFleeMortalsRpgSystem extends RpgSystem {
  plugin: InitiativeTracker;

  override systemDifficulties: [string, string, ...string[]] = [
    "Trivial",
    "Easy",
    "Standard",
    "Hard",
    "Extreme"
  ];

  constructor(plugin: InitiativeTracker) {
    super();
    this.plugin = plugin;
    this.displayName = "DnD 5e Flee, Mortals!";
    this.valueUnit = "CR";
  }

  isMinion(creature: GenericCreature) {
    return "traits" in creature && creature.traits?.find((trait: any) => trait.name === "Minion");
  }

  getAveragePlayerLevel(playerLevels: number[]): number {
    if (playerLevels.length === 0) {
      return 1;
    }

    const totalPlayerLevelClamped = playerLevels
      .filter((lvl) => lvl && lvl > 0)
      .map((lv) => Math.max(1, Math.min(lv, 20)))
      .reduce((acc, cur) => acc + cur, 0);

    return Math.floor(totalPlayerLevelClamped / playerLevels.length);
  }

  getCreatureStatistics(creatures: Map<GenericCreature, number>) {
    let totalCreatureCr = 0;
    let maxCreatureCr = 0;

    creatures.forEach((number, creature) => {
      let cr = getFromCreatureOrBestiary(
        this.plugin,
        creature,
        (c) => c?.cr ?? 0
      );

      const crFraction = convertFraction(creature.cr);

      if (this.isMinion(creature)) {
        const minionsPerStandard = MINION_CR_CONVERSION[cr].minionsPerStandard;
        cr = crFraction * Math.floor(number / minionsPerStandard);
      } else {
        cr = crFraction * number;
      }

      if (maxCreatureCr < crFraction) {
        maxCreatureCr = crFraction;
      }

      totalCreatureCr += cr;
    })

    return {
      totalCreatureCr: totalCreatureCr,
      maxCreatureCr: maxCreatureCr
    }
  }

  getCreatureDifficulty(creature: GenericCreature, _?: number[]): number {
    if (this.isMinion(creature)) return 0;

    const cr = getFromCreatureOrBestiary(
      this.plugin,
      creature,
      (c) => c?.cr ?? "0"
    );

    return convertFraction(cr);
  }

  getEncounterDifficulty(
    creatures: Map<GenericCreature, number>,
    playerLevels: number[]
  ): DifficultyLevel {
    const avgPlayerLevel = this.getAveragePlayerLevel(playerLevels);
    const crCap = ENCOUNTER_CR_PER_CHARACTER[avgPlayerLevel]?.cap;
    const { totalCreatureCr, maxCreatureCr } = this.getCreatureStatistics(creatures);
    const thresholds = this.getDifficultyThresholds(playerLevels);

    let displayName = thresholds
      .reverse() // Should now be in descending order
      .find((threshold) => totalCreatureCr >= threshold.minValue)
      ?.displayName;

    let encounterPoints = DIFFICULY_CONVERSIONS[displayName].encounterPoints;
    let cssClass = DIFFICULY_CONVERSIONS[displayName].cssClass;

    if (maxCreatureCr > crCap) {
      displayName = "Extreme (Exceeds CR cap)"
      encounterPoints = DIFFICULY_CONVERSIONS["Extreme"].encounterPoints;
      cssClass = DIFFICULY_CONVERSIONS["Extreme"].cssClass;
    }

    const thresholdSummary = thresholds
      .map(threshold => `${threshold.displayName}: ${threshold.minValue}`)
      .join("\n");

    const summary = `Encounter is ${displayName}
Total Creature CR: ${totalCreatureCr}
Daily Encounter Points: ${encounterPoints}
Party's CR Cap: ${crCap}

Threshold
${thresholdSummary}`;

    return {
      displayName,
      summary,
      cssClass: cssClass,
      value: totalCreatureCr,
      title: "Total Creature CR",
      intermediateValues: [
        {
          label: "Daily Encounter Points",
          value: encounterPoints
        },
        {
          label: "Creature CR Cap",
          value: crCap
        }
      ]
    };
  }

  getDifficultyThresholds(playerLevels: number[]): DifficultyThreshold[] {
    const avgPlayerLevel = this.getAveragePlayerLevel(playerLevels);

    const standardValue = ENCOUNTER_CR_PER_CHARACTER[avgPlayerLevel]?.standard * playerLevels.length;
    const hardValue = ENCOUNTER_CR_PER_CHARACTER[avgPlayerLevel]?.hard * playerLevels.length;
    const extremeValue = hardValue + (hardValue - standardValue); // not defined in the book, so chose something reasonable

    return [
      {
        displayName: "Trivial",
        minValue: 0 // not defined in the book
      },
      {
        displayName: "Easy",
        minValue: ENCOUNTER_CR_PER_CHARACTER[avgPlayerLevel]?.easy * playerLevels.length
      },
      {
        displayName: "Standard",
        minValue: standardValue
      },
      {
        displayName: "Hard",
        minValue: hardValue
      },
      {
        displayName: "Extreme",
        minValue: extremeValue
      }
    ]
  }

  getAdditionalDifficultyBudgets(
    playerLevels: number[]
  ): DifficultyThreshold[] {
    return [
      {
        displayName: "Encounter Points per Day",
        minValue: 8
      }
    ];
  }

  formatDifficultyValue(value: number, withUnits?: boolean): string {
    if (isNaN(value)) return DEFAULT_UNDEFINED;
    return withUnits
      ? `${crToString(value)} ${this.valueUnit}`
      : crToString(value);
  }
}
