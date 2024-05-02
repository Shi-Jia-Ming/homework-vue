<template>
  <div class="class-manage-layout">
    <div class="class-manage-title-container">
      <p class="class-manage-title">班级管理</p>
    </div>
    <div class="search-group">
      <!-- 查询班级的表单 -->
      <el-form :inline="true" style="width: 100%; display: flex; justify-content: flex-start;" :model="searchForm" ref="searchFormRef">
        <el-form-item label="班级名称" class="class-name-container" prop="name">
          <el-input style="width: 200px; height: 35px;" v-model="searchForm.name"/>
        </el-form-item>

        <el-form-item label="结课时间" class="class-time-container" prop="startDate">
          <el-date-picker type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
                          style="width: 200px; height: 35px;" v-model="searchForm.date"/>
        </el-form-item>

        <el-form-item class="search-btn-container" prop="endDate">
          <el-button type="info" class="search-btn" @click="reset(searchFormRef)">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-btn-container">
      <el-button type="primary" class="add-btn" @click="openCreateDialog">
        <template #icon>
          <el-icon :size="15" style="margin-right: 5px;">
            <plus/>
          </el-icon>
          <p>新增班级</p>
        </template>
      </el-button>
    </div>
    <div class="class-table-container">
      <el-table stripe style="width: 100%" class="class-table" :data="listInTable">
        <el-table-column prop="id" label="序号" width="170"/>
        <el-table-column prop="name" label="班级名称" width="170"/>
        <el-table-column prop="startDate" label="开课时间" width="170">
          <template #default="scope">
            <p>{{ new Date(scope.row.startDate).toLocaleDateString() }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="结课时间" width="170">
          <template #default="scope">
            <p>{{ new Date(scope.row.endDate).toLocaleDateString() }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="teacher" label="班主任" width="170">
          <template #default="scope">
            <p>{{ scope.row.headTeacher.name }}</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="openEditDialog(scope.row)">
              编辑
            </el-button>
            <el-button link type="primary" size="small" @click="openDeleteDialog(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-configuration">
        <div class="page-number-select">
          <p>每页展示的班级数：</p>
          <el-select placeholder="选择" style="width: 100px" v-model="pageNumber">
            <el-option v-for="item in pageNumberList" :key="item" :label="item" :value="item"/>
          </el-select>
        </div>
        <div class="page-select">
          <p>共{{ classList.length }}条数据</p>
          <el-pagination background layout="prev, pager, next, jumper" :total="classList.length"
                         :page-size="Number(pageNumber)" class="pagination" v-model:current-page="page"
                         :default-current-page="1"/>
        </div>
      </div>
    </div>

    <!-- 创建课程窗口 -->
    <el-dialog v-model="createDialogVisible" width="800" draggable>
      <div class="staff-create-dialog-layout">
        <div class="staff-create-title-container">
          <p class="staff-create-title">添加班级信息</p>
        </div>
        <div class="staff-create-form-container">
          <el-form class="staff-create-form" label-position="right" label-width="auto">
            <el-form-item class="staff-create-form-username" label="班级名称">
              <el-input v-model="createClassObj.name"/>
            </el-form-item>
            <el-form-item class="staff-create-form-name" label="班级教室">
              <el-input v-model="createClassObj.classroom"/>
            </el-form-item>
            <el-form-item class="staff-create-form-name" label="开课时间">
              <el-date-picker v-model="createClassObj.startDate"/>
            </el-form-item>
            <el-form-item class="staff-create-form-name" label="结课时间">
              <el-date-picker v-model="createClassObj.endDate"/>
            </el-form-item>
            <el-form-item class="staff-create-form-gender" label="班主任">
              <el-select v-model="selectedStaffId">
                <el-option  v-for="headTeacher in headTeacherList" :label="headTeacher.name" :value="headTeacher.id"/>
              </el-select>
            </el-form-item>
            <el-form-item class="staff-create-form-btn-group">
              <div class="btn-group">
                <el-button type="primary" style="width: 150px; height: 40px;" @click="createClass">创建</el-button>
                <el-button type="info" style="width: 150px; height: 40px;" @click="createDialogVisible = false">取消
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <!-- 更新班级弹窗 -->
    <el-dialog v-model="editDialogVisible" width="800" draggable>
      <div class="staff-create-dialog-layout">
        <div class="staff-create-title-container">
          <p class="staff-create-title">添加班级信息</p>
        </div>
        <div class="staff-create-form-container">
          <el-form class="staff-create-form" label-position="right" label-width="auto">
            <el-form-item class="staff-create-form-username" label="班级名称">
              <el-input v-model="editClassObj.name"/>
            </el-form-item>
            <el-form-item class="staff-create-form-name" label="班级教室">
              <el-input v-model="editClassObj.classroom"/>
            </el-form-item>
            <el-form-item class="staff-create-form-name" label="开课时间">
              <el-date-picker v-model="editClassObj.startDate"/>
            </el-form-item>
            <el-form-item class="staff-create-form-name" label="结课时间">
              <el-date-picker v-model="editClassObj.endDate"/>
            </el-form-item>
            <el-form-item class="staff-create-form-gender" label="班主任">
              <el-select v-model="selectedStaffId">
                <el-option  v-for="headTeacher in headTeacherList" :label="headTeacher.name" :value="headTeacher.id"/>
              </el-select>
            </el-form-item>
            <el-form-item class="staff-create-form-btn-group">
              <div class="btn-group">
                <el-button type="primary" style="width: 150px; height: 40px;" @click="editClass">确认</el-button>
                <el-button type="info" style="width: 150px; height: 40px;" @click="editDialogVisible = false">取消
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <!-- 删除班级窗口 -->
    <el-dialog v-model="deleteDialogVisible" width="800" draggable>
      <div class="delete-dialog-layout">
        <div class="staff-delete-title-container">
          <p class="staff-delete-title">删除班级信息</p>
        </div>
        <div class="staff-delete-form-container">
          <div class="staff-name-input-container">
            <span class="staff-name-input-label">您确定要删除该班级信息吗？</span>
          </div>
        </div>
        <div class="staff-delete-dialog-btn">
          <el-button type="primary" style="width: 150px; height: 40px;" @click="deleteClass">确认</el-button>
          <el-button type="info" style="width: 150px; height: 40px;" @click="deleteDialogVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue';
import Class from "../types/class.ts";
import {Store, useStore} from 'vuex';
import {ComputedRef, onMounted, reactive, Ref, ref, computed, watch} from "vue";
import SpringAPI from "../utils/request.ts";
import {FormInstance} from "element-plus";
import Staff from "../types/staff.ts";

// 用户全局状态
const store: Store<any> = useStore();

// 表单控制器
const searchFormRef = ref<FormInstance>();

// 条件查询的班级的部分信息
const partClass: Ref<Class> = ref(new Class());

// 条件查询的表单
const searchForm: {
  name: string | undefined,
  date: Array<Date | undefined>
} = reactive({
  name: undefined,
  date: [undefined, undefined]
});

watch(searchForm, () => {
  partClass.value.name = searchForm.name;
  partClass.value.startDate = searchForm.date[0];
  partClass.value.endDate = searchForm.date[1];
  searchClassLikeList();
});

// 班级列表
const classList: Array<Class> = reactive<Class>([]);
// 班主任信息列表
const headTeacherList: Array<Staff> = reactive<Staff>([]);

// 每页展示的信息条数
const pageNumber: Ref<string> = ref<string>('10');

// 当前页数
const page: Ref<number> = ref(1);

// 每页可展示的信息数列表
const pageNumberList: number[] = [10, 20, 50, 100];

// 表格上展示的信息列表
const listInTable: ComputedRef<Array<Class>> = computed(() => {
  const start: number = (page.value - 1) * Number(pageNumber.value);
  const end: number = Math.min(page.value * Number(pageNumber.value), classList.length);
  return classList.slice(start, end);
});

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

// 新建班级信息窗口是否打开
const createDialogVisible: Ref<boolean> = ref(false);
// 新建班级信息的对象
const createClassObj: Class = reactive(new Class());
// 选中的职员 id
const selectedStaffId: Ref<number | undefined> = ref();

// 编辑班级信息窗口是否打开
const editDialogVisible: Ref<boolean> = ref(false);
// 编辑班级信息的对象
const editClassObj: Class = reactive(new Class());

// 删除班级信息窗口是否打开
const deleteDialogVisible: Ref<boolean> = ref(false);
// 删除的班级对象
const deleteClassObj: Class = reactive(new Class());

onMounted(() => {
  getClassList();
});

// 打开新建班级窗口
const openCreateDialog = (): void => {
  getHeadTeacherList();
  selectedStaffId.value = undefined;
  // 重置 createClassObj
  createClassObj.setUndefined();
  createDialogVisible.value = true;
}
// 打开编辑班级的窗口
const openEditDialog = (class_: Class): void => {
  getHeadTeacherList();
  selectedStaffId.value = class_.headTeacher?.id;
  // 设置 editClassObj
  editClassObj.setValue(class_);
  editDialogVisible.value = true;
}
// 打开删除班级窗口
const openDeleteDialog = (class_: Class): void => {
  deleteClassObj.setValue(class_);
  deleteDialogVisible.value = true;
}

// 重置表单
const reset = (formEl: FormInstance | undefined): void => {
  if (!formEl) return;
  formEl.resetFields();
}

// 获取班级列表
const getClassList = (): void => {
  classList.splice(0);
  SpringAPI.getClassList(token.value, userId.value, username.value)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 获取班级列表成功
          const _classList = result.get("classes") as Array<Class>;
          _classList.forEach((class_: Class) => {
            classList.push(class_);
          })
          console.log("获取班级列表成功, 班级列表: ", classList);
        } else {
          console.log("获取班级列表失败, 信息: ", result.get("msg") as string);
        }
      })
}

