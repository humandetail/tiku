/*
 * @FilePath: /tiku/web/src/store/user/index.ts
 * @Description: 用户信息管理
 * @Author: humandetail
 * @Date: 2021-01-12 16:29:57
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-12 16:37:09
 */

import { IGlobalState, IUserState } from '@/typings';
import { Commit, Module } from 'vuex';
import actionTypes from './actionTypes';

let nickname: string = '';

try {
  nickname = localStorage.getItem('tiku-nickname') || '';
} catch {}

const state = {
  nickname
};

const mutations = {
  [actionTypes.SET_NICKNAME] (state: IUserState, nickname: string) {
    state.nickname = nickname;

    try {
      localStorage.setItem('tiku-nickname', nickname);
    } catch {}
  }
};

const actions = {
  [actionTypes.SET_NICKNAME] ({ commit }: { commit: Commit }, nickname: string) {
    commit(actionTypes.SET_NICKNAME, nickname);
  }
};

const userModule: Module<IUserState, IGlobalState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default userModule;
