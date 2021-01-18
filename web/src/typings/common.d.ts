/*
 * @FilePath: /tiku/web/src/typings/common.d.ts
 * @Description: 公共类型管理
 * @Author: humandetail
 * @Date: 2021-01-05 20:52:23
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-11 17:29:39
 */

import { BScrollInstance } from "@better-scroll/core";

// 题库请求的参数
interface ITikuRequestParams {
  subject: number;
  model: string;
  testType: string;
};

// 题库项
interface ITikuItem {
  id: string;
  question: string;
  answer: string;
  explains: string;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  url: string;
  userOption?: string;
};

// 驾照类型
interface ILicenseType {
  name: string;
  value: string;
}

// 科目
interface ISubjectItem {
  name: string;
  value: number;
}

// 答案选项
interface IAnswerOption {
  showLabel: boolean;
  label: string;
  value: string;
  userOption: string;
  userOptionIsRight: boolean;
  isRightAnswer: boolean;
}

// 用户选择
interface IUserSelectOption {
  label: string;
  id: string;
}

// 题库序号项
interface IQuestionNumberItem {
  number: number;
  userOption: string;
  isRight: boolean;
}

// 测试结果
interface ITestingResult {
  duration: string;
  amount: number;
  rightAmount: number;
  score: number;
  isPassed: boolean;
}

// 测试统计
interface ITestCountItem {
  duration: number;
  score: number;
  subject: number;
  model: string;
}

export {
  ITikuRequestParams,
  ITikuItem,
  ILicenseType,
  ISubjectItem,
  IAnswerOption,
  IUserSelectOption,
  IQuestionNumberItem,
  ITestingResult,
  ITestCountItem
};
