/*
 * @FilePath: /api/config/plugin.ts
 * @Description: 插件配置
 * @Author: humandetail
 * @Date: 2021-01-05 17:08:59
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-05 17:46:32
 */
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  cors: {
    enable: true,
    package: 'egg-cors'
  }
};

export default plugin;
