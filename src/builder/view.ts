import { ItemView, type ViewStateResult, WorkspaceLeaf } from "obsidian";
import type InitiativeTracker from "src/main";
import { BUILDER_VIEW } from "../utils";
import { t } from "src/utils/i18n";

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
    getState() {
        return [...get(encounter).entries()];
    }
    async setState(
        state: [SRDMonster, number][],
        result: ViewStateResult
    ): Promise<void> {
        if (state && Array.isArray(state)) encounter.setMultiple(state);
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
                text: t("Waiting for Fantasy Statblocks Bestiary...")
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
        return t("Encounter Builder");
    }
    getIcon(): string {
        return BUILDER_VIEW;
    }
    getViewType(): string {
        return BUILDER_VIEW;
    }
}
