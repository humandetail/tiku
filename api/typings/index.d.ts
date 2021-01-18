/*
 * @FilePath: /api/typings/index.d.ts
 * @Description: 类型声明
 * @Author: humandetail
 * @Date: 2021-01-05 17:08:59
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-05 18:40:31
 */
import 'egg';

interface IHttpGetParams {
  url: string;
  data: any;
  success: (data: any) => void;
  error: (err: any) => void;
};

interface IGetTikuListParams {
  subject: number;
  model: string;
  testType: string;
}

// "id": 12,
// "question": "这个标志是何含义？",//问题
// "answer": "4",//答案
// "item1": "前方40米减速",//选项，当内容为空时表示判断题正确选项
// "item2": "最低时速40公里",//选项，当内容为空时表示判断题错误选项
// "item3": "限制40吨轴重",
// "item4": "限制最高时速40公里",
// "explains": "限制最高时速40公里：表示该标志至前方限制速度标志的路段内，机动车行驶速度不得超过标志所示数值。此标志设在需要限制车辆速度的路段的起点。以图为例：限制行驶时速不得超过40公里。",//答案解释
// "url": "http://images.juheapi.com/jztk/c1c2subject1/12.jpg"//图片url
interface ITikuData {
  id: number;
  question: string;
  answer: string;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  explains: string;
  url: string;
}

declare module 'egg' {
  IHttpGetParams,
  IGetTikuListParams,
  ITikuData
}