import { Modal, Setting } from "obsidian";

import copy from "fast-copy";
import Filters from "./Container.svelte";
import EditFilter from "./EditFilter.svelte";
import type { BuiltFilterStore, Filter, FilterLayout } from "./filter";
import { t } from "src/utils/i18n";

export class FiltersModal extends Modal {
    canceled: boolean = false;
    reset = false;
    layout: FilterLayout;
    constructor(layout: FilterLayout, public filterStore: BuiltFilterStore) {
        super(app);
        this.layout = copy(layout);
    }
    onOpen() {
        this.titleEl.setText(t("Edit Filters"));
        const app = new Filters({
            target: this.contentEl,
            props: {
                filterStore: this.filterStore
            }
        });
        app.$on("update", (evt) => {
            this.layout = copy(evt.detail);
        });
        app.$on("cancel", () => {
            this.canceled = true;
            this.close();
        });
    }
}

export class EditFilterModal extends Modal {
    canceled = false;
    filter: Filter;
    constructor(public original: Filter) {
        super(app);
        this.filter = copy(original);
    }
    onOpen(): void {
        this.titleEl.setText(t("Edit Filter"));
        const app = new EditFilter({
            target: this.contentEl,
            props: {
                filter: this.filter,
                original: this.original
            }
        });

        app.$on("update", (evt) => {
            this.filter = evt.detail;
        });
        app.$on("cancel", (evt) => {
            this.canceled = true;
            this.close();
        });
    }
}
