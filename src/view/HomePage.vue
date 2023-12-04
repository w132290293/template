<template>
    <div id="HomePage">
        <header></header>
        <main>
            <div class="menu">
                <w-menu />
            </div>
            <div class="content">
                <!-- 添加路由组件 -->
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </div>
        </main>

    </div>
</template>

<script setup lang="ts">

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
    }

    >main {
        display: flex;
        flex: 1;

        >.menu {
            width: 300px;
            height: 100%;
        }

        >.content {
            flex: 1;
            height: 100%;
        }
    }
}
</style>