/*
 * @FilePath: /api/app/router.ts
 * @Description: 路由控制
 * @Author: humandetail
 * @Date: 2021-01-05 17:08:59
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-05 18:49:50
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/api/getTikuList', controller.tiku.getTikuList);
};
