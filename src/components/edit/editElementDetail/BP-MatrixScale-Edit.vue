<template>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                左侧文本：
            </span>
        </template>
        <el-input v-model="editStore.currentElement.property.leftText" placeholder="请输入左侧文本"></el-input>
    </el-form-item>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                右侧文本：
            </span>
        </template>
        <el-input v-model="editStore.currentElement.property.rightText" placeholder="请输入右侧文本"></el-input>
    </el-form-item>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                初始分值：
            </span>
        </template>
        <el-input-number v-model="editStore.currentElement.property.initialScore" controls-position="right" :step="1"
            step-strictly placeholder="请输入初始分值" />
    </el-form-item>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                选项个数：
            </span>
        </template>
        <el-input-number v-model="editStore.currentElement.property.itemCount" controls-position="right" :step="1"
            step-strictly placeholder="请输入选项个数" />
    </el-form-item>
</template>

<script lang="ts" setup>
import useEditStore from '@/store/edit';

const editStore = useEditStore();
</script>

<style lang="scss" scoped></style>