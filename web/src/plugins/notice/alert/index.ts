/*
 * @FilePath: /tiku/web/src/plugins/notice/alert/index.ts
 * @Description: message alert 弹窗插件
 * @Author: humandetail
 * @Date: 2021-01-15 17:53:10
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-16 19:22:24
 */

import { h, render } from 'vue';
import AlertVue from './src/index.vue';
import { IMessageAlertOptions } from '../typings';

const Alert = function (options: IMessageAlertOptions | string = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }

    let oDiv: HTMLDivElement | null = document.createElement('div');

    const instance = h(
      AlertVue,
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
}

export default Alert;
