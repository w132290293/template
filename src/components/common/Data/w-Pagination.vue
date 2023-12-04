<!-- 完整版 -->

<!-- 分页器 -->
<template>
    <div class="Pagination">
        <span>共{{ dataNum }}条数据</span>
        <el-pagination :current-page="pag.page" :page-size="pag.limit" :small="false" :disabled="false"
            :background="background" layout="sizes, prev, pager, next, jumper" :total="dataNum"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 40]"
            :default-page-size="15" />
    </div>
</template>

<script setup>
/**
 * @dataNum 列表总数据量  必传
 * @jump 查询事件  必传
 * @background 是否显示背景 true 
 * 
 * 用法：传入dataNum总数据量，jump跳转分页 绑定列表查询接口函数即可  例@jump="query"
 */

import { reactive, nextTick } from 'vue';

const prop = defineProps({
    dataNum: { type: Number, default: 0, required: true },
    background: { type: Boolean, default: true, }
});
const emit = defineEmits(['jump']);


//接口参数
const pag = reactive({
    page: 1,
    limit: 15,
    start: 0
});


//修改每页显示条数
const handleSizeChange = (val) => {
    pag.limit = val;
    pag.start = (pag.page - 1) * pag.limit;
    emit('jump', pag);
};


//跳转指定页面事件
const handleCurrentChange = (val) => {
    pag.page = val;
    pag.start = (pag.page - 1) * pag.limit;
    emit('jump', pag);
};


//jump绑定的query事件内引用了forms组件内的数据，需等待forms组件创建完成再执行emit('jump', pag);
nextTick(() => {

    emit('jump', pag); //页面加载后立即调用一次jump绑定的函数 一般为query
})

</script>

<style lang="scss" scoped>
.Pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;

    >span {
        color: #666;
    }
}
</style>