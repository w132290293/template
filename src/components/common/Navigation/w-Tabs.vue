<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabList" :key="item.name" lazy>

            <slot :scope="{ name: item.name, data: dataMap.get(item.name), component: markRaw(item.component) }">
            </slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
/**
 * @tabList [{
 *            name: 'all',
 *            label: '全部',
 *            data: () => myPromise(),   //必须写成函数形式
 *            component: defineAsyncComponent(() =>import('@/'))
 *           }]
 * @属性透传 排列方式：tabPosition="left"/top/right/bottom; 标签宽度自适应:stretch="true"
 * 
 * 用法：<Tabs :tabList="tabList">
 *         <template v-slot="{ scope }">
 *            <List :tableTitle="tableTitle" :tableData="scope"></List>
 *         </template>
 *       </Tabs>
 */

import { ref, reactive, markRaw } from 'vue';

const prop = defineProps({
    tabList: {
        type: Object,
        default: []
    }
});

const activeName = ref(prop.tabList[0]?.name);

//记录渲染过的数据 防止反复请求接口
const dataMap = reactive(new Map());
const handleClick = async (tab, event) => {
    dataMap.has(prop.tabList[tab.index].name) || dataMap.set(prop.tabList[tab.index].name, await prop.tabList[tab.index].data?.());
};
handleClick({ index: 0 });

</script>

<style lang="scss" scoped>
.el-tabs {
    display: flex;
    flex-direction: column;
    flex: 1;
}

::v-deep .el-tabs__content {
    @extend .el-tabs;
}

.el-tab-pane {
    @extend .el-tabs;

}
</style>