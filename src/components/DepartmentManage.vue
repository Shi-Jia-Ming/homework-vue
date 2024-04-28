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
      <el-table stripe class="department-table" :data="departmentList">
        <el-table-column prop="id" label="序号" width="180" />
        <el-table-column prop="name" label="部门名称" width="180" />
        <el-table-column prop="updateAt" label="最后操作时间" width="320" />
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
import { ComputedRef, computed, onMounted, reactive } from 'vue';
import { Store, useStore } from 'vuex';
import SpringAPI from '../utils/request';
import Department from '../types/department';

// 用户全局状态
const store: Store<any> = useStore();

// 部门信息列表
const departmentList: Array<Department> = reactive([]);

// 定义用户信息
const userId: ComputedRef<number> = computed(() => { return store.state.user.userId });
const token: ComputedRef<string> = computed(() => { return store.state.user.token });
const username: ComputedRef<string> = computed(() => { return store.state.user.username });

onMounted(() => {
  getDepartmentList();
});

// 获取部门信息列表
const getDepartmentList = (): void => {
  SpringAPI.getDepartmentList(token.value, userId.value, username.value)
    .then((result: Map<string, Object>) => {
      if (result.get("code") === 0) {
        const departments: Array<Department> = result.get("departmentList") as Array<Department>;
        departments.forEach((department: Department) => {
          department.updateAt = new Date(department.updateAt).toLocaleString();
          departmentList.push(department);
        })
        console.log("获取部门信息列表成功，列表数据: ", departmentList);
      } else {
        console.log("获取部门信息列表失败");
      }
    })
}
</script>

<style lang="scss">
.department-manage-layout {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
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
  width: (180 * 3 + 320)px;
  max-width: 90%;
  margin-top: 20px;
}

.department-table {
  display: flex;
  justify-content: flex-start;
  height: 80%;
}
</style>