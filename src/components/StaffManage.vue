<template>
  <div class="staff-manage-layout">
    <div class="staff-manage-title-container">
      <p class="staff-manage-title">员工管理</p>
    </div>
    <div class="search-group">
      <!-- 查询员工的表单 -->
      <el-form :inline="true" style="width: 100%; display: flex; justify-content: flex-start;" :model="searchForm"
               ref="searchFormRef">
        <el-form-item label="姓名" class="staff-name-container" prop="name">
          <el-input style="width: 180px; height: 35px;" v-model="searchForm.name" clearable/>
        </el-form-item>

        <el-form-item label="性别" class="staff-degree-container" prop="gender">
          <el-select style="width: 180px; height: 35px;" v-model="searchForm.gender" clearable>
            <el-option label="男" :value="1"/>
            <el-option label="女" :value="2"/>
          </el-select>
        </el-form-item>

        <el-form-item label="入职日期" class="staff-class-container" prop="entryDate">
          <el-date-picker type="datetime" style="width: 180px; height: 35px;" v-model="searchForm.entryDate"/>
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
          <p>添加员工</p>
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
    <div class="staff-table-container">
      <el-table stripe style="width: 100%" class="staff-table" :data="listInTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column fixed="left" prop="name" label="姓名" width="170"/>
        <el-table-column prop="image" label="图像" width="170">
          <template #default="scope">
            <el-image :src="`/api/${scope.row.image}`" style="width: 75px; height: 75px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="170">
          <template #default="scope">
            <p>{{ scope.row.gender === 1 ? "男" : "女" }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="job" label="职位" width="170">
          <template #default="scope">
            <p>{{
                scope.row.job === 1 ? "班主任" :
                    scope.row.job === 2 ? "讲师" :
                        scope.row.job === 3 ? "学工主管" :
                            scope.row.job === 4 ? "教研主管" :
                                scope.row.job === 5 ? "咨询师" : ""
              }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="entryDate" label="入职日期" width="170">
          <template #default="scope">
            <p>{{ new Date(scope.row.entryDate).toLocaleDateString() }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="最后操作时间" width="170">
          <template #default="scope">
            <p>{{ new Date(scope.row.updateAt).toLocaleDateString() }}</p>
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
          <p>每页展示的员工数：</p>
          <el-select placeholder="选择" style="width: 100px" v-model="pageNumber">
            <el-option v-for="item in pageNumberList" :key="item" :label="item" :value="item"/>
          </el-select>
        </div>
        <div class="page-select">
          <p>共{{ staffList.length }}条数据</p>
          <el-pagination background layout="prev, pager, next, jumper" :total="staffList.length"
                         :page-size="Number(pageNumber)" class="pagination" v-model:current-page="page"
                         :default-current-page="1"/>
        </div>
      </div>
    </div>

    <!-- 添加员工弹窗 -->
    <el-dialog v-model="createDialogVisible" width="800" draggable>
      <div class="staff-create-dialog-layout">
        <div class="staff-create-title-container">
          <p class="staff-create-title">添加员工信息</p>
        </div>
        <div class="staff-create-form-container">
          <el-form class="staff-create-form" label-position="right" label-width="auto">
            <el-form-item class="staff-create-form-username" label="用户名">
              <el-input v-model="newStaffObj.username"/>
            </el-form-item>
            <el-form-item class="staff-create-form-name" label="员工姓名">
              <el-input v-model="newStaffObj.name"/>
            </el-form-item>
            <el-form-item class="staff-create-form-gender" label="性别">
              <el-select v-model="newStaffObj.gender">
                <el-option label="男" :value="1"/>
                <el-option label="女" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item class="staff-create-form-image" label="图像">
              <el-upload class="avatar-uploader" action="/api/upload/image"
                         :show-file-list="false" :on-success="handleAvatarSuccessCreate" :before-upload="beforeAvatarUploadCreate">
                <el-image v-if="newStaffObj.image" :src="`/api/${newStaffObj.image}`" class="avatar" style="width: 178px; height: 178px;"/>
                <el-icon v-else class="avatar-uploader-icon">
                  <plus/>
                </el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item class="staff-create-form-job" label="职位">
              <el-select v-model="newStaffObj.job">
                <el-option label="班主任" :value="1"/>
                <el-option label="讲师" :value="2"/>
                <el-option label="学工主管" :value="3"/>
                <el-option label="教研主管" :value="4"/>
                <el-option label="咨询师" :value="5"/>
              </el-select>
            </el-form-item>
            <el-form-item class="staff-create-form-entry-date" label="入职日期">
              <el-date-picker v-model="newStaffObj.entryDate"/>
            </el-form-item>
            <el-form-item class="staff-create-form-department" label="归属部门">
              <el-select v-model="departmentId">
                <el-option v-for="department in departmentList" :key="department.id"
                           :label="department.name" :value="department.id"/>
              </el-select>
            </el-form-item>
            <el-form-item class="staff-create-form-btn-group">
              <div class="btn-group">
                <el-button type="primary" style="width: 150px; height: 40px;" @click="createStaff">创建</el-button>
                <el-button type="info" style="width: 150px; height: 40px;" @click="createDialogVisible = false">取消
                </el-button>
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
            <el-form-item class="staff-edit-form-username" label="用户名">
              <el-input v-model="editStaffObj.username"/>
            </el-form-item>
            <el-form-item class="staff-edit-form-name" label="员工姓名">
              <el-input v-model="editStaffObj.name"/>
            </el-form-item>
            <el-form-item class="staff-edit-form-gender" label="性别">
              <el-select v-model="editStaffObj.gender">
                <el-option label="男" :value="1"/>
                <el-option label="女" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item class="staff-edit-form-image" label="图像">
              <el-upload class="avatar-uploader" action="/api/upload/image"
                         :show-file-list="false" :on-success="handleAvatarSuccessEdit" :before-upload="beforeAvatarUploadEdit">
                <el-image v-if="editStaffObj.image" :src="`/api/${editStaffObj.image}`" class="avatar" style="width: 178px; height: 178px;"/>
                <el-icon v-else class="avatar-uploader-icon">
                  <plus/>
                </el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item class="staff-edit-form-job" label="职位">
              <el-select v-model="editStaffObj.job">
                <el-option label="班主任" :value="1"/>
                <el-option label="讲师" :value="2"/>
                <el-option label="学工主管" :value="3"/>
                <el-option label="教研主管" :value="4"/>
                <el-option label="咨询师" :value="5"/>
              </el-select>
            </el-form-item>
            <el-form-item class="staff-edit-form-entry-date" label="入职日期">
              <el-date-picker v-model="editStaffObj.entryDate"/>
            </el-form-item>
            <el-form-item class="staff-edit-form-department" label="归属部门">
              <el-select v-model="departmentId">
                <el-option v-for="department in departmentList" :key="department.id" :value="department.id" :label="department.name" />
              </el-select>
            </el-form-item>
            <el-form-item class="staff-edit-form-btn-group">
              <div class="btn-group">
                <el-button type="primary" style="width: 150px; height: 40px;" @click="editStaff">确认</el-button>
                <el-button type="info" style="width: 150px; height: 40px;" @click="editDialogVisible = false">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <!-- 删除员工信息窗口 -->
    <el-dialog v-model="deleteDialogVisible" width="800" draggable>
      <div class="delete-dialog-layout">
        <div class="staff-delete-title-container">
          <p class="staff-delete-title">删除部门信息</p>
        </div>
        <div class="staff-delete-form-container">
          <div class="staff-name-input-container">
            <span class="staff-name-input-label">您确定要删除该员工信息吗？</span>
          </div>
        </div>
        <div class="staff-delete-dialog-btn">
          <el-button type="primary" style="width: 150px; height: 40px;" @click="deleteStaff">确认</el-button>
          <el-button type="info" style="width: 150px; height: 40px;" @click="deleteDialogVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {Plus, Minus} from '@element-plus/icons-vue';
import {ComputedRef, Ref, computed, onMounted, reactive, ref, watch} from 'vue';
import {useStore, Store} from 'vuex';
import Staff from '../types/staff';
import SpringAPI from '../utils/request';
import {FormInstance, UploadProps} from 'element-plus';
import Department from "../types/department.ts";

// 查询表单
const searchForm: {
  name: string | undefined,
  gender: number | undefined,
  entryDate: Date | undefined
} = reactive({
  name: undefined,
  gender: undefined,
  entryDate: undefined
});

// 侦听表单改变更新列表数据
watch(searchForm, () => {
  getStaffLikeList();
});

// 员工信息列表
const staffList: Array<Staff> = reactive([]);
// 待删除的员工信息列表
const staffListToDelete: Array<Staff> = reactive([]);
// 待删除的员工信息
const staffToDelete: Staff = reactive(new Staff());
// 选中的员工信息列表
const selectedStaffList: Ref<Staff[]> = ref<Staff[]>([]);

// 部门信息列表
const departmentList: Array<Department> = reactive([]);

// 表格上展示的信息列表
const listInTable: ComputedRef<Array<Staff>> = computed(() => {
  const start: number = (page.value - 1) * Number(pageNumber.value);
  const end: number = Math.min(page.value * Number(pageNumber.value), staffList.length);
  return staffList.slice(start, end);
});

// 全局状态管理
const store: Store<any> = useStore();

// 表单控制器
const searchFormRef = ref<FormInstance>();

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

// 新建员工信息窗口是否打开
const createDialogVisible: Ref<boolean> = ref(false);
// 新建员工的基本信息
const newStaffObj: Staff = reactive<Staff>(new Staff());
// 选择的部门 id
const departmentId: Ref<number | undefined> = ref<number | undefined>();

// 编辑员工信息窗口是否打开
const editDialogVisible: Ref<boolean> = ref(false);
// 编辑员工的基本信息
const editStaffObj: Staff = reactive<Staff>(new Staff());

// 删除员工信息窗口是否打开
const deleteDialogVisible: Ref<boolean> = ref(false);

onMounted(() => {
  getStaffList();
});


// 打开新建员工信息的窗口
const openCreateDialog = (): void => {
  // 将部门 id 清零
  departmentId.value = undefined;
  // 查询所有部门数据
  getDepartmentList();
  // 将 newStaff 设置为初始值
  newStaffObj.setUndefined();
  createDialogVisible.value = true;
}
// 打开编辑员工信息的窗口
const openEditDialog = (staff: Staff): void => {
  // 查询所有部门数据
  getDepartmentList();
  // 为 editStaffObj 赋值
  editStaffObj.setValue(staff);
  departmentId.value = editStaffObj.department?.id;
  editDialogVisible.value = true;
}
// 打开删除员工信息的窗口
const openDeleteDialog = (staff: Staff): void => {
  staffToDelete.setValue(staff);
  deleteDialogVisible.value = true;
}


// 重置表单
const reset = (formEl: FormInstance | undefined): void => {
  if (!formEl) return;
  formEl.resetFields();
}

// 用户上传图像之前回调
const beforeAvatarUploadCreate = (): UploadProps['beforeUpload'] => {
  if (newStaffObj.image !== undefined) {
    SpringAPI.deleteFile(newStaffObj.image)
        .then((result: Map<string, Object>) => {
          if (result.get("code") === 0) {
            console.log("删除旧头像成功");
            return true;
          } else {
            console.log("删除旧头像失败, 信息: ", result.get("msg") as string);
            return false;
          }
        })
  }
}

const beforeAvatarUploadEdit = (): UploadProps['beforeUpload'] => {
  if (editStaffObj.image !== undefined) {
    SpringAPI.deleteFile(editStaffObj.image)
        .then((result: Map<string, Object>) => {
          if (result.get("code") === 0) {
            console.log("删除旧头像成功");
            return true;
          } else {
            console.log("删除旧头像失败, 信息: ", result.get("msg") as string);
            return false;
          }
        })
  }
}

// 用户图像上传成功回调
const handleAvatarSuccessCreate = (response: string, _uploadFile): UploadProps['onSuccess'] => {
  newStaffObj.image = response;
  console.log("上传头像成功");
}

const handleAvatarSuccessEdit = (response: string, _uploadFile): UploadProps['onSuccess'] => {
  editStaffObj.image = response;
  console.log("上传头像成功");
}

// 表格选择更新回调
const handleSelectionChange = (selected: Staff[]): void => {
  selectedStaffList.value = selected;
}

// 获取员工信息列表
const getStaffList = (): void => {
  // 清空原列表
  staffList.splice(0);
  // 向后端发送请求
  SpringAPI.getStaffList(token.value, userId.value, username.value)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          const staff: Array<Staff> = result.get("staff") as Array<Staff>;
          staff.forEach((_staff: Staff) => {
            staffList.push(_staff);
          })
          console.log("获取员工信息列表成功，列表数据: ", staffList);
        } else {
          console.log("获取员工信息列表失败");
        }
      })
}

