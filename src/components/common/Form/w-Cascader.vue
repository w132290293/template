<!-- 级联选择 -->
<template>
    <el-col :span="span">
        <el-form-item :label="label">
            <el-cascader v-bind="$attrs" :show-all-levels="false" clearable placeholder="请选择" />
        </el-form-item>
    </el-col>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        span?: number,
        label?: string
    }>(),
    {
        span: 6,
        label: '',
    }
);

</script>

<style scoped>
:deep(.el-cascader) {
    flex: 1;
}
</style>