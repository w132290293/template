<template>
  <div style="background-color: rgb(145, 145, 251);">
    <div>
      <el-checkbox v-model="checked1" label="Option 1" size="large" />
      <el-checkbox v-model="checked2" label="Option 2" size="large" />
    </div>
    <div>
      <el-checkbox v-model="checked3" label="Option 1" />
      <el-checkbox v-model="checked4" label="Option 2" />
    </div>

    <SvgIcon name="nav-vue" width="24px" height="24px" />

    <B />
  </div>
</template>
<script setup lang="ts">
const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)

console.log(import.meta.env.BASE_URL);
console.log(import.meta.env.MODE);
console.log(import.meta.env.DEV);


</script> 
<style scoped lang="scss">
div {
  @include _demo();
}
</style>
