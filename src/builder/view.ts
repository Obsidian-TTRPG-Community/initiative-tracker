import { ItemView, type ViewStateResult, WorkspaceLeaf } from "obsidian";
import type InitiativeTracker from "src/main";
import { BUILDER_VIEW } from "../utils";

import Builder from "./view/Builder.svelte";
import { encounter } from "./stores/encounter";
import { get } from "svelte/store";
import type { SRDMonster } from "src/types/creatures";

interface BuilderContext {
    plugin: InitiativeTracker;
    playerCount: number;
}
declare module "svelte" {
    function setContext<T extends keyof BuilderContext>(
        key: T,
        context: BuilderContext[T]
    ): BuilderContext[T];
    function getContext<T extends keyof BuilderContext>(
        key: T
    ): BuilderContext[T];
}

export default class BuilderView extends ItemView {
    constructor(leaf: WorkspaceLeaf, public plugin: InitiativeTracker) {
        super(leaf);
    }
    getState(): Record<string, unknown> {
        return { encounter: [...get(encounter).entries()] };
    }
    async setState(
        state: Record<string, unknown>,
        result: ViewStateResult
    ): Promise<void> {
        // Support both legacy array format and new object format
        const entries = (
            Array.isArray(state)
                ? state
                : state?.encounter
        ) as [SRDMonster, number][] | undefined;
        if (entries && Array.isArray(entries)) encounter.setMultiple(entries);
        super.setState(state, result);
    }
    ui: Builder;
    async onOpen() {
        if (
            this.plugin.canUseStatBlocks &&
            !window["FantasyStatblocks"].isResolved()
        ) {
            this.contentEl.addClasses(["waiting-for-bestiary", "is-loading"]);
            const loading = this.contentEl.createEl("p", {
                text: "Waiting for Fantasy Statblocks Bestiary..."
            });
            const unload = window["FantasyStatblocks"].onResolved(() => {
                this.contentEl.removeClasses([
                    "waiting-for-bestiary",
                    "is-loading"
                ]);
                loading.detach();
                this.ui = new Builder({
                    target: this.contentEl,
                    props: {
                        plugin: this.plugin
                    }
                });
                unload();
            });
        } else {
            this.ui = new Builder({
                target: this.contentEl,
                props: {
                    plugin: this.plugin
                }
            });
        }
    }
    async onClose() {
        this.ui?.$destroy();
    }
    getDisplayText(): string {
        return "Encounter Builder";
    }
    getIcon(): string {
        return BUILDER_VIEW;
    }
    getViewType(): string {
        return BUILDER_VIEW;
    }
}
