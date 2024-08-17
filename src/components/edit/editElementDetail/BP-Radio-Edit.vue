<template>
    <el-form-item>
        <template #label>
            <span class="edit-item-label">
                单选选项：
            </span>
        </template>
        <el-descriptions title="" :column="1" border>
            <el-descriptions-item v-for="(item, index) in editStore.currentElement.property.children">
                <template #label>
                    <el-input v-model="item.value" class="un-border-input"></el-input>
                </template>
                <el-dropdown trigger="hover">
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