<template>
  <div class="department-manage-layout">
    <div class="department-manage-title-container">
      <p class="department-manage-title">部门管理</p>
    </div>
    <div class="btn-container">
      <el-button type="primary" class="add-department-btn" @click="openCreateDialog">
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
        <el-table-column prop="updateAt" label="最后操作时间" width="320">
          <template #default="scope">
            <p>{{ new Date(scope.row.updateAt).toLocaleString() }}</p>
          </template>
        </el-table-column>
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

    <el-dialog v-model="createDialogVisible" width="800" draggable>
      <div class="create-dialog-layout">
        <div class="department-create-title-container">
          <p class="department-create-title">新建部门</p>
        </div>
        <div class="department-create-form-container">
          <div class="department-name-input-container">
            <span class="department-name-input-label">部门名称</span>
            <el-input class="department-name-input" v-model="createDepartmentName"/>
          </div>
        </div>
        <div class="department-create-dialog-btn">
          <el-button type="primary" style="width: 150px; height: 40px;" @click="createDepartment">创建</el-button>
          <el-button type="info" style="width: 150px; height: 40px;" @click="createDialogVisible = false;">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { ComputedRef, Ref, computed, onMounted, reactive, ref } from 'vue';
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

// 新建部门窗口是否显示
const createDialogVisible: Ref<boolean> = ref(false);

// 新建部门的名称
const createDepartmentName: Ref<string> = ref('');

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
          departmentList.push(department);
        })
        console.log("获取部门信息列表成功，列表数据: ", departmentList);
      } else {
        console.log("获取部门信息列表失败");
      }
    })
}

// 打开新建部门的窗口
const openCreateDialog = (): void => {
  createDialogVisible.value = true;
}

// 新建窗口
const createDepartment = (): void => {
  SpringAPI.createDepartment(token.value, userId.value, username.value, createDepartmentName.value)
  .then((result: Map<string, Object>) => {
    if (result.get("code") === 0) {
      createDialogVisible.value = false;
      const department: Department = new Department();
      department.id = result.get("departmentId") as number;
      department.name = createDepartmentName.value;
      department.createAt = new Date();
      department.updateAt = new Date();
      departmentList.push(department);
      console.log("创建部门成功");
      createDepartmentName.value = '';
    } else {
      console.log("创建部门失败，信息：", result.get("msg") as string);
    }
  })
}
</script>

<style lang="scss">
.department-create-layout,
.department-manage-layout {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: calc(100% - 56px);
}

.department-create-title-container,
.department-manage-title-container {
  display: flex;
  border-left: 6px #1da8ed solid;
  height: 35px;
}

.department-create-title,
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
  height: calc(100% - 150px);
  width: (180 * 3 + 320)px;
  max-width: 90%;
  margin-top: 20px;
}

.department-table {
  display: flex;
  justify-content: flex-start;
  height: 80vh;
}

.department-create-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
}

.department-name-input-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
}

.department-name-input-label {
  font-size: large;
  text-align: center;
  white-space: nowrap;
}

.department-name-input {
  height: 40px;
  margin: 20px;
}

.department-create-dialog-btn {
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-self: center;
  justify-self: center;
  margin: 0 auto 20px auto;
}
</style>