// 获取模糊查询的员工信息列表
const getStaffLikeList = (): void => {
  // 清空原列表
  staffList.splice(0);
  // 定义员工对象
  const staff: Staff = new Staff();
  staff.name = searchForm.name;
  staff.gender = searchForm.gender;
  staff.entryDate = searchForm.entryDate;
  // 向后端发送请求
  SpringAPI.searchStaffLikeList(token.value, userId.value, username.value, staff)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          const _staffList: Array<Staff> = result.get("staff") as Array<Staff>;
          _staffList.forEach((_staff: Staff) => {
            staffList.push(_staff);
          })
          console.log("模糊查询完毕");
        } else {
          console.log("模糊查询失败");
        }
      })
}

// 新建员工信息
const createStaff = async (): void => {
  // 填充默认信息
  newStaffObj.password = "123456";
  newStaffObj.createAt = new Date();
  newStaffObj.updateAt = new Date();
  // 填充部门信息
  departmentList.forEach((department: Department) => {
    if (department.id === departmentId.value) {
      newStaffObj.department = department;
    }
  })
  // 向后端发送请求
  await SpringAPI.createStaff(token.value, userId.value, username.value, newStaffObj)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 新建成功
          newStaffObj.id = result.get("staffId") as number;
          // TODO push不能push原对象
          staffList.push(newStaffObj);
          createDialogVisible.value = false;
          console.log("新建员工信息成功");
        } else {
          console.log("新建员工信息失败，信息：", result.get("msg") as string);
        }
      })
}

