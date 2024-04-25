<template>
  <div class="department-manage-layout">
    <div class="department-manage-title-container">
      <p class="department-manage-title">部门管理</p>
    </div>
    <div class="btn-container">
      <el-button type="primary" class="add-department-btn">
        <template #icon>
          <el-icon :size="15" style="margin-right: 5px;">
            <plus />
          </el-icon>
          <p>新增部门</p>
        </template>
      </el-button>
    </div>
    <div class="department-table-container">
      <el-table stripe style="width: 100%" height="500" class="department-table">
        <el-table-column prop="index" label="序号" width="180" />
        <el-table-column prop="name" label="部门名称" width="180" />
        <el-table-column prop="updatedAt" label="最后操作时间" width="180" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default>
            <el-button link type="primary" size="small">
              编辑
            </el-button>
            <el-button link type="primary" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
</script>

<style lang="scss">
.department-manage-layout {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.department-manage-title-container {
  display: flex;
  border-left: 6px #1da8ed solid;
  height: 35px;
}

.department-manage-title {
  align-self: center;
  margin-left: 15px;
  font-size: 24px;
  color: #1da8ed;
}

.btn-container {
  margin-top: 10px;
  align-self: flex-start;
}

.add-department-btn {
  margin-top: 20px;
  width: 150px;
}

.department-table-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-top: 20px;
}
</style>