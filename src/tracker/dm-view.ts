import { ItemView, WorkspaceLeaf } from "obsidian";
import type InitiativeTracker from "src/main";
import { BASE, DM_VIEW_VIEW } from "../utils";

import App from "./ui/App.svelte";

/**
 * A pop-out window containing the full DM controls for the tracker.
 *
 * It mounts the same UI as the sidebar tracker. Both views share the global
 * `tracker` store, so changes made in either one are reflected in the other.
 */
export default class DMView extends ItemView {
    ui: App;
    getDisplayText(): string {
        return `${this.plugin.gmTitle} View`;
    }
    getViewType(): string {
        return DM_VIEW_VIEW;
    }
    getIcon(): string {
        return BASE;
    }
    constructor(public leaf: WorkspaceLeaf, public plugin: InitiativeTracker) {
        super(leaf);
    }
    async onOpen() {
        this.contentEl.addClass("initiative-tracker-dm-view");
        this.ui = new App({
            target: this.contentEl,
            props: {
                plugin: this.plugin,
                popout: true,
                leaf: this.leaf
            }
        });
        this.ui.$on("player-view", () => this.plugin.openPlayerView());
    }
    async onClose() {
        this.ui?.$destroy();
    }
}