// 更改员工信息
const editStaff = async (): void => {
  await SpringAPI.editStaff(token.value, userId.value, username.value, editStaffObj)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 更改成功
          staffList.forEach((staff: Staff) => {
            if (staff.id === editStaffObj.id) {
              // 更新界面的数据
              staff.username = editStaffObj.username;
              staff.name = editStaffObj.name;
              staff.gender = editStaffObj.gender;
              staff.image = editStaffObj.image;
              staff.job = editStaffObj.job;
              staff.entryDate = editStaffObj.entryDate;
              staff.department = editStaffObj.department;
              staff.updateAt = new Date();
            }
          })
          console.log("员工信息更新成功");
          editDialogVisible.value = false;
        } else {
          console.log("员工信息更新失败");
        }
      })
}

// 删除员工信息
const deleteStaff = async (): void => {
  // 清空列表消息
  staffListToDelete.splice(0);
  staffListToDelete.push(staffToDelete);
  selectedStaffList.value.forEach((staff_: Staff) => {
    staffListToDelete.push(staff_);
  });
  SpringAPI.deleteStaff(token.value, userId.value, username.value, staffListToDelete)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          console.log("删除员工信息成功");
          // 删除界面中的数据
          staffListToDelete.forEach((staffToDel) => {
            staffList.forEach((staffInTable: Staff) => {
              if (staffInTable.id === staffToDel.id) {
                staffList.splice(staffList.indexOf(staffInTable), 1);
              }
            })
          })
          deleteDialogVisible.value = false;
        } else {
          console.log("删除员工信息失败");
        }
      })
}

