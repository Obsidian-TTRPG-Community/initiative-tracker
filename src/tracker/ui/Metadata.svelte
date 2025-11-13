<script lang="ts">
    import { getContext } from "svelte/internal";
    import { tracker } from "../stores/tracker";
    import Difficulty from "./Difficulty.svelte";
    import { getRpgSystem } from "src/utils";
    import { t } from "src/utils/i18n";

    const { state, name, round, party, difficulty } = tracker;

    const plugin = getContext("plugin");
    const rpgSystem = getRpgSystem(plugin);

    const dif = difficulty(plugin);
</script>

<div class="initiatie-tracker-metadata">
    <div class="initiative-tracker-name-container">
        {#if $name && $name.length}
            <h2 class="initiative-tracker-name">{$name}</h2>
        {/if}
        {#if $dif?.difficulty?.value > 0}
            <span class="initiative-tracker-xp encounter-xp"
                >{rpgSystem.formatDifficultyValue($dif?.difficulty?.value, true)}</span
            >
        {/if}
    </div>
    {#if $dif}
        <Difficulty />
    {/if}
    {#if $party}
        <h4 class="initiave-tracker-party">{$party}</h4>
    {/if}
    {#if $state}
        <div class="initiative-tracker-round-container">
            <small>
                <em>
                    {t("Round")} {$round}
                </em>
            </small>
        </div>
    {/if}
</div>

<style scoped>
    .initiave-tracker-party {
        padding: 0 0.5rem;
        margin: 0;
    }
    .initiative-tracker-name-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        margin: 0;
        margin-bottom: 0.5rem;
    }
    .initiative-tracker-name {
        margin: 0;
    }
    .initiative-tracker-round-container {
        padding: 0 0.5rem;
    }
</style>
