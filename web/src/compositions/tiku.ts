/*
 * @FilePath: /tiku/web/src/compositions/tiku.ts
 * @Description: 题库相关的自定义hooks
 * @Author: humandetail
 * @Date: 2021-01-07 01:01:30
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-12 15:43:13
 */

import { Store } from 'vuex';
import { IAnswerOption, IGlobalState, IQuestionNumberItem, ITikuItem, ITestingResult, ITikuState, ITestCountItem } from '@/typings';
import {
  computed,
  ComputedRef
} from 'vue';

/**
 * 当前问题是否为选择题
 * @param { ITikuItem } question - 题库中的问题项
 * @return { ComputedRef<boolean> }
 */
export function useIsTrueOrFalseQuestion (question: ITikuItem): ComputedRef<boolean> {
  return computed<boolean>(() => {
    const {
      item3,
      item4
    } = question;
    return !item3 && !item4;
  })
}

/**
 * 获取问题的答案选项
 * @param { ITikuItem } question - 题库中的问题项
 * @return { ComputedRef<IAnswerOption[]> }
 */
export function useAnswerOptions (question: ITikuItem): ComputedRef<IAnswerOption[]> {
  const isTrueOrFalseQuestion = useIsTrueOrFalseQuestion(question).value;

  return computed<IAnswerOption[]>(() => {
    const {
      item1,
      item2,
      item3,
      item4,
      userOption = '',
      answer
    } = question;

    const options = [
      {
        // 是否显示 label，判断题则无
        showLabel: !isTrueOrFalseQuestion,
        // 当前选项的 label
        label: 'A',
        // 当前选项的值
        value: item1,
        // 用户选中的值
        userOption,
        // 用户是否回答正确
        userOptionIsRight: Boolean(userOption && userOption === 'A' && answer === '1'),
        // 当前选项是否为正确答案
        isRightAnswer: answer === '1'
      },
      {
        // 是否显示 label，判断题则无
        showLabel: !isTrueOrFalseQuestion,
        // 当前选项的 label
        label: 'B',
        // 当前选项的值
        value: item2,
        // 用户选中的值
        userOption,
        // 用户是否回答正确
        userOptionIsRight: Boolean(userOption && userOption === 'B' && answer === '2'),
        // 当前选项是否为正确答案
        isRightAnswer: answer === '2'
      }
    ];

    // 非判断题时才有可能会有C 、 D 选项
    if (!isTrueOrFalseQuestion) {
      if (item3) {
        options.push({
          // 是否显示 label，判断题则无
          showLabel: !isTrueOrFalseQuestion,
          // 当前选项的 label
          label: 'C',
          // 当前选项的值
          value: item3,
          // 用户选中的值
          userOption,
          // 用户是否回答正确
          userOptionIsRight: Boolean(userOption && userOption === 'C' && answer === '3'),
          // 当前选项是否为正确答案
          isRightAnswer: answer === '3'
        });
      }
      if (item4) {
        options.push({
          // 是否显示 label，判断题则无
          showLabel: !isTrueOrFalseQuestion,
          // 当前选项的 label
          label: 'D',
          // 当前选项的值
          value: item4,
          // 用户选中的值
          userOption,
          // 用户是否回答正确
          userOptionIsRight: Boolean(userOption && userOption === 'D' && answer === '4'),
          // 当前选项是否为正确答案
          isRightAnswer: answer === '4'
        });
      }
    }

    return options;
  });
}

/**
 * 获取当前正在测试的题型标题
 */
export function useTestingtitle (store: Store<IGlobalState>): ComputedRef<string> {
  return computed(() => {
    const {
      subject,
      model
    } = store.state.tiku;

    return `【${model}】科目${subject}`;
  });
}

/**
 * 获取当前测试剩余的时间
 */
