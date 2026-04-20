<script lang="ts">
    import { setIcon } from "obsidian";
    import { fade } from "svelte/transition";
    import { SyncLoader } from "svelte-loading-spinners";

    import { AC, FRIENDLY, HP, INITIATIVE, SHOW_PLAYER_HP } from "src/utils";
    import type { Creature } from "src/utils/creature";
    import { createEventDispatcher } from "svelte";

    import { tracker } from "../stores/tracker";
    const { state, ordered, data } = tracker;

    const hpIcon = (node: HTMLElement) => {
        setIcon(node, HP);
    };
    const acIcon = (node: HTMLElement) => {
        setIcon(node, AC);
    };
    const iniIcon = (node: HTMLElement) => {
        setIcon(node, INITIATIVE);
    };

    const getHpStatus = (hp: number, max: number) => {
        if (!hp) return "";
        if (hp <= 0) return "Defeated";
        if (hp < max / 2) return "Bloodied";
        if (hp < max) return "Hurt";
        return "Healthy";
    };

    const amIActive = (creature: Creature) => {
        if (creature.hidden) return false;
        if (creature.active) return true;

        const active = $ordered.findIndex((c) => c.active);
        const index = $ordered.indexOf(creature);
        if (active == -1 || active < index) return false;

        const remaining = $ordered.slice(index + 1, active + 1);
        if (remaining.every((c) => c.hidden)) return true;
        return false;
    };

    $: activeAndVisible = $ordered.filter((c) => c.enabled && !c.hidden);

    const name = (creature: Creature) => creature.getName();
    const friendIcon = (node: HTMLElement) => {
        setIcon(node, FRIENDLY);
    };
    
    const showHPValues = (creature: Creature) => {
        if (!creature.player) {
            return false;
        }
        
        if (
            $data.diplayPlayerHPValues == SHOW_PLAYER_HP.always || 
            ($data.diplayPlayerHPValues == SHOW_PLAYER_HP.outsideCombat && $state == false) ||
            ($data.diplayPlayerHPValues == SHOW_PLAYER_HP.whenFull && creature.hp >= creature.max) ||
            ($data.diplayPlayerHPValues == SHOW_PLAYER_HP.outsideCombatOrFull && ($state == false || creature.hp >= creature.max))
        ) {
            return true;
        }
        
        return false;
    }
</script>

<table class="initiative-tracker-table" transition:fade>
    <thead class="tracker-table-header">
        <th style="width:5%"><strong use:iniIcon /></th>
        <th class="left" style="width:30%"><strong>Name</strong></th>
        <th style="width:15%" class="center"><strong use:hpIcon /></th>
        <th><strong> Statuses </strong></th>
    </thead>
    <tbody>
        {#each activeAndVisible as creature (creature.id)}
            <tr class:active={amIActive(creature) && $state}>
                <td class="center">{creature.initiative}</td>
                <td class='name'>
                    {#if creature.friendly}
                        <div
                            class="contains-icon"
                            use:friendIcon
                            aria-label={`This creature is an ally.`}
                        />
                    {/if}
                    {name(creature)}
                </td>
                <td
                    class:center={true}
                    class={getHpStatus(creature.hp, creature.max).toLowerCase()}
                >
                    {#if showHPValues(creature)}
                        <div class="center">{@html creature.hpDisplay}</div>
                    {:else}
                        <span>{getHpStatus(creature.hp, creature.max)}</span>
                    {/if}
                </td>
                <td class="center">
                    {[...creature.status].map((s) => s.name).join(", ")}
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style scoped>
    .full-center {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .initiative-tracker-table {
        padding: 0.5rem;
        align-items: center;
        gap: 0.25rem 0.5rem;
        width: 100%;
        margin-left: 0rem;
        table-layout: fixed;
        border-collapse: separate;
        border-spacing: 0 2px;
        font-size: larger;
    }
    .left {
        text-align: left;
    }
    .name, .name > :global(svg) {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .center {
        text-align: center;
    }
    .healthy {
        color: var(--text-success);
    }
    .hurt {
        color: var(--text-warning);
    }
    .bloodied {
        color: var(--text-error);
    }
    .defeated {
        color: var(--text-faint);
    }
    .active {
        background-color: rgba(0, 0, 0, 0.1);
    }
    :global(.theme-dark) .active {
        background-color: rgba(255, 255, 255, 0.1);
    }
</style>
