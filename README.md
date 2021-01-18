# 细节驾照题库

本项目为后台数据接口采用 [Egg.js](https://eggjs.org/zh-cn/intro/quickstart.html) 开发，接口数据来自 [聚合数据](https://www.juhe.cn/docs)；前台采用 [Vue3.0](https://vue3js.cn/) 开发。

本项目为 [Typescript](https://www.tslang.cn/) 练习项目。

## 启动

1. 后台

在 `api/config/config.default.ts` 中填写您的聚合接口的 `APP_KEY`。

```typescript
  const userConfig = {
    APP_KEY: 'YOUR APP_KEY',
    API: {
      BASE_URL: 'http://v.juhe.cn/',
      GET_TIKU_LIST: 'http://v.juhe.cn/jztk/query'
    }
  };
```

然后在控制台中输入 `npm run dev` 来运行接口，默认端口为：7001。

2. 前台

在 `web/vue.config.js` 中填写正确的后台数据接口。

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true
      }
    }
  }
}
```

然后在控制台输入 `npm run serve` 即可运行前台项目，默认端口为：8080。
