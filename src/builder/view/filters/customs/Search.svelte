<script lang="ts">
    import { TextComponent, debounce } from "obsidian";
    import type { StringFilterStore } from "src/builder/stores/filter/filter";
    import { t } from "src/utils/i18n";

    export let filter: StringFilterStore;
    const search = (node: HTMLElement) => {
        new TextComponent(node).setPlaceholder(t(filter.text)).onChange(
            debounce((v) => {
                $filter = v;
            }, 10)
        );
    };
</script>

<div class="search" use:search />

<style scoped>
    .search,
    .search :global(input) {
        width: 100%;
    }
</style>
