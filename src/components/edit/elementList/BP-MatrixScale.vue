<template>
    <el-descriptions :style="'max-width:'+itemCount*55+'px;'" title="" direction="vertical" :column="1" border>
        <el-descriptions-item label-align="center" align="center">
            <template #label>
                <div class="scaleText">
                    <span>{{ leftText }}</span>
                    <span>{{ rightText }}</span>
                </div>
                <div class="scaleText">
                    <span>{{ matrixScaleList[0].label }}</span>
                    <span>{{ matrixScaleList[matrixScaleList.length - 1].label }}</span>
                </div>
            </template>
            <el-radio-group :model-value="modelValue" @change="handleChange">
                <el-radio v-for="item in matrixScaleList" :label="item.label">{{ "" }}</el-radio>
            </el-radio-group>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
    modelValue: {
        type: Number,
    },
    leftText: {
        type: String,
        required: true,
    },
    rightText: {
        type: String,
        required: true,
    },
    initialScore:{
        type: Number,
        required: true,
        default:1
    },
    itemCount:{
        type: Number,
        required: true,
        default:5
    },
})

const matrixScaleList= computed(()=>{
    let list = [];
    for(let i=props.initialScore;i<(props.initialScore+props.itemCount);i++){
        list.push({label:i});
    }
    return list;
})

const emits = defineEmits(["update:modelValue","change"]);

const handleChange = (value: any) => {
    emits('update:modelValue', value);
    emits('change', value);
}
</script>

<style lang="scss" scoped>
.scaleText {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>