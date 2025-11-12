<script lang="ts">
    import type InitiativeTracker from "src/main";
    import { setContext } from "svelte";
    import Controls from "./Controls.svelte";
    import Table from "./creatures/Table.svelte";
    import Metadata from "./Metadata.svelte";
    import SaveEncounter from "./SaveEncounter.svelte";
    import LoadEncounter from "./LoadEncounter.svelte";

    import { tracker } from "../stores/tracker";
    import { ExtraButtonComponent, Notice } from "obsidian";
    import { ADD, COPY } from "src/utils";
    import Updating from "./Updating.svelte";
    import Logger from "src/logger/logger";

    import { AddCreatureModal } from "./create/modal";
    import Legacy from "./create/Legacy.svelte";
    import type { Creature } from "src/utils/creature";
    import { t } from "src/utils/i18n";
    import Difficulty from "./Difficulty.svelte";

    export let plugin: InitiativeTracker;

    const { data } = tracker;

    $: difficulty = $data.displayDifficulty;

    tracker.setData(plugin.data);
    tracker.setLogger(new Logger(plugin));
    if (plugin.data.state) {
        tracker.new(plugin, plugin.data.state);
    } else {
        tracker.setParty(plugin.data.defaultParty, plugin);
        tracker.roll(plugin);
    }

    const { ordered } = tracker;

    setContext<InitiativeTracker>("plugin", plugin);

    let saving = false;
    let loading = false;
    const editOrAdd = (creature?: Creature) => {
        const modal = new AddCreatureModal(plugin, creature);
        modal.onClose = () => {};
        modal.open();
    };
    const addButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setTooltip(t("Add Creature")).setIcon(ADD);
    };
    const copyButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setTooltip(t("Copy Initiative Order"))
            .setIcon(COPY)
            .onClick(async () => {
                const contents = $ordered
                    .map(
                        (creature) => `${creature.initiative} ${creature.name}`
                    )
                    .join("\n");
                try {
                    await navigator.clipboard.writeText(contents);
                    new Notice(t("Initiative order copied to clipboard."));
                } catch (e) {
                    new Notice(
                        t("Initiative order could not be copied to clipboard.")
                    );
                }
            });
    };
</script>

<div class="obsidian-initiative-tracker">
    <Controls
        on:save={() => (saving = true)}
        on:load={() => (loading = true)}
        on:add-creatures={() => editOrAdd()}
        on:player-view
        on:open-map
    />

    <Metadata />
    <Table
        on:edit={(evt) => editOrAdd(evt.detail)}
        on:open-combatant={(evt) => plugin.openCombatant(evt.detail)}
    />
    <Updating />
    {#if saving}
        <SaveEncounter on:cancel={() => (saving = false)} />
    {:else if loading}
        <LoadEncounter on:cancel={() => (loading = false)} />
    {:else}
        <div class="add-creature-container">
            <div class="context-container">
                <div use:copyButton class="copy-button" />
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    use:addButton
                    class="add-button"
                    on:click={() => editOrAdd()}
                />
            </div>
        </div>
    {/if}
</div>

<style scoped>
    .obsidian-initiative-tracker {
        margin: 0.5rem;
        /* margin-bottom: 0.5rem; */
        min-width: 180px;
        overflow-y: auto;
    }
    .add-creature-container {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        margin-right: 0.5rem;
    }
    .context-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    .copy-button {
        width: min-content;
        opacity: 0.25;
    }
    .copy-button:hover {
        opacity: 1;
    }
    .add-button {
        width: min-content;
    }
    .add-button :global(.clickable-icon) {
        margin: 0;
    }
</style>
