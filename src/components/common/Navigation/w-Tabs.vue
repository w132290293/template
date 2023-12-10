<template>
    <el-tabs @tab-click="handleClick">
        <slot>
            <!-- <el-tab-pane label="User" name="first">User</el-tab-pane> -->
        </slot>
    </el-tabs>
</template>

<script setup lang="ts">
defineProps({
});

const handleClick = (name: any) => {
    // console.log(name);
}

</script>

<style scoped lang="scss">



// ::v-deep .el-tabs__content {
//     @extend .el-tabs;
// }

// .el-tab-pane {
//     @extend .el-tabs;
// }
</style>