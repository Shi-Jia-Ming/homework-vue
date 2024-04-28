<template>
  <div class="app-container">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { onMounted } from 'vue';
import { Store, useStore } from 'vuex';
import CookieAPI from './utils/cookie';

const locale = zhCn;

const store: Store<any> = useStore();

onMounted(() => {
  store.replaceState(CookieAPI.getCookie('vuexState'));
})
</script>

<style lang="scss">
html,
body,
#app,
.app-container {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: 1920px;
  max-height: 1080px;
}
</style>
