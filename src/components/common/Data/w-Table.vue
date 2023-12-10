<!-- 完整版 -->

<!-- 列表 -->
<template>
    <div id="tableBox">
        <el-table :data="tableData" ref="tableRef" :header-cell-style="{ background: 'var(--w-header-bg)' }" v-bind="$attrs"
            style="min-width: 100%; display: flex; flex-direction: column; height: 0;min-height: 100%;" v-loading="loading"
            :load="load && onLoad" highlight-current-row :row-key="rowKey" @row-click="onRow" :tree-props="treeProps"
            @selection-change="handleSelectionChange" @current-change="tableHandleCurrentChange">

            <!-- 多选框 -->
            <el-table-column type="selection" v-if="checked" reserve-selection align="center" fixed="left" />


            <!-- 序号 -->
            <el-table-column type="index" :label="rank" v-if="rank" width="60px" align="center">
                <template #default="{ $index }">
                    <span
                        style="border-radius: 4px;background: var(--w-header-bg);border-radius: 4px;width: 24px;height: 24px;display: inline-block;">
                        {{ $index + 1 + page.start }}
                    </span>
                </template>
            </el-table-column>



            <!-- 渲染数据 -->
            <slot></slot>


        </el-table>
    </div>

    <div class="Pagination" v-if="dataNum !== undefined">
        <span>共{{ dataNum }}条数据</span>
        <el-pagination :current-page="page.page" :page-size="page.limit" background
            layout="sizes, prev, pager, next, jumper" :total="dataNum" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 40]" :default-page-size="15" />
    </div>
</template>

<script setup lang="ts">
/**
 * 自适应高：父盒子加display: flex; flex-direction: column;
 * @tableData 展示数据，格式[{}]，对象内属性须和prop字段对应；
 * @checked 多选框，为[]开启； 必须是ref 不能写reactive ！！！！！
 * @rank 序号
 * 
 * @其他 stripe斑马纹/ border纵边框/ show-header是否显示表头/ size列表大小large|default|small
 * 
 */

const prop = defineProps({
    tableData: { type: Object, default: [], required: true },
    checked: { type: [Boolean, Object], default: false }, // 多选
    radio: { type: [Boolean, Object], default: false }, // 单选
    rank: { type: String, default: '' },
    load: { type: Function, default: () => new Promise(() => { }) },
    dataNum: { type: Number },
    rowKey: { type: String, default: 'id' },
    treeProps: { type: Object, default: { children: 'children', hasChildren: 'hasChildren' } },
    loading: { type: Boolean, default: false },
    page: {
        type: Object,
        default: {
            page: 1,
            limit: 15,
            start: 0
        }
    },
});
const emit = defineEmits(['query', 'update:checked', 'update:radio']);


const tableRef = ref();
//点击行
const onRow = (row: any) => {
    // 开启多选功能 && 非阔选文字 && 点击行选中多选框
    if (prop.checked && !window.getSelection()?.toString()) tableRef.value?.toggleRowSelection(row);

    // 单选清除
    if (prop.radio && (row === prop.radio)) tableRef.value?.setCurrentRow()

    // 
    // tableRef.value?.toggleRowExpansion(row);

};
//多选框状态改变时触发
const handleSelectionChange = (value: any) => {
    emit('update:checked', value)
};
//默认选中多选框  多选框状态回显
function getChackData(rows: any) {
    if (rows?.length) {
        rows.forEach((row: any) => {
            tableRef.value?.toggleRowSelection(row);
        });
    } else {
        tableRef.value?.clearSelection();
    };
};
//重新计算选中
function updateSelection() {
    // tableRef.value.clearSelection();
    getChackData(prop.checked)
}

// 单选
const tableHandleCurrentChange = (currentRow: any, oldCurrentRow: any) => {
    emit('update:radio', currentRow)
}


//开关功能 + loading
// const beforeChange = async (row, fn) => {
//     row.switchLoading = true;
//     await fn(row);
//     row.switchLoading = false;
//     return true
// };

//树形懒加载
const onLoad = async (row: any, treeNode: any, resolve: any) => {
    resolve(await prop.load());
};








//分页器
//接口参数
const page = reactive({ ...prop.page });
//修改每页显示条数
const handleSizeChange = (val: any) => {
    page.limit = val;
    page.start = (page.page - 1) * page.limit;
    emit('query', page);
};
//跳转指定页面事件
const handleCurrentChange = (val: any) => {
    page.page = val;
    page.start = (page.page - 1) * page.limit;
    emit('query', page);
};
//jump绑定的query事件内引用了forms组件内的数据，需等待forms组件创建完成再执行emit('query', page);
nextTick(() => {
    emit('query', page); //页面加载后立即调用一次jump绑定的函数 一般为query
});






// 清空选中项
const cleatCHeckedData = () => {
    tableRef.value?.clearSelection();
}


onMounted(() => {
    getChackData(prop.checked); //回显多选框状态
});
// watch(() => prop.checkList, () => {
//     getChackData(prop.checkList); //回显多选框状态
// })

//抛出多选框状态
defineExpose({ updateSelection, cleatCHeckedData });

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

:deep(.el-table) {

    .cell {
        white-space: nowrap;
    }
}


// :deep(.el-tooltip) {
//     display: flex;
//     align-items: center;
//     align-content: space-evenly;
// }
</style>