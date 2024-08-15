<template>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                分割线样式：
            </span>
        </template>
        <el-select v-model="editStore.currentElement.property.borderStyle" placeholder="请选择">
            <el-option label="实线" value="solid" />
            <el-option label="虚线" value="dashed" />
        </el-select>
    </el-form-item>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                分割线颜色：
            </span>
        </template>
        <el-color-picker v-model="editStore.currentElement.property.dividerColor" size="large" />
    </el-form-item>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                是否填充文字：
            </span>
        </template>
        <el-switch v-model="editStore.currentElement.property.contentFlag" :active-value="1" :inactive-value="0"/>
    </el-form-item>
    <el-form-item v-show="editStore.currentElement.property.contentFlag">
        <template #label>
            <span class="edit-item-label">
                填充文字：
            </span>
        </template>
        <el-input v-model="editStore.currentElement.property.content" placeholder="请输入填充文字"></el-input>
    </el-form-item>
    <el-form-item v-show="editStore.currentElement.property.contentFlag">
        <template #label>
            <span class="edit-item-label">
                填充文字位置：
            </span>
        </template>
        <el-select v-model="editStore.currentElement.property.contentPosition" placeholder="请选择">
            <el-option label="居中" value="center" />
            <el-option label="左侧" value="left" />
            <el-option label="右侧" value="right" />
        </el-select>
    </el-form-item>
    <el-form-item v-show="editStore.currentElement.property.contentFlag">
        <template #label>
            <span class="edit-item-label">
                填充文字颜色：
            </span>
        </template>
        <el-color-picker v-model="editStore.currentElement.property.contentColor" size="large" />
    </el-form-item>
</template>

<script lang="ts" setup>
import useEditStore from '@/store/edit';

const editStore = useEditStore();
</script>

<style lang="scss" scoped></style>