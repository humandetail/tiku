/*
 * @FilePath: /tiku/web/src/services/tiku.ts
 * @Description: 获取题库相关数据
 * @Author: humandetail
 * @Date: 2021-01-05 20:50:47
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-05 21:57:56
 */

import { ITikuRequestParams } from '@/typings';
import axios from '@/lib/axios';
import APIs from '@/config/api';

/**
 * 获取题库列表
 * @param { ITikuRequestParams } options - 请求参数
 * @return { Promsie<T> }
 */
function getTikuList<T> (options: ITikuRequestParams): Promise<T> {
  return axios.post<T, T>(APIs.GET_TIKU_LIST, options)
    .then((data) => data)
    .catch((err) => {
      throw new Error(err);
    });
}

export {
  getTikuList
}
