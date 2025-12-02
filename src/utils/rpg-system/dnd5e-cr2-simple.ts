import { RpgSystem } from "./rpgSystem";
import { crToString, getFromCreatureOrBestiary } from "..";
import type InitiativeTracker from "src/main";
import type { DifficultyLevel, GenericCreature, DifficultyThreshold } from ".";

const PLAYER_POWER_BY_LEVEL: Record<number, number> = {
  1: 11,
  2: 14,
  3: 18,
  4: 23,
  5: 32,
  6: 35,
  7: 41,
  8: 44,
  9: 49,
  10: 53,
  11: 62,
  12: 68,
  13: 71,
  14: 74,
  15: 82,
  16: 84,
  17: 103,
  18: 119,
  19: 131,
  20: 141
}

const POWER_BY_CR: Record<string, number> = {
    "0": 1,
    "1/8": 5,
    "0.25": 5,
    "1/4": 10,
    "0.5": 10,
    "1/2": 16,
    "1": 22,
    "2": 28,
    "3": 37,
    "4": 48,
    "5": 60,
    "6": 65,
    "7": 70,
    "8": 85,
    "9": 85,
    "10": 95,
    "11": 106,
    "12": 115,
    "13": 120,
    "14": 125,
    "15": 130,
    "16": 140,
    "17": 150,
    "18": 160,
    "19": 165,
    "20": 180,
    "21": 200,
    "22": 225,
    "23": 250,
    "24": 275,
    "25": 300,
    "26": 325,
    "27": 350,
    "28": 375,
    "29": 400,
    "30": 425
};

const DIFFICULTY_TO_CSS: Record<string, string> = {
  "Mild": "easy",
  "Bruising": "medium",
  "Bloody": "medium",
  "Brutal": "hard", 
  "Oppressive": "deadly"
}

export class Dnd5eCr2SimpleRpgSystem extends RpgSystem {
  plugin: InitiativeTracker;

  override valueUnit = "Power";

  override systemDifficulties: [string, string, ...string[]] = [
		"Mild",
		"Bruising",
		"Bloody",
		"Brutal",
    "Oppressive",
	]

  constructor(plugin: InitiativeTracker) {
    super();
    this.plugin = plugin;
    this.displayName = "DnD 5e CR2.0 Simple";
  }

  getCreatureDifficulty(creature: GenericCreature, _?: number[]): number {
    const cr = getFromCreatureOrBestiary(this.plugin, creature, c => c?.cr ?? "0");
    return POWER_BY_CR[cr] ?? 0;
  }

  getAdditionalCreatureDifficultyStats(
      creature: GenericCreature,
      _?: number[]
  ): string[] {
      const cr = getFromCreatureOrBestiary(
          this.plugin, creature, c => c?.cr ?? 0);
      return [`${crToString(cr)} CR`];
  }

  getEncounterDifficulty(
    creatures: Map<GenericCreature, number>,
    playerLevels: number[]
  ) : DifficultyLevel {
    const creaturePower = [...creatures].reduce((acc, [creature, count]) => acc + this.getCreatureDifficulty(creature) * count, 0)

    const thresholds = this.getDifficultyThresholds(playerLevels);
    const displayName = thresholds
      .reverse()  // Should now be in descending order
      .find(threshold => creaturePower >= threshold.minValue)?.displayName
      ?? "Mild";

    const thresholdSummary = thresholds
      .map(threshold => `${threshold.displayName}: ${threshold.minValue}`)
      .join("\n");

    const summary = `Encounter is ${displayName}
Total Power: ${creaturePower}


Threshold
${thresholdSummary}`;

    return {
      displayName,
      summary,
      cssClass: DIFFICULTY_TO_CSS[displayName],
      value: creaturePower,
      title: "Total Creature Power",
      intermediateValues: [],
    };
  }

  getDifficultyThresholds(playerLevels: number[]): DifficultyThreshold[] {
    const budget: Record<string, number> = {
      mild: 0.4,
      bruising: 0.6,
      bloody: 0.75,
      brutal: 0.9,
      Oppressive: 1
    };

    const partyPower = playerLevels.map(x => PLAYER_POWER_BY_LEVEL[x]).reduce((a, b) => a+b, 0)
    return Object.entries(budget)
      .map(([name, value]) => ({
        displayName: (name.charAt(0).toUpperCase() + name.slice(1)),
        minValue: Math.round(value * partyPower)
      }))
      .sort((a, b) => a.minValue - b.minValue);
  }
}