// 获取所有部门数据
const getDepartmentList = (): void => {
  departmentList.splice(0);
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
</script>

<style lang="scss">
.staff-manage-layout {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: calc(100% - 56px);
}

.delete-dialog-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.staff-edit-title-container,
.staff-delete-title-container,
.staff-create-title-container,
.staff-manage-title-container {
  display: flex;
  border-left: 6px #1da8ed solid;
  height: 35px;
}

.staff-edit-title,
.staff-delete-title,
.staff-create-title,
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
  height: calc(100% - 150px);
  width: (170 * 7 + 55) px;
  max-width: 90%;
  margin-top: 20px;
}

.staff-table {
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

.el-overlay,
.el-overlay-dialog {
  height: 100%;
}

.staff-create-dialog-layout {
  margin: auto;
}

.staff-edit-form-container,
.staff-create-form-container {
  align-self: center;
  padding: 30px 20px;
}

.staff-delete-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: large;
}

.staff-edit-form-username,
.staff-edit-form-name,
.staff-edit-form-gender,
.staff-edit-form-image,
.staff-edit-form-job,
.staff-edit-form-entry-date,
.staff-edit-form-entry-department,
.staff-create-form-username,
.staff-create-form-name,
.staff-create-form-gender,
.staff-create-form-image,
.staff-create-form-job,
.staff-create-form-entry-date,
.staff-create-form-entry-department,
.staff-create-form-class {
  margin: 20px 0;
}

.staff-edit-form-btn-group,
.staff-create-form-btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 40px 0 0 0;
  width: 100%;
}

.staff-delete-dialog-btn {
  align-self: center;
  display: flex;
  justify-content: space-around;
  width: 75%;
  margin-bottom: 30px;
}

.btn-group {
  display: flex;
  justify-content: space-around;
  width: 75%;
  margin: auto;
}

// 上传组件样式
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>