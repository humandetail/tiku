/*
 * @FilePath: /tiku/web/src/plugins/notice/index.ts
 * @Description: notice插件
 * @Author: humandetail
 * @Date: 2021-01-15 13:47:58
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-16 19:17:22
 */

import { App } from 'vue';
import Confirm from './confirm';
import MessageAlert from './alert';

const useConfirm = Confirm;
const useAlert = MessageAlert;

export {
  useConfirm,
  useAlert
};

export default function (app: App<Element>) {
  app.provide('useConfirm', Confirm);
  app.provide('useAlert', MessageAlert);
}

// import { App, h, render } from 'vue';
// import { IConfirmOptions, IMessageBoxOptions } from './typings';
// import MessageBox from './messageBox/index.vue';

// export default function (app: App<Element>) {
//   /**
//    * messageBox
//    */
//   const useMessageBox = (options: IMessageBoxOptions = {}) => {
//     return new Promise((resolve, reject) => {
//       const $messageBox = h(MessageBox, {
//         ...options,
//         isConfirm: false,
//         onCancel: () => {
//           $messageBox.el && $messageBox.el.remove();
//           /* eslint-disable-next-line */
//           reject();
//         },
//         onConfirm: () => {
//           $messageBox.el && $messageBox.el.remove();
//           resolve(undefined);
//         }
//       });
//       render($messageBox, document.body);
//     });
//   };

//   /**
//    * messageBox
//    */
//   const useConfirm = (options: IConfirmOptions = {}) => {
//     return new Promise((resolve, reject) => {
//       const confirmButtonText = options.confirmButtonText
//         ? options.confirmButtonText
//         : '知道了';

//       const $confirm = h(MessageBox, {
//         ...options,
//         confirmButtonText,
//         isConfirm: true,
//         onCancel: () => {
//           $confirm.el && $confirm.el.remove();
//           /* eslint-disable-next-line */
//           reject();
//         },
//         onConfirm: () => {
//           $confirm.el && $confirm.el.remove();
//           resolve(undefined);
//         }
//       });
//       render($confirm, document.body);

//       console.log('useConfirm', $confirm);
//     });
//   };

//   app.config.globalProperties.$messageBox = useMessageBox;
//   app.config.globalProperties.$confirm = useConfirm;

//   app.provide('useMessageBox', useMessageBox);
//   app.provide('useConfirm', useConfirm);
// }
