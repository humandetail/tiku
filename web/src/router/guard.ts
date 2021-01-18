/*
 * @FilePath: /tiku/web/src/router/guard.ts
 * @Description: 全局路由守卫
 * @Author: humandetail
 * @Date: 2021-01-11 14:40:04
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-12 16:51:05
 */

import router from './index';
import store from '../store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import actionTypes from '@/store/user/actionTypes';
import { getRandomNickname } from '@/lib/utils';

NProgress.configure({
  showSpinner: false
});

// 前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start();

  const tikuList = store.state.tiku.tikuList;
  const nickname = store.state.user.nickname;

  if (!nickname) {
    store.dispatch(`user/${actionTypes.SET_NICKNAME}`, getRandomNickname());
  }

  // 当前没有测试题目，无法进入测试页面
  if (to.name === 'Testing' && tikuList.length <= 0) {
    return next({
      name: 'Home'
    });
  }

  next();
});

// 后置守卫
router.afterEach(() => {
  NProgress.done();
});
