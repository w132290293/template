<!-- 完整版 -->

<!-- 列表 -->
<template>
    <div id="tableBox">
        <el-table :data="tableData" ref="tableRef" v-bind="$attrs" :header-cell-style="{ background: headerBackground }"
            style="min-width: 100%; display: flex; flex-direction: column; height: 0;min-height: 100%;"
            :load="load && onLoad" highlight-current-row v-loading="loading" :row-key="rowKey" @row-click="onRow"
            :tree-props="treeProps" @selection-change="handleSelectionChange">

            <!-- 多选框 -->
            <el-table-column type="selection" v-if="checkbox" reserve-selection align="center" />


            <!-- 序号 -->
            <el-table-column type="index" :label="rank" v-if="rank" width="60px" align="center">
                <template #default="{ $index }">
                    <span style="border-radius:4px;background:#f6f6f6;border-radius:4px;padding:2px 8px;">
                        {{ $index + 1 + pag.start }}
                    </span>
                </template>
            </el-table-column>



            <!-- 渲染数据 -->
            <el-table-column :label="item.label" :min-width="item.width" v-for="item, index in tableTitle" :key="index"
                :sortable="!!item.sortable" :sort-method="item.sortable" :show-overflow-tooltip="showOverflowTooltip"
                :fixed="item.fixed || (item.buttons && 'right')"
                :width="item.width || (item.buttons && item.buttons.length * 84 + 36 + 'px')"
                :align="(item.type === 'img' || item.buttons) && 'center'">

                <!-- 图片 必须为数组格式-->
                <template v-if="item.type === 'img'" #default="{ row }">
                    <div style="display: flex; align-items: center;justify-content: center;">
                        <el-image :src="url" fit="contain" v-for="url in row[item.prop]" :key="url"
                            :style="{ height: item.height, margin: '0 4px', flex: 1 }" lazy />
                    </div>
                </template>



                <!-- input框 -->
                <template v-else-if="item.type === 'input'" #default="{row}">
                    <el-input @click.stop v-model="row[item.prop]" :placeholder="item.placeholder || '请输入'" />
                </template>



                <!-- 开关 -->
                <template v-else-if="item.type === 'switch'" #default="{row}">
                    <el-switch v-model="row[item.prop]" :loading="row.switchLoading" @click.stop
                        :before-change="()=>beforeChange(row,item.click)" :active-icon="icons.Check"
                        :inactive-icon="icons.Close" inline-prompt :active-value="item.activeValue??true"
                        :inactive-value="item.inactiveValue??false" />
                </template>



                <!-- innerHTML -->
                <template v-else-if="item.html || item.type === 'html'" #default="{row}">
                    <div v-html="`<${item.html.type} style='${item.html.style(row[item.prop])};'>${item.filter?.(row[item.prop]) || row[item.prop]}</${item.html.type}>`"
                        v-if="item.html"></div>

                    <div v-html="row[item.prop]" v-if="item.type === 'html'"></div>
                </template>



                <!-- 按钮 -->
                <template v-else-if="item.buttons" #default="{row}">
                    <template v-for="i in item.buttons">
                        <!-- buttons内传入hidden函数判断按钮状态 是否显示，返回值为true则隐藏 -->
                        <template v-if="!i.hidden?.(row)">

                            <!-- 二次确认提示框 点击确认后才执行click事件 buttons内传入 popconfirm:'确定要删除吗？' -->
                            <el-popconfirm :title="i.popconfirm" @confirm="i.click(row)" v-if="i.popconfirm">
                                <template #reference>
                                    <el-button @click.stop :type="i.type || 'primary'" :icon="icons[i.icon]"
                                        :plain="i.plain" :round="i.round" :circle="i.circle"
                                        :link="!(i.plain || i.round || i.circle)" :disabled="i.disabled?.(row)">
                                        {{ i.label }}
                                    </el-button>
                                </template>
                            </el-popconfirm>

                            <!-- 普通按钮 -->
                            <el-button @click.stop="i.click(row)" :type="i.type || 'primary'" :icon="icons[i.icon]"
                                :plain="i.plain" :round="i.round" :circle="i.circle"
                                :link="!(i.plain || i.round || i.circle)" :disabled="i.disabled?.(row)" v-else>
                                {{ i.label }}
                            </el-button>
                        </template>
                    </template>
                </template>


                <!-- 单个框内数据堆叠 -->
                <template v-else-if="(item.prop instanceof Array)" #default="{row}">
                    <el-row v-for="i in item.prop" :key="i.id" style="margin-right: 48px;">
                        {{ i.label }}：{{ row[i.prop] }}
                    </el-row>
                </template>


                <!-- 对象嵌套深度查找 -->
                <template v-else-if="(item.prop instanceof Object)" #default="{row}">
                    <MyItem :data="row[Object.keys(item.prop)[0]]" :title="Object.values(item.prop)[0]"
                        :filter="item.filter">
                    </MyItem>
                </template>


                <!-- 普通数据 -->
                <template v-else #default="{row}">
                    <!-- 多行 -->
                    <el-row v-for="i in row[item.prop]" v-if="Array.isArray(row[item.prop])">
                        {{ i }}
                    </el-row>

                    <!-- 过滤 | 基本 -->
                    <span v-else>{{ item.filter?.(row[item.prop],row) ?? row[item.prop] }}</span>
                </template>

            </el-table-column>
        </el-table>
    </div>
    <div class="Pagination" v-if="dataNum !== false">
        <span>共{{ dataNum }}条数据</span>
        <el-pagination :current-page="pag.page" :page-size="pag.limit" :small="false" :disabled="false" background
            layout="sizes, prev, pager, next, jumper" :total="dataNum" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 40]" :default-page-size="15" />
    </div>
