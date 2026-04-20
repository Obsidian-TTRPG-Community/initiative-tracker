<script lang="ts">
    import {
        ExtraButtonComponent,
        type MenuItem,
        Platform,
        Menu
    } from "obsidian";
    import {
        BACKWARD,
        DICE,
        EXPAND,
        FORWARD,
        GROUP,
        NEW,
        PLAY,
        REDO,
        RollPlayerInitiativeBehavior,
        SAVE,
        STOP
    } from "src/utils";
    import { createEventDispatcher, getContext } from "svelte";
    import type InitiativeTracker from "src/main";
    import { tracker } from "../stores/tracker";

    const { state, data, logFile, sort, party } = tracker;

    const desktop = Platform.isDesktop;

    const playButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setIcon(PLAY)
            .setTooltip("Play")
            .onClick(() => tracker.setState(true));
    };
    const stopButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setIcon(STOP)
            .setTooltip("Stop")
            .onClick(() => tracker.setState(false));
    };
    const nextButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setIcon(FORWARD)
            .setTooltip("Next")
            .onClick(() => tracker.goToNext());
    };
    const prevButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node)
            .setIcon(BACKWARD)
            .setTooltip("Previous")
            .onClick(() => tracker.goToPrevious());
    };

    const plugin = getContext<InitiativeTracker>("plugin");

    const dispatch = createEventDispatcher();

    const open = (evt: MouseEvent) => {
        const menu = new Menu();
        menu.addItem((item) => {
            item.setIcon(NEW)
                .setTitle("New Encounter")
                .onClick(() => tracker.new(plugin));
        });
        menu.addItem((item) => {
            item.setIcon(NEW)
                .setTitle("Add Creatures")
                .onClick(() => dispatch("add-creatures"));
        });
        
        const resetItem = menu.addItem((item) => {
            item.setIcon(REDO).setTitle("Reset HP / Status");
            
            const resetMenu = item.setSubmenu();
            
            resetMenu.addItem((item) => {
                item.setIcon("fold-vertical")
                    .setTitle("Reset HP to current max")
                    .onClick(() => tracker.reset(true, false, false, true))
            });
            
            resetMenu.addItem((item) => {
                item.setIcon("fold-vertical")
                    .setTitle("Reset HP to current max and clear statuses")
                    .onClick(() => tracker.reset(true, false, true, true))
            });
            
            resetMenu.addItem((item) => {
                item.setIcon("tent")
                    .setTitle("Reset max HP and clear statuses")
                    .onClick(() => tracker.reset())
            });
            
            resetMenu.addItem((item) => {
                item.setIcon("undo")
                    .setTitle("Clear statuses")
                    .onClick(() => tracker.reset(false, false, true, true))
            });
        });
        
        menu.addItem((item) => {
            item.setIcon(DICE)
                .setTitle("Re-roll Initiatives")
                .onClick(() => tracker.roll(plugin));
        });
        menu.addItem((item) => {
            item.setIcon(GROUP)
                .setTitle(
                    plugin.data.condense
                        ? "Expand Creatures"
                        : "Group Creatures"
                )
                .onClick(async () => {
                    plugin.data.condense = !plugin.data.condense;
                    await plugin.saveSettings();
                    item.setIcon(plugin.data.condense ? EXPAND : GROUP);
                    item.setTitle(
                        plugin.data.condense
                            ? "Expand Creatures"
                            : "Group Creatures"
                    );
                });
        });
        menu.addItem((item) => {
            item.setTitle($sort ? "Sort Ascending" : "Sort Descending").onClick(
                async () => {
                    plugin.data.descending = !plugin.data.descending;
                    await plugin.saveSettings();
                    item.setTitle(
                        plugin.data.descending
                            ? "Sort Ascending"
                            : "Sort Descending"
                    );
                }
            );
        });
        menu.addSeparator();

        if ($data.parties && $data.parties.length) {
            if (Platform.isMobile) {
                menu.addItem((item) => {
                    /* const partyMenu =  */ item.setIcon("switch")
                        .setTitle("Switch Party")
                        .setIsLabel(true);
                });
                menu.addItem((item) => {
                    item.setTitle("None")
                        .onClick(() => {
                            tracker.setParty("", plugin);
                        })
                        .setChecked(!$party || $party == "");
                });
                for (const p of $data.parties) {
                    menu.addItem((item) => {
                        item.setTitle(p.name)
                            .onClick(() => {
                                tracker.setParty(p.name, plugin);
                            })
                            .setChecked($party == p.name);
                    });
                }
            } else {
                menu.addItem((item) => {
                    const partyMenu = item
                        .setIcon("switch")
                        .setTitle("Switch Party")
                        .setSubmenu();
                    partyMenu.addItem((item) => {
                        item.setTitle("None")
                            .onClick(() => {
                                tracker.setParty("", plugin);
                            })
                            .setChecked(!$party || $party == "");
                    });
                    for (const p of $data.parties) {
                        partyMenu.addItem((item) => {
                            item.setTitle(p.name)
                                .onClick(() => {
                                    tracker.setParty(p.name, plugin);
                                })
                                .setChecked($party == p.name);
                        });
                    }
                });
            }
        }
        if (Platform.isMobile) {
            menu.addItem((item) => {
                item.setIcon("dice")
                    .setTitle("Party Rolling Behavior")
                    .setIsLabel(true);
            });
            menu.addItem((item) => {
                item.setTitle("Always Roll")
                    .onClick(async () => {
                        plugin.data.rollPlayerInitiatives =
                            RollPlayerInitiativeBehavior.Always;
                        await plugin.saveSettings();
                    })
                    .setChecked(
                        plugin.data.rollPlayerInitiatives ==
                            RollPlayerInitiativeBehavior.Always
                    );
            });
            menu.addItem((item) => {
                item.setTitle("Never Roll")
                    .onClick(async () => {
                        plugin.data.rollPlayerInitiatives =
                            RollPlayerInitiativeBehavior.Never;
                        await plugin.saveSettings();
                    })
                    .setChecked(
                        plugin.data.rollPlayerInitiatives ==
                            RollPlayerInitiativeBehavior.Never
                    );
            });
            menu.addItem((item) => {
                item.setTitle("Set to Zero")
                    .onClick(async () => {
                        plugin.data.rollPlayerInitiatives =
                            RollPlayerInitiativeBehavior.SetToZero;
                        await plugin.saveSettings();
                    })
                    .setChecked(
                        plugin.data.rollPlayerInitiatives ==
                            RollPlayerInitiativeBehavior.SetToZero
                    );
            });
        } else {
            menu.addItem((item) => {
                const partyMenu = item
                    .setIcon("dice")
                    .setTitle("Party Rolling Behavior")
                    .setSubmenu();

                partyMenu.addItem((item) => {
                    item.setTitle("Always Roll")
                        .onClick(async () => {
                            plugin.data.rollPlayerInitiatives =
                                RollPlayerInitiativeBehavior.Always;
                            await plugin.saveSettings();
                        })
                        .setChecked(
                            plugin.data.rollPlayerInitiatives ==
                                RollPlayerInitiativeBehavior.Always
                        );
                });
                partyMenu.addItem((item) => {
                    item.setTitle("Never Roll")
                        .onClick(async () => {
                            plugin.data.rollPlayerInitiatives =
                                RollPlayerInitiativeBehavior.Never;
                            await plugin.saveSettings();
                        })
                        .setChecked(
                            plugin.data.rollPlayerInitiatives ==
                                RollPlayerInitiativeBehavior.Never
                        );
                });
                partyMenu.addItem((item) => {
                    item.setTitle("Set to Zero")
                        .onClick(async () => {
                            plugin.data.rollPlayerInitiatives =
                                RollPlayerInitiativeBehavior.SetToZero;
                            await plugin.saveSettings();
                        })
                        .setChecked(
                            plugin.data.rollPlayerInitiatives ==
                                RollPlayerInitiativeBehavior.SetToZero
                        );
                });
            });
        }

        menu.addSeparator();
        if (!Platform.isMobile) {
            menu.addItem((item) => {
                const load = item
                    .setIcon("open-elsewhere-glyph")
                    .setTitle("Load Encounter")
                    .setDisabled(
                        Object.keys(plugin.data.encounters).length == 0
                    )
                    .setSubmenu()
                    .setNoIcon();

                for (const encounter of Object.keys(plugin.data.encounters)) {
                    load.addItem((item) => {
                        item.setTitle(encounter).onClick(() => {
                            tracker.new(
                                plugin,
                                plugin.data.encounters[encounter]
                            );
                        });
                    });
                }
            });
        } else {
            menu.addItem((item) => {
                item.setIcon("open-elsewhere-glyph")
                    .setTitle("Load Encounter")
                    .setIsLabel(true);
            });
            for (const encounter of Object.keys(plugin.data.encounters)) {
                menu.addItem((item) => {
                    item.setTitle(encounter).onClick(() => {
                        tracker.new(plugin, plugin.data.encounters[encounter]);
                    });
                });
            }
        }
        menu.addItem((item) => {
            item.setIcon(SAVE)
                .setTitle("Save Encounter")
                .onClick(() => {
                    dispatch("save");
                });
        });

        menu.showAtMouseEvent(evt);
    };

    const menuIcon = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon("vertical-three-dots");
    };
    const playerView = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon("view");
    };
    const logFileButton = (node: HTMLElement) => {
        new ExtraButtonComponent(node).setIcon("file-signature");
    };
    const openLogFile = async () => {
        if ($logFile) {
            const leaf = plugin.app.workspace.getLeaf();
            leaf.openFile($logFile);
        }
    };
</script>

<div class="buttons">
    <div class="state">
        {#if $state}
            <div use:stopButton />
            <div use:prevButton />
            <div use:nextButton />
        {:else}
            <div use:playButton />
        {/if}
    </div>
    <div class="clean">
        {#if $logFile}
            <div
                use:logFileButton
                aria-label="Open Log File"
                on:click={openLogFile}
            />
        {/if}
        {#if desktop}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                use:playerView
                aria-label="Open Player View"
                on:click={(evt) => dispatch("player-view")}
            />
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div use:menuIcon on:click={(evt) => open(evt)} />
    </div>
</div>

<style>
    .buttons {
        display: flex;
        justify-content: space-between;
        padding: 0 0 0.5rem 0;
    }
    .state {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .clean {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .state > *:not(:last-child),
    .clean > *:not(:last-child) {
        margin-right: 0.25rem;
    }
</style>
