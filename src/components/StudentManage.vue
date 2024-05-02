<template>
  <div class="student-manage-layout">
    <div class="student-manage-title-container">
      <p class="student-manage-title">学员管理</p>
    </div>
    <div class="search-group">
      <!-- 查询学员的表单 -->
      <el-form :inline="true" style="width: 100%; display: flex; justify-content: flex-start;">
        <el-form-item label="学员姓名" class="student-name-container">
          <el-input style="width: 180px; height: 35px;"/>
        </el-form-item>

        <el-form-item label="学号" class="student-time-container">
          <el-input style="width: 180px; height: 35px;"/>
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
      <el-button type="primary" class="add-btn" @click="openCreateDialog">
        <template #icon>
          <el-icon :size="15" style="margin-right: 5px;">
            <plus/>
          </el-icon>
          <p>添加学员</p>
        </template>
      </el-button>

      <el-button type="primary" class="add-btn">
        <template #icon>
          <el-icon :size="15" style="margin-right: 5px;">
            <minus/>
          </el-icon>
          <p>批量删除</p>
        </template>
      </el-button>
    </div>
    <div class="student-table-container">
      <el-table stripe style="width: 100%" class="student-table" :data="studentList">
        <el-table-column type="selection" width="55"/>
        <el-table-column fixed="left" prop="name" label="姓名" width="170"/>
        <el-table-column prop="stuNumber" label="学号" width="170"/>
        <el-table-column prop="class" label="班级" width="170">
          <template #default="scope">
            <p>{{ scope.row.class_.name }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="170">
          <template #default="scope">
            <p>{{ scope.row.gender === 1 ? "男" : "女" }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="170"/>
        <el-table-column prop="degree" label="最高学历" width="170">
          <template #default="scope">
            <p>{{ scope.row.degree === 1 ? "本科" : "大专" }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="breakCount" label="违纪次数" width="170"/>
        <el-table-column prop="minus" label="违纪扣分" width="170"/>
        <el-table-column prop="updatedAt" label="最后操作时间" width="170">
          <template #default="scope">
            <p>{{ new Date(scope.row.updateAt).toLocaleDateString() }}</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template #default>
            <el-button link type="primary" size="small">
              编辑
            </el-button>
            <el-button link type="primary" size="small">
              违纪
            </el-button>
            <el-button link type="primary" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-configuration">
        <div class="page-number-select">
          <p>每页展示的学员数：</p>
          <el-select placeholder="选择" style="width: 100px" v-model="pageNumber">
            <el-option v-for="item in pageNumberList" :key="item" :label="item" :value="item"/>
          </el-select>
        </div>
        <div class="page-select">
          <p>共{{ studentList.length }}条数据</p>
          <el-pagination background layout="prev, pager, next, jumper" :total="studentList.length"
                         :page-size="Number(pageNumber)" class="pagination" v-model:current-page="page"
                         :default-current-page="1"/>
        </div>
      </div>
    </div>

    <!-- 添加员工弹窗 -->
    <el-dialog v-model="createDialogVisible" width="800" draggable>
      <div class="create-dialog-layout">
        <div class="staff-create-title-container">
          <p class="staff-create-title">添加员工信息</p>
        </div>
        <div class="staff-create-form-container">
          <el-form class="staff-create-form" label-position="right" label-width="auto">
            <el-form-item class="staff-create-form-name" label="姓名">
              <el-input v-model="newStudent.name"/>
            </el-form-item>
            <el-form-item class="staff-create-form-stu-number" label="学号">
              <el-input v-model="newStudent.stuNumber"/>
            </el-form-item>
            <el-form-item class="staff-create-form-gender" label="性别">
              <el-select v-model="newStudent.gender">
                <el-option label="男" :value="1"/>
                <el-option label="女" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item class="staff-create-form-phone" label="手机号">
              <el-input v-model="newStudent.phone"/>
            </el-form-item>
            <el-form-item class="staff-create-form-degree" label="最高学历">
              <el-select v-model="newStudent.degree">
                <el-option label="本科" :value="1"/>
                <el-option label="大专" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item class="staff-create-form-class" label="所属班级">
              <el-select v-model="newStudent.class_"/>
            </el-form-item>
            <el-form-item class="staff-create-form-btn-group">
              <div class="btn-group">
                <el-button type="primary" style="width: 150px; height: 40px;">创建</el-button>
                <el-button type="info" style="width: 150px; height: 40px;">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <!-- 编辑员工信息弹窗 -->
    <el-dialog v-model="editDialogVisible" width="800" draggable>
      <div class="edit-dialog-layout">
        <div class="staff-edit-title-container">
          <p class="staff-edit-title">编辑员工信息</p>
        </div>
        <div class="staff-edit-form-container">
          <el-form class="staff-edit-form" label-position="right" label-width="auto">
            <el-form-item class="staff-edit-form-name" label="姓名">
              <el-input v-model="editStudent.name"/>
            </el-form-item>
            <el-form-item class="staff-edit-form-stu-number" label="学号">
              <el-input v-model="editStudent.stuNumber"/>
            </el-form-item>
            <el-form-item class="staff-edit-form-gender" label="性别">
              <el-select v-model="editStudent.gender">
                <el-option label="男" :value="1"/>
                <el-option label="女" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item class="staff-edit-form-phone" label="手机号">
              <el-input v-model="editStudent.phone"/>
            </el-form-item>
            <el-form-item class="staff-edit-form-degree" label="最高学历">
              <el-select v-model="editStudent.degree">
                <el-option label="本科" :value="1"/>
                <el-option label="大专" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item class="staff-edit-form-class" label="所属班级">
              <el-select v-model="editStudent.class_"/>
            </el-form-item>
            <el-form-item class="staff-edit-form-btn-group">
              <div class="btn-group">
                <el-button type="primary" style="width: 150px; height: 40px;">创建</el-button>
                <el-button type="info" style="width: 150px; height: 40px;">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {Plus, Minus} from '@element-plus/icons-vue';
import {Ref, reactive, ref, ComputedRef, computed, onMounted} from 'vue';
import Student from '../types/student';
import {Store, useStore} from "vuex";
import SpringAPI from "../utils/request.ts";

// 学生信息列表
const studentList: Array<Student> = reactive<Array<Student>>([]);

// 表格上展示的信息列表
const listInTable: ComputedRef<Array<Student>> = computed(() => {
  const start: number = (page.value - 1) * Number(pageNumber.value);
  const end: number = Math.min(page.value * Number(pageNumber.value), studentList.length);
  return studentList.slice(start, end);
});

// 用户全局状态
const store: Store<any> = useStore();

// 每页展示的信息条数
const pageNumber: Ref<string> = ref('10');

// 当前页数
const page: Ref<number> = ref(1);

// 每页可展示的信息数列表
const pageNumberList: number[] = [10, 20, 50, 100];

// 定义用户信息
const userId: ComputedRef<number> = computed(() => {
  return store.state.user.userId
});
const token: ComputedRef<string> = computed(() => {
  return store.state.user.token
});
const username: ComputedRef<string> = computed(() => {
  return store.state.user.username
});

// 新建学生信息窗口是否打开
const createDialogVisible: Ref<boolean> = ref(false);
// 新建学生的基本信息
const newStudent: Student = reactive<Student>(new Student());

// 编辑学生信息窗口是否打开
const editDialogVisible: Ref<boolean> = ref(false);
// 编辑学生的基本信息
const editStudent: Student = reactive<Student>(new Student());

onMounted(() => {
  getStudentList();
})

// 打开新建学生信息窗口
const openCreateDialog = (): void => {
  createDialogVisible.value = true;
}

// 获取学生信息列表
const getStudentList = (): void => {
  SpringAPI.getStudentList(token.value, userId.value, username.value)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 获取学生信息列表成功
          const studentList_: Array<Student> = result.get("studentList") as Array<Student>;
          studentList_.forEach((student: Student) => {
            studentList.push(student);
          })
          console.log("获取学生信息列表成功, 数据: ", studentList);
        } else {
          console.log("获取学生信息列表失败, 信息: ", result.get("msg") as string);
        }
      })
}
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
  height: calc(100% - 150px);
  width: 90%;
  margin-top: 20px;
}

.student-table {
  display: flex;
  justify-content: flex-start;
  height: 80vh;
}

.page-configuration {
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