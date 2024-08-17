<template>
  <div class="layout">
    <el-container class="height-100-group">
      <el-header height="4rem" class="edit-header alignCenter">
        <EditElementHeader style="width: 100%;" />
      </el-header>
      <el-container style="margin-top: 1rem;">
        <el-aside width="15vw">
          <SelectElementType />
        </el-aside>
        <el-main class="edit-main-group">
          <el-scrollbar class="height-100-group">
            <ElementList />
          </el-scrollbar>
        </el-main>
        <el-aside width="15vw">
          <EditElementDetail />
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import SelectElementType from './selectElementType/SelectElementType.vue';
import ElementList from './elementList/ElementList.vue';
import EditElementDetail from './editElementDetail/EditElementDetail.vue';
import EditElementHeader from './editElementHeader/EditElementHeader.vue';
import useEditStore from '@/store/edit';

const editStore = useEditStore();
const router= useRoute();

onUnmounted(() => {
  if(router.fullPath!='/survey/preview'){
    editStore.clearEdit();
  }
})

</script>

<style lang="scss" scoped>

.layout{
  width: 100%;
  height: 100vh;
}

.edit-header{
  padding: 0;
  width: 100%;
}

.edit-main-group {
  margin: 0 0 2rem 0;
  background-color: #F7F8FA;
}
</style>