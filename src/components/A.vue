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
    </div>
</template>

<script setup>
const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)

const store = useStore()

console.log(store.name);

store.increment()
console.log(store.doubleCount);
</script>

<style lang="scss" scoped></style>