<template>
    <el-col :span="span">
        <el-form-item :label="label">
            <el-input-number v-bind="$attrs" :min="0" :max="Infinity" controls-position="right" />
        </el-form-item>
    </el-col>
</template>

<script setup lang="ts">

withDefaults(
    defineProps<{
        span?: number
        label?: string
    }>(),
    {
        span: 6,
        label: '',
    }
)
</script>

<style scoped lang="scss">
:deep(.el-input-number) {
    flex: 1;

    .el-input__inner {
        text-align: start;
    }
}
</style>