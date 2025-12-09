<script lang="ts">
    import { ButtonComponent, Platform, TFile } from "obsidian";
    import type InitiativeTracker from "src/main";
    import { tracker } from "src/tracker/stores/tracker";
    import { Creature } from "src/utils/creature";
    import { t } from "src/utils/i18n";
    import { createEventDispatcher } from "svelte";
    import { writable } from "svelte/store";
    import Create from "./Create.svelte";
    import List from "./List.svelte";

    const dispatch = createEventDispatcher();

    export let plugin: InitiativeTracker;
    export let isEditing = false;
    export let creature: Creature = null;

    let rollHP = plugin.data.rollHP;

    const adding = writable<Array<[Creature, number]>>([]);
    const editing = writable<Creature>(creature);

    const cancel = (node: HTMLElement) => {
        new ButtonComponent(node)
            .setCta()
            .setButtonText(t("Cancel"))
            .onClick(() => {
                dispatch("close");
            });
    };

    const add = (node: HTMLElement) => {
        new ButtonComponent(node)
            .setButtonText(isEditing ? t("Save") : t("Add to Encounter"))
            .onClick(async () => {
                if (!$adding.length && !isEditing && !Platform.isMobile) return;
                if (isEditing) {
                    if ($editing.hp != creature.max) {
                        creature.max = creature.current_max = $editing.hp;
                    }
                    if (creature.dirty_ac) {
                        creature.current_ac = $editing.ac;
                        creature.dirty_ac = false;
                    }

                    tracker.replace(creature, $editing);
                } else {
                    const creatures = $adding.flatMap(([creature, amount]) => {
                        return [...Array(amount).keys()].map((k) =>
                            Creature.new(creature)
                        );
                    });

                    tracker.add(plugin, rollHP, ...creatures);
                }
                if (creature?.player && creature?.path) {
                    const file = await plugin.app.vault.getAbstractFileByPath(
                        creature.path
                    );
                    if (file && file instanceof TFile)
                        plugin.app.fileManager.processFrontMatter(file, (f) => {
                            f.ac = creature.ac;
                            f.hp = creature.max;
                            f.level = creature.level;
                            f.modifier = creature.modifier;
                        });
                }
                dispatch("close");
            });
    };
</script>

<div
    class="initiative-tracker-creator-container"
    class:mobile={Platform.isMobileApp}
>
    <div
        class="initiative-tracker-creator"
        class:editing={isEditing || Platform.isMobile}
    >
        <Create {plugin} {editing} {adding} {isEditing} />
        {#if !isEditing && !Platform.isMobile}
            <div class="creator-list">
                <List {adding} {editing} {rollHP} />
                <div>
                    <input
                        type="checkbox"
                        name="roll-hp"
                        id="roll-hp"
                        bind:checked={rollHP}
                    />
                    <label for="roll-hp">{t("Roll for HP")}</label>
                </div>
            </div>
        {/if}
    </div>
    <div class="buttons">
        <div use:cancel />
        <div
            use:add
            class:disabled={!$adding.length && !isEditing && !Platform.isMobile}
        />
    </div>
</div>

<style scoped>
    .initiative-tracker-creator {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
    }
    .initiative-tracker-creator.editing {
        grid-template-columns: 1fr;
    }
    .buttons {
        display: flex;
        margin-left: auto;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    div.disabled > :global(button) {
        cursor: not-allowed;
    }
    .creator-list {
        display: flex;
        justify-content: space-between;
        flex-flow: column nowrap;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
</style>
