<script lang="ts">
    import Multiselect from "svelte-multiselect";
    import type { OptionsFilterStore } from "src/builder/stores/filter/filter";
    import { t } from "src/utils/i18n";

    export let filter: OptionsFilterStore;
</script>

<div class="multiselect-container">
    <Multiselect
        options={filter.options.flat().map((s) => t(s))}
        bind:selected={$filter}
        outerDivClass="multiselect-dropdown"
        placeholder={t(filter.text)}
    />
</div>

<style scoped>
    .multiselect-container {
        width: 100%;
    }
    .multiselect-container :global(.multiselect-dropdown) {
        height: auto;
        min-height: var(--input-height, 30px);
    }
    /** Normalize multiselect */
    .multiselect-container :global(div.multiselect) {
        --sms-border: none;
        --sms-bg: var(--interactive-normal);
        --sms-options-bg: var(--interactive-normal);
        --sms-border-radius: var(--radius);
    }
    .multiselect-container :global(div.multiselect ul) {
        padding-left: 0;
        border-radius: var(--radius);
    }
    .multiselect-container :global(div.multiselect button) {
        height: 0;
    }
    .multiselect-container :global(div.multiselect input) {
        width: 0;
        font-size: var(--font-ui-small);
    }
    .multiselect-container :global(div.multiselect li) {
        border-left: none;
    }
    .multiselect-container :global(div.multiselect li::before) {
        content: none;
    }
</style>
