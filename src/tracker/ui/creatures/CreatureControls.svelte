<script lang="ts">
    import { ExtraButtonComponent, Menu } from "obsidian";
    import {
        DISABLE,
        ENABLE,
        HIDDEN,
        HP,
        REMOVE,
        TAG
    } from "src/utils";
    import type { Creature } from "src/utils/creature";
    import type TrackerView from "src/tracker/view";
    import { createEventDispatcher, getContext } from "svelte";
    import type InitiativeTracker from "src/main";
    import { tracker } from "src/tracker/stores/tracker";

    const { data } = tracker;
    const dispatch = createEventDispatcher();

    export let creature: Creature;

    const plugin = getContext<InitiativeTracker>("plugin");

    const hamburgerIcon = (node: HTMLElement) => {
        const hamburger = new ExtraButtonComponent(node)
            .setIcon("vertical-three-dots")
            .setTooltip("Actions");
        hamburger.extraSettingsEl.onclick = (evt) => {
            evt.stopPropagation();
            const menu = new Menu();
            menu.addItem((item) => {
                item.setIcon(HP)
                    .setTitle("Set Health/Status")
                    .onClick((e: MouseEvent) => {
                        tracker.updateTarget.set("hp");
                        tracker.setUpdate(creature, e);
                    });
            });
            if (creature.current_ac != creature.ac) {
                menu.addItem((item) => {
                    item.setIcon(HP)
                        .setTitle("Reset AC")
                        .onClick((e: MouseEvent) => {
                            creature.current_ac = creature.ac;
                            tracker.updateAndSave();
                        });
                });
            }
            if (!$data.displayCreatureACInPlayerView) {
                if (!creature.revealAc) {
                    menu.addItem((item) => {
                        item.setIcon("eye")
                            .setTitle("Reveal AC of Creature Type")
                            .onClick(() => {
                                tracker.getOrderedCreatures()
                                    .filter((c) => c.name === creature.name)
                                    .map((c) => {
                                        tracker.updateCreatures({
                                            creature: c,
                                            change: { reveal_ac: true }
                                        });
                                    });
    
                                tracker.updateAndSave();
                            });
                    });
                } else {
                    menu.addItem((item) => {
                        item.setIcon("eye")
                            .setTitle("Hide AC of Creature Type")
                            .onClick(() => {
                                tracker.getOrderedCreatures()
                                    .filter((c) => c.name === creature.name)
                                    .map((c) => {
                                        tracker.updateCreatures({
                                            creature: c,
                                            change: { reveal_ac: false }
                                        });
                                    });
    
                                tracker.updateAndSave();
                            });
                    });
                }
            }
            menu.addItem((item) => {
                item.setIcon("pencil")
                    .setTitle("Edit")
                    .onClick(() => {
                        dispatch("edit", creature);
                    });
            });
            if (creature.hidden) {
                menu.addItem((item) => {
                    item.setIcon("eye")
                        .setTitle("Show")
                        .onClick(() => {
                            tracker.updateCreatures({
                                creature,
                                change: { hidden: false }
                            });
                        });
                });
            } else {
                menu.addItem((item) => {
                    item.setIcon(HIDDEN)
                        .setTitle("Hide")
                        .onClick(() => {
                            tracker.updateCreatures({
                                creature,
                                change: { hidden: true }
                            });
                        });
                });
            }
            if (creature.enabled) {
                menu.addItem((item) => {
                    item.setIcon(DISABLE)
                        .setTitle("Disable")
                        .onClick(() => {
                            tracker.updateCreatures({
                                creature,
                                change: { enabled: false }
                            });
                        });
                });
            } else {
                menu.addItem((item) => {
                    item.setIcon(ENABLE)
                        .setTitle("Enable")
                        .onClick(() => {
                            tracker.updateCreatures({
                                creature,
                                change: { enabled: true }
                            });
                        });
                });
            }
            menu.addItem((item) => {
                item.setIcon(REMOVE)
                    .setTitle("Remove")
                    .onClick(() => {
                        tracker.remove(creature);
                    });
            });
            menu.showAtPosition(evt);
        };
    };
</script>

<div class="controls">
    <div class="add-button icon" use:hamburgerIcon />
</div>

<style>
    .controls {
        display: flex;
        justify-content: flex-end;
    }
    .icon :global(.clickable-icon) {
        margin-right: 0;
    }
</style>
