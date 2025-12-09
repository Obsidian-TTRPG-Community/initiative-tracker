import { normalizePath, TFile } from "obsidian";
import type InitiativeTracker from "../main";
import type { Creature } from "../utils/creature";
import { t } from "src/utils/i18n";

import { tracker } from "src/tracker/stores/tracker";
import type { UpdateLogMessage } from "./logger.types";

export interface LogState {
    name?: string;
    players: Creature[];
    creatures: Creature[];
    round: number;
}

export default class Logger {
    public async setLogFile(logFile: string) {
        this.logFile = logFile;
        this.logging = true;

        await this.setFile();
    }
    public getLogFile() {
        return this.logFile ? normalizePath(this.logFile) : "";
    }
    private logFile: string;
    async setFile() {
        const file = (await this.adapter.exists(normalizePath(this.logFile)))
            ? await this.vault.getAbstractFileByPath(
                  normalizePath(this.logFile)
              )
            : await this.vault.create(this.logFile, ``);

        if (file instanceof TFile) {
            this.file = file;
        }
    }
    getFile(): TFile {
        return this.file;
    }
    private file: TFile;
    constructor(public plugin: InitiativeTracker) {}
    get enabled() {
        return this.plugin.data.logging;
    }
    get folder() {
        return this.plugin.data.logFolder;
    }
    get vault() {
        return this.plugin.app.vault;
    }
    get adapter() {
        return this.plugin.app.vault.adapter;
    }
    logging = false;
    async new(logFile: string): Promise<void>;
    async new(state: LogState): Promise<void>;
    async new(param: string | LogState) {
        if (!this.enabled) return;

        if (typeof param == "string") {
            await this.setLogFile(param);
        } else {
            await this.setLogFile(
                `${this.folder}/${Date.now()} - ${param.name ?? t("Combat")}.md`
            );
            await this.log(
                `**${t("Combat started")} ${new Date().toLocaleString()}**\n\n`
            );
            await this.log(`## ${t("Players")}`);
            await this.log(`| ${t("Player")} | ${t("Initiative")} | ${t("HP")} | ${t("Statuses")} |`);
            await this.log("| --- | :-: | :-: | :-: |");
            for (const player of param.players.sort(
                (a, b) => b.initiative - a.initiative
            )) {
                await this.log(
                    "|",
                    player.getName().replace("|", "\\|"),
                    "|",
                    player.initiative.toString(),
                    "|",
                    player.hp ? `${player.hp}/${player.max}` : "-",
                    "|",
                    [
                        ...(player.status.size
                            ? [...player.status].map((c) => c.name)
                            : ["-"])
                    ]
                        .join(", ")
                        .replace("|", "\\|"),
                    "|"
                );
            }
            await this.log(`## ${t("Creatures")}`);
            await this.log(`| ${t("Creature")} | ${t("Initiative")}  | ${t("HP")} | ${t("Statuses")} |`);
            await this.log("| --- | :-: | :-: | :-: |");
            for (const creature of param.creatures.sort(
                (a, b) => b.initiative - a.initiative
            )) {
                await this.log(
                    "|",
                    creature.getName().replace("|", "\\|"),
                    "|",
                    creature.initiative.toString(),
                    "|",
                    creature.hp ? `${creature.hp}/${creature.max}` : "-",
                    "|",
                    [
                        ...(creature.status.size
                            ? [...creature.status].map((c) => c.name)
                            : ["-"])
                    ]
                        .join(", ")
                        .replace("|", "\\|"),
                    "|"
                );
            }

            await this.log(`\n\n## ${t("Combat Log")}`);
            await this.log(`\n### ${t("Round")} 1`);
            await this.log(
                `\n##### ${t("%s's turn").replace("%s", tracker.getOrderedCreatures()[0].getName())}`
            );
        }
    }
    async log(...msg: string[]) {
        if (!this.enabled) return;
        if (!this.file) return;
        if (!(await this.adapter.exists(this.logFile))) {
            await this.setLogFile(this.logFile);
        }
        await this.vault.append(this.file, `${msg.join(" ")}\n`);
    }
    public join(strings: string[], joiner: string = "and") {
        if (strings.length == 1) {
            return strings[0];
        }
        return `${strings.slice(0, -1).join(", ")} ${t(joiner)} ${strings.slice(
            -1
        )}`;
    }
    logUpdate(messages: UpdateLogMessage[]) {
        const toLog: string[] = [];
        for (const message of messages) {
            const perCreature: string[] = [];
            if (message.hp) {
                if (message.temp) {
                    perCreature.push(
                        `${t("%s gained %d temporary HP")
                            .replace("%s", message.name)
                            .replace("%d", (-1 * message.hp).toString())
                        }`
                    );
                } else if (message.max) {
                    if (message.hp < 0) {
                        perCreature.push(
                            `${t("%s1 took %d max HP damage%s2")
                                .replace("%s1", message.name)
                                .replace("%d", (-1 * message.hp).toString())
                                .replace("%s2", message.unc ? t(" and died") : "")
                            }`
                        );
                    } else {
                        perCreature.push(
                            `${t("%s gained %d max HP")
                                .replace("%s", message.name)
                                .replace("%d", message.hp.toString())
                            }`
                        );
                    }
                } else if (message.hp < 0) {
                    perCreature.push(
                        `${t("%s1 took %d damage%s2")
                            .replace("%s1", message.name)
                            .replace("%d", (-1 * message.hp).toString())
                            .replace("%s2", message.unc ? t(" and was knocked unconscious") : "")
                        }`
                    );
                } else if (message.hp > 0) {
                    perCreature.push(
                        `${t("%s was healed for %d HP")
                            .replace("%s", message.name)
                            .replace("%d", message.hp.toString())
                        }`
                    );
                }
            }
            if (message.ac) {
                if (perCreature.length && !message.status) {
                    perCreature.push(t("and"));
                } else if (perCreature.length) {
                    perCreature.push(",");
                }

                if (message.ac_add) {
                    perCreature.push(
                        `${t("%s added %d to AC")
                            .replace("%s", message.name)
                            .replace("%d", message.ac)
                        }`
                    );
                } else {
                    perCreature.push(
                        `${t("%s AC set to %d")
                            .replace("%s", message.name)
                            .replace("%d", message.ac ? message.ac : t("be blank"))
                        }`
                    );
                }
            }
            if (message.status) {
                if (perCreature.length) {
                    perCreature.push(t("and"));
                } else {
                    perCreature.push(message.name);
                }
                let status;
                if (message.status.length > 1) {
                    message.status = message.status.map((s) => t(s));
                    status = [
                        message.status
                            .slice(0, message.status.length - 1)
                            .join(", ")
                    ];
                    status.push(message.status[message.status.length - 1]);
                } else {
                    status = [t(message.status[0])];
                }
                if (message.saved) {
                    perCreature.push(`${t("saved against")} ${status.join(t(" and "))}`);
                } else {
                    perCreature.push(`${t("took %s status").replace("%s", status.join(t(" and ")))}`);
                }
            }
            if (message.remove_status) {
                if (perCreature.length) {
                    perCreature.push(t("and"));
                } else {
                    perCreature.push(message.name);
                }
                let status;
                if (message.remove_status.length > 1) {
                    status = [
                        message.remove_status
                            .slice(0, message.remove_status.length - 1)
                            .join(", ")
                    ];
                    status.push(message.remove_status[message.remove_status.length - 1]);
                } else {
                    status = [message.remove_status[0]];
                }
                perCreature.push(`${t("relieved of")} ${status.join(t(" and "))} ${t("status")}`);
            }
            toLog.push(perCreature.join(" "));
        }
        this.log(`${toLog.join(". ")}.`);
    }
}
