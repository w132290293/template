<template>
    <div>
        <div>
            <el-checkbox v-model="checked1" label="Option 1" size="large" />
            <el-checkbox v-model="checked2" label="Option 2" size="large" />
        </div>
        <div>
            <el-checkbox v-model="checked3" label="Option 1" />
            <el-checkbox v-model="checked4" label="Option 2" />
        </div>
        <div>
            <el-checkbox v-model="checked5" label="Option 1" size="small" />
            <el-checkbox v-model="checked6" label="Option 2" size="small" />
        </div>
        <div>
            <el-checkbox v-model="checked5" label="Option 1" size="small" disabled />
            <el-checkbox v-model="checked6" label="Option 2" size="small" disabled />
        </div>

        <el-button @click="() => toggleDark()">切换主题</el-button>
        <el-switch v-model="isDark" inline-prompt active-icon="icon-Check" inactive-icon="icon-Close" />
        <el-icon>
            <icon-Check />
        </el-icon>

        <A v-model:abc="abc" />
        {{ abc }}
    </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
watch(isDark, (v) => {
    console.log(v);
});

const abc = ref('123')
const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(false)
</script>

<style scoped></style>