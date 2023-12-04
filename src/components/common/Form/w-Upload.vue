<!-- 未测试 -->

<!-- 文件上传 -->
<template>
    <el-upload ref="uploadRef" action="" :auto-upload="false" :on-change="change" :http-request="() => { }"
        :before-remove="remove">
        <template #trigger>
            <slot name="select">
                <el-button type="primary">选择文件</el-button>
            </slot>
        </template>
        <slot></slot>

        <template #tip v-if="placeholder">
            <div class="el-upload__tip">
                {{ placeholder }}
            </div>
        </template>
    </el-upload>
</template>

<script setup>
/**
 * @placeholder 提示
 * 
 * @透传 drag/拖拽上传  multiple/多选文件  accept/接受上传的文件类型
 */
import axios from "axios";
import { ref } from 'vue'

defineProps({
    placeholder: {
        type: String,
        default: ''
    }
});

//提交
const uploadRef = ref();


//获取流文件
let file = null;
const change = (e) => {
    e.status === 'ready' && (file = e.raw);
};

//删除流文件
const remove = (e) => {
    file = null
};



//请求方式
function post(url, data = {}) {
    const formData = new FormData();
    file && formData.append('file', file);
    Object.entries(data).forEach(item => formData.append(...item));

    return axios({
        url,
        method: 'post',
        data: formData
    });
};

defineExpose({ post });

</script>

<style lang="scss" scoped></style>