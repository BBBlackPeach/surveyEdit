<template>
    <div class="edit-container">
        <div class="tab-change-container">
            <el-radio-group v-model="currentTab" @change="handleTabChange">
                <el-radio-button disabled :label="1">问卷设置</el-radio-button>
                <el-radio-button :label="2">题目编辑</el-radio-button>
            </el-radio-group>
        </div>
        <div v-if="editStore.currentElement != undefined" class="element-edit-container">
            <div class="element-title-container">
                <div class="element-title-index">
                    <span>Q</span>
                    <span v-if="editStore.currentElement.groupCode == 1">{{
                editStore.getQuestionIndex(editStore.currentElementIndex) }}</span>
                    <span>.</span>
                    <span style="margin-left: 2px;">组件编辑</span>
                </div>
                <div class="element-title-label">
                    {{ editStore.currentElement.label }}
                </div>
            </div>
            <el-form v-if="editStore.currentElement.groupCode == 1" class="element-form-container" label-position="left" style="margin-bottom: 2vh;">
                <div class="element-form-title">
                    整题设置
                </div>
                <el-divider class="element-form-divider" />
                <el-form-item>
                    <template #label>
                        <span class="edit-item-label">
                            是否必填：
                        </span>
                    </template>
                    <el-switch v-model="editStore.currentElement.required" :active-value="1" :inactive-value="0"/>
                </el-form-item>
                <el-form-item v-if="editStore.currentElement.hasOwnProperty('scoreFlag')">
                    <template #label>
                        <span class="edit-item-label">
                            是否打分：
                        </span>
                    </template>
                    <el-switch v-model="editStore.currentElement.scoreFlag" :active-value="1" :inactive-value="0"/>
                </el-form-item>
            </el-form>
            <el-form class="element-form-container"
                :label-position="(editStore.currentElement.groupCode == 1 && [3, 4, 5].includes(editStore.currentElement.typeCode)) ? 'top' : 'left'">
                <div class="element-form-title">
                    选项设置
                </div>
                <el-divider class="element-form-divider" />
                <component :is="getElementeDditByCode(editStore.currentElement.groupCode,editStore.currentElement.typeCode)">
                </component>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ElementEdit from '@/components/edit/editElementDetail';
import useEditStore from '@/store/edit';

const editStore = useEditStore();
const currentTab = ref(2);

const handleTabChange = (value: number) => {
    console.log(value);
};

const getElementeDditByCode = (groupCode: number, typeCode: number) => {
    if (groupCode == 1) {
        switch (typeCode) {
            case 1:
                return ElementEdit.BPInputEdit
            case 2:
                return ElementEdit.BPRateEdit
            case 3:
                return ElementEdit.BPRadioEdit
            case 4:
                return ElementEdit.BPCheckboxEdit
            case 5:
                return ElementEdit.BPMatrixRadioEdit
            case 6:
                return ElementEdit.BPMatrixScaleEdit
        }
    } else if (groupCode == 2) {
        switch (typeCode) {
            case 1:
                return ElementEdit.BPDividerEdit
            case 2:
                return ElementEdit.BPExplainEdit
        }
    }
}

</script>

<style lang="scss" scoped>
.edit-container {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    /**
    隐藏滚动条
    ::-webkit-scrollbar 是一个伪元素，用于自定义滚动条的样式
    */
    .element-edit-container::-webkit-scrollbar {
        display: none;
        /* Chrome, Safari, and Opera */
    }

    .element-edit-container {
        overflow-y: scroll;
        /* 隐藏默认的滚动条样式 */
        scrollbar-width: none;
        /* Firefox */
        -ms-overflow-style: none;
        /* IE and Edge */

        width: 84%;

        .element-title-container {
            margin-top: 3vh;

            .element-title-index {
                color: #AAAAAA;
                font-size: 13px;
            }

            .element-title-label {
                font-size: 20px;
                font-weight: 600;
                margin-top: 1vh;
            }
        }

        .element-form-container {
            width: 100%;
            margin-top: 3vh;
            justify-content: flex-start;

            // 修改el-item每行间距
            :deep(.el-form-item) {
                margin-bottom: 10px;
            }

            .element-form-title {
                color: #AAAAAA;
                font-size: 15px;
            }

            // 修改el-divider默认margin
            :deep(.element-form-divider) {
                margin: 5px 0 10px 0;
            }

            .edit-item-label {
                // font-weight: 600;
                cursor: default;
            }
        }
    }
}
</style>