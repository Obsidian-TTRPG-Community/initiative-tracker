declare const app: import("obsidian").App;
declare type DndEventInfo = import("svelte-dnd-action").DndEventInfo;
declare interface GenericDndEvent<T extends Record<string, any>> {
    items: T;
    info: DndEventInfo;
}
declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        "on:consider"?: (
            event: CustomEvent<GenericDndEvent> & { target: EventTarget & T }
        ) => void;
        "on:finalize"?: (
            event: CustomEvent<GenericDndEvent> & { target: EventTarget & T }
        ) => void;
    }
}