</template>

<script setup lang="jsx">
/**
 * 自适应高：父盒子加display: flex; flex-direction: column;
 * @tableTitle 制定表格基本框架，格式[{}]，对象内属性：label表头必填，prop对应字段必填，width可选；
 * @tableData 展示数据，格式[{}]，对象内属性须和prop字段对应；
 * @checkbox 多选框，为true开启；
 * @checkList 多选框默认选中 传[{}]格式 数组内部必须为相同引用地址的对象
 * @rank 序号
 * @loading  加载load
 * @headerBackground 表头背景色
 * 
 * @属性透传 stripe斑马纹/ border纵边框/ show-header是否显示表头/ size列表大小large|default|small
 * 
 数据格式    不要解锁注释！！！！！！！！！！！！！！！
 const tableTitle = [{
     label: '案件编号',
     prop: { ajbh: { zt2: 'zt3' } },
 }, {
     label: '案件名称',
     prop: 'ajmc',
     width: '100px',
 }, {
     label: '案件类型',
     prop: [{ label: '类型1', prop: 'ajlx' }, { label: '类型2', prop: 'ajlx2' }, { label: '类型3', prop: 'ajlx23' },],
 }, {
     label: '物证时数量',
     prop: 'wzssl',
     sortable: (a, b) => a > b                //排序规则
 }, {
    label: '操作',
    buttons: [
        { label: '信息侦察', click: (e) => { } },
        { label: '查看', type: 'success', click: (e) => { dialog.value.openWindow({title:'查看'}) } },
        { label: '编辑', type: 'warning', click: (e) => { dialog.value.openWindow({title:'编辑'}) } },
        { label: '删除', type: 'danger', click: (e) => { console.log(e); } },
    ],
}];
 const tableData = ref([{
     ajbh: { zt2: { zt3: '好' } },
     ajmc: ['111', 222, 'AsdjlkashdalksjdlJdslkasjdlaksd'],
     ajlx: '123',
     ajlx2: '133',
     ajlx23: '1443',
     wzssl: '1'
 }, {
     ajbh: { zt2: { zt3: '不好' } },
     ajmc: ['111', 222, 'AsdjlkashdalksjdlJdslkasjdlaksd'],
     ajlx: '',
     ajlx2: '123',
     ajlx23: '123',
     wzssl: '2'
 }]);


数组对象反复嵌套查找规则
const tableTitle = [
     { label: '服务行业领域', prop: { serviceIndustryBaseDataList: [{ sd: ['dsd'] }] } },
];
const tableData = [{
        serviceIndustryBaseDataList: [
            { 
                sd: [
                    { dsd: 123 },
                    { dsd: 124 },
                ]
            },
            { 
                sd: [
                    { dsd: 125 },
                    { dsd: 126 },
                ]
            },
        ]
}];




 */

