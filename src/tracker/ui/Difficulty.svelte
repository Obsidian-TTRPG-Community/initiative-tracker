<script lang="ts">
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { getContext } from "svelte";
    import { getRpgSystem } from "src/utils";
    import { t } from "src/utils/i18n";
    import type { RpgSystem } from "src/utils/rpg-system/rpgSystem";
    import type InitiativeTracker from "src/main";

    import { tracker } from "../stores/tracker";
    const { difficulty } = tracker;

    const plugin: InitiativeTracker = getContext("plugin");

    const dif = difficulty(plugin);

    const difficultyBar = tweened(0, {
        duration: 400,
        easing: cubicOut
    });

    $: {
        if ($dif.thresholds.last().minValue > 0) {
            difficultyBar.set(
                Math.min(
                    $dif.difficulty.value / $dif.thresholds.last().minValue,
                    1
                )
            );
        }
    }
    $: summary = $dif.difficulty.summary;
</script>

<div class="difficulty-bar-container" aria-label={summary}>
    <span>{t($dif.labels?.[0]) ?? ""}</span>
    <span
        ><meter
            class="difficulty-bar"
            min="0"
            low="0.33"
            high="0.66"
            optimum="0"
            value={$difficultyBar}
        /></span
    >
    <span>{t($dif.labels?.last()) ?? ""}</span>
</div>

<style>
    .difficulty-bar-container {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 0.5rem;
        align-items: center;
        padding: 0 0.5rem;
        margin-bottom: 0.5rem;
        width: 100%;
    }
    .difficulty-bar {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 3px;
    }
</style>
