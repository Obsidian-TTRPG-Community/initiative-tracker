import type { Condition, StatusExpiry } from "src/types/creatures";
import type { Creature } from "./creature";
import type { RpgSystem } from "./rpg-system/rpgSystem";

/** A repeated saving throw that is waiting for the DM to resolve. */
export type PendingSave = {
    creature: Creature;
    status: Condition;
};

/**
 * Create the per-creature copy of a status being applied to `target`, resolving
 * which creature's turn will end it.
 *
 * @param active The creature whose turn it is, if combat is running.
 */
export function instantiateStatus(
    status: Condition,
    target: Creature,
    active?: Creature
): Condition {
    const copy: Condition = { ...status };
    const expiry = status.expiry;
    if (!expiry) return copy;
    if (expiry.type === "save") {
        copy.expiry = { ...expiry };
        return copy;
    }
    const creatureId =
        expiry.whose === "target" ? target.id : expiry.sourceId ?? active?.id;
    if (!creatureId) {
        // No creature to time it against; fall back to "until cleared".
        delete copy.expiry;
        return copy;
    }
    copy.expiry = {
        ...expiry,
        creatureId,
        skip: expiry.timing === "end" && active?.id === creatureId ? 1 : 0
    };
    return copy;
}

/**
 * Apply turn-based expiry when the turn passes from `ended` to `started`.
 * Expired statuses are removed in place.
 *
 * @returns The expired statuses and the saving throws that are now due.
 */
export function processTurnChange(
    creatures: Creature[],
    ended: Creature | null,
    started: Creature
): { expired: PendingSave[]; saves: PendingSave[] } {
    const expired: PendingSave[] = [];
    const saves: PendingSave[] = [];
    for (const creature of creatures) {
        for (const status of [...creature.status]) {
            const expiry = status.expiry;
            if (!expiry) continue;
            if (expiry.type === "turn") {
                if (
                    expiry.timing === "end" &&
                    ended &&
                    expiry.creatureId === ended.id
                ) {
                    if (expiry.skip) {
                        expiry.skip--;
                        continue;
                    }
                    expired.push({ creature, status });
                } else if (
                    expiry.timing === "start" &&
                    expiry.creatureId === started.id
                ) {
                    expired.push({ creature, status });
                }
            } else if (
                (expiry.timing === "end" && ended?.id === creature.id) ||
                (expiry.timing === "start" && started.id === creature.id)
            ) {
                saves.push({ creature, status });
            }
        }
    }
    for (const { creature, status } of expired) {
        creature.status.delete(status);
    }
    return { expired, saves };
}

/** Short label for a saving throw, e.g. "WIS", from the system if it knows it. */
export const saveLabel = (stat: string, system?: RpgSystem) =>
    system?.getSavingThrow(stat)?.abbreviation ?? stat.toUpperCase();

/**
 * Human-readable expiry, e.g. "until end of Goblin 1's next turn".
 *
 * @param owner The creature that has the status, if it has been applied.
 * @param system The active RPG system, for saving throw names.
 */
export function describeExpiry(
    expiry: StatusExpiry | undefined,
    creatures: Creature[],
    owner?: Creature,
    system?: RpgSystem
): string {
    if (!expiry) return "Until cleared";
    if (expiry.type === "save") {
        return `${saveLabel(expiry.stat, system)} save${
            expiry.dc ? ` (DC ${expiry.dc})` : ""
        } at ${expiry.timing} of each turn`;
    }
    const id =
        expiry.creatureId ??
        (expiry.whose === "source" ? expiry.sourceId : undefined);
    let whose: string;
    if (owner && id === owner.id) {
        whose = "its";
    } else if (!id && expiry.whose === "target") {
        whose = "the target's";
    } else {
        const creature = creatures.find((c) => c.id === id);
        whose = creature ? `${creature.getName()}'s` : "the attacker's";
    }
    return `Until ${expiry.timing} of ${whose} next turn`;
}
