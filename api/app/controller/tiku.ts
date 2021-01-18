/*
 * @FilePath: /tiku/api/app/controller/tiku.ts
 * @Description: 题库控制器
 * @Author: humandetail
 * @Date: 2021-01-05 17:08:59
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-05 22:49:28
 */
import { Controller } from 'egg';
import { IGetTikuListParams } from '../../typings';

export default class TikuController extends Controller {
  public async getTikuList (): Promise<void> {
    const { ctx } = this;

    // subject	是	int	选择考试科目类型，1：科目1；4：科目4
    // model	是	string	驾照类型，可选择参数为：c1,c2,a1,a2,b1,b2；当subject=4时可省略
    // testType	否	string	测试类型，rand：随机测试（随机100个题目），order：顺序测试（所选科目全部题目
    let {
      subject,
      model,
      testType
    }: IGetTikuListParams = ctx.request.body;
    
    const result = await ctx.service.tiku.getTikuList({ subject, model, testType });

    ctx.body = {
      errCode: result && result.length ? 0 : -1,
      data: result
    };
  }
}
