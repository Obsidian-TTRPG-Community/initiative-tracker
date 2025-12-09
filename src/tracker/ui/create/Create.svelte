<script lang="ts">
    import {
        ExtraButtonComponent,
        Notice,
        ToggleComponent,
        TextComponent,
        Platform
    } from "obsidian";

    import { onMount } from "svelte";

    import { DICE } from "src/utils";
    import { SRDMonsterSuggestionModal } from "src/utils/suggester";
    import { Creature } from "src/utils/creature";
    import { t } from "src/utils/i18n";
    import type InitiativeTracker from "src/main";
    import type { Writable } from "svelte/store";
    import { equivalent } from "src/encounter";
    import { confirmWithModal } from "./modal";

    let creature: Creature = new Creature({});
    export let amount = 1;
    export let plugin: InitiativeTracker;
    export let adding: Writable<Array<[Creature, number]>>;
    export let editing: Writable<Creature>;
    export let isEditing: boolean;

    editing.subscribe((c) => {
        if (!c) return;
        creature = c;
    });

    $: {
        if (Platform.isMobile) {
            $adding.splice(0, 1, [creature, amount]);
        }
    }

    let modifier = JSON.stringify(creature.modifier ?? 0);
    const prior = modifier;
    const saveButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setTooltip(t("Add Creature"))
            .setIcon("plus")
            .onClick(async () => {
                if (!creature || !creature.name || !creature.name?.length) {
                    new Notice(t("Enter a name!"));
                    return;
                }
                try {
                    creature.modifier = JSON.parse(`${modifier}`);
                } catch (e) {
                    console.warn(
                        t("Initiative Tracker: Non-parseable modifier provided to creature.")
                    );
                    creature.modifier = JSON.parse(prior);
                }
                if (!creature.modifier) {
                    creature.modifier = JSON.parse(prior);
                }
                if (
                    (Array.isArray(creature.modifier) &&
                        !creature.modifier.every((m) => !isNaN(Number(m)))) ||
                    isNaN(Number(creature.modifier))
                ) {
                    console.warn(
                        t("Initiative Tracker: Non-numeric modifier provided to creature.")
                    );
                    creature.modifier = 0;
                }
                if (
                    creature.initiative <= 0 ||
                    creature.initiative == null ||
                    isNaN(creature.initiative)
                ) {
                    creature.initiative = await plugin.getInitiativeValue(
                        creature.modifier
                    );
                }

                let existing = $adding.findIndex(([k]) =>
                    equivalent(k, creature)
                );
                if (existing > -1) {
                    $adding[existing][1] += amount;
                } else {
                    $adding.push([creature, amount]);
                }
                $adding = $adding;
                $editing = null;
                creature = new Creature({});
            });
    };
    const editButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setTooltip(t("Add Creature"))
            .setIcon("save")
            .onClick(async () => {
                if (!creature || !creature.name || !creature.name?.length) {
                    new Notice(t("Enter a name!"));
                    return;
                }
                if (!creature.modifier) {
                    creature.modifier = 0;
                }
                if (
                    creature.initiative <= 0 ||
                    creature.initiative == null ||
                    isNaN(creature.initiative)
                ) {
                    creature.initiative = await plugin.getInitiativeValue(
                        creature.modifier
                    );
                }
                let existing = $adding.findIndex(
                    ([k]) => k != creature && equivalent(k, creature)
                );
                if (
                    existing > -1 &&
                    (await confirmWithModal(
                        app,
                        `${t("This will merge")} ${creature.name} ${t("with")} ${$adding[existing][0].name}.`
                    ))
                ) {
                    const index = $adding.findIndex(([k]) => k == creature);
                    $adding[existing][1] += $adding[index][1];
                    $adding.splice(index, 1);
                }
                $adding = $adding;
                $editing = null;
                creature = new Creature({});
            });
    };
    const cancelButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setTooltip(t("Cancel"))
            .setIcon("reset")
            .onClick(() => {
                creature = new Creature({});
            });
    };
    const diceButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setIcon(DICE)
            .setTooltip(t("Roll Initiative"))
            .onClick(async () => {
                creature.initiative = await plugin.getInitiativeValue(
                    creature.modifier
                );
            });
    };
    let nameInput: TextComponent, displayNameInput: HTMLInputElement;
    const name = (node: HTMLElement) => {
        nameInput = new TextComponent(node)
            .setValue(creature.name)
            .onChange((v) => (creature.name = v));
    };
    let modal: SRDMonsterSuggestionModal;
    const createModal = () => {
        modal = new SRDMonsterSuggestionModal(
            plugin.app,
            nameInput,
            plugin.bestiary
        );
        modal.onSelect(async (selected) => {
            if (selected.item) {
                creature = Creature.from(selected.item);

                creature.initiative = await plugin.getInitiativeValue(
                    creature.modifier
                );
                nameInput.setValue(creature.name);
            }
            modal.close();
        });
    };

    onMount(() => {
        if (isEditing) {
            setImmediate(() => {
                displayNameInput.focus();
                createModal();
            });
        } else {
            createModal();
        }
    });
    const hideToggle = (div: HTMLDivElement) => {
        new ToggleComponent(div)
            .setValue(creature.hidden)
            .onChange((v) => (creature.hidden = v));
    };
    const staticToggle = (div: HTMLDivElement) => {
        new ToggleComponent(div)
            .setValue(creature.static)
            .onChange((v) => (creature.static = v));
    };
    const friendToggle = (div: HTMLDivElement) => {
        new ToggleComponent(div)
            .setValue(creature.friendly)
            .onChange((v) => (creature.friendly = v));
    };
