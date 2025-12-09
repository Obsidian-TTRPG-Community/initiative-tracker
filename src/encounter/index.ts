import { MarkdownRenderChild, Notice, parseYaml } from "obsidian";
import type InitiativeTracker from "../main";
import { Creature } from "../utils/creature";
import { t } from "src/utils/i18n";

import EncounterUI from "./ui/Encounter.svelte";
import EncounterTable from "./ui/EncounterTable.svelte";

type RawCreatureArray = string | Array<string | { [key: number]: string }>;
type RawCreature = string | { [key: number]: string };
type RawPlayers = boolean | "none" | string[];
export interface EncounterParameters {
    name?: string;
    players?: RawPlayers;
    party?: string;
    hide?: "players" | "creatures" | string[];
    creatures?: RawCreatureArray;
    xp?: number;
    rollHP?: boolean;
}
interface CreatureStats {
    name: string;
    ac: number | string;
    hp: number;
    modifier: number | number[];
    xp: number;
    display?: string;
    hidden: boolean;
    friendly?: boolean;
    static?: boolean;
    rollHP?: boolean;
}

export const equivalent = (
    creature: Creature | CreatureStats,
    existing: Creature | CreatureStats
) => {
    return (
        creature.name == existing.name &&
        creature.display == existing.display &&
        creature.ac == existing.ac &&
        equivalentModifiers(creature.modifier, existing.modifier) &&
        creature.xp == existing.xp &&
        creature.hidden == existing.hidden &&
        creature.friendly == existing.friendly &&
        creature.static == existing.static
    );
};

function equivalentModifiers(
    modifier: number | number[],
    existing: number | number[]
): boolean {
    if (typeof modifier != typeof existing) return false;
    if (typeof modifier == "number") {
        return modifier == existing;
    }
    if (Array.isArray(modifier) && Array.isArray(existing)) {
        for (let i = 0; i < modifier.length; i++) {
            if (modifier[i] != existing[i]) return false;
        }
        return true;
    }
    return false;
}

export interface ParsedParams {
    name: string;
    players: string[];
    party: string;
    hide: string[];
    creatures: Map<Creature, string | number>;
    xp: number;
    playerLevels: number[];
    rollHP?: boolean;
}

