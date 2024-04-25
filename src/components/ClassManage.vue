<template>
  <div class="class-manage-layout">
    <div class="class-manage-title-container">
      <p class="class-manage-title">班级管理</p>
    </div>
    <div class="search-group">
      <!-- 查询班级的表单 -->
      <el-form :inline="true" style="width: 100%; display: flex; justify-content: flex-start;">
        <el-form-item label="班级名称" class="class-name-container">
          <el-input style="width: 200px; height: 35px;" />
        </el-form-item>

        <el-form-item label="结课时间" class="class-time-container">
          <el-date-picker type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
            style="width: 200px; height: 35px;" />
        </el-form-item>

        <el-form-item class="search-btn-container">
          <el-button type="primary" class="search-btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-btn-container">
      <el-button type="primary" class="add-btn">
        <template #icon>
          <el-icon>
            <plus />
          </el-icon>
          <p>新增班级</p>
        </template>
      </el-button>
    </div>
    <div class="class-table-container">
      <el-table stripe style="width: 100%" height="350" class="class-table">
        <el-table-column prop="index" label="序号" width="170" />
        <el-table-column prop="name" label="班级名称" width="170" />
        <el-table-column prop="startTime" label="开课时间" width="170" />
        <el-table-column prop="endTime" label="结课时间" width="170" />
        <el-table-column prop="teacher" label="班主任" width="170" />
        <el-table-column fixed="right" label="操作" width="170">
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
      <div class="page-configuraiton">
        <div class="page-number-select">
          <p>每页展示的班级数：</p>
          <el-select multiple placeholder="选择" style="width: 100px">
            <el-option v-for="item in [10, 20, 50, 100]" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
        <div class="page-select">
          <p>共{{ 500 }}条数据</p>
          <el-pagination background layout="prev, pager, next, jumper" :total="10" class="pagination" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
</script>

<style lang="scss">
.class-manage-layout {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.class-manage-title-container {
  display: flex;
  border-left: 6px #1da8ed solid;
  height: 35px;
}

.class-manage-title {
  align-self: center;
  margin-left: 15px;
  font-size: 24px;
  color: #1da8ed;
}

.search-group {
  align-self: flex-start;
  margin-top: 30px;
  width: 100%;
}

.el-form-item__label {
  font-size: 16px;
  text-align: center;
}

.class-time-container {
  margin-left: 30px;
}

.search-btn {
  margin-left: 50px;
  width: 100px;
}

.add-btn-container {
  margin-top: 10px;
  align-self: flex-start;
}

.add-btn {
  width: 150px;
}

.class-table-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-top: 20px;
}

.page-configuraiton {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
}

.page-number-select,
.page-select {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.pagination {
  margin-left: 20px;
}
</style>