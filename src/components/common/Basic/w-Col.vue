<template>
    <el-col :span="span">
        <el-form-item>
            <slot></slot>
        </el-form-item>
    </el-col>
</template>

<script setup lang="ts">
defineProps({
    span: {
        type: Number,
        default: 6
    },
})
</script>

<style scoped></style>