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
      <el-button type="primary" class="add-btn">
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
  </div>
</template>

<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue';
import Class from "../types/class.ts";
import {Store, useStore} from 'vuex';
import {ComputedRef, onMounted, reactive, Ref, ref, computed, watch} from "vue";
import SpringAPI from "../utils/request.ts";

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

onMounted(() => {
  getClassList();
});

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