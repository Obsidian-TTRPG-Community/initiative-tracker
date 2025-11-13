import { t } from "src/utils/i18n";
import type InitiativeTracker from "src/main";
import type { DifficultyLevel, GenericCreature, DifficultyThreshold } from ".";
import {
    DEFAULT_UNDEFINED,
    convertFraction,
    crToString,
    getFromCreatureOrBestiary
} from "src/utils";
import { RpgSystem } from "./rpgSystem";
import { Dnd5eRpgSystem } from "./dnd5e";

export class Dnd5eLazyGmRpgSystem extends RpgSystem {
    plugin: InitiativeTracker;
    dnd5eRpgSystem: Dnd5eRpgSystem;

    override systemDifficulties: [string, string, ...string[]] = [
		"Not Deadly",
		"Deadly"
	]

    constructor(plugin: InitiativeTracker) {
        super();
        this.plugin = plugin;
        this.valueUnit = t("CR");
        this.displayName = t("DnD 5e Lazy GM");
        this.dnd5eRpgSystem = new Dnd5eRpgSystem(plugin);
    }

    getCreatureDifficulty(creature: GenericCreature, _?: number[]): number {
        return convertFraction(
            getFromCreatureOrBestiary(this.plugin, creature, (c) => c?.cr ?? 0)
        );
    }

    getAdditionalCreatureDifficultyStats(
        creature: GenericCreature,
        _?: number[]
    ): string[] {
        const xp = this.dnd5eRpgSystem.getCreatureDifficulty(creature);
        return [this.dnd5eRpgSystem.formatDifficultyValue(xp, true)];
    }

    getDifficultyThresholds(playerLevels: number[]): DifficultyThreshold[] {
        const totalLevels = playerLevels.reduce((acc, lv) => acc + lv, 0);
        const avgLevel =
            playerLevels.length > 0 ? totalLevels / playerLevels.length : 0;
        return [
            {
                displayName: "Deadly",
                minValue: totalLevels / (avgLevel > 4 ? 2 : 4)
            }
        ];
    }

    getEncounterDifficulty(
        creatures: Map<GenericCreature, number>,
        playerLevels: number[]
    ): DifficultyLevel {
        const crSum = [...creatures].reduce(
            (acc, [creature, count]) =>
                acc + this.getCreatureDifficulty(creature) * count,
            0
        );
        const deadlyThreshold =
            this.getDifficultyThresholds(playerLevels).first()?.minValue ?? 0;
        const displayName = crSum > deadlyThreshold ? "Deadly" : "Not Deadly";
        const xp = [...creatures].reduce(
            (acc, [creature, count]) =>
                acc +
                this.dnd5eRpgSystem.getCreatureDifficulty(creature) * count,
            0
        );

        const summary = `${t("Encounter is")} ${t(displayName)}
${t("Total XP")}: ${xp}
${t("Total CR")}: ${crSum}
${t("Total levels")}: ${playerLevels.reduce((acc, lv) => acc + lv, 0)}
${t("Deadly Threshold")}: ${deadlyThreshold}`;

        return {
            displayName,
            summary,
            cssClass: displayName == "Deadly" ? "deadly" : "easy",
            value: crSum,
            title: t("Total CR"),
            intermediateValues: [{ label: t("Total XP"), value: xp }]
        };
    }

    formatDifficultyValue(value: number, withUnits?: boolean): string {
        if (!value) return DEFAULT_UNDEFINED;
        return crToString(value) + (withUnits ? ` ${t("CR")}` : "");
    }
}
