/*
 * @FilePath: /tiku/web/vue.config.js
 * @Description: vue配置
 * @Author: humandetail
 * @Date: 2021-01-05 21:03:27
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-05 21:19:53
 */

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
