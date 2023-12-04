<!-- 完整版 -->

<!-- form表单 -->
<template>
    <el-form :model="formData" label-width="120px" class="forms" ref="ruleFormRef" :rules="rules">

        <div class="boxs" v-for="(brItem, index) in formTitle" :key="index">
            <el-row :gutter="24" v-for="(item, idx) in brItem" :key="idx">
                <el-col :span="i.span || 8" v-for="i in item" :key="i.prop">

                    <!-- 标题 -->
                    <h4 v-if="i.type === 'title'" style="font-size: 16px;margin: 0 0 12px 12px;">{{ i.label }}</h4>



                    <!-- 单选框组 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'radio'" :prop="i.prop">
                        <el-radio-group v-model="formData[i.prop]">
                            <el-radio :label="e.value" size="default" v-for="e in i.options" :key="e.value"
                                :border="i.border" :disabled="i.disabled">
                                {{ e.label }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>


                    <!-- 多选框组 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'checkbox'" :prop="i.prop">
                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate && !!formData[i.prop]?.length"
                            @change="handleCheckAllChange($event, i)" v-if="i.checkAll" :border="i.border"
                            :disabled="i.disabled" style="margin-right: 30px">全选</el-checkbox>

                        <el-checkbox-group v-model="formData[i.prop]" @change="handleCheckedCitiesChange($event, i)">
                            <el-checkbox :label="e.value" v-for="e in i.options" :key="e.value" :disabled="i.disabled"
                                :border="i.border">
                                {{ e.label }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>


                    <!-- 下拉框 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'select'" :prop="i.prop">
                        <el-select v-model="formData[i.prop]" :placeholder="i.placeholder || '请选择'"
                            :disabled="i.disabled?.()" fit-input-width clearable :multiple="i.multiple">
                            <el-option v-for="e in  isRef(i.options) ? i.options.value : i.options"
                                :key="i.props ? e[i.props.value] : e.value" :label="i.props ? e[i.props.label] : e.label"
                                :value="i.props ? e[i.props.value] : e.value" />
                        </el-select>
                    </el-form-item>


                    <!-- 级联选择 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'cascader'" :prop="i.prop">
                        <el-cascader v-model="formData[i.prop]" :options="isRef(i.options) ? i.options.value : i.options"
                            :placeholder="i.placeholder || '请选择'" clearable :disabled="i.disabled?.()"
                            :show-all-levels="!i.showAllLevels"
                            :props="i.props || { label: 'label', value: 'value', children: 'children' }" />
                    </el-form-item>


                    <!-- 日期范围选择框 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'daterange'" :prop="i.prop">
                        <el-date-picker v-model="formData[i.prop]" type="daterange" range-separator="-"
                            start-placeholder="开始日期" end-placeholder="结束日期" :value-format="i.format || 'YYYY-MM-DD'"
                            :disabled="i.disabled" unlink-panels />
                    </el-form-item>


                    <!-- 日期框 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'date'" :prop="i.prop">
                        <el-date-picker v-model="formData[i.prop]" type="date" :placeholder="i.placeholder || '选择日期'"
                            :value-format="i.format || 'YYYY-MM-DD'" :disabled="i.disabled" />
                    </el-form-item>

                    <!-- 日期时间选择框 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'datetime'" :prop="i.prop">
                        <el-date-picker v-model="formData[i.prop]" type="datetime" range-separator="-"
                            start-placeholder="开始时间" end-placeholder="结束时间" :disabled="i.disabled"
                            :value-format="i.format || 'YYYY-MM-DD HH:mm:ss'" />
                    </el-form-item>

                    <!-- 日期时间范围选择框 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'datetimerange'" :prop="i.prop">
                        <el-date-picker v-model="formData[i.prop]" type="datetimerange" range-separator="-"
                            start-placeholder="开始时间" end-placeholder="结束时间" :disabled="i.disabled"
                            :value-format="i.format || 'YYYY-MM-DD HH:mm:ss'" />
                    </el-form-item>


                    <!-- 文本域 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'textarea'" :prop="i.prop">
                        <el-input v-model="formData[i.prop]" :rows="i.rows || 2" type="textarea"
                            :placeholder="i.placeholder || '请输入...'" :disabled="i.disabled" />
                    </el-form-item>



                    <!-- 开关 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'switch'" :prop="i.prop">
                        <el-switch v-model="formData[i.prop]" inline-prompt :active-icon="icons.Check"
                            :inactive-icon="icons.Close" />
                    </el-form-item>


                    <!-- 上传 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'upLoad'">
                        <el-upload action="" :auto-upload="false" :list-type="i.listType || 'text'"
                            v-model:file-list="fileList" :http-request="() => { }"
                            :on-change="(uploadFile, uploadFiles) => upLoadChange(uploadFile, uploadFiles, i.change)">
                            <template #trigger>
                                <el-button type="warning">选择文件</el-button>
                                <div class="el-upload__tip">
                                    &nbsp {{ i.placeholder }}
                                </div>
                            </template>

                            <template #file="{ file }" v-if="i.listType === 'picture-card'">
                                <div>
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                            <el-icon><zoom-in /></el-icon>
                                        </span>
                                    </span>
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>


                    <!-- 直接上传 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'onUpLoad'">
                        <el-upload :action="i.action" multiple :data="i.data" :name="i.prop" style="width:100%"
                            :on-success="(response, uploadFile, uploadFiles) => { i.success?.({ response, uploadFile, uploadFiles }) }"
                            :before-upload="(rawFile) => { i.beforeUpload?.(rawFile) }" :limit="i.limit" :drag="i.drag"
                            :list-type="i.listType" :accept="i.accept" :headers="i.headers"
                            :on-remove="(uploadFile, uploadFiles) => { i.remove?.({ uploadFile, uploadFiles }) }">
                            <template #trigger>
                                <div v-if="i.drag">
                                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                                    <div class="el-upload__text">
                                        拖拽或 <em>点击上传</em>
                                    </div>
                                </div>
                                <el-button type="warning" plain v-else>选择文件</el-button>
                            </template>

                            <!-- <template #file="{ file }" v-if="i.file">
                                <img w-full :src="i.file?.(file)" alt="Preview Image" />
                            </template> -->

                            <template #default v-if="i.a">
                                <template v-for="(k, idx) in i.fileList">
                                    <a style="margin-left: 6px;" target="_blank" :key="idx" v-if="k.type === i.a.type"
                                        :href="(i.a.before ?? '') + k[i.a.value] + (i.a.after ?? '')">{{ k[i.a.label] }}</a>
                                </template>
                            </template>

                            <template #default v-else-if="i.info">
                                <a style="margin-left: 6px;" target="_blank" :href="i.info.url">{{ i.info.name }}</a>
                            </template>

                            <template #tip v-if="i.placeholder">
                                <div class="el-upload__tip text-red">
                                    {{ i.placeholder }}
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>









                    <!-- 按钮 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else-if="i.type === 'button' || i.buttons">
                        <template v-for="  e   in   i.buttons  ">
                            <template v-if="!e.hidden?.(formData)">

                                <!-- 二次确认提示框 点击确认后才执行click事件 -->
                                <el-popconfirm :title="e.popconfirm" @confirm="e.click(formData)" v-if="e.popconfirm">
                                    <template #reference>
                                        <el-button :type="e.type" :icon="icons[e.icon]" :plain="e.plain" :round="e.round"
                                            :circle="e.circle" :link="e.link" :disabled="e.disabled?.(formData)">
                                            {{ e.label }}
                                        </el-button>
                                    </template>
                                </el-popconfirm>

                                <!-- 普通按钮 -->
                                <el-button v-else @click="e.click(formData)" :type="e.type" :icon="icons[e.icon]"
                                    :plain="e.plain" :round="e.round" :circle="e.circle" :link="e.link"
                                    :disabled="e.disabled?.(formData)">
                                    {{ e.label }}
                                </el-button>
                            </template>
                        </template>
                    </el-form-item>



                    <!-- input框 -->
                    <el-form-item :label="i.label && i.label + ':'" v-else :prop="i.prop">
                        <el-input v-model="formData[i.prop]" :disabled="i.disabled" v-if="i.prop || i.prop === ''"
                            :placeholder="i.placeholder || (Object.keys(rules).find(k => k === i.prop) && '请输入')"
                            :prefix-icon="i.prefix" :suffix-icon="i.suffix">
                            <!-- 组合框-前 -->
                            <template #prepend v-if="i.prepend">

                                <!-- 选择框 -->
                                <el-select v-model="formData[i.prepend.prop]" :placeholder="i.prepend.placeholder || '请选择'"
                                    :disabled="i.prepend.disabled" fit-input-width clearable style="margin:0"
                                    v-if="i.prepend.type === 'select'">
                                    <el-option v-for="  e   in   i.prepend.options  " :key="e.value" :label="e.label"
                                        :value="e.value" />
                                </el-select>

                                <!-- 级联选择 -->
                                <el-cascader v-model="formData[i.prepend.prop]" :options="i.prepend.options" clearable
                                    v-else-if="i.prepend.type === 'cascader'" :placeholder="i.prepend.placeholder || '请选择'"
                                    :disabled="i.prepend.disabled" />

                                <!-- 输入框 -->
                                <el-input v-model="formData[i.prepend.prop]" :disabled="i.prepend.disabled"
                                    v-else-if="i.prepend.type === 'input'" :placeholder="i.prepend.placeholder" />

                                <!-- 文本 -->
                                <span style="padding: 0 12px;" v-else>
                                    {{ i.prepend.label ?? formData[i.prepend.prop] }}
                                </span>
                            </template>
                            <!-- 组合框-后 -->
                            <template #append v-if="i.append">

                                <!-- 普通按钮 -->
                                <el-button @click="i.append.click(formData)" :icon="icons[i.append.icon]"
                                    :disabled="i.append.disabled?.(formData)" v-if="i.append.type === 'button'">
                                    {{ i.append.label }}
                                </el-button>

                                <!-- 文本 -->
                                <span v-else>
                                    {{ i.append.label ?? formData[i.append.prop] }}
                                </span>
                            </template>
                        </el-input>
                    </el-form-item>

                </el-col>
            </el-row>

            <!-- 分割线 -->
            <hr v-if="index < formTitle.length - 1" style="border: 1px solid #f1f1f1;" />
            <br v-if="index < formTitle.length - 1" />

        </div>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="文件预览" />
        </el-dialog>

    </el-form>
</template>

<script setup>
/**
 * @formTitle 控制hr换行分层级[       层级内的所有行[      一行内的所有列[      每个输入框{   label: '年龄',   表头                        必传！
 *                                                                                        prop: 'age'   对应数据key                   必传！
 *                                                                                        span: 8,   所占横向栅格数 一行最大24
 *                                                                                        type: 'textarea',  表单类型
 *                                                                                        border: true,  单多选框添加边框 
 *                                                                                        placeholder:'请输入...',  占位符
 *                                                                                        rows: 4,  文本域高度         
 *                                                                                        checkAll: true, 多选开启全选功能
 *                                                                                        options: [{label:'北京',value:'110000'}], 各种选项
 *                                                                                        buttons:[{label:'查询',click:()=>{}}] 按钮
 *                                                                                        prefix/suffix input框内icon
 *                                                                                        prepend/append input框内嵌套
 *                                                                                     }]]]
 * @formData 默认显示或回显的对象
 * @rules 校验规则 详情见elementPlus  传送门(ctrl + 单击)：https://element-plus.gitee.io/zh-CN/component/form.html#%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C
 * @属性透传 size="large"/default/small  label-width="120px" :disabled="true" 等
 * 
 * 使用方法：传入formTitle即可，需回显或默认显示 传入formData，提交事件异步操作 下滑参考本组件末尾示例↓↓↓
 */

import { ref, isRef, defineExpose, h, render } from "vue";
import { ElMessage } from 'element-plus';
import * as icons from '@element-plus/icons-vue';
import { ZoomIn, UploadFilled } from '@element-plus/icons-vue';


const prop = defineProps({
    formTitle: { type: Object, default: [], required: true },
    formData: { type: Object, default: {} },
    rules: { type: Object, default: [] }
});
const emit = defineEmits(['update:formData']);



//全选框逻辑
const checkAll = ref(false);
const isIndeterminate = ref(true);
const handleCheckAllChange = (val, obj) => {
    // prop.formData.value[obj.prop] = val ? obj.options.map(item => item.value) : [];
    let newData = { ...prop.formData }
    newData[obj.prop] = val ? obj.options.map(item => item.value) : []
    emit('update:formData', newData)
    isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (val, obj) => {
    checkAll.value = val.length === obj.options.length;
    isIndeterminate.value = val.length && val.length < obj.options.length;
};



//表单验证
let flag = true;
let dsq = null;
const ruleFormRef = ref();
const submitForm = async (fn) => {
    if (!ruleFormRef.value) return;
    await ruleFormRef.value.validate(async (valid, fields) => {
        if (valid) {

            //节流
            if (flag) {
                flag = false;
                dsq = setTimeout(() => {
                    flag = true;
                    clearTimeout(dsq);
                    dsq = null;
                }, 1500);

                //fn()回调函数 需return true且接口不报错才可返回提交成功提示，接口的报错提示封装在axios 这里不做处理
                await fn() && ElMessage({ message: '提交成功', type: 'success' });
            };
        } else {
            ElMessage.error('数据项不合格');
        };
    });
};



//上传
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const fileList = ref([]);
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
};
const upLoadChange = (uploadFile, uploadFiles, fn) => {
    fn?.(uploadFiles);
};













//抛出 校验事件
defineExpose({ submitForm });



/**
 * //父组件提交表单调用验证完成异步操作示例
 * const forms = ref();
 * forms.value.submitForm(async () => {
 * 
 *   //调接口
 *     let req = await fetch('https://www.fastmock.site/mock/ab483f927f268caa94b18b230fa370a8/moke/demo', {
 *         method: "POST",
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify(forms.value.formsData)
 *     });
 *     let res = await req.json();
 * 
 *   //拿到返回值 赋值
 *     tableData.value = res.data;
 * 
 *   //抛出true或判断res.code为true 消息提示成功
 *     return true;
 * });
 */

</script>

<style lang="scss" scoped>
:deep(.el-date-editor) {
    //日期框
    flex: 1;
}

:deep(.el-select) {
    //下拉框
    flex: 1;
}

:deep(.el-cascader) {
    //级联选择
    flex: 1;
}

:deep(.el-input-group__prepend) {
    //input框内嵌套前项
    padding: 0;
}

:deep(.el-upload-list) {
    //上传
    margin-top: 0;
}
</style>