// 根据部分信息进行模糊查询
const searchClassLikeList = (): void => {
  classList.splice(0);
  SpringAPI.searchClassLikeList(token.value, userId.value, username.value, partClass.value)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 获取班级列表成功
          const _classList = result.get("classes") as Array<Class>;
          _classList.forEach((class_: Class) => {
            classList.push(class_);
          })
          console.log("模糊查询成功");
        } else {
          console.log("模糊查询失败, 信息: ", result.get("msg") as string);
        }
      })
}

// 新增班级数据
const createClass = async (): Promise<void> => {
  // 填充默认信息
  createClassObj.updateAt = new Date();
  createClassObj.createAt = new Date();
  // 填充班主任信息
  headTeacherList.forEach((headTeacher: Staff) => {
    if (headTeacher.id === selectedStaffId.value) {
      createClassObj.headTeacher = headTeacher;
    }
  })
  // 向后端发送请求
  await SpringAPI.createClass(token.value, userId.value, username.value, createClassObj)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 新建成功
          createClassObj.id = result.get("classId") as number;
          const copy: Class = new Class();
          copy.setValue(createClassObj);
          classList.push(copy);
          createDialogVisible.value = false;
          console.log("新建班级信息成功");
        } else {
          console.log("新建班级信息失败, 信息: ", result.get("msg") as string);
        }
      })
}

