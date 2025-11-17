import { App, ButtonComponent, Modal } from "obsidian";
import type InitiativeTracker from "src/main";
import type { Creature } from "src/utils/creature";
import { t } from "src/utils/i18n";
import Creator from "./Creator.svelte";
export class AddCreatureModal extends Modal {
    constructor(public plugin: InitiativeTracker, public creature?: Creature) {
        super(plugin.app);
    }
    onOpen() {
        this.containerEl.addClass("initiative-tracker-modal");
        new Creator({
            target: this.contentEl,
            props: {
                plugin: this.plugin,
                ...(this.creature
                    ? { creature: this.creature, isEditing: true }
                    : {})
            }
        }).$on("close", () => this.close());
    }
}

export async function confirmWithModal(
    app: App,
    text: string,
    buttons: { cta: string; secondary: string } = {
        cta: t("Yes"),
        secondary: t("No")
    }
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            const modal = new ConfirmModal(app, text, buttons);
            modal.onClose = () => {
                resolve(modal.confirmed);
            };
            modal.open();
        } catch (e) {
            reject();
        }
    });
}
export class ConfirmModal extends Modal {
    constructor(
        app: App,
        public text: string,
        public buttons: { cta: string; secondary: string }
    ) {
        super(app);
    }
    confirmed: boolean = false;
    async display() {
        this.containerEl.addClass("initiative-tracker-modal");
        this.contentEl.empty();
        this.contentEl.addClass("confirm-modal");
        this.contentEl.createEl("p", {
            text: this.text
        });
        const buttonEl = this.contentEl.createDiv("confirm-buttons");
        new ButtonComponent(buttonEl)
            .setButtonText(this.buttons.cta)
            .setCta()
            .onClick(() => {
                this.confirmed = true;
                this.close();
            });
        new ButtonComponent(buttonEl)
            .setButtonText(this.buttons.secondary)
            .onClick(() => {
                this.close();
            });
    }
    onOpen() {
        this.display();
    }
}
