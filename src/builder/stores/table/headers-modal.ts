import { Modal } from "obsidian";
import { t } from "src/utils/i18n";

import Headers from "./Headers.svelte";
import type { TableHeaderState } from "src/builder/builder.types";
import copy from "fast-copy";

export class HeadersModal extends Modal {
    canceled: boolean = false;
    reset = false;
    constructor(public headers: TableHeaderState[]) {
        super(app);
    }
    onOpen() {
        this.titleEl.setText(t("Edit Headers"));
        const app = new Headers({
            target: this.contentEl,
            props: {
                headers: copy(this.headers)
            }
        });
        app.$on("update", (evt) => {
            this.headers = copy(evt.detail);
        });
        app.$on("cancel", () => {
            this.canceled = true;
            this.close();
        });
        app.$on("reset", () => {
            this.reset = true;
            this.close();
        });
    }
}
