<template>
    <div>
        {{ 111 }}
        <el-date-picker v-model="value1" type="date" placeholder="Pick a day" />
    </div>
</template>

<script setup lang="ts">


const value1 = ref('');
console.log(dayjs(new Date).format('YYYY-MM-DD(dddd) HH:mm:ss'));



</script>

<style scoped></style>