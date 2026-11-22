<script lang="ts">
    import { ExtraButtonComponent, setIcon } from "obsidian";
    import type { Condition } from "src/types/creatures";
    import type { Creature } from "src/utils/creature";
    import { describeExpiry } from "src/utils/status-expiry";
    import { createEventDispatcher, getContext } from "svelte";
    import { tracker } from "../../stores/tracker";
    import type InitiativeTracker from "src/main";
    import { getRpgSystem } from "src/utils";

    const dispatch = createEventDispatcher();

    export let status: Condition;
    /** The creature that has this status, used to describe its expiry. */
    export let owner: Creature | undefined = undefined;
    /** Show the expiry indicator (hidden while the status is being chosen). */
    export let showExpiry = true;

    const plugin = getContext<InitiativeTracker>("plugin");
    const { data } = tracker;
    $: system = plugin ? getRpgSystem(plugin, $data?.rpgSystem) : undefined;
    $: expiryLabel = status.expiry
        ? describeExpiry(status.expiry, $tracker, owner, system)
        : null;
    const expiryIcon = (node: HTMLElement, type: string) => {
        const set = (type: string) =>
            setIcon(node, type === "save" ? "dice" : "hourglass");
        set(type);
        return { update: set };
    };
    if (isNaN(status.amount) || status.amount < 0) {
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
    {#if showExpiry && status.expiry}
        <div
            class="icon expiry"
            use:expiryIcon={status.expiry.type}
            aria-label={expiryLabel}
        />
    {/if}
    {#if status.hasAmount}
        <div class="amount">
            <div
                class="icon"
                use:minus
                on:click={() => {
                    status.amount--;
                    if (status.amount <= 0) dispatch("remove");
                }}
            />
            <span>{status.amount}</span>
            <div class="icon" use:plus on:click={() => status.amount++} />
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
    .expiry {
        color: var(--text-faint);
    }
    .expiry :global(svg) {
        width: var(--icon-xs);
        height: var(--icon-xs);
    }
</style>
