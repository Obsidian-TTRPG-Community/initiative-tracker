<script lang="ts">
    import {
        ExtraButtonComponent,
        Menu,
        Modal,
        Notice,
        Setting,
        stringifyYaml
    } from "obsidian";

    import Creature from "./Creature.svelte";
    import { Creature as CreatureCreator } from "../../../utils/creature";

    import { encounter } from "../../stores/encounter";
    import { START_ENCOUNTER } from "src/utils";
    import { t } from "src/utils/i18n";
    import { getContext } from "svelte";
    import { tracker } from "src/tracker/stores/tracker";
    import type { CreatureState, SRDMonster } from "src/types/creatures";
    import { writable } from "svelte/store";

    const { players } = encounter;

    const plugin = getContext("plugin");
    let name = writable("Encounter");
    let tempName = writable("");
    let updatingName = writable(false);

    const setName = () => {
        $updatingName = false;
        $name = $tempName.length ? $tempName : $name;
        $tempName = "";
    };
    const cancelName = () => {
        $updatingName = false;
        $tempName = "";
    };

    let rollHP = plugin.data.rollHP;

    $: items = [...$encounter.entries()];

    let startIcon: ExtraButtonComponent;
    const start = (node: HTMLElement) => {
        startIcon = new ExtraButtonComponent(node)
            .setIcon(START_ENCOUNTER)
            .onClick(async () => {
                if (!plugin.view) {
                    await plugin.addTrackerView();
                }

                const view = plugin.view;
                const creatures: CreatureCreator[] = [];
                const transformedCreatures: CreatureState[] = [];
                for (const [srd, count] of items) {
                    const creature = CreatureCreator.from(srd);
                    const amount = Math.max(
                        isNaN(Number(count)) ? 1 : Number(count),
                        1
                    );
                    creatures.push(
                        ...[...Array(amount).keys()].map((v) =>
                            CreatureCreator.new(creature)
                        )
                    );
                }
                for (const creature of [
                    ...$players.map(
                        (p) =>
                            plugin.getPlayerByName(p.name) ??
                            CreatureCreator.from(p)
                    ),
                    ...creatures
                ]) {
                    transformedCreatures.push(creature.toJSON());
                }
                tracker.new(plugin, {
                    creatures: transformedCreatures,
                    name: $name,
                    round: 1,
                    state: false,
                    logFile: null,
                    newLog: true,
                    roll: true,
                    rollHP
                });
                plugin.app.workspace.revealLeaf(view.leaf);
            });
    };

    $: {
        if (startIcon) {
            if (!items.length) {
                startIcon.setDisabled(true);
                startIcon.setTooltip("");
            } else {
                startIcon.setDisabled(false);
                startIcon.setTooltip(t("Start Encounter"));
            }
        }
    }
    const editIcon = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon("pencil");
    };
    let saveButton: ExtraButtonComponent;
    const saveIcon = (node: HTMLElement) => {
        saveButton = new ExtraButtonComponent(node).setIcon("save");
    };
    $: saveButton?.setDisabled($encounter.size == 0);
    const save = () => {
        const modal = new Modal(app);
        modal.titleEl.setText(t("Save Encounter"));
        let encName: string =
            $name != "Encounter"
                ? t($name)
                : `${t("Encounter")} ${Object.keys(plugin.data.encounters).length}`;
        new Setting(modal.contentEl).setName(t("Encounter Name")).addText((t) => {
            t.setPlaceholder(encName).onChange((v) => (encName = v));
        });

        const saveEncounter = () => {
            try {
                const creatures = [
                    ...[...$players].map((p) => CreatureCreator.from(p)),
                    ...[...$encounter.entries()]
                        .map((c) =>
                            [...Array(c[1]).keys()].map(() =>
                                CreatureCreator.from(c[0])
                            )
                        )
                        .flat()
                ];
                plugin.addEncounter(encName, {
                    creatures: [...creatures.map((c) => c.toJSON())],
                    state: false,
                    name: encName,
                    round: 1,
                    roll: true,
                    rollHP: plugin.data.rollHP,
                    logFile: null,
                    timestamp: Date.now()
                });
                plugin.saveSettings();
                new Notice(`${t("Encounter")} "${encName}" ${t("saved.")}`);
                modal.close();
            } catch (e) {
                new Notice(t("There was an issue saving the encounter."));
            }
        };
        new Setting(modal.contentEl).addButton((b) =>
            b.setButtonText(t("Save")).onClick(() => {
                if (encName in plugin.data.encounters) {
                    const confirm = new Modal(app);
                    confirm.titleEl.setText(t("Are you sure?"));
                    confirm.contentEl.createEl("p", {
                        text: t("This will overwrite an existing encounter. Are you sure?")
                    });
                    new Setting(confirm.contentEl)
                        .addButton((b) =>
                            b.setButtonText(t("Overwrite")).onClick(() => {
                                confirm.close();
                                saveEncounter();
                            })
                        )
                        .addExtraButton((b) =>
                            b.setIcon("cross").onClick(() => {
                                confirm.close();
                            })
                        );
                    confirm.open();
                } else {
                    saveEncounter();
                }
            })
        );
        modal.open();
    };

    const cancelIcon = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon("cross-in-box");
    };
    let exportIcon: ExtraButtonComponent;
    const exp = (node: HTMLElement) => {
        exportIcon = new ExtraButtonComponent(node).setIcon("copy");
    };
    $: {
        if (exportIcon) {
            if (!items.length) {
                exportIcon.setDisabled(true);
                exportIcon.setTooltip("");
            } else {
                exportIcon.setDisabled(false);
                exportIcon.setTooltip(t("Copy Encounter Block"));
            }
        }
    }

    let loadButton: ExtraButtonComponent;
    const loadIcon = (node: HTMLElement) => {
        loadButton = new ExtraButtonComponent(node)
            .setIcon("upload")
            .setTooltip(t("Load Encounter"));
    };
    $: loadButton?.setDisabled(Object.keys(plugin.data.encounters).length == 0);
    const load = (evt: MouseEvent) => {
        const menu = new Menu();
        for (const enc of Object.values(plugin.data.encounters)) {
            menu.addItem((item) => {
                item.setTitle(enc.name).onClick(() => {
                    $name = enc.name;
                    encounter.empty();
                    players.empty();
                    for (const creature of enc.creatures) {
                        if (creature.player) {
                            players.addFromState(creature);
                        } else {
                            encounter.add(
                                CreatureCreator.fromJSON(
                                    creature,
                                    plugin
                                ) as any as SRDMonster
                            );
                        }
                    }
                });
            });
        }
        menu.showAtMouseEvent(evt);
    };
    const clear = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setIcon("eraser")
            .setTooltip(t("Clear Encounter"));
    };
    const copy = async () => {
        const enc: {
            name?: string;
            players?: string[];
            creatures?: { [key: number]: string }[];
        } = {};
        if ($name?.length) {
            enc.name = $name;
        }
        if ($players?.length) {
            enc.players = $players.filter((p) => p.enabled).map((p) => p.name);
        }
        if ($encounter?.size) {
            enc.creatures = [...$encounter.entries()].map(([c, v]) => {
                return {
                    [Number(v)]: `${c.name}${c.friendly ? ", friendly" : ""}${
                        c.hidden ? ", hidden" : ""
                    }`
                };
            });
        }
        try {
            await navigator.clipboard.writeText(
                `\`\`\`encounter\n${stringifyYaml(enc)}\`\`\``
            );
            new Notice(t("Encounter saved to clipboard"));
        } catch (e) {
            console.error(e);
            new Notice(
                t("Could not save encounter, please check console for errors")
            );
        }
    };
