<script lang="ts">
    import { ExtraButtonComponent } from "obsidian";
    import type InitiativeTracker from "src/main";

    import { createEventDispatcher, getContext } from "svelte";
    import { tracker } from "../stores/tracker";
    import { t } from "src/utils/i18n";

    const dispatch = createEventDispatcher();
    const plugin = getContext<InitiativeTracker>("plugin");

    const cancel = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon("cross").setTooltip(t("Cancel"));
    };

    $: encounters = plugin.data.encounters;

    const load = (node: HTMLElement, encounter: string) => {
        new ExtraButtonComponent(node)
            .setIcon("open-elsewhere-glyph")
            .setTooltip(t("Load Encounter"))
            .onClick(() => {
                tracker.new(plugin, encounters[encounter]);
                dispatch("cancel");
            });
    };
    const trash = (node: HTMLElement, encounter: string) => {
        new ExtraButtonComponent(node)
            .setIcon("trash")
            .setTooltip(t("Delete Encounter"))
            .onClick(() => {
                plugin.removeEncounter(encounter);
                encounters = plugin.data.encounters;
            });
    };
</script>

<div class="loading-container">
    <div class="controls">
        <h4>{t("Load An Encounter")}</h4>
        <div use:cancel on:click={() => dispatch("cancel")} />
    </div>
    <div class="encounter-container">
        {#if !encounters || !Object.keys(encounters)?.length}
            <span class="no-encounters">
                <em>{t("There are no saved encounters.")}</em>
            </span>
        {/if}
        {#each Object.keys(encounters) as encounter (encounter)}
            <div class="encounter">
                <span>{encounter}</span>
                <div class="encounter-controls">
                    <div use:load={encounter} />
                    <div use:trash={encounter} />
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--background-modifier-border);
    }
    .controls h4 {
        margin: 0;
    }
    .loading-container {
        display: flex;
        flex-flow: column nowrap;
        gap: 0.5rem;
        padding: 0.5rem;
        height: 100%;
    }
    .loading-container :global(.clickable-icon) {
        margin: 0;
    }
    .encounter-container {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        gap: 1rem;
        overflow-y: auto;
    }
    .no-encounters {
        color: var(--text-muted);
        display: flex;
        justify-content: center;
    }
    .encounter {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .encounter-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>
