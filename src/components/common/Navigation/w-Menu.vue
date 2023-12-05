<!-- 菜单 -->
<template>
  <el-menu :default-active="active" unique-opened :collapse="collapse">
    <slot name="header"></slot>

    <template v-for="item in route.matched[index].children">
      <menuItem v-if="!item.meta?.hidden" :item="item">
      </menuItem>
    </template>

    <slot name="footer"></slot>

  </el-menu>
</template>

<script setup lang="jsx">
//依赖由vite自动引入
//根据目录结构生成的路由 自动生成菜单

defineProps({
  index: { //路由matched起始层级
    type: Number,
    default: 0
  },
  collapse: { //收缩
    type: Boolean,
    default: false
  },
});

const route = useRoute();
const active = computed(() => route.name); //获取高亮状态

//菜单内容 组件递归
const menuItem = defineComponent({
  props: {
    item: { type: Object, required: true },
  },
  setup(props) {
    const router = useRouter();
    const { item } = props;
    const { children, meta } = item;

    // 渲染菜单项的标题
    const renderTitle = () => (
      <span>{meta.title}</span>
    );

    // 渲染菜单项的图标
    const renderMenuIcon = () => (
      <el-icon>
        {
          meta.svg ? <SvgIcon name={meta.svg} /> :
            meta.icon ? h(resolveComponent(meta.icon)) :
              meta.img ? <img src={meta.img} /> : null
        }
      </el-icon>
    );


    // 渲染单个菜单项
    const renderMenuItem = () => {
      const slots = { title: renderTitle };

      return item.meta?.hidden || (
        <el-menu-item onClick={() => { router.push({ path: item.path }) }} index={item.name} v-slots={slots}>
          <renderMenuIcon />
        </el-menu-item>
      );
    };

    // 递归渲染子菜单
    const renderSubMenu = () => {
      const slots = {
        title: () => (
          <>
            {renderMenuIcon()}
            {renderTitle()}
          </>
        )
      };
      const filteredChildren = children.filter(child => !child.meta?.hidden);

      if (filteredChildren.length) {
        const submenuItems = filteredChildren.map(child => (
          <menuItem item={child} key={child.name}>
            <renderMenuIcon />
          </menuItem>
        ));
        return <el-sub-menu index={item.name} v-slots={slots}>{submenuItems}</el-sub-menu>;
      } else {
        return renderMenuItem();
      }
    };

    // 最终渲染
    const render = () => {
      return item.children ? renderSubMenu() : renderMenuItem();
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

// ::v-deep .el-menu-item {
//   display: flex;
//   // border-radius: 6px;
//   height: 48px;
//   margin: 4px 0;
//   // color: #A3A4A9;
//   overflow: hidden;
//   font-size: 16px;
//   font-weight: 300;
// }

// // ::v-deep .el-menu--inline {
// //   padding: 0 24px;
// //   box-sizing: border-box;
// // }

// ::v-deep .el-menu-item.is-active {
//   // background: #414D60;
//   // color: #fff !important;
// }

// ::v-deep .el-sub-menu__title {
//   font-size: 18px;
// }
</style>