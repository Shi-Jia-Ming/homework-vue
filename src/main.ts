import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// 注册全局路由
import router from './router';
// 注册用户全局状态
import store from './store';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
