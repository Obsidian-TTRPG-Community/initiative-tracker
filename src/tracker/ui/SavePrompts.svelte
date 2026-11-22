<script lang="ts">
    import { getContext } from "svelte";
    import type InitiativeTracker from "src/main";
    import { tracker } from "../stores/tracker";
    import { saveLabel, type PendingSave } from "src/utils/status-expiry";
    import { getRpgSystem } from "src/utils";

    const plugin = getContext<InitiativeTracker>("plugin");
    const { pendingSaves, data } = tracker;
    $: system = getRpgSystem(plugin, $data?.rpgSystem);

    // Hide prompts whose creature or status has since been removed.
    $: visible = $pendingSaves.filter(
        (p) => $tracker.includes(p.creature) && p.creature.status.has(p.status)
    );

    $: details = (prompt: PendingSave) => {
        const expiry = prompt.status.expiry;
        if (expiry?.type !== "save") return null;
        return {
            stat: saveLabel(expiry.stat, system),
            dc: expiry.dc,
            modifier: system.getSaveModifier(prompt.creature, expiry.stat)
        };
    };
    const formatModifier = (mod: number) => (mod >= 0 ? `+${mod}` : `${mod}`);

    const canRoll = plugin.canUseDiceRoller;
    let rolls = new Map<PendingSave, number>();
    const roll = async (prompt: PendingSave, modifier: number | null) => {
        const formula = modifier ? `1d20${formatModifier(modifier)}` : "1d20";
        const roller = plugin.getRoller(formula);
        if (!roller) return;
        await roller.roll();
        rolls.set(prompt, roller.result);
        rolls = rolls;
    };
    const resolve = (prompt: PendingSave, saved: boolean) => {
        rolls.delete(prompt);
        rolls = rolls;
        tracker.resolveSave(prompt, saved, details(prompt)?.stat);
    };
</script>

{#if visible.length}
    <div class="initiative-tracker-save-prompts">
        {#each visible as prompt (prompt)}
            {@const info = details(prompt)}
            {@const result = rolls.get(prompt)}
            {@const passes =
                result != null && info?.dc ? result >= info.dc : null}
            <div class="save-prompt">
                <div class="save-prompt-text">
                    <strong>{prompt.creature.getName()}</strong>
                    <span>
                        {info?.stat} save vs {prompt.status.name}{#if info?.dc}
                            &nbsp;(DC {info.dc}){/if}
                    </span>
                    {#if info?.modifier != null}
                        <span class="save-modifier"
                            >{formatModifier(info.modifier)}</span
                        >
                    {/if}
                </div>
                <div class="save-prompt-actions">
                    {#if canRoll}
                        <button on:click={() => roll(prompt, info?.modifier)}>
                            Roll
                        </button>
                    {/if}
                    {#if result != null}
                        <span
                            class="save-result"
                            class:passes={passes === true}
                            class:fails={passes === false}>{result}</span
                        >
                    {/if}
                    <div class="spacer" />
                    <button
                        class:mod-cta={passes === true}
                        on:click={() => resolve(prompt, true)}
                        aria-label="Saved: remove {prompt.status.name}"
                    >
                        Saved
                    </button>
                    <button
                        class:mod-warning={passes === false}
                        on:click={() => resolve(prompt, false)}
                        aria-label="Failed: keep {prompt.status.name}"
                    >
                        Failed
                    </button>
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .initiative-tracker-save-prompts {
        display: flex;
        flex-flow: column;
        gap: 0.5rem;
        margin: 0.5rem 0;
    }
    .save-prompt {
        display: flex;
        flex-flow: column;
        gap: 0.375rem;
        padding: 0.5rem;
        border: 1px solid var(--background-modifier-border);
        border-left: 3px solid var(--interactive-accent);
        border-radius: var(--radius-s);
        background-color: var(--background-secondary);
        font-size: var(--font-ui-small);
    }
    .save-prompt-text {
        display: flex;
        flex-flow: row wrap;
        align-items: baseline;
        gap: 0.375rem;
    }
    .save-modifier {
        color: var(--text-muted);
        font-family: var(--font-monospace);
    }
    .save-prompt-actions {
        display: flex;
        align-items: center;
        gap: 0.375rem;
    }
    .save-prompt-actions button {
        font-size: var(--font-ui-smaller);
        padding: 0.125rem 0.625rem;
        height: auto;
    }
    .spacer {
        flex: 1;
    }
    .save-result {
        font-family: var(--font-monospace);
        font-weight: var(--font-semibold);
    }
    .save-result.passes {
        color: var(--color-green);
    }
    .save-result.fails {
        color: var(--color-red);
    }
</style>
