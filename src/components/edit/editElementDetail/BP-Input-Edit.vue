<template>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                占位文本：
            </span>
        </template>
        <el-input v-model="editStore.currentElement.property.placeholder" placeholder="请输入占位文本"></el-input>
    </el-form-item>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                输入长度限制：
            </span>
        </template>
        <el-input-number v-model="editStore.currentElement.property.maxlength" controls-position="right" :step="1"
            step-strictly placeholder="请输入最大长度限制" />
    </el-form-item>
</template>

<script lang="ts" setup>
import useEditStore from '@/store/edit';

const editStore = useEditStore();
</script>

<style lang="scss" scoped></style>