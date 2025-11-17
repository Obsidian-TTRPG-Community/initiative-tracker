<script lang="ts">
    import {
        ExtraButtonComponent,
        ButtonComponent,
        Notice,
        ToggleComponent
    } from "obsidian";

    import { createEventDispatcher, onDestroy, onMount } from "svelte";

    import { DICE } from "src/utils";
    import { SRDMonsterSuggestionModal } from "src/utils/suggester";
    import { Creature } from "src/utils/creature";
    import { t } from "src/utils/i18n";
    import type InitiativeTracker from "src/main";

    import { tracker } from "src/tracker/stores/tracker";

    const dispatch = createEventDispatcher();

    export let creature: Creature = new Creature({});
    export let amount = 1;
    export let plugin: InitiativeTracker;

    const add = async (close = true) => {
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
        tracker.add(
            plugin,
            plugin.data.rollHP,
            ...[...Array(amount).keys()].map((k) => Creature.new(creature))
        );
        creature = new Creature({});
        if (close) dispatch("close");
    };

    const addButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setTooltip(t("Add Creature"))
            .setIcon("check");
    };
    const editButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setTooltip(t("Add and Close"))
            .setIcon("check-circle");
    };
    const cancelButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setTooltip("Cancel").setIcon("cross");
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
    let nameInput: HTMLInputElement;
    let modal: SRDMonsterSuggestionModal;
    onMount(() => {
        modal = new SRDMonsterSuggestionModal(plugin, nameInput);
        modal.onClose = async () => {
            if (modal.creature) {
                creature = Creature.from(modal.creature);

                creature.initiative = await plugin.getInitiativeValue(
                    creature.modifier
                );
            }
        };
    });
    const hideToggle = (div: HTMLDivElement) => {
        new ToggleComponent(div)
            .setValue(creature.hidden)
            .onChange((v) => (creature.hidden = v));
    };
    onDestroy(() => modal.close());
</script>

<div class="initiative-tracker-editor">
    <div class="create-new">
        <div>
            <label for="add-name">{t("Creature")}</label>
            <input
                bind:this={nameInput}
                bind:value={creature.name}
                on:focus={function () {
                    modal.open();
                }}
                id="add-name"
                type="text"
                name="name"
                tabindex="0"
            />
        </div>
        <div>
            <label for="add-display">{t("Display Name")}</label>
            <input
                bind:value={creature.display}
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
            <label for="add-ac">{t("AC")}</label>
            <input
                bind:value={creature.ac}
                id="add-ac"
                name="ac"
                tabindex="0"
            />
        </div>
        <div>
            <label for="add-mod">{t("Modifier")}</label>
            <input
                bind:value={creature.modifier}
                id="add-mod"
                type="number"
                name="ac"
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

        <div>
            <label for="add-mod">{t("Hidden")}</label>
            <div use:hideToggle />
        </div>

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
    <div class="context-buttons">
        <div
            use:cancelButton
            class="add-button cancel-button"
            on:click={() => dispatch("close")}
        />
        <div class="add-button" use:editButton on:click={() => add()} />
        <div class="add-button" use:addButton on:click={() => add(false)} />
    </div>
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
