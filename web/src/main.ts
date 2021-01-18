/*
 * @FilePath: /tiku/web/src/main.ts
 * @Description: 入口文件
 * @Author: humandetail
 * @Date: 2021-01-05 19:21:17
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-15 14:25:05
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './router/guard'; // 引入全局路由守卫
import Notice from './plugins/notice';

import './assets/js/setting.js';
import './assets/styles/border.css';
import './assets/styles/iconfont.css';
import './assets/styles/reset.scss';

const app = createApp(App);

app.use(Notice);

app.use(store).use(router).mount('#app');
