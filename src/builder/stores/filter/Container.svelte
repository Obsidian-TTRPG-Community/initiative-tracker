<script lang="ts">
    import { createEventDispatcher, setContext } from "svelte/internal";
    import {
        type BuiltFilterStore,
        DEFAULT_NEW_FILTER,
        type Filter,
        type FilterLayout
    } from "./filter";
    import Filters from "./Filters.svelte";
    import { ButtonComponent, Setting } from "obsidian";
    import copy from "fast-copy";
    import { getId } from "src/utils/creature";
    import { t } from "src/utils/i18n";

    export let filterStore: BuiltFilterStore;
    const { layout, filters } = filterStore;
    const dispatch = createEventDispatcher<{
        cancel: null;
        update: FilterLayout;
    }>();

    setContext<BuiltFilterStore>("filterStore", filterStore);

    $: copied = copy($layout);
    $: dispatch("update", copied);

    filters.subscribe(() => {
        if (copied) copied = [...copied];
    });

    const reset = (node: HTMLElement) => {
        new Setting(node)
            .setName(t("Restore Default Layout"))
            .addExtraButton((b) => {
                b.setIcon("reset").onClick(() => {
                    filterStore.resetLayout(true);
                });
            });
    };
    const add = (node: HTMLElement) => {
        new Setting(node).setName(t("Add New Filter")).addExtraButton((b) => {
            b.setIcon("plus-circle").onClick(() => {
                const id = getId();
                const filter = {
                    ...DEFAULT_NEW_FILTER,
                    id
                };
                t(filter.text)
                copied.push({
                    type: "nested",
                    id: getId(),
                    nested: [
                        {
                            type: "filter",
                            id
                        }
                    ]
                });
                filterStore.add(filter);
            });
        });
    };
    const cancel = (node: HTMLElement) => {
        new ButtonComponent(node).setButtonText(t("Cancel")).setCta();
    };
</script>

<div use:reset />
<div use:add />

{#key copied}
    {#each copied as block}
        <Filters
            layout={copied}
            {block}
            inline={true}
            on:update={() => dispatch("update", copied)}
        />
    {/each}
{/key}
<div class="cancel-button">
    <div use:cancel on:click={() => dispatch("cancel")} />
</div>
