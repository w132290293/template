<template>
    <el-col :span="span">
        <el-form-item :label="label" :prop="prop">
            <el-color-picker v-bind="$attrs" show-alpha :predefine="predefine" color-format="hex" />
        </el-form-item>
    </el-col>
</template>

<script setup lang="ts">


withDefaults(
    defineProps<{
        span?: number
        label?: string
        prop?: string
        predefine?: string[] | any
    }>(),
    {
        span: 6,
        label: '',
        predefine: [
            '#ff4500',
            '#ff8c00',
            '#ffd700',
            '#90ee90',
            '#00ced1',
            '#1e90ff',
            '#c71585',
        ]
    }
)

</script>

<style scoped></style>