</script>

<div class="encounter-header">
    <div class="encounter-name">
        {#if $updatingName}
            <input type="text" bind:value={$tempName} placeholder={t($name)} />
            <div use:saveIcon on:click={setName} />
            <div use:cancelIcon on:click={cancelName} />
        {:else}
            <h5 class="built-encounter">{t($name)}</h5>
            <div use:editIcon on:click={() => ($updatingName = true)} />
        {/if}
    </div>
    <div class="encounter-controls">
        <div use:start />
        <div use:saveIcon on:click={save} />
        <div use:loadIcon on:click={load} />
        <div use:exp on:click={copy} />
        <!-- <div use:load /> -->

        <div
            use:clear
            on:click={() => {
                encounter.empty();
                $name = t("Encounter");
            }}
        />
    </div>
</div>
{#if !items.length}
    <span>{t("Add some creatures to get started!")}</span>
{:else}
    <div class="encounter-creatures">
        {#each items as [creature, count]}
            <Creature {creature} {count} />
        {/each}
    </div>
{/if}

<style scoped>
    .encounter-name {
        display: flex;
        align-items: center;
    }
    .encounter-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .encounter-creatures {
        display: flex;
        gap: 0.5rem;
        flex-flow: column nowrap;
    }
    .encounter-header :global(.is-disabled) {
        cursor: not-allowed;
    }
    .encounter-controls {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }
</style>
