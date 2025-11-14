<script lang="ts">
    import { setIcon, Setting } from "obsidian";

    import { getContext } from "svelte";
    import { DISABLE, ENABLE } from "src/utils";
    import { t } from "src/utils/i18n";

    import { players } from "../../stores/players";
    import Experience from "./Experience.svelte";
    import Collapsible from "./Collapsible.svelte";

    const { party, generics } = players;

    const plugin = getContext("plugin");
    
    const open = plugin.data.builder.showParty;

    const defaultParty = plugin.data.defaultParty;
    const parties = plugin.data.parties;

    plugin.getPlayersForParty(defaultParty).forEach((p) => {
        players.add({
            level: p.level,
            name: p.name,
            ...p.creature,
            isPlayer: true,
            enabled: true,
            count: 1
        });
    });

    const partyDropdown = (node: HTMLElement) => {
        new Setting(node).setName(t("Select a party")).addDropdown((dropdown) => {
            dropdown
                .addOption("none", t("None"))
                .addOptions(
                    Object.fromEntries(parties.map((p) => [p.name, p.name]))
                )
                .onChange((name) => {
                    players.switchParty(
                        plugin.getPlayersForParty(name).map((p) => {
                            return {
                                level: p.level,
                                name: p.name,
                                ...p.creature,
                                isPlayer: true,
                                enabled: true,
                                count: 1
                            };
                        })
                    );
                });
            if (defaultParty) {
                dropdown.setValue(defaultParty);
            }
        });
    };

    const enable = (node: HTMLElement) => {
        setIcon(node, ENABLE);
    };
    const disable = (node: HTMLElement) => {
        setIcon(node, DISABLE);
    };

    const addIcon = (node: HTMLElement) => {
        setIcon(node, "plus-with-circle");
    };
    const add = () => {
        players.add({
            isPlayer: false,
            level: 1,
            count: 1,
            enabled: true
        });
    };

    const crossIcon = (node: HTMLElement) => {
        setIcon(node, "x");
    };

    const removeIcon = (node: HTMLElement) => {
        setIcon(node, "x-square");
    };
</script>

<div class="players-container">
    <Collapsible
        {open}
        on:toggle={() =>
            (plugin.data.builder.showParty = !plugin.data.builder.showParty)}
    >
        <h5 class="player-header" slot="title">{t("Players")}</h5>
        <div slot="content">
            <div class="party">
                {#if parties.length}
                    <div use:partyDropdown />
                {/if}
            </div>

            <div class="players">
                {#each $party as player (player.name)}
                    <div class="player" class:disabled={!player.enabled}>
                        <span class="player-name">{player.name}</span>
                        <div class="player-right">
                            <span>{player.level}</span>
                            <div
                                class="clickable-icon setting-editor-extra-setting-button"
                                aria-label={player.enabled
                                    ? t("Disable")
                                    : t("Enable")}
                                on:click={() => players.toggleEnabled(player)}
                            >
                                {#if player.enabled}
                                    <div use:disable />
                                {:else}
                                    <div use:enable />
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
                {#each $generics as player, index}
                    <div class="player" class:disabled={!player.enabled}>
                        <input
                            type="number"
                            value={player.count}
                            on:input={(evt) =>
                                players.set(
                                    player,
                                    Number(evt.currentTarget.value)
                                )}
                            min="1"
                        />
                        <span>{t("Player(s)")}</span>
                        <div use:crossIcon />

                        <span>{t("Level")}</span>
                        <input
                            type="number"
                            value={player.level}
                            on:input={(evt) =>
                                players.setLevel(
                                    player,
                                    Number(evt.currentTarget.value)
                                )}
                            min="1"
                        />
                        <div class="player-right">
                            <div
                                class="clickable-icon setting-editor-extra-setting-button"
                                aria-label={player.enabled
                                    ? t("Disable")
                                    : t("Enable")}
                                on:click={() => players.toggleEnabled(player)}
                            >
                                {#if player.enabled}
                                    <div use:disable />
                                {:else}
                                    <div use:enable />
                                {/if}
                            </div>

                            <div
                                class="clickable-icon setting-editor-extra-setting-button"
                                on:click={() => players.remove(player)}
                            >
                                <div use:removeIcon />
                            </div>
                        </div>
                    </div>
                {/each}
                <div class="add-player">
                    <div
                        class="clickable-icon setting-editor-extra-setting-button"
                        on:click={add}
                        use:addIcon
                    />
                </div>
            </div>
        </div>
    </Collapsible>
</div>

<style scoped>
    .players {
        display: flex;
        flex-flow: column;
        gap: 0.25rem;
    }
    .player {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    input {
        text-align: center;
        width: 40px;
    }
    .disabled > .player-name {
        text-decoration: line-through;
    }
    .disabled {
        color: var(--text-faint);
    }
    .player-right {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .add-player {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
</style>
