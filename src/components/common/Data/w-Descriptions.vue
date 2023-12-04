<!-- 展示表格 -->
<template>
    <el-descriptions title="" :column="2" border size="large">
        <el-descriptions-item :label="item.label" label-align="right" align="center" v-for="(item, index) in textTitle"
            :key="index" :span="item.span">

            <!-- 图片 -->
            <div :style="{ height: item.height }" v-if="item.type === 'img'" class="img">
                <img :src="textData[item.prop]" alt="">
            </div>


            <!-- tag标签 -->
            <el-tag :type="item.type" :effect="item.effect" :round="item.round" :size="item.size"
                v-else-if="item.type && item.type !== 'img'">
                {{ item.label }}
            </el-tag>


            <!-- 基本数据 -->
            <span v-else>
                {{ textData[item.prop] }}
            </span>

        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
/**
 * @textTitle 表头
 * @textData 数据
 * 
 * @透传
 *  title 标题
 *  colum 每行列数 
 *  type颜色 success/info/warning/danger
 *  effect主题 dark/light/plain
 */

defineProps({
    textTitle: {
        type: Object,
        default: []
    },
    textData: {
        type: Object,
        default: {}
    }
})


// 用法
// <Descriptions :textTitle="textTitle" :textData="textData" title="123" />
// const textTitle = [
//     { label: '姓名', prop: 'name', height: '300px', type: 'img' },
//     { label: '年龄', prop: 'age' },
//     { label: '状态', prop: 't', type: 'warning' },
// ]

</script>

<style lang="scss" scoped>
.img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    >img {
        flex: 1;
        max-width: 100%;
    }
}
</style>