/*
 * @FilePath: /tiku/web/src/store/tiku/index.ts
 * @Description: tiku store模块
 * @Author: humandetail
 * @Date: 2021-01-06 15:43:06
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-16 19:39:00
 */

import { Commit, Module } from 'vuex';
import { getTikuList } from '@/services/tiku';
import actionTypes from './actionTypes';
import {
  IGlobalState,
  ITikuItem,
  ITikuRequestParams,
  ITikuState,
  IUserSelectOption
} from '@/typings';
import { useSaveTestCount, useSaveToLocal } from '@/compositions';

const state: ITikuState = {
  // 科目
  subject: 1,
  // 驾照类型
  model: 'c1',
  // 题目顺序
  testType: 'rand',
  // 题库列表
  tikuList: [],
  // 测试状态
  isTesting: false,
  // 是否正在加载数据
  isLoading: false,
  // 测验时间 单位：s
  duration: 0,
  // 是否已经结束测试
  isEnd: false
};

const mutations = {
  // 设置当前科目
  [actionTypes.SET_SUBJECT] (state: ITikuState, subject: number) {
    state.subject = subject;
  },

  // 设置当前驾照类型
  [actionTypes.SET_MODEL] (state: ITikuState, model: string) {
    state.model = model;
  },

  // 设置当前是否正在请求数据
  [actionTypes.SET_LOADING] (state: ITikuState, isLoading: boolean) {
    state.isLoading = isLoading;
  },

  // 设置当前是否正在进行测试
  [actionTypes.SET_TESTING] (state: ITikuState, isTesting: boolean) {
    state.isTesting = isTesting;
  },

  // 设置当前正在测试的题库数据
  [actionTypes.SET_TIKU_LIST] (state: ITikuState, list: ITikuItem[]) {
    state.tikuList = list;
  },

  // 设置当前剩下的测试时间
  [actionTypes.SET_DURATION] (state: ITikuState, duration: number) {
    state.duration = duration;
  },

  // 设置当前测试是否已经结束
  [actionTypes.SET_IS_END] (state: ITikuState, isEnd: boolean) {
    state.isEnd = isEnd;
  }
};

const actions = {
  // 获取 tiku 列表
  async [actionTypes.SET_TIKU_LIST] ({ commit, state }: { commit: Commit; state: ITikuState }, options: ITikuRequestParams) {
    // 当前正在请求数据，或当前正在进行测试，不再获取数据
    if (state.isLoading || state.isTesting) {
      return;
    }

    commit(actionTypes.SET_LOADING, true);

    await getTikuList<ITikuItem[]>(options)
      .then((data) => {
        commit(actionTypes.SET_SUBJECT, options.subject);
        commit(actionTypes.SET_MODEL, options.model);
        commit(actionTypes.SET_TIKU_LIST, data);
        commit(actionTypes.SET_TESTING, true); // 进入测试状态
        commit(actionTypes.SET_LOADING, false);
        commit(actionTypes.SET_DURATION, 45 * 60); // 45分钟
        commit(actionTypes.SET_IS_END, false);
      })
      .catch((err) => {
        throw err;
      });
  },

  // 设置测试时间
  [actionTypes.SET_DURATION] ({ commit }: { commit: Commit }, duration: number) {
    commit(actionTypes.SET_DURATION, duration);
  },

  // 用户选择答案
  [actionTypes.SET_USER_OPTION] ({ commit, state }: { commit: Commit; state: ITikuState }, options: IUserSelectOption) {
    const {
      tikuList,
      isEnd
    } = state;

    // 当前已经结束测试，无法再选择答案
    if (isEnd) {
      return;
    }

    const {
      label,
      id
    } = options;

    commit(actionTypes.SET_TIKU_LIST, tikuList.map((item) => {
      if (item.id === id) {
        item.userOption = label;
      }

      return item;
    }));
  },

  // 测试结束
  async [actionTypes.SET_IS_END] ({ commit, state }: { commit: Commit; state: ITikuState }, isEnd: boolean) {
    commit(actionTypes.SET_IS_END, isEnd);
    // 存储当前测试内容到本地
    await useSaveToLocal(state);
    // 存储测试统计
    await useSaveTestCount(state);
  },

  // 查看上一次测试
  [actionTypes.CHECK_PREVIOUS_TEST] ({ commit, state }: { commit: Commit; state: ITikuState }): Promise<void> {
    return new Promise((resolve, reject) => {
      let previousTest: ITikuState | '' = '';

      try {
        previousTest = JSON.parse(localStorage.getItem('previousTest') || '');
      } catch {}

      if (!previousTest) {
        return reject(new Error(''));
      }

      const {
        subject,
        model,
        isEnd,
        isTesting,
        tikuList,
        duration
      } = previousTest;

      commit(actionTypes.SET_SUBJECT, subject);
      commit(actionTypes.SET_MODEL, model);
      commit(actionTypes.SET_IS_END, isEnd);
      commit(actionTypes.SET_TESTING, isTesting);
      commit(actionTypes.SET_TIKU_LIST, tikuList);
      commit(actionTypes.SET_DURATION, duration);

      resolve();
    });
  },

  // 退出测试
  [actionTypes.TEST_QUIT] ({ commit }: { commit: Commit }) {
    commit(actionTypes.SET_SUBJECT, 1);
    commit(actionTypes.SET_MODEL, 'c1');
    commit(actionTypes.SET_IS_END, false);
    commit(actionTypes.SET_TESTING, false);
    commit(actionTypes.SET_TIKU_LIST, []);
    commit(actionTypes.SET_DURATION, 0);
  }
};

const tikuModule: Module<ITikuState, IGlobalState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default tikuModule;
