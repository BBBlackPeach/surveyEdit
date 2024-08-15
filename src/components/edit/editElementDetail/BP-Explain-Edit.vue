<template>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                文字颜色：
            </span>
        </template>
        <el-color-picker v-model="editStore.currentElement.property.contentColor" size="large" />
    </el-form-item>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                文字大小：
            </span>
        </template>
        <el-input-number v-model="editStore.currentElement.property.fontSize" controls-position="right" :step="1"
            step-strictly placeholder="请输入文字大小" />
    </el-form-item>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                文字内容：
            </span>
        </template>
        <el-input v-model="editStore.currentElement.property.content" type="textarea" :autosize="{ minRows: 3 }"
            placeholder="请输入段落说明文字"></el-input>
    </el-form-item>
</template>

<script lang="ts" setup>
import useEditStore from '@/store/edit';

const editStore = useEditStore();
</script>

<style lang="scss" scoped></style>