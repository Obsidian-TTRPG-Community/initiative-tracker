<script lang="ts">
    import type { SRDMonster } from "src/types/creatures";
    import { ExtraButtonComponent, setIcon } from "obsidian";
    import { convertFraction, FRIENDLY, getRpgSystem, HIDDEN } from "src/utils";
    import { encounter } from "../../stores/encounter";
    import Nullable from "../Nullable.svelte";
    import { getContext } from "svelte";
    import { Creature as CreatureCreator } from "src/utils/creature";

    const { players } = encounter;
    const { average } = players;

    const plugin = getContext("plugin");
    const rpgSystem = getRpgSystem(plugin);
    const remove = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon("minus-circle");
    };
    const add = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon("plus-with-circle");
    };
    const del = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon("trash-2");
    };
    const hide = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon(HIDDEN);
    };
    const hideIcon = (node: HTMLElement) => {
        setIcon(node, HIDDEN);
    };
    const friend = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon(FRIENDLY);
    };
    const friendIcon = (node: HTMLElement) => {
        setIcon(node, FRIENDLY);
    };

    export let count: number;
    export let creature: SRDMonster;
    $: insignificant =
        "cr" in creature &&
        creature.cr &&
        convertFraction(creature.cr) < $average - 3;
    $: challenge =
        "cr" in creature &&
        creature.cr &&
        convertFraction(creature.cr) > $average + 3;

    $: playerLevels = $players.filter((p) => p.enabled).map((p) => p.level);

    const baby = (node: HTMLElement) => setIcon(node, "baby");

    const skull = (node: HTMLElement) => setIcon(node, "skull");

    const open = (evt: MouseEvent) => {
        plugin.openCombatant(CreatureCreator.from(creature), evt.ctrlKey || evt.metaKey);
    };
</script>

<div class="encounter-creature-container">
    <div class="encounter-creature-controls">
        <div use:remove on:click={() => encounter.remove(creature)} />
        <input
            type="number"
            min="1"
            bind:value={count}
            on:change={(evt) =>
                encounter.set(creature, Number(evt.currentTarget.value))}
        />
        <div use:add on:click={() => encounter.add(creature)} />
    </div>
    <div class="encounter-creature">
        {#if creature.hidden}
            <div
                class="contains-icon"
                use:hideIcon
                aria-label={`This creature is hidden.`}
            />
        {/if}
        {#if creature.friendly}
            <div
                class="contains-icon"
                use:friendIcon
                aria-label={`This creature is an ally.`}
            />
        {/if}
        <strong class="encounter-creature-name" on:click={open}>
            {creature.name}
        </strong>
        {#if insignificant}
            <div
                class="contains-icon"
                use:baby
                aria-label={`${
                    count > 1 ? "These creatures are" : "This creature is"
                } significantly under the average party level and might not contribute much to the fight.`}
            />
        {/if}
        {#if challenge}
            <div
                class="contains-icon"
                use:skull
                aria-label={`${
                    count > 1 ? "These creatures are" : "This creature is"
                } significantly over the average party level and might prove a challenge.`}
            />
        {/if}
    </div>
    {#each rpgSystem.getAdditionalCreatureDifficultyStats(creature, playerLevels) as stat}
        <div class="encounter-creature-context">
            <span>{stat}</span>
        </div>
    {/each}
    <div class="encounter-creature-context">
        <span>
            <Nullable
                str={rpgSystem.formatDifficultyValue(
                    rpgSystem.getCreatureDifficulty(creature, playerLevels),
                    true
                )}
            />
        </span>
    </div>
    <div class="encounter-creature-controls">
        <div use:hide on:click={() => (creature.hidden = !creature.hidden)} />
        <div
            use:friend
            on:click={() => {
                creature.friendly = !creature.friendly;
                encounter.update(creature);
            }}
        />
        <div use:del on:click={() => encounter.delete(creature)} />
    </div>
</div>

<style scoped>
    .encounter-creature-container {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: min-content 1fr 10% 10% auto auto auto;
        gap: 0.5rem;
    }
    .encounter-creature {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .encounter-creature-context {
        text-align: right;
    }
    .encounter-creature-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    input {
        text-align: center;
        width: 40px;
    }
    .contains-icon {
        display: flex;
        align-items: center;
    }
</style>