</script>

<div class="initiative-tracker-editor">
    <div class="create-new">
        <div>
            <label for="add-name">{t("Creature")}</label>
            <div use:name id="add-name" />
        </div>
        <div>
            <label for="add-display">{t("Display Name")}</label>
            <input
                bind:value={creature.display}
                bind:this={displayNameInput}
                id="add-display"
                type="text"
                name="display"
                tabindex="0"
            />
        </div>
        <div>
            <label for="add-hp">{t("HP")}</label>
            <input
                bind:value={creature.hp}
                id="add-hp"
                type="number"
                name="hp"
                tabindex="0"
            />
        </div>
        <div>
            <label for="hit-dice">{t("Hit Dice")}</label>
            <input
                bind:value={creature.hit_dice}
                id="hit-dice"
                type="text"
                name="hitdice"
                tabindex="0"
            />
        </div>
        <div>
            <label for="add-ac">{t("AC")}</label>
            <input
                bind:value={creature.ac}
                on:change={() => (creature.dirty_ac = true)}
                id="add-ac"
                name="ac"
                type="text"
                tabindex="0"
            />
        </div>
        <div>
            <label for="add-mod">{t("Modifier")}</label>
            <input
                bind:value={modifier}
                id="add-mod"
                type="text"
                name="add-mod"
                tabindex="0"
            />
        </div>

        <div class="initiative">
            <label for="add-init">{t("Initiative")}</label>
            <input
                bind:value={creature.initiative}
                id="add-init"
                type="number"
                name="initiative"
                tabindex="0"
            />
            <div class="dice" use:diceButton />
        </div>

        {#key creature}
            <div>
                <label for="add-mod">{t("Static Initiative")}</label>
                <div use:staticToggle />
            </div>
            <div>
                <label for="add-mod">{t("Hidden")}</label>
                <div use:hideToggle />
            </div>
            <div>
                <label for="add-mod">{t("Friendly")}</label>
                <div use:friendToggle />
            </div>
        {/key}

        <div class="amount">
            <label for="add-init">{t("Amount")}</label>
            <input
                bind:value={amount}
                id="add-init"
                type="number"
                name="initiative"
                tabindex="0"
            />
        </div>
    </div>
    {#if !isEditing && !Platform.isMobile}
        <div class="context-buttons">
            <div use:cancelButton class="add-button cancel-button" />
            {#if $editing}
                <div class="add-button" use:editButton />
            {:else}
                <div class="add-button" use:saveButton />
            {/if}
        </div>
    {/if}
</div>

<style>
    .create-new > * {
        display: grid;
        grid-template-columns: 33% 66%;
        margin-bottom: 0.5rem;
    }
    .context-buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        grid-gap: 0.125rem;
    }
    .cancel-button {
        color: var(--text-faint);
    }

    .initiative {
        position: relative;
    }
    .initiative > .dice {
        position: absolute;
        right: 0.25rem;
        top: 50%;
        transform: translateY(-50%);
    }
</style>
