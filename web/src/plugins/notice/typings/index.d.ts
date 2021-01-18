/*
 * @FilePath: /tiku/web/src/plugins/notice/typings/index.d.ts
 * @Description: 类型文件
 * @Author: humandetail
 * @Date: 2021-01-15 14:09:38
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-16 19:21:04
 */

export interface IMessageAlertOptions {
  title?: string;
  message?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  closeOnClickMask?: boolean;
  closeOnPressEscape?: boolean;
  useHtml?: boolean;
  center?: boolean;
  zIndex?: string | number;
}

export interface IConfirmOptions {
  title?: string;
  message?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonText?: string;
  cancelButtonColor?: string;
  useHtml?: boolean;
  closeOnClickMask?: boolean;
  closeOnPressEscape?: boolean;
  useHtml?: boolean;
  center?: boolean;
  zIndex?: string | number;
}
