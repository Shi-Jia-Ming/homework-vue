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
      <el-table stripe style="width: 100%" class="staff-table" :data="staffList">
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
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-configuraiton">
        <div class="page-number-select">
          <p>每页展示的员工数：</p>
          <el-select multiple placeholder="选择" style="width: 100px" v-model="pageNumber">
            <el-option v-for="item in pageNumberList" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
        <div class="page-select">
          <p>共{{ staffList.length }}条数据</p>
          <el-pagination background layout="prev, pager, next, jumper" :total="10" class="pagination" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue';
import { ComputedRef, Ref, computed, onMounted, reactive, ref } from 'vue';
import { useStore, Store } from 'vuex';
import Staff from '../types/staff';
import SpringAPI from '../utils/request';

// 员工信息列表
const staffList: Array<Staff> = reactive([]);

// 全局状态管理
const store: Store<any> = useStore();

// 每页展示的信息条数
const pageNumber: Ref<number> = ref(10);

// 每页可展示的信息数列表
const pageNumberList: number[] = [10, 20, 50, 100];

// 定义用户信息
const userId: ComputedRef<number> = computed(() => { return store.state.user.userId });
const token: ComputedRef<string> = computed(() => { return store.state.user.token });
const username: ComputedRef<string> = computed(() => { return store.state.user.username });

onMounted(() => {
  getStaffList();
});

// 获取员工信息列表
const getStaffList = (): void => {
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
  height: calc(100% - 150px);
  width: (170 * 7 + 55)px;
  max-width: 90%;
  margin-top: 20px;
}

.staff-table {
  display: flex;
  justify-content: flex-start;
  height: 80%;
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