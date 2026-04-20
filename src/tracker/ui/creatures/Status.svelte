<script lang="ts">
    import { ExtraButtonComponent, setIcon } from "obsidian";
    import type { Condition } from "src/types/creatures";
    import { createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();

    export let status: Condition;
    if (!!status.hasAmount && (isNaN(status.amount) || status.amount < 0)) {
        status.amount = status.startingAmount;
    }
    const deleteIcon = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon("cross-in-box");
    };
    const minus = (node: HTMLElement) => {
        setIcon(node, "minus");
    };
    const plus = (node: HTMLElement) => {
        setIcon(node, "plus");
    };
</script>

<!-- svelte-ignore a11y-unknown-aria-attribute -->
<div class="tag">
    <span
        aria-label-classes="initiative-tracker-condition-tooltip"
        aria-label={status.description?.length ? status.description : null}
        >{status.name}</span
    >
    {#if status.hasAmount}
        <div class="amount">
            <div
                class="icon"
                use:minus
                on:click={() => {
                    status.amount--;
                    if (status.amount <= 0) {
                        dispatch("remove");
                    } else {
                        dispatch("update");
                    }
                }}
            />
            <span>{status.amount}</span>
            <div class="icon" use:plus on:click={() => {
                status.amount++;
                dispatch("update");
            }} />
        </div>
    {/if}
    <div use:deleteIcon on:click={() => dispatch("remove")} />
</div>

<style>
    .amount,
    .tag {
        display: flex;
        align-items: center;
        gap: 0.125rem;
    }
    .tag {
        color: var(--text-muted);
        font-size: small;
        width: fit-content;
        border-color: var(--border-color);
        border-radius: 0.25rem;
    }
    .tag :global(.clickable-icon) {
        margin: 0;
    }
    .icon {
        display: flex;
        align-items: center;
    }
</style>