export class EncounterParser {
    constructor(public plugin: InitiativeTracker) {}
    async parse(params: EncounterParameters): Promise<ParsedParams> {
        const name = params.name;
        const players: string[] = this.parsePlayers(params);
        const party =
            params.party ?? players.length
                ? null
                : this.plugin.data.defaultParty;
        const hide = this.parseHide(params);
        const rawMonsters = params.creatures ?? [];

        const rollHP = params.rollHP ?? this.plugin.data.rollHP;
        let creatures = await this.parseRawCreatures(rawMonsters, rollHP);

        const xp = params.xp ?? null;
        const playerLevels = players
            .map((p) => this.plugin.getPlayerByName(p))
            .map((p) => p.level)
            .filter((p) => p && !isNaN(Number(p)));

        return {
            name,
            players,
            party,
            hide,
            creatures,
            xp,
            playerLevels,
            rollHP
        };
    }
    parseHide(params: EncounterParameters): string[] {
        if (!("hide" in (params ?? {}))) return [];
        if (typeof params.hide == "string")
            return ["creatures", "players"].filter((v) => params.hide == v);
        if (Array.isArray(params.hide))
            return ["creatures", "players"].filter((v) =>
                params.hide.includes(v)
            );

        return [];
    }
    parsePlayers(params: EncounterParameters) {
        const playersToReturn: string[] = [];
        const players = params.players;
        if (params.party) {
            if (
                this.plugin.data.parties.find(
                    (p) => p.name.toLowerCase() == params.party.toLowerCase()
                )
            ) {
                const party = this.plugin.data.parties.find(
                    (p) => p.name.toLowerCase() == params.party.toLowerCase()
                );
                playersToReturn.push(...party.players);
            }
        }
        if (players == "none" || players == false) {
            playersToReturn.splice(0, playersToReturn.length);
        } else if (players == true) {
            playersToReturn.push(
                ...[...this.plugin.players.values()].map((p) => p.name)
            );
        } else if (typeof players == "string") {
            playersToReturn.push(players);
        } else if (Array.isArray(players)) {
            playersToReturn.push(
                ...[...(this.plugin.players.values() ?? [])]
                    .map((p) => p.name)
                    .filter((p) =>
                        (players as string[])
                            .map((n) => n.toLowerCase())
                            .includes(p.toLowerCase())
                    )
            );
        }
        if (!playersToReturn.length) {
            let partyName = this.plugin.defaultParty?.name;

            if (
                partyName &&
                this.plugin.data.parties.find(
                    (p) => p.name.toLowerCase() == partyName.toLowerCase()
                )
            ) {
                const party = this.plugin.data.parties.find(
                    (p) => p.name.toLowerCase() == partyName.toLowerCase()
                );
                playersToReturn.push(...party.players);
            }
        }

        return Array.from(new Set(playersToReturn));
    }
    async parseRawCreatures(rawMonsters: RawCreatureArray, rollHP: boolean) {
        const creatureMap: Map<Creature, number | string> = new Map();
        if (rawMonsters && Array.isArray(rawMonsters)) {
            for (const raw of rawMonsters) {
                const { creature, number = 1 } =
                    this.parseRawCreature(raw, rollHP) ?? {};
                if (!creature) continue;

                const stats = {
                    name: creature.name,
                    display: creature.display,
                    ac: creature.ac,
                    hp: creature.hp,
                    modifier: creature.modifier,
                    xp: creature.xp,
                    hidden: creature.hidden,
                    friendly: creature.friendly,
                    rollHP: creature.rollHP
                };
                const existing = [...creatureMap].find(([c]) =>
                    equivalent(c, stats)
                );
                if (!existing) {
                    creatureMap.set(creature, number);
                } else {
                    let amount;
                    if (!isNaN(Number(number)) && !isNaN(Number(existing[1]))) {
                        amount =
                            (Number(number) as number) +
                            (existing[1] as number);
                    } else {
                        amount = `${number} + ${existing[1]}`;
                    }

                    creatureMap.set(existing[0], amount);
                }
            }
        }
        return creatureMap;
    }
    parseRawCreature(raw: RawCreature, globalRollHP: boolean) {
        if (!raw) return {};
        let monster: string | string[] | Record<string, any>,
            number: string | number = 1;

        if (typeof raw == "string") {
            const match = raw.match(/(\d+)?:?\s?(.+)/) ?? [];
            number = isNaN(Number(match[1] ?? null))
                ? number
                : Number(match[1]);
            monster = match[2];
        } else if (Array.isArray(raw)) {
            monster = raw;
        } else if (typeof raw == "object") {
            let entries = Object.entries(raw).flat();
            number = entries[0];
            monster = entries[1];
        }

        if (!monster) return {};

        if (
            typeof number == "string" &&
            !this.plugin.canUseDiceRoller &&
            /\d+d\d+/.test(number)
        ) {
            number = 1;
        }
        if (!isNaN(Number(number))) number = Number(number);
        if (number != 0 && !number) number = 1;
        if (typeof number == "number" && number < 1) number = 0;
        let name: string,
            display: string,
            hp: number,
            ac: number | string,
            mod: number,
            xp: number,
            hidden: boolean = false,
            friendly: boolean = false,
            rollHP: boolean = globalRollHP;

        if (typeof monster == "string") {
            if (monster.match(/,\s+hidden/)) {
                hidden = true;
                monster = monster.replace(/,\s*hidden/, "");
            }
            if (
                monster.match(/,\s+friend(?:ly)?/) ||
                monster.match(/,\s+ally/)
            ) {
                friendly = true;
                monster = monster
                    .replace(/,\s*friend(?:ly)?/, "")
                    .replace(/,\s*ally/, "");
            }
            name = monster.split(/,\s?/)[0];
            [hp, ac, mod, xp] = monster
                .split(/,\s?/)
                .slice(1)
                .map((v) => (isNaN(Number(v)) ? null : Number(v)));
        } else if (Array.isArray(monster)) {
            if (typeof monster[0] == "string") {
                //Hobgoblin, Jim
                name = monster[0];
                display = monster[1];
            } else if (Array.isArray(monster[0])) {
                //[Hobgoblin, Jim]
                name = monster[0][0];
                display = monster[0][1];
            }

            hidden = monster.slice(1).find((v) => v == "hidden") != undefined;

            friendly =
                monster
                    .slice(1)
                    .find(
                        (v) => v == "friend" || v == "friendly" || v == "ally"
                    ) != undefined;

            [hp, ac, mod, xp] = monster
                .slice(1)
                .filter(
                    (v) =>
                        v != "hidden" &&
                        v != "friend" &&
                        v != "friendly" &&
                        v != "ally"
                )
                .map((v) => (isNaN(Number(v)) ? null : Number(v)));
        } else if (typeof monster == "object") {
            ({ creature: name, name: display, hp, ac, mod, xp } = monster);
            hidden = monster.hidden || false;
            friendly = monster.friend || monster.ally || false;
        }

        if (hp) {
            rollHP = false;
        }
        if (!name || typeof name != "string") return {};
        let existing = this.plugin.getCreatureFromBestiary(name);
        let creature = existing
            ? Creature.from(existing)
            : new Creature({ name });

        creature.display = display;
        creature.hp = hp ?? creature.hp;
        creature.ac = ac ?? creature.ac;
        creature.modifier = mod ?? creature.modifier;
        creature.xp = xp ?? creature.xp;
        creature.hidden = hidden ?? creature.hidden;
        creature.friendly = friendly ?? creature.friendly;
        creature.rollHP = rollHP ?? globalRollHP ?? creature.rollHP;

        return { creature, number };
    }
}

