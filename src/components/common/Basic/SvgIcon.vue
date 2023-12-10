<template>
  <svg aria-hidden="true" class="svg-icon" :style="{ width: width, height: height, color: color }">
    <use :xlink:href="symbolId" />
  </svg>
</template>
   
<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "SvgIcon",
  props: {
    // 使用的svg图标名称，也就是svg文件名
    name: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      default: "icon",
    },
    color: {
      type: String,
      default: "inherit", // 继承
    },
    width: {
      type: String,
      default: 'inherit'
    },
    height: {
      type: String,
      default: 'inherit'
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId };
  },
});
</script>
   
<style scope>
.svg-icon {
  fill: currentColor;
  outline: none;
}
</style>