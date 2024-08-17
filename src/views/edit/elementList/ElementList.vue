<template>
    <div style="height: 100%;">
        <!-- 问题列表 -->
        <el-form style="height: fit-content;">
            <div class="form-title bothCenter">
                问卷大标题
            </div>
            <Draggable v-model="editStore.evaluationForm" style="height:79vh;" :group="dragGroup" item-key="elementId"
                :sort="true" handle=".dragIcon" @start="handleDragStart" @end="handleDragEnd"
                @change="handleElementChange">
                <template #item="{ element, index }">
                    <el-form-item
                        :style="`background-color: #ffffff;${index == 0}?'margin: 0 0 1rem 0;':'margin: 1rem 0;`">
                        <el-card
                            :class="{ 'question-card': true, 'active-question-card': index == editStore.currentElementIndex }"
                            @click="handleClick(index)">
                            <el-row v-if="element.groupCode == 1" class="question-title-group">
                                <span class="question-title-required">
                                    {{ element.required ? '*' : '' }}
                                </span>
                                <span class="question-title-index">
                                    {{ editStore.getQuestionIndex(index) + "、" }}
                                </span>
                                <span class="question-title">
                                    <span v-if="!element.titleEdit" class="question-title-text"
                                        @mouseenter="handleQuestionTitleEnter(index)">
                                        {{ element.title }}
                                    </span>
                                    <span v-if="element.titleEdit" class="width-100-group"
                                        @mouseleave="handleQuestionTitleLeave(index)">
                                        <el-input v-model="element.title" class="question-title-input" type="textarea"
                                            resize="none" :autosize="{ minRows: 1 }" placeholder="请输入问题标题"></el-input>
                                    </span>
                                </span>
                                <span class="question-operate">
                                    <el-tooltip content="长按拖动题目" placement="top" effect="light">
                                        <el-icon class="dragIcon" size="large">
                                            <Rank />
                                        </el-icon>
                                    </el-tooltip>
                                    <el-tooltip content="复制题目" placement="top" effect="light">
                                        <el-icon size="large" @click.stop="handleCopy(index)">
                                            <DocumentCopy />
                                        </el-icon>
                                    </el-tooltip>
                                    <el-tooltip content="删除题目" placement="top" effect="light">
                                        <el-icon size="large" @click.stop="handleDelete(index)">
                                            <Delete />
                                        </el-icon>
                                    </el-tooltip>
                                </span>
                            </el-row>
                            <el-row v-else-if="element.groupCode == 2" class="question-operate-group">
                                <span class="question-operate">
                                    <el-tooltip content="长按拖动题目" placement="top" effect="light">
                                        <el-icon class="dragIcon" size="large">
                                            <Rank />
                                        </el-icon>
                                    </el-tooltip>
                                    <el-tooltip content="复制题目" placement="top" effect="light">
                                        <el-icon size="large" @click.stop="handleCopy(index)">
                                            <DocumentCopy />
                                        </el-icon>
                                    </el-tooltip>
                                    <el-tooltip content="删除题目" placement="top" effect="light">
                                        <el-icon size="large" @click.stop="handleDelete(index)">
                                            <Delete />
                                        </el-icon>
                                    </el-tooltip>
                                </span>
                            </el-row>
                            <component :is="getElementByCode(element.groupCode,element.typeCode)"
                                v-bind="element.property">
                            </component>
                        </el-card>
                    </el-form-item>
                </template>
            </Draggable>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import BPElement from '@/components/edit/elementList';
import Draggable from 'vuedraggable';
import { v4 as uuidv4 } from 'uuid';
import { ElMessageBox } from 'element-plus';
import { deepCopy } from '@/utils/deepCopy';
import useEditStore from '@/store/edit';

const editStore = useEditStore();

const dragGroup = reactive({
    name: 'evaluationFor',
    pull: false,
    put: true
})

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

const handleQuestionTitleEnter = (questionIndex: number) => {
    editStore.evaluationForm[questionIndex].titleEdit = true
}

const handleQuestionTitleLeave = (questionIndex: number) => {
    editStore.evaluationForm[questionIndex].titleEdit = false
}

const handleClick = (index: number) => {
    console.log("点击触发");
    if (index != editStore.currentElementIndex) {
        editStore.currentElementIndex = index;
    }
    console.log(editStore.evaluationForm[index]);
}

const handleDragStart = () => {
    console.log("开始拖动");
}

const handleDragEnd = () => {
    console.log("停止拖动");
}

const handleElementChange = (value: any) => {
    console.log("handleElementChange");
    console.log(value);
    console.log(editStore.evaluationForm);
}

const handleCopy = (index: number) => {
    console.log("复制触发");
    let temp = deepCopy(editStore.evaluationForm[index]);
    temp.elementId = uuidv4();
    editStore.evaluationForm.splice(index + 1, 0, temp);
}

const handleDelete = (index: number) => {
    ElMessageBox.confirm(
        '您确定要删除吗?',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            title: '系统提示',
            draggable: true,
        }
    ).then(() => {
        console.log("删除触发");
        editStore.evaluationForm.splice(index, 1);
        // 如果删除的是当前所选元素，则置空当前Index
        if (editStore.currentElementIndex == index) {
            editStore.currentElementIndex = -1;
        }
    });
}

</script>

<style lang="scss" scoped>
.form-title {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 1.5vh 0;
}

.question-card {
    width: 100%;

    .question-title-group {
        width: 100%;
        line-height: 25px;
        margin-bottom: 1vh;

        .question-title-required {
            position: absolute;
            left: -1%;
            color: red;
            width: 2%;
        }

        .question-title-index {
            width: 3%;
        }

        .question-title {
            width: 87%;

            .question-title-text {
                width: 100%;
                display: block;
                border: 1px dashed rgb(0, 0, 0, 0);
            }

            .question-title-input {
                width: 100%;
            }

            // 去掉为textarea类型的input的边框
            :deep(.question-title-input .el-textarea__inner) {
                border: 1px dashed var(--el-input-border-color, var(--el-border-color));
                box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
                padding: 0px !important;
                line-height: 25px;
            }
        }

        .question-operate {
            width: 10%;
            display: flex;
            justify-content: space-around;
        }

    }

    .question-operate-group {
        display: flex;
        justify-content: flex-end;

        .question-operate {
            width: 10%;
            display: flex;
            justify-content: space-around;
        }
    }
}

.active-question-card {
    border-color: #3c5de3;
}
</style>