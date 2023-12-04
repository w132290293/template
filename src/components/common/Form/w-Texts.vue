<!-- 完整版 -->

<!-- form表单 -->
<template>
    <el-form :model="textData" label-width="120px" class="texts">

        <div class="boxs" v-for="(brItem, index) in textTitle" :key="index">
            <el-row :gutter="24" v-for="(item, idx) in brItem" :key="idx">
                <el-col :span="i.span || 8" v-for="i in item" :key="i.prop">
                    <!-- 标题 -->
                    <h4 v-if="i.type === 'title'" style="font-size: 16px;margin: 0 0 12px 12px;">{{ i.label }}</h4>
                    <!-- 按钮 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'button'">
                        <template v-for="e in i.buttons">
                            <template v-if="!e.hidden?.()">

                                <!-- 二次确认提示框 点击确认后才执行click事件 -->
                                <el-popconfirm :title="e.popconfirm" @confirm="e.click" v-if="e.popconfirm">
                                    <template #reference>
                                        <el-button :type="e.type" :icon="icons[e.icon]" :plain="e.plain" :round="e.round"
                                            :circle="e.circle" :link="e.link" :disabled="e.disabled?.()">
                                            {{ e.label }}
                                        </el-button>
                                    </template>
                                </el-popconfirm>

                                <!-- 普通按钮 -->
                                <el-button @click="e.click" :type="e.type" :icon="icons[e.icon]" :plain="e.plain"
                                    :round="e.round" :circle="e.circle" :link="e.link" :disabled="e.disabled?.()">
                                    {{ e.label }}
                                </el-button>
                            </template>
                        </template>
                    </el-form-item>


                    <!-- 图片 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'img'" :prop="i.prop">
                        <template v-for="e in textData[i.prop]">
                            <div class="img"
                                v-if="e.split('.')[e.split('.').length - 1] == 'txt' || e.split('.')[e.split('.').length - 1] == 'TXT'|| e.split('.')[e.split('.').length - 1] == 'DOCX' || e.split('.')[e.split('.').length - 1] == 'DOC'|| e.split('.')[e.split('.').length - 1] == 'doc' || e.split('.')[e.split('.').length - 1] == 'xls' || e.split('.')[e.split('.').length - 1] == 'xlsx' || e.split('.')[e.split('.').length - 1] == 'docx'">
                                <el-tooltip class="box-item" effect="dark" :content="e" placement="top-start">
                                    <a :href="e" target="_blank">{{ e }}</a>
                                </el-tooltip>
                                <!--  -->
                            </div>
                            <div v-else>
                                <el-image style="max-width: 700px;" :src="url" fit="contain" v-for="url in textData[i.prop]"
                                    :key="url" :style="{ height: i.height, margin: '0 4px', width: i.width }" lazy />
                            </div>
                        </template>

                    </el-form-item>
                    <!-- 文本框 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else :prop="i.prop">
                        <el-tooltip class="box-item" effect="dark" :content="textData[i.prop]" placement="top-start">
                            <span style="font-size: 16px;color: #666;">{{ textData[i.prop] }}</span>
                        </el-tooltip>
                    </el-form-item>

                </el-col>
            </el-row>

            <!-- 分割线 -->
            <hr v-if="index < textTitle.length - 1" style="border: 1px solid #f1f1f1;" />
            <br v-if="index < textTitle.length - 1" />

        </div>
    </el-form>
</template>

<script setup>
/**
 * @textTitle 控制hr换行分层级[       层级内的所有行[      一行内的所有列[      每个输入框{   label: '年龄',   表头                        必传！
 *                                                                                        prop: 'age'   对应数据key                   必传！
 *                                                                                        span: 8,   所占横向栅格数 一行最大24
 *                                                                                        type: 'textarea',  表单类型
 *                                                                                        buttons:[{label:'查询',click:()=>{}}] 按钮
 *                                                                                     }]]]
 * @textData 默认显示或回显的对象
 * @属性透传 size="large"/default/small  label-width="120px" :disabled="true" 等
 * 
 * 使用方法：传入textTitle即可，需回显或默认显示 传入textData，提交事件异步操作 下滑参考本组件末尾示例↓↓↓
 */

import { ref, watch } from "vue";
import * as icons from '@element-plus/icons-vue'
const prop = defineProps({
    textTitle: { type: Object, default: [], required: true },
    textData: { type: Object, default: {} },
});
//更新表单数据
const textData = ref({ ...prop.textData });
watch(() => prop.textData, () => {
    textData.value = { ...prop.textData };
});
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
    font-size: 16px;
    color: #333;
}

span {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.img {
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;

    // >img {
    //     flex: 1;
    //     max-width: 100%;
    //     width: 100%;
    // }
}

.file {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>