<template>
  <div class="common-layout">
    <div class="home-container">
      <div class="home-header">
        <div class="product-label">
          <el-icon color="#ffffff" :size="40" class="product-icon">
            <ChromeFilled />
          </el-icon>
          <div class="product-name">
            培训管理系统
          </div>
        </div>
        <div class="login-options">
          <el-button type="default" class="header-btn" color="#464c59" size="large">
            <template #icon>
              <el-icon :size="20">
                <edit-pen />
              </el-icon>
            </template>
            修改密码
          </el-button>
          <el-button type="default" class="header-btn" color="#464c59">
            <template #icon>
              <el-icon :size="20">
                <switch-button />
              </el-icon>
            </template>
            退出登录
          </el-button>
        </div>
      </div>
      <div class="home-main-container">
        <div class="home-sider">
          <el-menu default-active="/home/class" class="el-menu-vertical" :default-openeds="['class', 'system', 'data']"
            :router="true">
            <el-sub-menu index="class">
              <template #title>
                <span class="sub-menu-title">班级学员管理</span>
              </template>
              <el-menu-item index="/home/class">班级管理</el-menu-item>
              <el-menu-item index="/home/student">学员管理</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="system">
              <template #title>
                <span class="sub-menu-title">系统信息管理</span>
              </template>
              <el-menu-item index="/home/department">部门管理</el-menu-item>
              <el-menu-item index="/home/staff">员工管理</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="data">
              <template #title>
                <span class="sub-menu-title">数据统计管理</span>
              </template>
              <el-menu-item index="/home/statistic">员工信息统计</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
        <div class="home-main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { EditPen, SwitchButton, ChromeFilled } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
  width: 100%;
}

.home-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.home-main-container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 56px);
}

.home-header {
  display: flex;
  justify-content: space-between;
  background-color: #464c5a;
  height: 56px;
}

.product-label {
  display: flex;
  flex-direction: row;
  height: inherit;
  text-align: center;
}

.product-icon {
  height: inherit;
  margin: 0 5px 0 10px;
}

.product-name {
  align-self: center;
  font-size: 32px;
  color: #ffffff;
}

.login-options {
  display: flex;
  justify-content: flex-end;
  height: inherit;
  margin-right: 10px;
}

.header-btn {
  display: flex;
  border: 1px #797979 solid;
  justify-content: center;
  align-items: center;
  height: inherit;
  width: 100px;
  border-radius: 0%;
}

.home-sider {
  width: 200px;
}

.el-menu-vertical {
  height: 100%;
}

.sub-menu-title {
  font-size: medium;
  font-weight: 1000;
}

.home-main {
  width: calc(100% - 200px);
  height: inherit;
}
</style>