class EncounterComponent {
    instance: EncounterUI;
    constructor(
        public params: ParsedParams,
        public encounterEl: HTMLElement,
        public plugin: InitiativeTracker
    ) {
        this.display();
    }
    async display() {
        this.instance = new EncounterUI({
            target: this.encounterEl,
            props: {
                plugin: this.plugin,
                name: this.params.name,
                party: this.params.party,
                players: this.params.players,
                playerLevels: this.params.playerLevels,
                creatures: this.params.creatures,
                hide: this.params.hide,
                rollHP: this.params.rollHP
            }
        });
    }
}

export class EncounterBlock extends MarkdownRenderChild {
    parser: EncounterParser;
    constructor(
        public plugin: InitiativeTracker,
        public src: string,
        public containerEl: HTMLElement,
        public table = false
    ) {
        super(containerEl);
        this.parser = new EncounterParser(this.plugin);
        this.init();
    }
    init(): void {
        if (this.table) {
            this.postprocessTable();
        } else {
            this.postprocess();
        }
    }
    async postprocess() {
        const encounters = this.src.split("---") ?? [];
        const containerEl = this.containerEl.createDiv("encounter-container");
        const empty = containerEl.createSpan({
            text: t("No encounters created. Please check your syntax and try again.")
        });

        for (let encounter of encounters) {
            if (!encounter?.trim().length) continue;
            try {
                const params: EncounterParameters = parseYaml(encounter);
                new EncounterComponent(
                    await this.parser.parse(params),
                    containerEl.createDiv("encounter-instance"),
                    this.plugin
                );
                empty.detach();
            } catch (e) {
                console.error(e);
                new Notice(
                    t("Initiative Tracker: here was an issue parsing: \n\n") +
                        encounter
                );
            }
        }
        this.plugin.register(() => {
            this.containerEl.empty();
            this.containerEl.createEl("pre").createEl("code", {
                text: `\`\`\`encounter\n${this.src}\`\`\``
            });
        });
    }
    async postprocessTable() {
        const encounterSource = this.src.split("---") ?? [];
        const containerEl = this.containerEl.createDiv("encounter-container");
        const empty = containerEl.createSpan({
            text: t("No encounters created. Please check your syntax and try again.")
        });

        const encounters: ParsedParams[] = [];

        for (let encounter of encounterSource) {
            if (!encounter?.trim().length) continue;
            try {
                const params: EncounterParameters = parseYaml(encounter);
                encounters.push(await this.parser.parse(params));
            } catch (e) {
                console.error(e);
                new Notice(
                    t("Initiative Tracker: here was an issue parsing: \n\n") +
                        encounter
                );
            }
        }
        if (encounters.length) {
            empty.detach();
            new EncounterTable({
                target: this.containerEl,
                props: {
                    encounters,
                    plugin: this.plugin
                }
            });
        }
        this.plugin.register(() => {
            this.containerEl.empty();
            this.containerEl.createEl("pre").createEl("code", {
                text: `\`\`\`encounter-table\n${this.src}\`\`\``
            });
        });
    }
}
