import { ItemView, WorkspaceLeaf } from "obsidian";
import type InitiativeTracker from "src/main";
import type { Creature } from "src/utils/creature";
import { PLAYER_VIEW_VIEW } from "../utils";

import App from "./player/PlayerView.svelte";

export default class PlayerView extends ItemView {
    _app: App;
    getDisplayText(): string {
        return "Player View";
    }
    getViewType(): string {
        return PLAYER_VIEW_VIEW;
    }
    getIcon(): string {
        return "lucide-view";
    }
    constructor(public leaf: WorkspaceLeaf, public plugin: InitiativeTracker) {
        super(leaf);
    }
    async onOpen() {
        this._app = new App({
            target: this.contentEl,
            props: {}
        });
    }
    async onClose() {
        this._app?.$destroy();
    }
}
