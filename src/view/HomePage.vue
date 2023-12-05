<template>
    <div id="HomePage">
        <header>
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
                <el-radio-button :label="false">expand</el-radio-button>
                <el-radio-button :label="true">collapse</el-radio-button>
            </el-radio-group>

            <!-- 导航栏 -->
            <nav>导航栏</nav>
        </header>
        <main>
            <!-- 菜单 -->
            <w-menu :collapse="isCollapse">
                <template #header>
                    <el-menu-item style="pointer-events: none;">
                        <el-icon>
                            <svg-icon name="vue" />
                        </el-icon>
                        <span>LOGO & TITLE</span>
                    </el-menu-item>
                </template>
            </w-menu>

            <div class="content">
                <!-- 面包屑 -->
                <w-breadcrumb />

                <!-- 添加路由组件 -->
                <router-view v-slot="slot">
                    <keep-alive :include="isInclude">
                        <component :is="slot.Component" />
                    </keep-alive>
                </router-view>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const isCollapse = ref(false);

//获取需要keepAlive缓存的数组
function getIncluce(data: any) {
    let arr: any = [];
    data.children.forEach((item: any) => {
        if (item.meta.keepAlive) {
            arr.push(item.name.split('-')?.pop())
        };
        if (item.children.length) {
            arr = arr.concat(getIncluce(item))
        };
    });

    return arr
};
const isInclude = getIncluce(route.matched[0]);



</script>

<style scoped lang="scss">
#HomePage {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    >header {
        height: 48px;
        width: 100%;
        display: flex;
    }

    >main {
        display: flex;
        flex: 1;

        >.menu {
            height: 100%;
        }

        >.content {
            flex: 1;
            height: 100%;
        }
    }
}
</style>