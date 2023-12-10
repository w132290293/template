<template>
    <el-col :span="span">
        <el-form-item :label="label" :prop="prop">
            <el-input v-bind="$attrs" :type="type">
                <template #prepend v-if="prepend">
                    <slot name="prepend" prepend></slot>
                </template>
                <slot></slot>

                <template #append v-if="append">
                    <slot name="append"></slot>
                </template>

            </el-input>
        </el-form-item>
    </el-col>
</template>

<script setup lang="ts">

withDefaults(
    defineProps<{
        span?: number
        label?: string
        type?: 'text' | 'textarea' | 'password' | 'number'
        prop?: string
        prepend?: boolean
        append?: boolean
    }>(),
    {
        span: 6,
        label: '',
        type: 'text',
    }
)

</script>

<style scoped></style>