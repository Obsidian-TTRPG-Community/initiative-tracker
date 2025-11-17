import type { InitiativeViewState } from "src/tracker/view.types";
import type InitiativeTracker from "../main";
import { tracker } from "../tracker/stores/tracker";
import { type HomebrewCreature } from "src/types/creatures";
import { Creature } from "src/utils/creature";
import { t } from "src/utils/i18n";

declare module "obsidian" {
    interface Workspace {
        on(
            name: "initiative-tracker:should-save",
            callback: () => void
        ): EventRef;
        trigger(name: "initiative-tracker:should-save"): void;
        on(
            name: "initiative-tracker:save-state",
            callback: (state?: InitiativeViewState) => void
        ): EventRef;
        trigger(
            name: "initiative-tracker:save-state",
            state?: InitiativeViewState
        ): void;
        /** This event can be used to start an event by sending an object with a name, HP, AC, and initiative modifier at minimum. */
        on(
            name: "initiative-tracker:start-encounter",
            callback: (creatures: HomebrewCreature[]) => void
        ): EventRef;
        trigger(
            name: "initiative-tracker:start-encounter",
            creatures: HomebrewCreature[]
        ): void;
        on(
            name: "initiative-tracker:stop-viewing",
            callback: (creatures: HomebrewCreature[]) => void
        ): EventRef;
        trigger(name: "initiative-tracker:stop-viewing"): void;
        on(name: "initiative-tracker:unloaded", callback: () => void): EventRef;
        trigger(name: "initiative-tracker:unloaded"): void;
    }
}

declare global {
    interface Window {
        InitiativeTracker?: API;
    }
}

export class API {
    #tracker = tracker;
    constructor(public plugin: InitiativeTracker) {
        (window["InitiativeTracker"] = this) &&
            this.plugin.register(() => delete window["InitiativeTracker"]);
    }

    addCreatures(
        creatures: HomebrewCreature[],
        rollHP: boolean = this.plugin.data.rollHP
    ) {
        if (!creatures || !Array.isArray(creatures) || !creatures.length) {
            throw new Error(t("Creatures must be an array."));
        }
        this.#tracker.add(
            this.plugin,
            rollHP,
            ...creatures.map((c) => Creature.from(c))
        );
    }
    newEncounter(state?: InitiativeViewState) {
        if (state?.creatures) {
            state.creatures = state.creatures.map((c) =>
                Creature.from(c).toJSON()
            );
        }
        this.#tracker.new(this.plugin, state);
    }
}
