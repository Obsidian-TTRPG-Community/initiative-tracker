<script lang="ts">
    import { ExtraButtonComponent } from "obsidian";
    import { SAVE } from "src/utils";
    import { t } from "src/utils/i18n";

    import { getContext } from "svelte";
    import { createEventDispatcher } from "svelte";
    import type InitiativeTracker from "src/main";
    import { tracker } from "../stores/tracker";

    const { name } = tracker;
    let encounterName = $name;
    const plugin = getContext<InitiativeTracker>("plugin");

    let saveButton: ExtraButtonComponent;
    const checkSave = () => {
        if (encounterName?.length && saveButton.disabled) {
            saveButton.setDisabled(false);
        } else if (!encounterName?.length && !saveButton.disabled) {
            saveButton.setDisabled(true);
        }
    };
    let checking = false;
    const save = (node: HTMLElement) => {
        saveButton = new ExtraButtonComponent(node)
            .setIcon(SAVE)
            .setDisabled(
                !(encounterName != undefined && encounterName?.length > 0)
            )
            .onClick(async () => {
                if (
                    encounterName &&
                    encounterName in plugin.data.encounters &&
                    !checking
                ) {
                    checking = true;
                } else {
                    plugin.addEncounter(encounterName, {
                        ...tracker.getEncounterState(),
                        name: encounterName,
                        rollHP: plugin.data.rollHP,
                        timestamp: Date.now()
                    });
                    await plugin.saveSettings();
                    dispatch("cancel");
                }
            });
    };
    const dispatch = createEventDispatcher();
    const cancel = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon("cross").onClick(() => {
            dispatch("cancel");
        });
    };
</script>

<div class="saving-container">
    <div class="saving-encounter">
        <span>{t("Save encounter as:")}</span>
        <!-- svelte-ignore a11y-autofocus -->
        <input type="text" bind:value={encounterName} on:input={checkSave} />
    </div>

    <div class="save-buttons">
        {#if checking}
            <span class="checking">
                <small>
                    {t("An encounter by that name already exists. Are you sure?")}
                </small>
            </span>
        {/if}
        <div class="save" use:save />
        <div class="cancel" use:cancel />
    </div>
</div>

<style>
    .saving-container {
        padding: 0.5rem;
    }
    .saving-encounter {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .save-buttons {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }
    .save-buttons > div {
        display: flex;
        align-items: center;
    }
    .save-buttons :global(.clickable-icon) {
        margin: 0;
    }
    .save-buttons > .save :global(.clickable-icon.is-disabled) {
        cursor: not-allowed;
        color: var(--text-faint);
    }
</style>