export function useTestingDuration (store: Store<IGlobalState>): ComputedRef<string> {
  return computed(() => {
    const {
      duration
    } = store.state.tiku;

    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${(minutes + '').padStart(2, '0')} : ${(seconds + '').padStart(2, '0')}`;
  });
}

/**
 * 获取当前正在进行测试的题目序号
 */
export function useQuestionNumbers (store: Store<IGlobalState>): ComputedRef<IQuestionNumberItem[]> {
  return computed(() => {
    const tikuList = store.state.tiku.tikuList;

    return tikuList.map((tiku, index) => {
      const {
        userOption = '',
        answer
      } = tiku;
      let isRight = false;

      switch (userOption) {
        case 'A':
          isRight = answer === '1';
          break;
        case 'B':
          isRight = answer === '2';
          break;
        case 'C':
          isRight = answer === '3';
          break;
        case 'D':
          isRight = answer === '4';
          break;
        default:
          break;
      }

      return {
        number: index,
        userOption,
        isRight
      }
    })
  });
}

/**
 * 获取测试是否已经结束
 */
export function useIsEnd (store: Store<IGlobalState>): ComputedRef<boolean> {
  return computed(() => {
    return store.state.tiku.isEnd;
  });
}

/**
 * 获取当前测试结果
 */
export function useTestingResult (store: Store<IGlobalState> | null, state: ITikuState | null = null): ComputedRef<ITestingResult> {
  return computed(() => {
    if (!store) {
      if (!state) {
        throw new Error('Either "store" or "state" must be passed');
      }
    } else {
      state = store.state.tiku;
    }

    const {
      subject,
      tikuList,
      duration
    } = state;

    // 计分比率
    const scale = subject === 4 ? 2 : 1;

    const score = tikuList.reduce((prev, item) => {
      const {
        answer,
        userOption = ''
      } = item;
      let isRight = false;

      switch (userOption) {
        case 'A':
          isRight = answer === '1';
          break;
        case 'B':
          isRight = answer === '2';
          break;
        case 'C':
          isRight = answer === '3';
          break;
        case 'D':
          isRight = answer === '4';
          break;
        default:
          break;
      }

      return isRight
        ? prev + 1
        : prev;
    }, 0);

    const _duration = 45 * 60 - duration; // 使用时间

    const minutes = Math.floor(_duration / 60);
    const seconds = _duration % 60;

    return {
      duration: `${minutes}分${seconds}秒`,
      amount: tikuList.length,
      rightAmount: score,
      score: score * scale,
      isPassed: score * scale >= 90
    };
  });
}

/**
 * 存储当前测试信息到本地
 */
export function useSaveToLocal (state: ITikuState): Promise<void> {
  return new Promise((resolve) => {
    try {
      localStorage.setItem('previousTest', JSON.stringify(state));
    } catch {}

    resolve();
  });
}

/**
 * 存储测试统计到本地
 */
export function useSaveTestCount (state: ITikuState): Promise<void> {
  return new Promise((resolve) => {
    try {
      // 从本地中获取到统计数据
      const testCount = JSON.parse(localStorage.getItem('testCount') || '[]');
      // 获取测试结果
      const result = useTestingResult(null, state);

      const {
        subject,
        model,
        duration
      } = state;

      const { score } = result.value;

      testCount.push({
        subject,
        model,
        score,
        duration: 45 * 60 - duration
      } as ITestCountItem);
      // 存储测试结果
      localStorage.setItem('testCount', JSON.stringify(testCount));
    } catch {}

    resolve();
  });
}

/**
 * 获取测试统计数据
 */
export function useGetTestCount (): ComputedRef<{ [key: string]: ITestCountItem[] } | null> {
  return computed(() => {
    let testCount: ITestCountItem[] = [];

    try {
      testCount = JSON.parse(localStorage.getItem('testCount') || '[]');
    } catch {}

    if (!testCount.length) {
      return null;
    }

    const temp: {
      [key: string]: ITestCountItem[];
    } = {};

    let key: string;

    testCount.forEach((item) => {
      const {
        subject,
        model
      } = item;
      key = `subject-${subject}:model-${model}`;

      if (!temp[key]) {
        temp[key] = [];
      }

      temp[key].push(item);
    });
    return temp;
  });
};
