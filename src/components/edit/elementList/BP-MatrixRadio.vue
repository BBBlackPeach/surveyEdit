<template>
    <el-radio-group :model-value="modelValue" @change="handleChange">
        <el-descriptions title="" direction="vertical" :column="children.length" border>
            <el-descriptions-item v-for="item in children" :label="item.value" label-align="center"
                align="center" :width="uniformWidthFlag?width:''">
                <el-radio :label="item.label" :disabled="item.disabled">{{ "" }}</el-radio>
            </el-descriptions-item>
        </el-descriptions>
    </el-radio-group>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
    modelValue: {
        type: Number,
    },
    uniformWidthFlag: {
        type: Boolean,
        default: false,
    },
    width: {
        type: [String, Number],
    },
    children: {
        type: Array as PropType<MatrixRadioItem[]>,
        required: true,
        // default:()=>[]
    },
})

export interface MatrixRadioItem {
    label: any;
    value: string;
    disabled: boolean;
}

const emits = defineEmits(["update:modelValue"]);

const handleChange = (value: any) => {
    emits('update:modelValue', value);
}
</script>

<style lang="scss" scoped></style>