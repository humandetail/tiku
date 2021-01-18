/*
 * @FilePath: /tiku/web/src/typings/store.d.ts
 * @Description: vuex store 相关类型定义
 * @Author: humandetail
 * @Date: 2021-01-06 15:48:28
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-12 16:34:11
 */

import { ITikuItem } from './common';

export interface ITikuState {
  subject: number;
  model: string;
  testType: string;
  tikuList: ITikuItem[];
  isTesting: boolean;
  isLoading: boolean;
  duration: number;
  isEnd: boolean;
};

export interface IUserState {
  nickname: string;
}

export interface IGlobalState {
  tiku: ITikuState,
  user: IUserState
};
