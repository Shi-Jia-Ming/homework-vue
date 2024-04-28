<template>
  <div class="login-layout">
    <div class="login-container">
      <div class="login-image-container">
        <img class="login-image" src="../assets/login.png" width="517px">
      </div>
      <div class="login-form-container">
        <div class="login-title">
          培训管理系统
        </div>
        <el-form class="login-form" :model="loginForm" label-position="right" label-width="auto" size="large"
          ref="loginFormRef" :rules="rules">
          <el-form-item label="用户名" class="username-item" prop="username" :error="formErrMsg.usernameErr">
            <el-input class="input" placeholder="请输入员工用户名" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item label="密&nbsp; &nbsp; 码" class="password-item" prop="password" :error="formErrMsg.passwordErr">
            <el-input class="input" placeholder="作品展示PPT" v-model="loginForm.password" />
          </el-form-item>
          <el-form-item class="btn-group-item">
            <div class="btn-group">
              <el-button type="primary" class="login-btn" @click="login(loginFormRef)">登录</el-button>
              <el-button type="info" class="cancel-btn" @click="reset(loginFormRef)">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, reactive, ref } from 'vue';
import SpringAPI from '../utils/request';
import { FormRules, type FormInstance } from 'element-plus';
import { Store, useStore } from 'vuex';
import { Router, useRouter } from 'vue-router';

// el-form 控制器
const loginFormRef: Ref = ref<FormInstance>();

// 用户全局状态
const userStore: Store<any> = useStore();

// 路由控制器
const router: Router = useRouter();

// 登录表单
const loginForm: {
  username: string,
  password: string
} = reactive({
  username: '',
  password: ''
});

// 登录验证的错误信息
const formErrMsg: {
  usernameErr: string,
  passwordErr: string
} = reactive({
  usernameErr: '',
  passwordErr: ''
});

// 用户名验证
const validateUsername = (_rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error("用户名不能为空"));
  } else {
    callback();
  }
}

// 密码验证
const validatePassword = (_rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error("密码不能为空"));
  } else {
    callback();
  }
}

// 登录验证规则
const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
});

// 登录函数
const login = (formEl: FormInstance | undefined): undefined | boolean => {
  if (!formEl) return;
  formEl.validate((isValid: boolean) => {
    if (isValid) {
      console.log("表单验证通过");

      // 向后端发送请求进行登录验证
      SpringAPI.login(loginForm).then((result: Map<string, Object>): boolean | undefined => {
        if (result.get("msg") === "未查询到该用户") {
          formErrMsg.usernameErr = result.get("msg") as string;
          formErrMsg.passwordErr = '';
          return false;
        } else if (result.get("code") === 1) {
          formErrMsg.passwordErr = result.get("msg") as string;
          formErrMsg.usernameErr = '';
          return false;
        } else {
          // 登录成功，设置用户全局状态          
          userStore.commit('user/setUserId', result.get("id"));
          userStore.commit('user/setToken', result.get("token"));
          
          // 路由跳转
          router.push({ path: "/home" });
        }
      })
    } else {
      console.log("登录失败");
      return false;
    }
  })
}

// 重置表单
const reset = (formEl: FormInstance | undefined): void => {
  if (!formEl) return;
  formEl.resetFields();
}

</script>

<style lang="scss">
.login-layout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  display: flex;
  flex-direction: row;
  width: 1017px;
  height: 550px;
  margin: auto auto;
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

.el-form-item__error {
  margin-left: 30px;
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