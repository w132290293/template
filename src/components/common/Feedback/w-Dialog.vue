<!-- 弹窗 -->
<template>
    <el-dialog :model-value="!!dialogFlag" :title="title" @closed="emit('update:dialogFlag', false)" align-center
        append-to-body draggable :close-on-click-modal="false">

        <template #header v-if="!title">
            <slot name="header" :data="info"></slot>
        </template>


        <el-scrollbar :max-height="maxHeight" noresize>
            <slot name="main" :data="info"></slot>
        </el-scrollbar>


        <template #footer>
            <slot name="footer" :data="info" :close="() => { emit('update:dialogFlag', false) }"></slot>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
const prop = defineProps({
    dialogFlag: {
        type: [Boolean, Object],
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    maxHeight: {
        type: String,
        default: '70vh'
    }
})
const emit = defineEmits(['update:dialogFlag'])

const info = ref<any>(false);
const watcher = watch(() => prop.dialogFlag, () => {
    info.value = prop.dialogFlag;
}, { immediate: true })

onUnmounted(() => {
    watcher()
})

</script>

<style lang="scss" >
.el-dialog {
    overflow: hidden;

    .el-dialog__header {
        background-color: var(--w-header-bg);
        margin-right: 0;
        overflow: hidden;
    }

    .el-dialog__body {
        padding: var(--el-dialog-padding-primary);
    }

    .el-dialog__footer {
        padding-top: 0;
    }
}
</style>