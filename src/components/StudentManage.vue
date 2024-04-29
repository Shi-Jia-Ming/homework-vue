<template>
  <div class="student-manage-layout">
    <div class="student-manage-title-container">
      <p class="student-manage-title">学员管理</p>
    </div>
    <div class="search-group">
      <!-- 查询学员的表单 -->
      <el-form :inline="true" style="width: 100%; display: flex; justify-content: flex-start;">
        <el-form-item label="学员姓名" class="student-name-container">
          <el-input style="width: 180px; height: 35px;" />
        </el-form-item>

        <el-form-item label="学号" class="student-time-container">
          <el-input style="width: 180px; height: 35px;" />
        </el-form-item>

        <el-form-item label="最高学历" class="student-degree-container">
          <el-select style="width: 180px; height: 35px;"/>
        </el-form-item>

        <el-form-item label="所属班级" class="student-class-container">
          <el-select style="width: 180px; height: 35px;"/>
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
          <p>添加学员</p>
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
    <div class="student-table-container">
      <el-table stripe style="width: 100%" class="student-table">
        <el-table-column type="selection" width="55" />
        <el-table-column fixed="left" prop="name" label="姓名" width="170" />
        <el-table-column prop="number" label="学号" width="170" />
        <el-table-column prop="class" label="班级" width="170" />
        <el-table-column prop="gender" label="性别" width="170" />
        <el-table-column prop="phone" label="手机号" width="170" />
        <el-table-column prop="degree" label="最高学历" width="170" />
        <el-table-column prop="disciplinary" label="违纪次数" width="170" />
        <el-table-column prop="minus" label="违纪扣分" width="170" />
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
          <p>每页展示的学员数：</p>
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
.student-manage-layout {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: calc(100% - 56px);
}

.student-manage-title-container {
  display: flex;
  border-left: 6px #1da8ed solid;
  height: 35px;
}

.student-manage-title {
  align-self: center;
  margin-left: 15px;
  font-size: 24px;
  color: #1da8ed;
}

.search-group {
  align-self: flex-start;
  margin-top: 30px;
  // width: 100%;
}

.el-form-item__label {
  font-size: 16px;
  text-align: center;
}

.search-btn {
  margin-left: 10px;
  width: 100px;
}

.btn-container {
  margin-top: 10px;
  align-self: flex-start;
}

.add-btn {
  width: 150px;
}

.student-table-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 90%;
  margin-top: 20px;
}

.student-table {
  display: flex;
  justify-content: flex-start;
  height: 80vh;
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