<!-- 可更新 -->

<!-- 返回 页头 -->
<template>
    <el-page-header :icon="ArrowLeft" @back="back" style="margin-bottom: 12px;">
        <template #content>
            <span class="text-large font-600 mr-3">{{ title }}</span>
        </template>
    </el-page-header>
</template>

<script setup>
import { ArrowLeft } from '@element-plus/icons-vue';

defineProps({
    title: {
        type: String,
        default: ''
    }
});

//返回上一级
const back = () => {
    window.history.go(-1);
};

</script>

<style lang="scss" scoped></style>