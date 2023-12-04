<!-- 完整版 -->

<!-- 弹窗 -->
<template>
    <el-dialog :model-value="!!dialogFlag" :title="info.title" @closed="emit('update:dialogFlag', false)"
        :align-center="true" :width="info.width" :close-on-click-modal="false" :destroy-on-close="true"
        style="border-radius: 6px;" class='planDialog'>
        <!-- 主体 -->
        <slot name="main" :title="info.title" :data="info"></slot>

        <template #footer>
            <div class="dialog_footer">
                <!-- 底部按钮 -->
                <slot name="footer" :title="info.title" :data="info"></slot>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
/**
 * 使用方法：传入 v-model:dialogFlag="dialogFlag"
 *          dialogFlag为reactive({title:弹窗标题,width:60%}),父组件可在main插槽中获取数据 写法为#main="{ title }" 可用于v-if判断渲染弹窗具体内容
 */

import { watch, ref } from 'vue';
const prop = defineProps({
    dialogFlag: {
        type: [Boolean, Object],
        default: false
    }
})
const emit = defineEmits(['update:dialogFlag'])

const info = ref({ title: '', width: '30%' });
watch(() => prop.dialogFlag, () => {
    prop.dialogFlag && (info.value = prop.dialogFlag);
})

</script>

<style lang="scss" >
.dialog_footer {
    display: flex;
    justify-content: end;
    align-items: end;

    & :first-child {
        margin: 0 !important;
    }
}

::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    height: 3px;
}

::-webkit-scrollbar-thumb {
    /*滚动条里面小方块样式*/
    border-radius: 100px;
    -webkit-box-shadow: inset 0 0 5px rgba(151, 151, 151, 0.2);
    background: rgba(0, 0, 0, 0.1);
    ;
}

::-webkit-scrollbar-track {
    /*滚动条里面轨道样式*/
    -webkit-box-shadow: inset 0 0 5px rgba(223, 223, 223, 0.2);
    border-radius: 100px;
    background: rgba(0, 0, 0, 0.1);
}



.el-dialog__body {
   
    overflow-y: scroll;
    padding: 10px 30px;
}
</style>