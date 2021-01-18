/*
 * @FilePath: /api/app/extend/context.ts
 * @Description: context 扩展
 * @Author: humandetail
 * @Date: 2021-01-05 17:47:03
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-05 18:39:32
 */

const nodeFetch = require('node-fetch');

import { IHttpGetParams } from '../../typings';
import { formatParams } from '../lib/utils';

module.exports = {
  httpGet (options: IHttpGetParams): Promise<void> {
    const { url, data, success, error } = options;
    console.log(url + formatParams(data, this.app.config.APP_KEY));
    return nodeFetch(url + formatParams(data, this.app.config.APP_KEY))
      .then((res) => res.json())
      .then((data) => success(data.result))
      .catch((err) => error(err));
  }
}