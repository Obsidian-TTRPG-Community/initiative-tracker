import { DEFAULT_UNDEFINED } from "../constants";
import type { GenericCreature, DifficultyLevel, DifficultyThreshold } from "./index";
import type { Creature } from "../creature";
import { readSaveModifier, type SavingThrow } from "./saving-throws";

export abstract class RpgSystem {
  abstract systemDifficulties: [string, string, ...string[]];

  /** The display name of the RPG system, used in the UI. */
  displayName: string = DEFAULT_UNDEFINED;

  /** The unit that difficulty values are expressed in, eg "XP". Used for formatting values. */
  valueUnit: string = "XP";

  /**
   * Saving throws a creature can repeat to end a status. Leave empty if the
   * system has no equivalent; the "repeat saving throw" expiry is then hidden.
   */
  savingThrows: SavingThrow[] = [];

  /** The saving throw pre-selected when choosing a repeated save. */
  defaultSavingThrow?: string;

  /** The saving throw with the given id, if this system has it. */
  getSavingThrow(id: string): SavingThrow | undefined {
    return this.savingThrows.find((s) => s.id === id);
  }

  /** The creature's bonus for the given saving throw, if its statblock has one. */
  getSaveModifier(creature: Creature, id: string): number | null {
    return readSaveModifier(creature, this.getSavingThrow(id));
  }

  /** Returns information related to the difficulty of a creature relative to the given players. */
  getCreatureDifficulty(
    creature: GenericCreature,
    playerLevels: number[]
  ): number {
    return 0;
  }

  /** Returns additional information related to the difficulty of a creature relative to the given players. */
  getAdditionalCreatureDifficultyStats(
    creature: GenericCreature,
    playerLevels: number[]
  ): string[] {
    return [];
  }

  /** Returns information related to the difficulty of the encounter relative to the given players. */
  getEncounterDifficulty(
    creatures: Map<GenericCreature, number>,
    playerLevels: number[]
  ) : DifficultyLevel {
    return {
      displayName: DEFAULT_UNDEFINED,
      cssClass: "",
      value: 0,
      title: "Total XP",
      summary: DEFAULT_UNDEFINED,
      intermediateValues: []
    };
  }

  /** Returns an array of difficulty thresholds in ascending order. */
  getDifficultyThresholds(playerLevels: number[]): DifficultyThreshold[] {
    return [];
  }

  /** Returns the given difficulty value formatted with system-appropriate units, eg "800 XP". */
  formatDifficultyValue(value: number, withUnits?: boolean): string {
    if (isNaN(value)) return DEFAULT_UNDEFINED;
    return withUnits
        ? `${value.toLocaleString()} ${this.valueUnit}`
        : value.toLocaleString();
  }

  /**
   * Returns an array of any additional budgets which should be displayed,
   * but not taken into account when calculating the difficulty tier.
   */
  getAdditionalDifficultyBudgets(playerLevels: number[]): DifficultyThreshold[] {
    return []
  }
}