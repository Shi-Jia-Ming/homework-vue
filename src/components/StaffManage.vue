<template>
  <div class="staff-manage-layout">
    <div class="staff-manage-title-container">
      <p class="staff-manage-title">员工管理</p>
    </div>
    <div class="search-group">
      <!-- 查询员工的表单 -->
      <el-form :inline="true" style="width: 100%; display: flex; justify-content: flex-start;">
        <el-form-item label="姓名" class="staff-name-container">
          <el-input style="width: 180px; height: 35px;" />
        </el-form-item>

        <el-form-item label="性别" class="staff-degree-container">
          <el-select style="width: 180px; height: 35px;" />
        </el-form-item>

        <el-form-item label="入职日期" class="staff-class-container">
          <el-date-picker type="datetime" style="width: 180px; height: 35px;" />
        </el-form-item>

        <el-form-item class="search-btn-container">
          <el-button type="primary" class="search-btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-container">
      <el-button type="primary" class="add-btn">
        <template #icon>
          <el-icon :size="15" style="margin-right: 5px;">
            <plus />
          </el-icon>
          <p>添加员工</p>
        </template>
      </el-button>

      <el-button type="primary" class="add-btn">
        <template #icon>
          <el-icon :size="15" style="margin-right: 5px;">
            <minus />
          </el-icon>
          <p>批量删除</p>
        </template>
      </el-button>
    </div>
    <div class="staff-table-container">
      <el-table stripe style="width: 100%" class="staff-table">
        <el-table-column type="selection" width="55" />
        <el-table-column fixed="left" prop="name" label="姓名" width="170" />
        <el-table-column prop="acatar" label="图像" width="170" />
        <el-table-column prop="gender" label="性别" width="170" />
        <el-table-column prop="post" label="职位" width="170" />
        <el-table-column prop="createdAt" label="入职日期" width="170" />
        <el-table-column prop="updatedAt" label="最后操作时间" width="170" />
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
          <p>每页展示的员工数：</p>
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
import { Plus, Minus } from '@element-plus/icons-vue';
</script>

<style lang="scss">
.staff-manage-layout {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: calc(100% - 56px);
}

.staff-manage-title-container {
  display: flex;
  border-left: 6px #1da8ed solid;
  height: 35px;
}

.staff-manage-title {
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

.search-btn {
  margin-left: 50px;
  width: 100px;
}

.btn-container {
  margin-top: 10px;
  align-self: flex-start;
}

.add-btn {
  width: 150px;
}

.staff-table-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: (170 * 7 + 55)px;
  max-width: 90%;
  margin-top: 20px;
}

.staff-table {
  height: 100%;
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