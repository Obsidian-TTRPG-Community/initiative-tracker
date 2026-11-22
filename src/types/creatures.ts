/** A status as saved in encounter state: a bare name, or a name plus expiry. */
export type SavedStatus = string | { name: string; expiry?: StatusExpiry };

export interface CreatureState extends HomebrewCreature {
    status: SavedStatus[];
    enabled: boolean;
    currentMaxHP: number;
    currentHP: number;
    tempHP: number;
    currentAC: number | string;
    initiative: number;
    static: boolean;
    player: boolean;
    xp: number;
    active: boolean;
    hit_dice: string;
}
export interface SRDMonster {
    name: string;
    ac: number;
    hp: number;
    hit_dice?: string;
    cr: string | number;
    monster?: string;
    friendly?: boolean;
    hidden?: boolean;
    bestiary?: boolean;
    player?: boolean;

    [key: string]: any;
}
export interface HomebrewCreature {
    name?: string;
    display?: string;
    hp?: number;
    ac?: number | string;
    stats?: number[];
    source?: string | string[];
    cr?: number | string;
    modifier?: number | number[];
    note?: string;
    path?: string;
    level?: number;
    player?: boolean;
    marker?: string;
    id?: string;
    xp?: number;
    hidden?: boolean;
    friendly?: boolean;
    active?: boolean;
    static?: boolean;
    rollHP?: boolean;
    "statblock-link"?: string;
}
export type Condition = {
    name: string;
    description: string;
    id: string;
    resetOnRound?: boolean;
    hasAmount?: boolean;
    startingAmount?: number;
    amount?: number;
    /** When this status should end. Absent means "until cleared". */
    expiry?: StatusExpiry;
} & (
    | {
          hasAmount: true;
          startingAmount: number;
          amount: number;
      }
    | {}
);

export type ExpiryTiming = "start" | "end";
/** Id of a saving throw from the active RPG system (see `RpgSystem.savingThrows`). */
export type SaveStat = string;

export type StatusExpiry =
    | {
          /** Ends at the start or end of a creature's next turn. */
          type: "turn";
          timing: ExpiryTiming;
          /** Whose turn: the creature that applied it, or the creature affected. */
          whose: "source" | "target";
          /** The creature that applied the status (when `whose` is "source"). */
          sourceId?: string;
          /** How many of that creature's turns it lasts. Defaults to 1 (its next turn). */
          turns?: number;
          /** Resolved when applied: id of the creature whose turn ends the status. */
          creatureId?: string;
          /**
           * Matching turn starts/ends still to pass before it expires; counts
           * down as turns pass. Starts at `turns - 1`, plus 1 for an "end" timing
           * applied during that creature's own turn (its *next* turn is what counts).
           */
          skip?: number;
      }
    | {
          /** The affected creature repeats a saving throw on each of its turns. */
          type: "save";
          timing: ExpiryTiming;
          stat: SaveStat;
          dc?: number;
      };
