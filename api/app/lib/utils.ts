/*
 * @FilePath: /api/app/lib/utils.ts
 * @Description: 工具函数
 * @Author: humandetail
 * @Date: 2021-01-05 17:55:29
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-05 19:18:09
 */

/**
 * 数据类型判断
 * @param { any } value - 需要判断的数据
 * @return { string } 
 */
function typeOf (value: any): string {
  if (value === null) {
    return 'null';
  }

  return typeof(value) === 'object'
    ? {
      '[object Object]': 'Object',
      '[object Array]': 'Array'
    }[({}).toString.call(value)]
    : typeof(value);
}

/**
 * 拼接query参数
 * @param { any } data - 参数列表 
 * @param { string } appKey - 聚合appKey
 * @return { string } 
 */
function formatParams (data: any, appKey: string): string {
  // 必须传递一个object类型的参数列表
  if (typeOf(data) !== 'Object') {
    throw new Error('Option "data" must be a type Object.');
  }
  
  let paramStr: string = '?';

  // 参数拼接
  for (let key in data) {
    paramStr += `${key}=${data[key]}&`;
  }

  // 如果传递了 appKey 则拼接
  // 否则去掉之前拼接的 & 字符
  return appKey
    ? paramStr + 'key=' + appKey
    : paramStr.slice(0, -1);
}

/**
 * 获取返回数据
 * @param { Array<T> } data - 聚合接口返回来的数据集 
 * @param { number } subject - 科目类型，1：科目1，4：科目4
 * @return { Array<T> } 科目1返回100条数据，科目4只返回50条 
 */
function getTikuReturnData<T> (data: Array<T>, subject: number): Array<T> {
  switch (subject) {
    case 4:
      return data.splice(0, 50);
    case 1:
      return data;
    default:
      return data;
  }
}

/**
 * 转换成 int 类型
 * @param { any } value - 任意类型的值
 * @return { number }
 */
function toInt (value: any): number {
  if (typeof value === 'number') return value;
  if (!value) return value;
  return parseInt(value, 10) || 0;
}

export {
  formatParams,
  getTikuReturnData,
  toInt
}
