import { type TableHeaderState, SortFunctions } from "src/builder/builder.types";
import { Modal, Setting, TextAreaComponent } from "obsidian";
import { EditorView } from "@codemirror/view";
import { editorFromTextArea } from "../../../utils/editor/index";
import { t } from "src/utils/i18n";

export class EditModal extends Modal {
    public header: TableHeaderState;
    public editing: boolean;
    editor: EditorView;
    public canceled = false;
    onOpen() {
        this.titleEl.setText(this.editing ? t("Edit Header") : t("Create Header"));
        this.display();
    }
    display() {
        this.contentEl.empty();
        new Setting(this.contentEl).setName(t("Display Text")).addText((t) =>
            t.setValue(this.header.text).onChange((v) => {
                this.header.text = v;
            })
        );
        new Setting(this.contentEl)
            .setName(t("Linked Property"))
            .addText((t) =>
                t
                    .setValue(this.header.field)
                    .onChange((v) => (this.header.field = v))
            );
        new Setting(this.contentEl)
            .setName(t("Sort Type"))
            .setDesc(
                t("This determines how the field is sorted. Use the appropriate type for the data type of the field.")
            )
            .addDropdown((s) => {
                s.addOption(`${SortFunctions.LOCAL_COMPARE}`, t("String"));
                s.addOption(`${SortFunctions.CONVERT_FRACTION}`, t("Number"));
                s.addOption(`${SortFunctions.CUSTOM}`, t("Custom"));
                s.setValue(`${this.header.type}`).onChange((v) => {
                    this.header.type = Number(v);
                    if (this.header.type == SortFunctions.CUSTOM) {
                        this.header.func = ``;
                    } else {
                        delete this.header.func;
                    }
                    this.display();
                });
            });
        if ("func" in this.header) {
            new Setting(this.contentEl)
                .setName(t("Custom Sorting Function"))
                .setDesc(
                    createFragment((e) => {
                        e.createSpan({
                            text: t("Specify a custom sorting JavaScript function.")
                        });
                        e.createEl("br");
                        e.createEl("br");

                        e.createSpan({
                            text: t("This function receives two monster objects, ")
                        });
                        e.createEl("code", { text: "a" });
                        e.createSpan({ text: t(" and ") });
                        e.createEl("code", { text: "b" });
                        e.createSpan({
                            text: t(", and must return a number. The number determines sort order.")
                        });
                    })
                );
            const component = new TextAreaComponent(this.contentEl).setValue(
                this.header.func!
            );
            component.inputEl.addClass("initiative-tracker-textarea");
            this.editor = editorFromTextArea(
                component.inputEl,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        this.header.func = update.state.doc.toString();
                    }
                })
            );
        }
        new Setting(this.contentEl).addButton((b) => {
            b.setButtonText(t("Cancel"))
                .setCta()
                .onClick(() => {
                    this.canceled = true;
                    this.close();
                });
        });
    }
    close() {
        this.editor?.destroy();
        super.close();
    }
}
