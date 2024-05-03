<template>
  <div class="student-manage-layout">
    <div class="student-manage-title-container">
      <p class="student-manage-title">学员管理</p>
    </div>
    <div class="search-group">
      <!-- 查询学员的表单 -->
      <el-form :inline="true" style="width: 100%; display: flex; justify-content: flex-start;" :model="searchForm"
               ref="searchFormRef">
        <el-form-item label="学员姓名" class="student-name-container" prop="name">
          <el-input style="width: 180px; height: 35px;" v-model="searchForm.name" clearable/>
        </el-form-item>

        <el-form-item label="学号" class="student-time-container" prop="stuNumber">
          <el-input style="width: 180px; height: 35px;" v-model="searchForm.stuNumber" clearable/>
        </el-form-item>

        <el-form-item label="最高学历" class="student-degree-container" prop="degree">
          <el-select style="width: 180px; height: 35px;" v-model="searchForm.degree" clearable/>
        </el-form-item>

        <el-form-item label="所属班级" class="student-class-container" prop="classId">
          <el-select style="width: 180px; height: 35px;" v-model="searchForm.classId" clearable>
            <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item class="search-btn-container">
          <el-button type="info" class="search-btn" @click="reset(searchFormRef)">清空</el-button>
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

      <el-button type="primary" class="add-btn" @click="openDeleteDialog">
        <template #icon>
          <el-icon :size="15" style="margin-right: 5px;">
            <minus/>
          </el-icon>
          <p>批量删除</p>
        </template>
      </el-button>
    </div>
    <div class="student-table-container">
      <el-table stripe  class="student-table" :data="listInTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column fixed="left" prop="name" label="姓名" width="100"/>
        <el-table-column prop="stuNumber" label="学号" width="150"/>
        <el-table-column prop="class" label="班级" width="150">
          <template #default="scope">
            <p>{{ scope.row.class_.name }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="80">
          <template #default="scope">
            <p>{{ scope.row.gender === 1 ? "男" : "女" }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="150"/>
        <el-table-column prop="degree" label="最高学历" width="100">
          <template #default="scope">
            <p>{{ scope.row.degree === 1 ? "本科" : "大专" }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="breakCount" label="违纪次数" width="100"/>
        <el-table-column prop="minus" label="违纪扣分" width="100"/>
        <el-table-column prop="updatedAt" label="最后操作时间" width="120">
          <template #default="scope">
            <p>{{ new Date(scope.row.updateAt).toLocaleDateString() }}</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="openEditDialog(scope.row)">
              编辑
            </el-button>
            <el-button link type="primary" size="small" @click="openMinusDialog(scope.row)">
              违纪
            </el-button>
            <el-button link type="primary" size="small" @click="openDeleteDialog(scope.row)">
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

    <!-- 添加学员弹窗 -->
    <el-dialog v-model="createDialogVisible" width="800" draggable>
      <div class="create-dialog-layout">
        <div class="student-create-title-container">
          <p class="student-create-title">添加学员信息</p>
        </div>
        <div class="student-create-form-container">
          <el-form class="student-create-form" label-position="right" label-width="auto">
            <el-form-item class="student-create-form-name" label="姓名">
              <el-input v-model="newStudent.name"/>
            </el-form-item>
            <el-form-item class="student-create-form-stu-number" label="学号">
              <el-input v-model="newStudent.stuNumber"/>
            </el-form-item>
            <el-form-item class="student-create-form-gender" label="性别">
              <el-select v-model="newStudent.gender">
                <el-option label="男" :value="1"/>
                <el-option label="女" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item class="student-create-form-phone" label="手机号">
              <el-input v-model="newStudent.phone"/>
            </el-form-item>
            <el-form-item class="student-create-form-degree" label="最高学历">
              <el-select v-model="newStudent.degree">
                <el-option label="本科" :value="1"/>
                <el-option label="大专" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item class="student-create-form-class" label="所属班级">
              <el-select v-model="selectedClassId">
                <el-option v-for="item in classList" :key="item.id" :value="item.id" :label="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item class="student-create-form-btn-group">
              <div class="btn-group">
                <el-button type="primary" style="width: 150px; height: 40px;" @click="createStudent">创建</el-button>
                <el-button type="info" style="width: 150px; height: 40px;">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <!-- 编辑学员信息弹窗 -->
    <el-dialog v-model="editDialogVisible" width="800" draggable>
      <div class="edit-dialog-layout">
        <div class="student-edit-title-container">
          <p class="student-edit-title">编辑学员信息</p>
        </div>
        <div class="student-edit-form-container">
          <el-form class="student-edit-form" label-position="right" label-width="auto">
            <el-form-item class="student-edit-form-name" label="姓名">
              <el-input v-model="editStudent.name"/>
            </el-form-item>
            <el-form-item class="student-edit-form-stu-number" label="学号">
              <el-input v-model="editStudent.stuNumber"/>
            </el-form-item>
            <el-form-item class="student-edit-form-gender" label="性别">
              <el-select v-model="editStudent.gender">
                <el-option label="男" :value="1"/>
                <el-option label="女" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item class="student-edit-form-phone" label="手机号">
              <el-input v-model="editStudent.phone"/>
            </el-form-item>
            <el-form-item class="student-edit-form-degree" label="最高学历">
              <el-select v-model="editStudent.degree">
                <el-option label="本科" :value="1"/>
                <el-option label="大专" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item class="student-edit-form-class" label="所属班级">
              <el-select v-model="selectedClassId">
                <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item class="student-edit-form-btn-group">
              <div class="btn-group">
                <el-button type="primary" style="width: 150px; height: 40px;" @click="updateStudent">确认</el-button>
                <el-button type="info" style="width: 150px; height: 40px;" @click="editDialogVisible = false">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <!-- 删除学生信息弹窗 -->
    <el-dialog v-model="deleteDialogVisible" width="800" draggable>
      <div class="delete-dialog-layout">
        <div class="student-delete-title-container">
          <p class="student-delete-title">删除学员信息</p>
        </div>
        <div class="student-delete-form-container">
          <div class="student-name-input-container">
            <span class="student-name-input-label">您确定要删除该学员信息吗？</span>
          </div>
        </div>
        <div class="student-delete-dialog-btn">
          <el-button type="primary" style="width: 150px; height: 40px;" @click="deleteStudent">确认</el-button>
          <el-button type="info" style="width: 150px; height: 40px;" @click="deleteDialogVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 学员扣分弹窗 -->
    <el-dialog v-model="minusDialogVisible" width="800" draggable>
      <div class="delete-dialog-layout">
        <div class="student-delete-title-container">
          <p class="student-delete-title">学员违纪处理</p>
        </div>
        <div class="student-delete-form-container">
          <el-form>
            <el-form-item label="违纪扣分">
              <el-input v-model="minusPoint"/>
            </el-form-item>
          </el-form>
        </div>
        <div class="student-delete-dialog-btn">
          <el-button type="primary" style="width: 150px; height: 40px;" @click="minusPointExec">确认</el-button>
          <el-button type="info" style="width: 150px; height: 40px;" @click="deleteDialogVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {Plus, Minus} from '@element-plus/icons-vue';
import {Ref, reactive, ref, ComputedRef, computed, onMounted, watch} from 'vue';
import Student from '../types/student';
import {Store, useStore} from "vuex";
import SpringAPI from "../utils/request.ts";
import Class from "../types/class.ts";
import {FormInstance} from "element-plus";

// 查询表单
const searchForm: {
  name: string | undefined,
  stuNumber: string | undefined,
  degree: number | undefined,
  classId: number | undefined
} = reactive({
  name: undefined,
  stuNumber: undefined,
  degree: undefined,
  classId: undefined
});

watch(searchForm, () => {
  // 根据 classId 查询课程
  const student: Student = new Student();
  student.name = searchForm.name;
  student.stuNumber = searchForm.stuNumber;
  student.degree = searchForm.degree;

  student.class_ = (classList.filter((class_: Class) => {
    return class_.id === searchForm.classId
  }))[0]
  searchStudentLike(student);
});

// 选中的班级对象
const selectedClassId: Ref<number | undefined> = ref<number | undefined>(undefined);

// 学生信息列表
const studentList: Array<Student> = reactive<Array<Student>>([]);

// 班级列表
const classList: Array<Class> = reactive<Array<Class>>([]);

// 表格上展示的信息列表
const listInTable: ComputedRef<Array<Student>> = computed(() => {
  const start: number = (page.value - 1) * Number(pageNumber.value);
  const end: number = Math.min(page.value * Number(pageNumber.value), studentList.length);
  return studentList.slice(start, end);
});

// 用户全局状态
const store: Store<any> = useStore();

// 表单控制器
const searchFormRef: Ref<FormInstance> = ref<FormInstance>();

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

// 删除学生信息窗口是否打开
const deleteDialogVisible: Ref<boolean> = ref(false);
// 删除学生的基本信息
const studentToDelete: Student = reactive<Student>(new Student());
// 删除的学生列表
const studentListToDelete: Array<Student> = reactive<Array<Student>>([]);
// 选中的学生列表
const selectedStudentList: Ref<Array<Student>> = ref<Array<Student>>([]);

// 扣分窗口是否打开
const minusDialogVisible: Ref<boolean> = ref(false);
// 被扣分的基本信息
const minusStudent: Student = reactive<Student>(new Student());
// 违纪扣分的分数
const minusPoint: Ref<string | undefined> = ref(undefined);

onMounted(() => {
  getClassList();
  getStudentList();
})

// 打开新建学生信息窗口
const openCreateDialog = (): void => {
  selectedClassId.value = undefined;
  newStudent.setUndefined();
  createDialogVisible.value = true;
}

// 打开编辑学生信息窗口
const openEditDialog = (student: Student): void => {
  selectedClassId.value = student.class_?.id;
  editStudent.setValue(student);
  editDialogVisible.value = true;
}

// 打开违纪窗口
const openMinusDialog = (student: Student): void => {
  minusPoint.value = undefined;
  minusStudent.setValue(student);
  minusDialogVisible.value = true;
}

// 打开删除学员信息窗口
const openDeleteDialog = (student: Student | undefined): void => {
  if (student !== undefined) {
    studentToDelete.setValue(student);
  }
  deleteDialogVisible.value = true;
}

// 重置表单
const reset = (formEl: FormInstance | undefined): void => {
  if (!formEl) return;
  formEl.resetFields();
}

// 表格选择更新回调
const handleSelectionChange = (selected: Student[]): void => {
  selectedStudentList.value = selected;
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

// 根据部分信息模糊查询
const searchStudentLike = (student: Student): void => {
  studentList.splice(0);
  SpringAPI.searchStudentLike(token.value, userId.value, username.value, student)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 模糊查询成功
          const studentList_: Array<Student> = result.get("studentList") as Array<Student>;
          console.log("result", result);
          studentList_.forEach((student: Student) => {
            studentList.push(student);
          })
          console.log("模糊查询成功");
        } else {
          console.log("模糊查询失败, 信息: ", result.get("msg") as string);
        }
      })
}

// 新建学生信息
const createStudent = (): void => {
  // 填充默认值
  newStudent.class_ = (classList.filter((class_: Class) => { return class_.id === selectedClassId.value }))[0];
  newStudent.breakCount = 0;
  newStudent.minus = 0;
  newStudent.createAt = new Date();
  newStudent.updateAt = new Date();
  SpringAPI.createStudent(token.value, userId.value, username.value, newStudent)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 创建成功
          newStudent.id = result.get("studentId") as number;
          const copy: Student = new Student();
          copy.setValue(newStudent);
          studentList.push(copy);
          console.log("新建学生信息成功");
          createDialogVisible.value = false;
        } else {
          console.log("新建学生信息失败, 信息: ", result.get("msg") as string);
        }
      })
}

