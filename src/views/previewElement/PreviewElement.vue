<template>
    <div class="layout justifyCenter" style="flex-direction: column;">
        <el-page-header class="page-header-group" icon="ArrowLeft" @back="goToEdit">
            <template #content>
                <span class="page-header-title"> 预览页面 </span>
            </template>
        </el-page-header>
        <el-scrollbar class="scrollbar-container justifyCenter">
            <el-form ref="previewFormRef" class="element-form" :model="FormData" scroll-to-error hide-required-asterisk
                label-position="top">
                <div class="form-title bothCenter">
                    问卷大标题
                </div>
                <el-form-item v-for="(element, index) in editStore.evaluationForm"
                    :class="(editStore.evaluationForm[index + 1] != undefined && editStore.evaluationForm[index + 1].elementId == element.elementId) ? 'none-margin-el-form-item' : ''"
                    :prop="element.elementId" :key="element.elementId"
                    :rules="[
            { required: element.required, message: ' 第' + (element.groupCode == 1 ? editStore.getQuestionIndex(index) : '') + '题为必填项' }]">
                    <template #label>
                        <span class="question-title-group">
                            <span class="question-title-required">
                                {{ element.required ? '* ' : '' }}
                            </span>
                            <span class="question-title-index">
                                {{ element.groupCode == 1 ? editStore.getQuestionIndex(index) + '、' : '' }}
                            </span>
                            <span class="question-title">
                                {{ element.hasOwnProperty('title') ? element.title : '' }}
                            </span>
                        </span>
                    </template>
                    <el-row v-if="element.groupCode == 2" style="width: 100%;">
                        <el-col :span="24">
                            <component :is="getElementByCode(element.groupCode,element.typeCode)"
                                v-bind="element.property" @change="getElementValue($event, element.elementId)">
                            </component>
                        </el-col>
                    </el-row>
                    <el-row v-else style="width: 100%;">
                        <el-col :span="24">
                            <component :is="getElementByCode(element.groupCode,element.typeCode)"
                                v-bind="element.property" @change="getElementValue($event, element.elementId)">
                            </component>
                        </el-col>
                    </el-row>
                </el-form-item>
                <div class="bothCenter" style="margin-top: 3vh;">
                    <el-button class="submitButton" icon="Select" type="primary" size="large" round
                        @click="submitForm(previewFormRef)">
                        提交
                    </el-button>
                </div>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import BPElement from '@/components/edit/elementList';
import useEditStore from '@/store/edit';
import { ElMessage, FormInstance } from 'element-plus';

const editStore = useEditStore();

const router = useRouter()

const goToEdit = () => {
    router.push('/survey/edit')
}

const getElementByCode = (groupCode: number, typeCode: any) => {
    if (groupCode == 1) {
        switch (typeCode) {
            case 1:
                return BPElement.BPInput
            case 2:
                return BPElement.BPRate
            case 3:
                return BPElement.BPRadioGroup
            case 4:
                return BPElement.BPCheckboxGroup
            case 5:
                return BPElement.BPMatrixRadioGroup
            case 6:
                return BPElement.BPMatrixScaleGroup
        }
    } else if (groupCode == 2) {
        switch (typeCode) {
            case 1:
                return BPElement.BPDivider
            case 2:
                return BPElement.BPExplain
        }
    }
}

// 表单value数据
const FormData = ref();
// 预览表单Ref
const previewFormRef = ref<FormInstance>()

onMounted(() => {
    let formData = {};
    editStore.evaluationForm.forEach((element) => {
        formData[element.elementId] = ''
    })
    FormData.value = formData;
})

// 响应表单元素值变化
const getElementValue = (event: any, elementId: any) => {
    console.log(event)
    console.log(elementId)
    FormData.value[elementId] = event;
    console.log(FormData.value)
}

// 提交表单
const submitForm = async (formEl1: FormInstance | undefined) => {
    if (!formEl1) return
    await formEl1.validate((valid, fields) => {
        if (valid) {
            ElMessage({
                message: '表单验证通过！',
                type: 'success',
            })
        } else {
            ElMessage({
                message: '表单验证未通过，请检查！',
                type: 'error',
                duration: 4000
            })
        }
    })
}

</script>

<style lang="scss" scoped>
.page-header-group {
    margin: 0.7% 0 0 1%;

    .page-header-title {
        font-weight: 600;
    }
}

.height-100-group {
    height: 100%;
}

.form-title {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 1.5vh 0;
}

.scrollbar-container {
    width: 98%;
    height: 90%;
    margin: 0 0 2% 0;

    .element-form {
        height: fit-content;
        width: 40vw;
        // background-color: #F7F8FA;
        padding: 1rem 2rem;

        .question-title-group {
            width: 100%;
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 15px;
            position: relative;

            .question-title-required {
                position: absolute;
                left: -10px;
                color: red;
                width: 2%;
            }

        }

        .submitButton {
            width: 20%;
        }
    }
}

:deep(.none-margin-el-form-item) {
    margin: 0 !important;
}

:deep(.el-form-item__label) {
    margin: 0 0 5px 0 !important;
}
</style>