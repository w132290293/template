<template>
    <el-col :span="span">
        <el-form-item :label="label" :prop="prop">
            <el-select v-bind="$attrs" placeholder="请选择" clearable>
                <el-option v-for="item in options" :key="item[props.value]" :label="item[props.label]"
                    :value="item[props.value]" :disabled="item[props.disabled]" />
            </el-select>
        </el-form-item>
    </el-col>
</template>

<script setup lang="ts">
interface Props {
    label: string
    value: string
    disabled: string
}

withDefaults(
    defineProps<{
        span?: number,
        label?: string,
        props?: Props | any,
        prop?: string
        options: any,
    }>(),
    {
        span: 6,
        label: '',
        props: {
            label: 'label',
            value: 'value',
            disabled: 'disabled'
        }
    }
)

</script>

<style scoped>
.el-select {
    flex: 1;
}
</style>