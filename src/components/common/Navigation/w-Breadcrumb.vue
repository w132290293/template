<!-- 完整版 -->

<!-- 面包屑 -->
<template>
    <el-breadcrumb :separator="separator">

        <el-breadcrumb-item :to="to && item.components ? { path: item.path } : null" v-show="item.meta?.title"
            v-for="item in navArray" :key="item.path" style="user-select: none;">
            {{ item.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
/**
 * @separator  分隔符
 * @to  为true开启点击跳转 
 * 
 * 用法：路由设置meta:{title:'页面名称'}
 */

import { useRoute } from "vue-router";
import { watch, ref } from "vue";

defineProps({
    separator: {
        type: String,
        default: '/'
    },
    to: {
        type: Boolean,
        default: false
    }
});

const route = useRoute();
const navArray = ref([]);

// 监听路径的变化
watch(() => route.path, () => {
    // route.matched 目前匹配的是哪个 获得的值赋给navArray.valu 上面用v-for遍历值
    navArray.value = route.matched;
}, { immediate: true });

</script>

