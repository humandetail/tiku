/*
 * @FilePath: /tiku/web/src/router/index.ts
 * @Description: 路由配置
 * @Author: humandetail
 * @Date: 2021-01-05 19:21:17
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-11 16:13:13
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/testing',
    name: 'Testing',
    component: () => import(/* webpackChunkName: "testing" */'../views/Testing.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */'../views/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
