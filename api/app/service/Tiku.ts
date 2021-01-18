/*
 * @FilePath: /api/app/service/Tiku.ts
 * @Description: tiku service
 * @Author: humandetail
 * @Date: 2021-01-05 17:08:59
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-05 19:13:13
 */
import { Service } from 'egg';
import { IGetTikuListParams, IHttpGetParams, ITikuData } from '../../typings';
import { getTikuReturnData } from '../lib/utils';

export default class Tiku extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async getTikuList ({ subject, model, testType }: IGetTikuListParams) {
    const { ctx } = this;

    return ctx.httpGet(<IHttpGetParams>{
      url: ctx.app.config.API.GET_TIKU_LIST,
      data: {
        subject: subject || 1,
        model: model || 'c1',
        testType: testType || 'rand'
      },
      success (data) {
        return getTikuReturnData<ITikuData>(data, subject);
      },
      error (err) {
        throw new Error('Request failed: ' + err);
      } 
    });
  }
}
