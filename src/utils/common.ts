/*
 * @Description: main description
 * @Author: zhang zhen
 * @Date: 2023-06-13 16:22:56
 * @LastEditors: zhang zhen
 * @LastEditTime: 2023-07-12 16:05:33
 * @FilePath: /zhiyun-outsource-web/src/utils/common.ts
 */
/**
 *判断是否为空
 *@param {String}a 变量
 *@return 是否为空
 */
export const isEmpty = function (a: any): boolean {
    if (a === undefined || a === 'undefined' || a === null || a === 'null' || a === '' || JSON.stringify(a) === '{}' || JSON.stringify(a) === '[]') {
      return true
    }
    return false
  }
  
  
  /**
   *获取文件后缀名
   *@param {String} name 文件名字
   *@return { String } 文件后缀名
   */
  export const getSuffixName = (name: string) => {
    return name.substring(name.lastIndexOf(".") + 1)
  }
  
  
  /**
   * 时间显示格式
   */
  export const pickerFormat = {
    yearFormat: 'YYYY',
    monthFormat: 'YYYY-MM',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'YYYY-MM-DD HH:mm:ss',
  }
  
  /**
   * 随机生成字符串
   * @param length 字符串的长度
   * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
   * @return string 生成的字符串
   */
  export function randomString(length: number, chats: string) {
    if (!length) length = 1;
    if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm';
    let str = '';
    for (let i = 0; i < length; i++) {
      const num = randomNumber(0, chats.length - 1);
      str += chats[num];
    }
    return str;
  }
  
  /**
   * 随机生成uuid
   * @return string 生成的uuid
   */
  export function randomUUID(leg: number = 32) {
    const chats = '0123456789abcdef';
    return randomString(leg, chats);
  }
  
  /**
   * 随机生成数字
   *
   * 示例：生成长度为 12 的随机数：randomNumber(12)
   * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
   *
   * @param1 最小值 | 长度
   * @param2 最大值
   * @return int 生成后的数字
   */
  export function randomNumber(...args: number[]) {
    // 生成 最小值 到 最大值 区间的随机数
    const random = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    if (args.length === 1) {
      const [length] = args; // 生成指定长度的随机数字，首位一定不是 0
      const nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)));
      return parseInt(nums.join(''));
    } else if (args.length >= 2) {
      const [min, max] = args;
      return random(min, max);
    } else {
      return Number.NaN;
    }
  }
  /**
           * 是否显示菜单
           * @param
           * @return
           */
  export const isSubMenu = (menuItem: any) => {
    if (Array.isArray(menuItem.children) && menuItem.children.length) {
      for (let i = 0; i < menuItem.children.length; i++) {
        const item = menuItem.children[i]
        if (item.ismenu === 'Y') {
          return true
        }
      }
      return false
    } else {
      return false
    }
  }
  
  /**
      深拷贝函数
      @param {Object || Array} data 待拷贝的数据
      @return {Object || Array} 拷贝后的数据
  */
  export const deepClone = function (data: any): any {
    var objClone = Array.isArray(data) ? [] : {};
    if (data && typeof data === "object") {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key] && typeof data[key] === "object") {
            objClone[key] = deepClone(data[key]);
          } else {
            objClone[key] = data[key];
          }
        }
      }
    }
    return objClone;
  }
  
  /**
   节流函数
   @param {Function} callback 回调函数
   @return
   */
  export const throttleFnc = function (callback: any) {
    let isLimit = false
    return function () {
      if (!isLimit) {
        isLimit = true
        //@ts-ignore
        callback.call(this, function () {
          isLimit = false
        }, ...arguments)
      }
    }
  }
  
  /**
   快速排序
   @param { Array } list 待排序的数据
  @param { String } key 排序的参数
   @return
   */
  export const sortArray = (list: any[], key: string, defaultVal?: string | number): any[] => {
    if (list.length <= 1) {
      return list
    }
    const medianNum = list[Math.ceil(list.length / 2)][key] || defaultVal
    if (isEmpty(medianNum)) {
      console.error('列表项无该属性')
      return list
    }
    let preList: any[] = [], nextList: any[] = [], currList: any[] = []
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      if (Number(item[key]) < (medianNum)) {
        preList.push(item)
      } else if (item[key] > medianNum) {
        nextList.push(item)
      } else {
        currList.push(item)
      }
    }
    return sortArray(preList, key).concat(currList, sortArray(nextList, key))
  }