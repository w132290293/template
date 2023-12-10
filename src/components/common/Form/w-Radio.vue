<!-- 单选框组 -->
<template>
    <el-col :span="span">
        <el-form-item :label="label">
            <el-radio-group v-bind="$attrs">
                <el-radio :label="item.value" v-for="item in options" :key="item.value" :disabled="item.disabled">{{
                    item.label }}</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-col>
</template>

<script setup lang="ts">
interface Options {
    label: string
    value: any
    disabled?: boolean
}

withDefaults(
    defineProps<{
        span?: number
        label?: string
        options: Array<Options>
    }>(),
    {
        span: 6,
        label: '',
    }
)

</script>

<style scoped></style>