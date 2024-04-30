<template>
  <div class="staff-manage-layout">
    <div class="staff-manage-title-container">
      <p class="staff-manage-title">员工管理</p>
    </div>
    <div class="search-group">
      <!-- 查询员工的表单 -->
      <el-form :inline="true" style="width: 100%; display: flex; justify-content: flex-start;" :model="searchForm" ref="searchFormRef">
        <el-form-item label="姓名" class="staff-name-container" prop="name">
          <el-input style="width: 180px; height: 35px;" v-model="searchForm.name" clearable />
        </el-form-item>

        <el-form-item label="性别" class="staff-degree-container" prop="gender">
          <el-select style="width: 180px; height: 35px;" v-model="searchForm.gender" clearable>
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
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
      <el-table stripe style="width: 100%" class="staff-table" :data="listInTable">
        <el-table-column type="selection" width="55" />
        <el-table-column fixed="left" prop="name" label="姓名" width="170" />
        <el-table-column prop="image" label="图像" width="170">
          <template #default="scope">
            <el-image :src="scope.row.image"></el-image>
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
      <div class="page-configuraiton">
        <div class="page-number-select">
          <p>每页展示的员工数：</p>
          <el-select placeholder="选择" style="width: 100px" v-model="pageNumber">
            <el-option v-for="item in pageNumberList" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
        <div class="page-select">
          <p>共{{ staffList.length }}条数据</p>
          <el-pagination 
            background 
            layout="prev, pager, next, jumper" 
            :total="staffList.length" 
            :page-size="Number(pageNumber)"
            class="pagination"
            v-model:current-page="page"
            :default-current-page="1"
          />
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
              <el-input />
            </el-form-item>
            <el-form-item class="staff-create-form-stu-number" label="学号">
              <el-input />
            </el-form-item>
            <el-form-item class="staff-create-form-gender" label="性别">
              <el-select />
            </el-form-item>
            <el-form-item class="staff-create-form-phone" label="手机号">
              <el-input />
            </el-form-item>
            <el-form-item class="staff-create-form-degree" label="最高学历">
              <el-select />
            </el-form-item>
            <el-form-item class="staff-create-form-class" label="所属班级">
              <el-select />
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
  </div>
</template>

<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue';
import { ComputedRef, Ref, computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore, Store } from 'vuex';
import Staff from '../types/staff';
import SpringAPI from '../utils/request';
import { FormInstance } from 'element-plus';

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
  console.log(searchForm);
  
  getStaffLikeList();
});

// 打开新建员工信息的窗口
const openCreateDialog = (): void => {
  createDialogVisible.value = true;
}

// 员工信息列表
const staffList: Array<Staff> = reactive([]);

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
const userId: ComputedRef<number> = computed(() => { return store.state.user.userId });
const token: ComputedRef<string> = computed(() => { return store.state.user.token });
const username: ComputedRef<string> = computed(() => { return store.state.user.username });

// 新建员工信息窗口是否打开
const createDialogVisible: Ref<boolean> = ref(false);
// 新建员工的基本信息
const newStaff: Staff = reactive<Staff>(new Staff());

onMounted(() => {
  getStaffList();
});

// 重置表单
const reset = (formEl: FormInstance | undefined): void => {
  if (!formEl) return;
  formEl.resetFields();
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
    if (result.get("code") == 0) {
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
</script>

<style lang="scss">
.staff-create-layout,
.staff-manage-layout {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: calc(100% - 56px);
}

.staff-create-title-container,
.staff-manage-title-container {
  display: flex;
  border-left: 6px #1da8ed solid;
  height: 35px;
}

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
  width: (170 * 7 + 55)px;
  max-width: 90%;
  margin-top: 20px;
}

.staff-table {
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

.staff-create-form-container {
  align-self: center;
  padding: 30px 20px;
}

.staff-create-form-name,
.staff-create-form-gender,
.staff-create-form-stu-number,
.staff-create-form-phone,
.staff-create-form-degree,
staff-create-form-class {
  margin: 30px 0;
}

.staff-create-form-btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 40px 0 0 0;
  width: 100%;
}

.btn-group {
  display: flex;
  justify-content: space-around;
  width: 75%;
  margin: auto;
}
</style>