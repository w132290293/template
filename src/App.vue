<template>
  <!-- element plus 中文配置 -->
  <el-config-provider :locale="zhCn">
    <HomePage />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs"; // 引入中文包
import HomePage from '@/view/HomePage.vue'
</script>


<style scoped lang="scss"></style>
