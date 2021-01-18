/*
 * @FilePath: /tiku/web/.eslintrc.js
 * @Description: 
 * @Author: humandetail
 * @Date: 2021-01-05 19:21:17
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-05 21:24:09
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 0,
    '@typescript-eslint/no-explicit-any': 0
  }
}
