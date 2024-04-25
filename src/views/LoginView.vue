<template>
  <div class="login-container">
    <div class="login-image-container">
      <img class="login-image" src="../assets/login.png" width="517px">
    </div>
    <div class="login-form-container">
      <div class="login-title">
        培训管理系统
      </div>
      <el-form class="login-form" :model="loginForm" label-position="right" label-width="auto" size="large">
        <el-form-item label="用户名" class="username-item">
          <el-input class="input" placeholder="请输入员工用户名"/>
        </el-form-item>
        <el-form-item label="密&nbsp; &nbsp; 码" class="password-item">
          <el-input class="input" placeholder="作品展示PPT"/>
        </el-form-item>
        <el-form-item class="btn-group-item">
          <div class="btn-group">
            <el-button type="primary" class="login-btn">登录</el-button>
            <el-button type="info" class="cancel-btn">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


const loginForm: {
  username: string,
  password: string
} = reactive({
  username: '',
  password: ''
});

</script>

<style lang="scss">
.login-container {
  display: flex;
  flex-direction: row;
  width: 1017px;
  height: 550px;
  margin: auto;
  padding: 90px;
}

.login-form-container {
  border: 1px #d7d7d7 solid;
  width: 500px;
  height: 400px;
  align-self: center;
  padding: 0 30px;
  background-color: #f1ffff;
}

.login-title {
  font-size: 35px;
  text-align: start;
  margin-top: 25px;
  margin-left: -10px;
}

.username-item,
.password-item {
  margin: 30px 0;
}

.el-form-item__label {
  font-size: 16px;
}

.input {
  margin-left: 20px;
  margin-right: 30px;
}

.btn-group {
  width: 80%;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  margin-top: 20px;
}

.login-btn,
.cancel-btn {
  width: 120px;
}
</style>