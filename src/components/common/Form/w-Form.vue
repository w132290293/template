<template>
    <el-form label-width="120px" ref="formRef">
        <slot></slot>
    </el-form>
</template>

<script setup lang="ts">

const formRef = ref<any>();

/**
 * @description 表单验证函数
 * 
 * @param {function} success 成功回调
 * @param {function} failure 失败回调
 * @returns {Promise<boolean> | undefined} promise 处理异步
 */
function submit(success: any, failure?: any): Promise<boolean> | undefined {
    if (!formRef.value) return;
    const prms: Promise<boolean> = new Promise((res: any, rej: any) => {
        formRef.value.validate((valid: any, fields: any) => {
            if (valid) {
                console.log('提交成功!');
                success();
                res(true);
            } else {
                console.log('提交失败!', fields);
                failure?.();
                rej(false);
            }
        });
    })

    return prms
}

defineExpose({
    submit
})
</script>

<style scoped></style>