<template>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                是否显示文字：
            </span>
        </template>
        <el-switch v-model="editStore.currentElement.property.showScore" :active-value="1" :inactive-value="0"/>
    </el-form-item>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                是否允许半选：
            </span>
        </template>
        <el-switch v-model="editStore.currentElement.property.allowHalf" :active-value="1" :inactive-value="0"/>
    </el-form-item>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                分值：
            </span>
        </template>
        <el-input-number v-model="editStore.currentElement.property.max" controls-position="right" :step="1" step-strictly
            placeholder="请输入分值" />
    </el-form-item>
</template>

<script lang="ts" setup>
import useEditStore from '@/store/edit';

const editStore = useEditStore();
</script>

<style lang="scss" scoped></style>