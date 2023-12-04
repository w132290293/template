<!-- 完整版 -->

<!-- 按钮 -->
<template>
  <el-form-item v-for="item, index in buttonList" :key="index"
    :style="{ marginBottom: buttonList.length < 2 && index === buttonList.length - 1 ? 0 : '12px' }">

    <template v-for="i in item">
      <!-- buttonList的对象内传入hidden函数判断按钮状态 是否显示，返回值为true则隐藏 -->
      <template v-if="!i.hidden?.()">

        <!-- 二次确认提示框 点击确认后才执行click事件 -->
        <el-popconfirm :title="i.popconfirm" @confirm="i.click" v-if="i.popconfirm">
          <template #reference>
            <el-button :type="i.type" :icon="icons[i.icon]" :plain="i.plain" :round="i.round" :circle="i.circle"
              :link="i.link" :disabled="isRef(i.disabled) ? i.disabled.value : i.disabled?.()" v-bind="$attrs"
              :size="i.size" :style="i.style">
              {{ i.label }}
            </el-button>
          </template>
        </el-popconfirm>

        <!-- 普通按钮 -->
        <el-button @click="i.click" :type="i.type" :icon="icons[i.icon]" :plain="i.plain" :round="i.round" :size="i.size"
          :circle="i.circle" :link="i.link" :disabled="isRef(i.disabled) ? i.disabled.value : i.disabled?.()"
          v-bind="$attrs" v-else :style="i.style">
          {{ i.label }}
        </el-button>

      </template>
    </template>

  </el-form-item>
</template>
                                           
<script setup>
/**
 * @buttonList 按钮数组 [[{ label: '查询', type: 'primary', icon: 'Search', click: query }, { label: '重置', click: () => wxy.clearAllInput(formData.value) }], [{ label: '高级查询', type: 'primary', plain: true, click: query }]]
 * type: 颜色 primary/success/info/warning/danger    字符串类型 type:'primary'
 * icon: 图标 Delete/Edit/Search/Share/Upload    字符串类型 icon:'Search' 按钮内图标仅支持elementPlus 库(ctrl + 单击)：https://element-plus.gitee.io/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88
 * popconfirm: 二次确认提示框 布尔类型true,
 * 其他: 形状 plain/round/circle/link    布尔类型 plain:true
 * 
 * 使用方法：传入buttonList即可，注意上方buttonList示例中查询与重置的事件的写法的区别
 */

import * as icons from '@element-plus/icons-vue'
import { isRef } from 'vue';

defineProps({
  buttonList: {
    type: Object,
    default: [],
    required: true
  }
});

</script>
                                           
<style lang="scss" scoped></style>