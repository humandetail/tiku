/*
 * @FilePath: /tiku/web/src/store/index.ts
 * @Description: vuex store
 * @Author: humandetail
 * @Date: 2021-01-05 19:21:17
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-12 16:37:23
 */
import { IGlobalState } from '@/typings';
import { createStore } from 'vuex';
import tiku from './tiku';
import user from './user';

export default createStore<IGlobalState>({
  modules: {
    tiku,
    user
  }
});
