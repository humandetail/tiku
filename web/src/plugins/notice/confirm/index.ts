/*
 * @FilePath: /tiku/web/src/plugins/notice/confirm/index.ts
 * @Description: confirm 插件
 * @Author: humandetail
 * @Date: 2021-01-15 16:43:50
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-16 19:21:56
 */

import { h, render } from 'vue';
import ConfirmVue from './src/index.vue';
import { IConfirmOptions } from '../typings';

const Confirm = function (options: IConfirmOptions | string = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }

    let oDiv: HTMLDivElement | null = document.createElement('div');

    const instance = h(
      ConfirmVue,
      {
        ...options,
        onCancel: () => {
          instance.el && instance.el.remove();
          oDiv = null;
          /* eslint-disable-next-line */
          reject();
        },
        onConfirm: () => {
          instance.el && instance.el.remove();
          oDiv = null;
          resolve();
        }
      }
    );

    render(instance, oDiv);
    document.body.appendChild(instance.el as HTMLElement);
  });
};

export default Confirm;
