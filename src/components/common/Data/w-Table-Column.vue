<template>
    <el-table-column :prop="prop" :label="label" :sortable="sortable" :show-overflow-tooltip="showOverflowTooltip"
        :fixed="fixed" :width="width" :align="align">
        <template #default="{ row }" v-if="!prop">
            <slot :row="row"></slot>
        </template>

    </el-table-column>
</template>

<script setup lang="ts">
defineProps({
    label: { type: String, default: '' },
    prop: { type: String, default: '' },
    width: { type: String, default: '' },
    align: { type: String, default: 'center' },
    fixed: { type: String }, // right
    showOverflowTooltip: { type: Boolean, default: true },
    sortable: { type: Boolean, default: false },
});

</script>

<style scoped></style>