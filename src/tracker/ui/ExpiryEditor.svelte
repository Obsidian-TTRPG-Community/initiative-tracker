<script lang="ts">
    import { get } from "svelte/store";
    import { getContext } from "svelte";
    import type InitiativeTracker from "src/main";
    import { getRpgSystem } from "src/utils";
    import type {
        ExpiryTiming,
        SaveStat,
        StatusExpiry
    } from "src/types/creatures";
    import { tracker } from "../stores/tracker";

    /** The expiry being edited; `undefined` means "until cleared". */
    export let expiry: StatusExpiry | undefined = undefined;

    const { ordered, data } = tracker;
    const plugin = getContext<InitiativeTracker>("plugin");
    $: system = getRpgSystem(plugin, $data?.rpgSystem);
    $: savingThrows = system.savingThrows;

    type Mode =
        | "cleared"
        | "turn:start:source"
        | "turn:end:source"
        | "turn:start:target"
        | "turn:end:target"
        | "save";

    const allModes: { value: Mode; label: string }[] = [
        { value: "cleared", label: "Until cleared" },
        { value: "turn:start:source", label: "Until start of attacker's turn" },
        { value: "turn:end:source", label: "Until end of attacker's turn" },
        { value: "turn:start:target", label: "Until start of target's turn" },
        { value: "turn:end:target", label: "Until end of target's turn" },
        { value: "save", label: "Repeat saving throw" }
    ];
    // Only offer repeated saves if the game system has them.
    $: modes = savingThrows.length
        ? allModes
        : allModes.filter((m) => m.value !== "save");
    $: if (mode === "save" && !savingThrows.length) mode = "cleared";

    let mode: Mode = !expiry
        ? "cleared"
        : expiry.type === "save"
        ? "save"
        : (`turn:${expiry.timing}:${expiry.whose}` as Mode);

    // Attacker defaults to whoever's turn it is.
    let sourceId: string | undefined =
        expiry?.type === "turn" ? expiry.sourceId : undefined;
    if (!sourceId) {
        const order = get(ordered);
        sourceId = (order.find((c) => c.active) ?? order[0])?.id;
    }
    let stat: SaveStat = expiry?.type === "save" ? expiry.stat : undefined;
    // Default to the system's usual save, and pick a valid one if it changes.
    $: if (!savingThrows.some((s) => s.id === stat)) {
        stat = system.defaultSavingThrow ?? savingThrows[0]?.id;
    }
    /** How many of the timing creature's turns it lasts; 1 = its next turn. */
    let turns: number | null =
        expiry?.type === "turn" ? expiry.turns ?? 1 : 1;
    let saveTiming: ExpiryTiming =
        expiry?.type === "save" ? expiry.timing : "end";
    let dc: number | null =
        expiry?.type === "save" ? expiry.dc ?? null : null;

    const build = (
        mode: Mode,
        sourceId: string | undefined,
        stat: SaveStat,
        saveTiming: ExpiryTiming,
        dc: number | null,
        turns: number | null
    ): StatusExpiry | undefined => {
        if (mode === "cleared") return undefined;
        if (mode === "save") {
            const value = Number(dc);
            return {
                type: "save",
                timing: saveTiming,
                stat,
                ...(dc != null && !isNaN(value) && value > 0
                    ? { dc: value }
                    : {})
            };
        }
        const [, timing, whose] = mode.split(":") as [
            string,
            ExpiryTiming,
            "source" | "target"
        ];
        const count = Math.floor(Number(turns));
        return {
            type: "turn",
            timing,
            whose,
            ...(whose === "source" ? { sourceId } : {}),
            ...(count > 1 ? { turns: count } : {})
        };
    };
    $: expiry = build(mode, sourceId, stat, saveTiming, dc, turns);
</script>

<div class="initiative-tracker-expiry-editor">
    <select class="dropdown" bind:value={mode} aria-label="Status duration">
        {#each modes as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    </select>
    {#if mode.startsWith("turn:")}
        <div class="expiry-turn">
            <label class="expiry-field">
                <span>Lasts</span>
                <input
                    type="number"
                    min="1"
                    step="1"
                    aria-label="Number of turns"
                    bind:value={turns}
                />
                <span
                    >{Math.floor(Number(turns)) > 1 ? "turns" : "turn"}
                    of the {mode.endsWith(":source") ? "attacker" : "target"}</span
                >
            </label>
            {#if mode.endsWith(":source")}
                <label class="expiry-field">
                    <span>Attacker</span>
                    <select class="dropdown" bind:value={sourceId}>
                        {#each $ordered as creature (creature.id)}
                            <option value={creature.id}
                                >{creature.getName()}</option
                            >
                        {/each}
                    </select>
                </label>
            {/if}
        </div>
    {:else if mode === "save"}
        <div class="expiry-save">
            <select class="dropdown" bind:value={stat} aria-label="Saving throw">
                {#each savingThrows as option (option.id)}
                    <option value={option.id}>{option.abbreviation}</option>
                {/each}
            </select>
            <input
                type="number"
                min="1"
                placeholder="DC"
                aria-label="Save DC"
                bind:value={dc}
            />
            <select
                class="dropdown"
                bind:value={saveTiming}
                aria-label="When to roll"
            >
                <option value="start">at start of turn</option>
                <option value="end">at end of turn</option>
            </select>
        </div>
    {/if}
</div>

<style>
    .initiative-tracker-expiry-editor {
        display: flex;
        flex-flow: column;
        gap: 0.25rem;
        min-width: 0;
    }
    .initiative-tracker-expiry-editor select,
    .initiative-tracker-expiry-editor input {
        font-size: var(--font-ui-smaller);
        min-width: 0;
    }
    .expiry-field {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: var(--font-ui-smaller);
        color: var(--text-muted);
    }
    .expiry-field select {
        flex: 1;
    }
    .expiry-field input {
        width: 3.5rem;
    }
    .expiry-turn {
        display: flex;
        flex-flow: column;
        gap: 0.25rem;
    }
    .expiry-save {
        display: flex;
        flex-flow: row wrap;
        gap: 0.25rem;
    }
    .expiry-save input {
        width: 4rem;
    }
</style>