import { reactive, ref, onMounted, defineComponent, nextTick, watch } from "vue";
import * as icons from '@element-plus/icons-vue';

const prop = defineProps({
    tableTitle: { type: Object, default: [], required: true },
    tableData: { type: Object, default: [], required: true },
    checkbox: { type: Boolean, default: false },
    checkList: { type: Object, default: [] },
    rank: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    headerBackground: { type: String, default: '#f5f7fa' },
    load: { type: Function, default: () => new Promise(() => { }) },
    dataNum: { type: [Number, Boolean], default: false },
    rowKey: { type: String, default: 'id' },
    treeProps: { type: Object, default: { children: 'children', hasChildren: 'hasChildren' } },
    showOverflowTooltip: { type: Boolean, default: true },
});



//jsx组件递归深度查找
const MyItem = defineComponent({
    props: ['data', 'title', 'filter'],
    setup(props) {
        const render = () => {
            return (
                <>
                    {
                        Object.prototype.toString.call(props.title) === '[object Object]' ?
                            <MyItem data={props.data[Object.keys(props.title)[0]]} title={Object.values(props.title)[0]} filter={props.filter} />
                            :
                            Object.prototype.toString.call(props.title) === '[object Array]' ?
                                props.data.map(item => (
                                    Object.prototype.toString.call(props.title[0]) === '[object Object]' ?
                                        <MyItem data={item[Object.keys(props.title[0])[0]]} title={Object.values(props.title[0])[0]} filter={props.filter} />
                                        :
                                        <el-row>{item[props.title[0]]}</el-row>
                                ))
                                :
                                <span>{(props.filter?.(props.data[props.title], props.data)) ?? props.data[props.title]}</span>
                    }
                </>
            );
        };
        return render;
    }
});



//点击行
const onRow = (row) => {
    //开启多选功能 && 非阔选文字 && 点击行选中多选框
    prop.checkbox && !window.getSelection().toString() && tableRef.value.toggleRowSelection(row);
    tableRef.value.toggleRowExpansion(row);
};
//多选框状态改变时触发
const checkList = ref([]);
const handleSelectionChange = (val) => {
    checkList.value = val;
};
//默认选中多选框  多选框状态回显
const tableRef = ref([]);
function getChackData(rows) {
    if (rows.length) {
        rows.forEach(row => {
            tableRef.value.toggleRowSelection(row);
        });
    } else {
        tableRef.value.clearSelection();
    };
};
//重新计算选中
function update() {
    // tableRef.value.clearSelection();
    getChackData(prop.checkList)
}



//开关功能 + loading
const beforeChange = async (row, fn) => {
    row.switchLoading = true;
    await fn(row);
    row.switchLoading = false;
    return true
};

//树形懒加载
const onLoad = async (row, treeNode, resolve) => {
    resolve(await prop.load());
};





//分页器
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
});






// 清空选中项
const cleatCHeckedData = () => {
    tableRef.value.clearSelection();
}


onMounted(() => {
    getChackData(prop.checkList); //回显多选框状态
});
// watch(() => prop.checkList, () => {
//     getChackData(prop.checkList); //回显多选框状态
// })

//抛出多选框状态
defineExpose({ checkList, update,cleatCHeckedData });

</script>

<style lang="scss" scoped>
#tableBox {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 0;
    min-width: 100%;
}

.Pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;

    >span {
        color: #666;
    }
}

// :deep(.el-tooltip) {
//     display: flex;
//     align-items: center;
//     align-content: space-evenly;
// }
</style>