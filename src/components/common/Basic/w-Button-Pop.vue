<!-- 按钮-弹出确认框 -->
<template>
    <el-popconfirm :title="title" @confirm="emit('confirm')">
        <template #reference>
            <el-button :type="type" @click.stop v-bind="$attrs">
                <slot>删除</slot>
            </el-button>
        </template>
    </el-popconfirm>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        title?: string,
        type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
    }>(),
    {
        title: '确定要删除吗?',
        type: 'danger',
    }
);

const emit = defineEmits(['confirm'])
</script>

<style scoped></style>