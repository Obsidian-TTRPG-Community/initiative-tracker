<script lang="ts">
    import Creature from "./Creature.svelte";
    import { getContext } from "svelte";
    import Filters from "../filters/Filters.svelte";
    import { Menu, Notice, setIcon } from "obsidian";
    import Pagination from "./Pagination.svelte";
    import type { BuiltFilterStore } from "../../stores/filter/filter";
    import { t } from "src/utils/i18n";

    import type { BuiltTableStore } from "../../stores/table/table";
    import { HeadersModal } from "src/builder/stores/table/headers-modal";
    import { FiltersModal } from "src/builder/stores/filter/filters-modal";
    import type InitiativeTracker from "src/main";
    import Ajv from "ajv";
    import schema from "../../stores/filter/filter-schema.json";
    import type { BuilderState } from "src/builder/builder.types";

    const table = getContext<BuiltTableStore>("table");
    const { sortDir, allHeaders } = table;
    const filterStore = getContext<BuiltFilterStore>("filters");
    const { filtered, layout } = filterStore;
    const plugin = getContext<InitiativeTracker>("plugin");

    let slice = 50;

    const sortUp = (node: HTMLElement) => {
        setIcon(node, "chevron-up");
    };
    const sortDown = (node: HTMLElement) => {
        setIcon(node, "chevron-down");
    };

    const settingsMenu = (evt: CustomEvent<MouseEvent>) => {
        const menu = new Menu();
        menu.addItem((item) => {
            item.setTitle(t("Edit Headers")).onClick(() => {
                openHeadersModal();
            });
        })
            .addItem((item) => {
                item.setTitle(t("Edit Filters")).onClick(() => {
                    openFiltersModal();
                });
            })
            .addSeparator()
            .addItem((item) => {
                item.setTitle(t("Export")).onClick(() => {
                    const link = createEl("a");
                    const file = new Blob(
                        [JSON.stringify(plugin.data.builder)],
                        {
                            type: "json"
                        }
                    );
                    const url = URL.createObjectURL(file);
                    link.href = url;
                    link.download = `initiative-tracker-encounter-builder.json`;
                    link.click();
                });
            })
            .addItem((item) => {
                item.setTitle(t("Import")).onClick(() => {
                    //validate;
                    const ajv = new Ajv();

                    // validate is a type guard for MyData - type is inferred from schema type
                    const validate = ajv.compile<BuilderState>(schema);
                    const input = createEl("input", {
                        attr: {
                            type: "file",
                            name: "builder_state",
                            accept: ".json"
                        }
                    });
                    input.onchange = async () => {
                        const { files } = input;
                        if (!files.length) return;

                        const reader = new FileReader();
                        reader.onload = async (
                            event: ProgressEvent<FileReader>
                        ) => {
                            if (typeof event.target.result == "string") {
                                let json: any;
                                try {
                                    json = JSON.parse(event.target.result);
                                } catch (e) {
                                    new Notice(
                                        t("There was an issue parsing the file as JSON.")
                                    );
                                }
                                if (validate(json)) {
                                    plugin.data.builder = { ...json };
                                    await plugin.saveSettings();
                                    filterStore.resetLayout();
                                } else {
                                    console.log(
                                        ...validate.errors.map((e) => e.message)
                                    );
                                    new Notice(
                                        t("This file does not match the builder state schema.")
                                    );
                                }
                            }
                        };
                        reader.readAsText(files[0]);
                    };
                    input.click();
                });
            });
        menu.showAtMouseEvent(evt.detail);
    };
    const openFiltersModal = () => {
        const modal = new FiltersModal($layout, filterStore);
        modal.open();
        modal.onClose = () => {
            if (modal.canceled) return;
            $layout = modal.layout;
        };
    };
    const openHeadersModal = () => {
        const modal = new HeadersModal($table.map((t) => t.toState()));
        modal.open();
        modal.onClose = () => {
            if (modal.canceled) return;
            if (modal.reset) {
                table.resetToDefault();
                return;
            }
            table.setHeadersFromState(modal.headers);
        };
    };

    let page = 1;
    $: pages = Math.ceil($filtered.length / slice);
</script>

<div class="filters">
    <Filters on:settings={(evt) => settingsMenu(evt)} />
</div>

{#if $allHeaders.length}
    <table>
        <thead>
            {#each $allHeaders as header (header.text)}
                <th
                    on:click={() => {
                        table.sort(header);
                    }}
                >
                    <div class="table-header">
                        <span class="table-header-content">{t(header.text)}</span>
                        {#if header.active}
                            {#if $sortDir}
                                <div class="has-icon" use:sortUp />
                            {:else}
                                <div class="has-icon" use:sortDown />
                            {/if}
                        {/if}
                    </div>
                </th>
            {/each}
        </thead>
        <tbody>
            {#each $filtered.slice((page - 1) * slice, page * slice) as creature}
                <Creature {creature} />
            {/each}
        </tbody>
    </table>
{/if}

<Pagination
    {slice}
    {page}
    {pages}
    on:slice={(evt) => (slice = evt.detail)}
    on:previous={() => (page = page - 1)}
    on:next={() => (page = Math.min(page + 1, pages))}
    on:page={(evt) => (page = evt.detail)}
/>

<style scoped>
    .filters {
        margin: 1rem 0;
    }
    .table-header {
        display: flex;
        gap: 0.25rem;
    }

    .has-icon {
        display: flex;
        align-items: center;
    }

    table {
        width: 100%;
    }
</style>
