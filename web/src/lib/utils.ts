/*
 * @FilePath: /tiku/web/src/lib/utils.ts
 * @Description: 工具函数
 * @Author: humandetail
 * @Date: 2021-01-12 16:37:55
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-12 17:19:48
 */

/**
 * 数组随机排序
 */
export function getRandomArray<T> (arr: T[]): T[] {
  if (!Array.isArray) {
    throw new Error('Param "arr" must be an array');
  }

  return arr.sort(() => {
    if (Math.random() > 0.5) {
      return 1;
    } else {
      return -1
    }
  });
}

/**
 * 获取随机昵称
 */
export function getRandomNickname (): string {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return '游客' + getRandomArray(str.split('')).join('').slice(0, 5);
}
