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

        <router-link :to="{ name: 'twoOne-twoTwo-twooCopy' }">gogogo</router-link>
        <div class="box">
            <router-view></router-view>
        </div>


        <ul>
            <li :class="'item' + index" v-for="(item, index) in 6" :key="index">{{ index }}sad大苏打</li>
        </ul>
    </div>
</template>

<script setup lang="ts">

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(false)
</script>

<style scoped lang="scss">
.box {
    width: 500px;
    height: 300px;
    border: $_dashed;
}


// @include _revolution(6, 200px, 77deg);

// ul {
// transform: rotateX(-77deg);
//     margin-left: 200px;

//     @for $i from 0 through 5 {
//         .item#{$i} {
//             animation: revolution#{$i} 10s linear infinite;
//             font-size: 20px;
//         }
//     }
// }
</style>