import type { Creature } from "../creature";

/** A saving throw a creature can repeat to shake off a status. */
export type SavingThrow = {
    /** Stored on the status; keep stable. */
    id: string;
    name: string;
    /** Short label for compact UI, e.g. "WIS". */
    abbreviation: string;
    /** Other keys a statblock may use for this save, e.g. "fort". */
    aliases?: string[];
    /**
     * Index into a statblock's `stats` array whose ability modifier is the
     * save bonus when the creature has no listed save.
     */
    abilityIndex?: number;
};

export const DND5E_SAVING_THROWS: SavingThrow[] = [
    { id: "str", name: "Strength", abbreviation: "STR", abilityIndex: 0 },
    { id: "dex", name: "Dexterity", abbreviation: "DEX", abilityIndex: 1 },
    { id: "con", name: "Constitution", abbreviation: "CON", abilityIndex: 2 },
    { id: "int", name: "Intelligence", abbreviation: "INT", abilityIndex: 3 },
    { id: "wis", name: "Wisdom", abbreviation: "WIS", abilityIndex: 4 },
    { id: "cha", name: "Charisma", abbreviation: "CHA", abilityIndex: 5 }
];

export const PF2E_SAVING_THROWS: SavingThrow[] = [
    { id: "fort", name: "Fortitude", abbreviation: "Fort", aliases: ["fortitude"] },
    { id: "ref", name: "Reflex", abbreviation: "Ref", aliases: ["reflex"] },
    { id: "will", name: "Will", abbreviation: "Will" }
];

const toNumber = (value: unknown): number | null => {
    const match = String(value ?? "").match(/[+-]?\d+/);
    return match ? Number(match[0]) : null;
};

/**
 * Read a creature's bonus for `save` from its statblock. Checks, in order:
 * a `saves` list or object (e.g. `saves: [{ wisdom: 3 }]`), a top-level field
 * (e.g. `fortitude: 12`), then the matching ability score.
 */
export function readSaveModifier(
    creature: Creature,
    save: SavingThrow | undefined
): number | null {
    const source = creature.creature as Record<string, any> | undefined;
    if (!source || !save) return null;
    const keys = [save.id, save.name, ...(save.aliases ?? [])].map((k) =>
        k.toLowerCase()
    );

    const saves = source.saves;
    const entries: [string, unknown][] = Array.isArray(saves)
        ? saves.flatMap((s) =>
              s && typeof s === "object" ? Object.entries(s) : []
          )
        : saves && typeof saves === "object"
        ? Object.entries(saves)
        : [];
    for (const [key, value] of entries) {
        if (keys.includes(key.toLowerCase())) {
            const n = toNumber(value);
            if (n != null) return n;
        }
    }

    for (const [key, value] of Object.entries(source)) {
        if (keys.includes(key.toLowerCase())) {
            const n = toNumber(value);
            if (n != null) return n;
        }
    }

    if (save.abilityIndex != null) {
        const score = Number(source.stats?.[save.abilityIndex]);
        if (source.stats?.[save.abilityIndex] != null && !isNaN(score)) {
            return Math.floor((score - 10) / 2);
        }
    }
    return null;
}
