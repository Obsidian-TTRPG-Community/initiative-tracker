import {
    debounce,
    ExtraButtonComponent,
    ItemView,
    MarkdownRenderer,
    parseLinktext,
    resolveSubpath,
    WorkspaceLeaf
} from "obsidian";
import {
    BASE,
    CREATURE,
    CREATURE_TRACKER_VIEW,
    INITIATIVE_TRACKER_VIEW
} from "../utils";

import type InitiativeTracker from "../main";

import App from "./ui/App.svelte";
import type { Creature } from "../utils/creature";
import { PLAYER_VIEW_VIEW } from "../utils/constants";
import type PlayerView from "./player-view";

export default class TrackerView extends ItemView {
    ui: App;

    constructor(public leaf: WorkspaceLeaf, public plugin: InitiativeTracker) {
        super(leaf);
        if (this.plugin.data.state?.creatures?.length) {
        } else {
        }
    }
    async onOpen() {
        this.ui = new App({
            target: this.contentEl,
            props: {
                plugin: this.plugin
            }
        });
        this.ui.$on("player-view", () => this.openPlayerView());
    }
    async onClose() {
        this.ui?.$destroy();
    }
    getViewType() {
        return INITIATIVE_TRACKER_VIEW;
    }
    getDisplayText() {
        return "Initiative Tracker";
    }
    getIcon() {
        return BASE;
    }

    //legacy Leaflet support...
    get pcs(): Creature[] {
        return [];
    }
    get npcs(): Creature[] {
        return [];
    }

    //open player view
    playerViewOpened = false;
    getExistingPlayerView(): PlayerView | undefined {
        const existing =
            this.plugin.app.workspace.getLeavesOfType(PLAYER_VIEW_VIEW);

        if (existing.length) {
            return existing[0].view as PlayerView;
        }
    }
    async getPlayerView(): Promise<PlayerView> {
        const existing = this.getExistingPlayerView();
        if (existing) {
            this.app.workspace.revealLeaf(existing.leaf);
            return existing;
        }

        const leaf = this.app.workspace.getLeaf("window");
        await leaf.setViewState({
            type: PLAYER_VIEW_VIEW
        });
        await this.app.workspace.setActiveLeaf(leaf, { focus: true });
        return leaf.view as PlayerView;
    }
    async openPlayerView() {
        await this.getPlayerView();
        this.playerViewOpened = true;
    }
}

export class CreatureView extends ItemView {
    buttonEl = this.contentEl.createDiv("creature-view-button");
    statblockEl = this.contentEl.createDiv("creature-statblock-container");
    constructor(leaf: WorkspaceLeaf, public plugin: InitiativeTracker) {
        super(leaf);
        this.load();
        this.containerEl.addClass("creature-view-container");
        this.containerEl.on(
            "mouseover",
            "a.internal-link",
            debounce(
                (ev) =>
                    app.workspace.trigger("hover-link", {
                        event: ev,
                        source: INITIATIVE_TRACKER_VIEW,
                        hoverParent: this,
                        targetEl: ev.target as HTMLElement,
                        linktext:
                            (ev.target as HTMLAnchorElement).dataset.href ??
                            ""
                    }),
                10
            )
        );
        this.containerEl.on("click", "a.internal-link", (ev) =>
            app.workspace.openLinkText(
                (ev.target as HTMLAnchorElement).dataset.href,
                "initiative-tracker"
            )
        );
    }
    onload() {
        new ExtraButtonComponent(this.buttonEl)
            .setIcon("cross")
            .setTooltip("Close Statblock")
            .onClick(async () => {
                await this.render();
                this.app.workspace.trigger("initiative-tracker:stop-viewing");
            });
    }
    onunload(): void {
        this.app.workspace.trigger("initiative-tracker:stop-viewing");
    }
    async render(creature?: Creature) {
        this.statblockEl.empty();
        if (!creature) {
            this.statblockEl.createEl("em", {
                text: "Select a creature to view it here."
            });
            return;
        }

        if (
            creature["statblock-link"] &&
            (this.plugin.data.preferStatblockLink ||
                !this.plugin.canUseStatBlocks)
        ) {
            await this.renderEmbed(creature.getStatblockLink());
        } else if (this.plugin.canUseStatBlocks) {
            const statblock = window.FantasyStatblocks.render(
                creature.creature,
                this.statblockEl,
                creature.display
            );
            this.addChild(statblock);
        } else {
            this.statblockEl.createEl("em", {
                text: "Install the TTRPG Statblocks plugin or add a statblock-link to your monster to use this feature!"
            });
        }
    }

    async renderEmbed(embedLink: string) {
        if (
            this.plugin.canUseStatBlocks &&
            window.FantasyStatblocks.isStatblockLink?.(embedLink)
        ) {
            embedLink = window.FantasyStatblocks.parseStatblockLink(embedLink);
        }
        if (/\[.+\]\(.+\)/.test(embedLink)) {
            //md
            [, embedLink] = embedLink.match(/\[.+?\]\((.+?)\)/);
        } else if (/\[\[.+\]\]/.test(embedLink)) {
            //wiki
            [, embedLink] = embedLink.match(/\[\[(.+?)(?:\|.+?)?\]\]/);
        }

        const { path, subpath } = parseLinktext(embedLink);

        const file = this.app.metadataCache.getFirstLinkpathDest(path, "/");

        let content = `Oops! Something is wrong with your statblock-link:<br />${embedLink}`;
        if (file) {
            const fileContent = await this.app.vault.cachedRead(file);
            if (subpath && fileContent) {
                const cache = app.metadataCache.getFileCache(file);
                const subpathResult = resolveSubpath(cache, subpath);
                if (subpathResult) {
                    content = fileContent.slice(
                        subpathResult.start.offset,
                        subpathResult.end.offset
                    );
                }
            } else if (fileContent) {
                content = fileContent;
            }
        }

        await MarkdownRenderer.render(
            this.app,
            content,
            this.statblockEl.createDiv("markdown-rendered"),
            path,
            this
        );
    }

    getDisplayText(): string {
        return "Combatant";
    }
    getIcon(): string {
        return CREATURE;
    }
    getViewType(): string {
        return CREATURE_TRACKER_VIEW;
    }
}
