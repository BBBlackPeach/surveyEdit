<template>
    <div class="element-select-container">
        <el-row v-for="(item,index) in elementTypeList" :key="item.groupName">
            <el-col class="element-group-title" :style="index==0?'margin: 0 0 0.7rem 0;':'margin: 1rem 0 0.7rem 0;'" :span="24">
                <el-icon color="#3C5DE3" style="margin-right: 2px;">
                    <Minus />
                </el-icon>
                {{ item.groupName }}
            </el-col>
            <Draggable class="element-type-group" v-model="item.componentList" :group="dragGroup" item-key="label"
                :sort="false" @start="handleDragStart" @end="handleDragEnd" :clone="handleClone"
                @change="onMoveCallback">
                <template #item="{ element }">
                    <el-card class="element-type-card alignCenter" shadow="hover" body-style="padding:5px;" @click.stop="handleClick(element)">
                        <component :is="element.typeIconSvg" /><span class="element-label cursor-default-group">{{
            element.label }}</span>
                    </el-card>
                </template>
            </Draggable>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import ElementSvgIcon from '@/components/edit/selectElementType/elementSvgIcon';
import ElementDefaultProp from '@/components/edit/selectElementType/elementDefaultProp';
import Draggable from 'vuedraggable';
import { v4 as uuidv4 } from 'uuid';
import { deepCopy } from '@/utils/deepCopy'
import useEditStore from '@/store/edit';

const editStore = useEditStore();

const dragGroup = reactive({
    name: 'elementTypeForm',
    pull: 'clone',
    put: false
})

const elementTypeList = reactive([
    {
        groupCode: 1,
        groupName: '基础题型',
        componentList: [
            {
                label: '文本',
                elementId: '',
                typeIconSvg: ElementSvgIcon.SvgInput,
                groupCode: 1,
                typeCode: 1,
            },
            {
                label: '评分',
                elementId: '',
                typeIconSvg: ElementSvgIcon.SvgRate,
                groupCode: 1,
                typeCode: 2,
            },
            {
                label: '单选',
                elementId: '',
                typeIconSvg: ElementSvgIcon.SvgRadio,
                groupCode: 1,
                typeCode: 3,
            },
            {
                label: '多选',
                elementId: '',
                typeIconSvg: ElementSvgIcon.SvgCheckbox,
                groupCode: 1,
                typeCode: 4,
            },
            {
                label: '矩阵选择',
                elementId: '',
                typeIconSvg: ElementSvgIcon.SvgMatrixRadio,
                groupCode: 1,
                typeCode: 5,
            },
            {
                label: '矩阵量表',
                elementId: '',
                typeIconSvg: ElementSvgIcon.SvgMatrixScale,
                groupCode: 1,
                typeCode: 6,
            },
        ]
    },
    {
        groupCode: 2,
        groupName: '其他',
        componentList: [
            {
                label: '段落分割',
                elementId: '',
                typeIconSvg: ElementSvgIcon.SvgDivider,
                groupCode: 2,
                typeCode: 1,
            },
            {
                label: '段落说明',
                elementId: '',
                typeIconSvg: ElementSvgIcon.SvgExplain,
                groupCode: 2,
                typeCode: 2,
            },
        ]
    },
])

const handleDragStart = (event: any) => {
    // console.log("开始拖动");
    // console.log(event);
}

const handleDragEnd = (event: any) => {
    // console.log("停止拖动");
    // console.log(event);
    // console.log(event.to.dataset.group);
    // console.log(event.from.dataset.group);
}

const onMoveCallback = (value: any) => {
    // console.log("onMoveCallback");
    // console.log(value);
}

const handleClone = (element: any) => {
    let newElement = deepCopy({ ...element, ...getElementeDefaultPropByCode(element.groupCode, element.typeCode) });
    newElement.elementId = uuidv4();
    console.log(newElement);
    return newElement;
}

const handleClick=(element:any)=>{
    let newElement = deepCopy({ ...element, ...getElementeDefaultPropByCode(element.groupCode, element.typeCode) });
    newElement.elementId = uuidv4();
    if(editStore.currentElementIndex==-1){
        editStore.evaluationForm.splice(editStore.evaluationForm.length, 0, newElement);
    }else{
        editStore.evaluationForm.splice(editStore.currentElementIndex+1, 0, newElement);
    }
}

const getElementeDefaultPropByCode = (groupCode: number, typeCode: any) => {
    if (groupCode == 1) {
        switch (typeCode) {
            case 1:
                return ElementDefaultProp.BPInputDefaultProp
            case 2:
                return ElementDefaultProp.BPRateDefaultProp
            case 3:
                return ElementDefaultProp.BPRadioDefaultProp
            case 4:
                return ElementDefaultProp.BPCheckboxDefaultProp
            case 5:
                return ElementDefaultProp.BPMatrixRadioDefaultProp
            case 6:
                return ElementDefaultProp.BPMatrixScaleDefaultProp
        }
    } else if (groupCode == 2) {
        switch (typeCode) {
            case 1:
                return ElementDefaultProp.BPDividerDefaultProp
            case 2:
                return ElementDefaultProp.BPExplainDefaultProp
        }
    }
}

</script>

<style lang="scss" scoped>
.element-select-container {
    height: 100%;
    margin: 0 1.2rem;

    .element-group-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        font-weight: 700;
        color: #303133;
    }

    .element-type-group {
        width: 100%;
        column-count: 2; //设置列数
        column-gap: 0.1rem; //设置列间距

        @media (max-width: 1440px) {
            column-count: 1; // 当页面宽度小于1440px时，变为一行一个元素
        }

        .element-type-card {
            break-inside: avoid; //防止元素被分割
            margin-bottom: 0.7rem;
            height: 2rem;

            .element-label{
                font-size: 13px;
            }
        }
    }

}
</style>