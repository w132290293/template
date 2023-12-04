<!-- 完整版 -->

<!-- 标题 -->
<template>
    <div class="titles">
        <span>{{ title }}</span>

        <!-- 拓展 -->
        <slot></slot>
    </div>
</template>

<script setup>
/**
 * @title 标题
 * @fontSize 字体大小
 */

defineProps({
    title: {
        type: String,
        default: ''
    },
    fontSize: {
        type: String,
        default: '24px'
    }
});

</script>

<style lang="scss" scoped>
.titles {
    color: #333;
    font-size: 24px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    user-select: none;

    &::before {
        content: '';
        border: 2px solid #365ade;
        margin-right: 12px;
        background: #2E53DB;
        border-radius: 12px;
        height: 75%;
    }

    >span {
        margin-right: 24px;
    }
}
</style>