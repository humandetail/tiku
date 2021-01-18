/*
 * @FilePath: /tiku/api/config/config.default.ts
 * @Description: 用户配置
 * @Author: humandetail
 * @Date: 2021-01-05 17:08:59
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-18 14:40:30
 */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1609837681860_5580';

  // add your egg config in here
  config.middleware = [];

  config.cors = {
    origin: () => '*',
    allowMethods: 'GET,POST,PUT,DELETE,PATCH,HEAD',
    credentials: true
  };

  config.security = {
    csrf: {
      enable: false
    }
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  const userConfig = {
    APP_KEY: '',
    API: {
      BASE_URL: 'http://v.juhe.cn/',
      GET_TIKU_LIST: 'http://v.juhe.cn/jztk/query'
    }
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    ...userConfig
  };
};
