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
        <div class="box">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, rem harum magnam ipsam quasi est voluptatibus
            rerum, porro dignissimos placeat quis alias tempore magni aspernatur natus quo consequatur deserunt soluta.
        </div>
        <div class="nav">
            <div class="nav-left">1</div>
            <div class="nav-right">2</div>

            <SvgIcon name="vue" />
            <el-button @click="submit" :loading="loading">提交</el-button>
        </div>
    </div>
</template>

<script setup>
const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)

const d = reactive({ aa: 99 })

const { login, getUserInfo } = api;

login(d)

const loading = ref(false);

const submit = async () => {
    try {
        loading.value = true;
        const { data } = await login(d);
        console.log(data);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 300px;
    @include _textEllipsis(2);
}

.nav {

    &-left {
        color: red;
    }

    &-right {
        color: green;
    }
}
</style>