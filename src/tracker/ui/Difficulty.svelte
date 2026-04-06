<script lang="ts">
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { getContext } from "svelte";
    import { getRpgSystem } from "src/utils";
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

    const difficultyBarLevels = {
        low: 0.33,
        high: 0.66
    }
    
    $: {
        if ($dif.thresholds.last().minValue > 0) {
            difficultyBar.set(
                Math.min(
                    $dif.difficulty.value / $dif.thresholds.last().minValue,
                    1
                )
            );
        }

        // Set low & high thresholds on meter (causes colour change)
        // Low: first non-zero XP budget
        // High: Second-highest XP budget (highest is off the chart)
        // If both are equal, only set one.
        if ($dif.thresholds.length > 2) {
            difficultyBarLevels.high = $dif.thresholds[$dif.thresholds.length - 2].minValue / $dif.thresholds.last().minValue;
        }
        for(const threshold of $dif.thresholds) {
            if (threshold.minValue / $dif.thresholds.last().minValue >= difficultyBarLevels.high) {
                break;
            }

            if (threshold.minValue > 0) {
                difficultyBarLevels.low = threshold.minValue / $dif.thresholds.last().minValue;
                break;
            }
        }

    }
    $: summary = $dif.difficulty.summary;
</script>

<div class="difficulty-bar-container" aria-label={summary}>
    <span
        ><meter
            class="difficulty-bar"
            min="0"
            low="{difficultyBarLevels.low}"
            high="{difficultyBarLevels.high}"
            optimum="0"
            value={$difficultyBar}
        />
        <ol class="thresholds">
            {#each $dif.thresholds as level}
                <li style="left:calc({level.minValue / $dif.thresholds.last().minValue * 100}% - 1px)">
                    <span>{level.displayName}</span>
                </li>
            {/each}
        </ol>
    
    </span>
    <span>{$dif.difficulty.displayName ?? ""}</span>
</div>

<style>
    .difficulty-bar-container {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.5rem;
        align-items: start;
        padding: 0 0.5rem;
        width: 100%;
    }
    .difficulty-bar {
        width: 100%;
        border:none;
    }

    .difficulty-bar-container .thresholds {
        list-style-type: none;
        margin:0;
        padding:0;
        position:relative;
        height:2rem;
        top:-5px;
    }

    .difficulty-bar-container .thresholds li {
        display:inline-block;
        border-left:1px solid #ccc;
        position:absolute;
        width:0px;
        height:0.35rem
    }

    .difficulty-bar-container .thresholds li span {
        font-size:x-small;
        position:relative;
        top: 0.3rem;
        text-align:center;
        display:inline-block;
        width:10em;
        left:-5em;
    }
</style>
