import "obsidian";
import type { HomebrewCreature } from "src/types/creatures";

declare module "obsidian" {
    interface App {
        plugins: {
            enabledPlugins: Set<string>;
        };
        commands: {
            commands: { [id: string]: Command };
            findCommand(id: string): Command;
            executeCommandById(id: string): void;
            listCommands(): Command[];
        };
    }
    interface WorkspaceItem {
        containerEl: HTMLElement;
    }
    interface Workspace {
        trigger(
            name: "hover-link",
            payload: {
                event: MouseEvent;
                source: string;
                hoverParent: import("obsidian").View | { hoverPopover: null };
                targetEl: HTMLElement;
                linktext: string;
            }
        ): void;
    }

    interface MenuItem {
        setSubmenu: () => Menu;
        submenu: Menu;
    }
}
