<!-- 菜单 -->
<template>
  <el-menu :default-active="active" unique-opened>
    <slot name="header">
    </slot>
    <template v-for="item in route.matched[index].children">
      <menuItem v-if="!item.meta?.isShowPath" :item="item">
      </menuItem>
    </template>
    <div style="margin-top:auto;margin-bottom: 24px;">
      <slot name="footer"></slot>
    </div>

  </el-menu>
</template>

<script setup lang="jsx">
/**
 * @属性透传 可在组件外部直接传入 background-color text-color 等el-menu自带属性,collapse 控制菜单开合
 * 
 * 原理：利用route.matched[0]的树形结构递归渲染菜单列表，所以router对象切记不可平铺，需要根据项目的菜单结构分好父子等级。
 * 用法：修改router对象的meta属性即可 meta:{
 *                                        title: '标题',
 *                                        index: '1-1', //层级
 *                                        icon|svg|img: 'User' //图片需要require引入，svg需要封装且配置config，elementPlus需要main.js全局引用 教程(ctrl + 单击)：https://element-plus.gitee.io/zh-CN/component/icon.html#%E6%B3%A8%E5%86%8C%E6%89%80%E6%9C%89%E5%9B%BE%E6%A0%87
 *                                       }
 */

// import { computed, ref, resolveComponent, h, defineComponent } from "vue";
// import { useRoute, useRouter } from "vue-router";
// import { useStore } from "@/stores";

defineProps({
  index: {
    type: Number,
    default: 0
  }
})

const route = useRoute();
console.log(route.matched);
const active = computed(() => route.meta.index); //获取路由元信息

//菜单内容 组件递归
const menuItem = defineComponent({
  props: {
    item: { type: Object, required: true },
  },

  setup(props) {
    const router = useRouter();
    const render = () => {
      const { item, item: { meta } } = props;
      const slots = {
        title: () => {
          return <div style="display:flex;align-items:center;">
            <el-icon>
              {meta.icon ? h(resolveComponent(meta.icon)) : meta.svg ? <SvgIcon name={meta.svg} /> : meta.img ? <img src={meta.img} /> : null}
            </el-icon>
            <span>{meta.title}</span>
          </div>
        }
      };
      return item.children ?
        (item.children.filter(item => !item.meta?.isShowPath).length ? <el-sub-menu index={meta.index} v-slots={slots}  >
          {item.children.map(i => <menuItem item={i} key={i.index} />)}
        </el-sub-menu> : (!item.meta?.isShowPath ? <el-menu-item onClick={() => { router.push({ path: item.path }) }} index={meta.index} v-slots={slots} /> : <span></span>))
        :
        (!item.meta?.isShowPath ? <el-menu-item onClick={() => { router.push({ path: item.path }) }} index={meta.index} v-slots={slots} /> : <span></span>)
    };
    return render;
  }
});

</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
}

::v-deep .el-menu-item {
  display: flex;
  // border-radius: 6px;
  height: 48px;
  margin: 4px 0;
  // color: #A3A4A9;
  overflow: hidden;
  font-size: 16px;
  font-weight: 300;
}

// ::v-deep .el-menu--inline {
//   padding: 0 24px;
//   box-sizing: border-box;
// }

::v-deep .el-menu-item.is-active {
  // background: #414D60;
  // color: #fff !important;
}

::v-deep .el-sub-menu__title {
  font-size: 18px;
}
</style>