// 更新班级数据
const editClass = async (): Promise<void> => {
  // 填充默认信息
  createClassObj.updateAt = new Date();
  // 填充班主任信息
  headTeacherList.forEach((headTeacher: Staff) => {
    if (headTeacher.id === selectedStaffId.value) {
      editClassObj.headTeacher = headTeacher;
    }
  })
  // 向后端请求
  await SpringAPI.updateClass(token.value, userId.value, username.value, editClassObj)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 更新成功
          classList.forEach((class_: Class) => {
            if (class_.id === editClassObj.id) {
              // 设置值
              class_.name = editClassObj.name;
              class_.classroom = editClassObj.classroom;
              class_.startDate = editClassObj.startDate;
              class_.endDate = editClassObj.endDate;
              class_.headTeacher = editClassObj.headTeacher;
              class_.createAt = editClassObj.createAt;
              class_.updateAt = editClassObj.updateAt;
            }
          })
          console.log("更新班级数据成功");
          editDialogVisible.value = false;
        } else {
          console.log("更新班级数据失败, 信息: ", result.get("msg") as string);
        }
      })
}

// 删除班级数据
const deleteClass = async (): Promise<void> => {
  SpringAPI.deleteClass(token.value, userId.value, username.value, deleteClassObj)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 删除成功
          classList.forEach((classToDel: Class) => {
            if (classToDel.id === deleteClassObj.id) {
              classList.splice(classList.indexOf(classToDel), 1);
            }
            console.log("删除班级信息成功");
          })
          deleteDialogVisible.value = false;
        } else {
          console.log("删除班级信息失败, 信息: ", result.get("msg") as string);
        }
      })
}

// 获取班主任信息列表
const getHeadTeacherList = (): void => {
  headTeacherList.splice(0);
  SpringAPI.getHeadTeacher(token.value, userId.value, username.value)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 获取信息成功
          const headTeacherList_ = result.get("headTeacherList") as Array<Staff>;
          headTeacherList_.forEach((headTeacher: Staff) => {
            headTeacherList.push(headTeacher);
          })
          console.log("获取班主任信息列表成功");
        } else {
          console.log("获取班主任信息列表失败, 信息; ", result.get("msg") as string);
        }
      })
}
</script>

<style lang="scss">
.class-manage-layout {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: calc(100% - 56px);
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
  height: calc(100% - 150px);
  width: 170 * 6px;
  max-width: 90%;
  margin-top: 20px;
}

.class-table {
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