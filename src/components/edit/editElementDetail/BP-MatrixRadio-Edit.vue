<template>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                是否设置统一宽度：
            </span>
        </template>
        <el-switch v-model="editStore.currentElement.property.uniformWidthFlag" :active-value="1" :inactive-value="0" />
    </el-form-item>
    <el-form-item v-show="editStore.currentElement.property.uniformWidthFlag">
        <template #label>
            <span class="edit-item-label">
                选项宽度：
            </span>
        </template>
        <el-input-number v-model="editStore.currentElement.property.width" controls-position="right" :step="5"
            step-strictly placeholder="请输入选项宽度" />
    </el-form-item>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                矩阵选项：
            </span>
        </template>
        <el-descriptions title="" :column="1" border>
            <el-descriptions-item v-for="(item, index) in editStore.currentElement.property.children">
                <template #label>
                    <el-input v-model="item.value" class="un-border-input"></el-input>
                </template>
                <el-dropdown trigger="contextmenu">
                    <el-input v-model="item.label" class="un-border-input"></el-input>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-if="!item.disabled" icon="Lock"
                                @click="() => item.disabled = true">不可选</el-dropdown-item>
                            <el-dropdown-item v-if="item.disabled" icon="Unlock"
                                @click="() => item.disabled = false">启用</el-dropdown-item>
                            <el-dropdown-item icon="Delete"
                                @click="() => editStore.currentElement.property.children.splice(index, 1)">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-descriptions-item>
        </el-descriptions>
        <el-button style="margin-top: 1vh;" icon="Plus"
            @click="() => editStore.currentElement.property.children.push({ value: '选项', label: '值', disabled: false })">添加选项</el-button>
    </el-form-item>
</template>

<script lang="ts" setup>
import useEditStore from '@/store/edit';

const editStore = useEditStore();
</script>

<style lang="scss" scoped></style>