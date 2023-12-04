<!-- 抽屉 -->
<template>
    <el-drawer :model-value="!!drawerFlag" direction="rtl" :size="info.width" :title="info.title"
        :close-on-click-modal="false" @closed="emit('update:drawerFlag', false)">
        <template #default>
            <slot name='main' :title="info.title" :data="info"></slot>
        </template>
        <template #footer>
            <div style="flex: auto">
                <slot name='footer' :title="info.title" :data="info"></slot>
            </div>
        </template>
    </el-drawer>
</template>

<script setup>
/**
 * 使用方法：传入 v-model:drawerFlag="drawerFlag"
 *          drawerFlag为reactive({title:弹窗标题,width:60%}),父组件可在main插槽中获取数据 写法为#main="{ title }" 可用于v-if判断渲染弹窗具体内容
 */

import { watch, ref } from 'vue';
const prop = defineProps({
    drawerFlag: {
        type: [Boolean, Object],
        default: false
    }
})
const emit = defineEmits(['update:drawerFlag'])


const info = ref({ title: '', width: '40%' });
watch(() => prop.drawerFlag, () => {
    prop.drawerFlag && (info.value = prop.drawerFlag);
})



</script>

<style lang="scss" scoped></style>