// 更改学生信息
const updateStudent = (): void => {
  // 填充默认值
  // TODO 优化循环选择：使用filter选择
  editStudent.class_ = (classList.filter((class_: Class) => { return class_.id === selectedClassId.value }))[0];
  editStudent.updateAt = new Date();
  SpringAPI.updateStudent(token.value, userId.value, username.value, editStudent)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 更新成功
          studentList.forEach((student: Student) => {
            if (student.id === editStudent.id) {
              student.name = editStudent.name;
              student.stuNumber = editStudent.stuNumber;
              student.class_ = editStudent.class_;
              student.gender = editStudent.gender;
              student.phone = editStudent.phone;
              student.degree = editStudent.degree;
              student.updateAt = editStudent.updateAt;
            }
          })
          console.log("更新学员信息成功");
          editDialogVisible.value = false;
        } else {
          console.log("更新学员信息失败, 信息: ", result.get("msg") as string);
        }
      })
}

// 学员扣分
const minusPointExec = (): void => {
  // 计算分数
  minusStudent.breakCount++;
  minusStudent.minus += Number(minusPoint.value);
  minusStudent.updateAt = new Date();
  SpringAPI.updateStudent(token.value, userId.value, username.value, minusStudent)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 更新成功
          studentList.forEach((student: Student) => {
            if (student.id === minusStudent.id) {
              student.breakCount = minusStudent.breakCount;
              student.minus = minusStudent.minus;
              student.updateAt = minusStudent.updateAt;
            }
          })
          console.log("学员违纪记录成功");
          minusDialogVisible.value = false;
        } else {
          console.log("学员违纪记录失败, 信息: ", result.get("msg") as string);
        }
      })
}

// 删除学员信息
const deleteStudent = async (): Promise<void> => {
  // 清空列表消息
  studentListToDelete.splice(0);
  studentListToDelete.push(studentToDelete);
  selectedStudentList.value.forEach((student: Student) => {
    studentListToDelete.push(student);
  });
  await SpringAPI.deleteStudent(token.value, userId.value, username.value, studentListToDelete)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          studentListToDelete.forEach((studentToDel: Student) => {
            studentList.forEach((studentInTable: Student) => {
              if (studentInTable.id === studentToDel.id) {
                studentList.splice(studentList.indexOf(studentInTable), 1);
              }
            })
          })
          deleteDialogVisible.value = false;
          console.log("删除员工信息成功");
        } else {
          console.log("删除员工信息失败, 信息: ", result.get("msg") as string);
        }
      })
}

// 获取班级信息列表
const getClassList = (): void => {
  SpringAPI.getClassList(token.value, userId.value, username.value)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 获取信息成功
          const classList_: Array<Class> = result.get("classes");
          classList_.forEach((class_: Class) => {
            classList.push(class_);
          })
          console.log("获取班级信息成功, 列表: ", classList);
        } else {
          console.log("获取班级信息失败, 信息: ", result.get("msg"));
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
  width: 100%;
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