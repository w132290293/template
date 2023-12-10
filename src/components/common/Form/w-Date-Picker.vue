<!-- 日期选择器 -->
<template>
    <el-col :span="span">
        <el-form-item :label="label" :prop="prop.prop">
            <el-date-picker v-bind="$attrs" :type="type" range-separator="-" placeholder="选择日期" start-placeholder="开始日期"
                end-placeholder="结束日期" :disabled-date="disabledDateFn" value-format="YYYY-MM-DD" />
        </el-form-item>
    </el-col>
</template>

<script setup lang="ts">

const prop = withDefaults(
    defineProps<{
        span?: number,
        label?: string
        type?: 'date' | 'daterange'
        disabledDate?: boolean
        prop?: string
    }>(),
    {
        span: 6,
        label: '',
        type: 'date',
        disabledDate: true
    }
);


// 判断该日期是否被禁用
const disabledDateFn = (time: any) => {
    return prop.disabledDate && time.getTime() > Date.now();
};

</script>

<style scoped>
:deep(.el-date-editor.el-input) {
    flex: 1;
}
</style>