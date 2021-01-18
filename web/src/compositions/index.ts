/*
 * @FilePath: /tiku/web/src/compositions/index.ts
 * @Description: 自定义hooks
 * @Author: humandetail
 * @Date: 2021-01-06 18:16:55
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-11 17:34:39
 */

import {
  useSlide,
  PluginAPI
} from './betterScroll';

import {
  useIsTrueOrFalseQuestion,
  useAnswerOptions,
  useTestingDuration,
  useTestingtitle,
  useQuestionNumbers,
  useIsEnd,
  useTestingResult,
  useSaveToLocal,
  useSaveTestCount,
  useGetTestCount
} from './tiku';

export {
  useSlide,
  PluginAPI,
  useIsTrueOrFalseQuestion,
  useAnswerOptions,
  useTestingDuration,
  useTestingtitle,
  useQuestionNumbers,
  useIsEnd,
  useTestingResult,
  useSaveToLocal,
  useSaveTestCount,
  useGetTestCount
}
