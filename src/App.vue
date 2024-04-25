<template>
  <el-config-provider :locale="locale" class="app">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
const locale = zhCn;
</script>

<style lang="scss">
html,
body,
#app,
.app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: 1920px;
  max-height: 1080px;
}
</style>
