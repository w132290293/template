<template>
    <div id="dd">
        <h4>123</h4>
        <el-scrollbar>
            <dl v-for="(item, index) in 20" :key="index">{{ item }}</dl>
        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
#dd {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    >.el-scrollbar {
        background-color: rgba(250, 218, 215, 0.372);
    }
}
</style>