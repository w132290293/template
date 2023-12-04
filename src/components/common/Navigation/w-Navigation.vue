<!-- 未完成 -->

<!-- 顶部导航栏 -->
<template>
    <div class="navigation">
        <div class="navigation_left">
            <slot name="left">

            </slot>
        </div>


        <div class="navigation_middle">
            <slot name="middle">

            </slot>
        </div>

        <div class="navigation_right">
            <slot name="right">

            </slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';



</script>

<style scoped lang="scss">
.navigation {
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    background: white;
    box-shadow: 0 4px 4px 0 #b7b7b733;
    color: #333;

    >.navigation_left {
        height: 100%;
        display: flex;
        align-items: center;
    }

    >.navigation_middle {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;

    }

    >.navigation_right {
        height: 100%;
        display: flex;
        justify-content: end;
        align-items: center;

    }
}
</style>