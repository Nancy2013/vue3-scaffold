import dayjs from "dayjs";
import { sortArray } from './common'

// 随机生成多位数
export const randomInter = (num: number) => {
  let str = Math.random().toString().slice(-num); // 随机生成多位数
  return str;
};

// 根据位数生成位数值
export const multiNumber = (count: number) => {
  let returnValue: string = "";
  for (let i = 0; i < count - 1; i++) {
    returnValue += `${0}`;
  }
  return returnValue + `${1}`;
};

// 根据对象数组某个属性去重
export const uniqueArr = (arr: any, key: any) => {
  const res = new Map();
  return arr.filter(
    (item: any) => !res.has(item[`${key}`]) && res.set(item[`${key}`], 1)
  );
};

// 树形结构
export const convertTree = (arr: any, { id, pid }: any, sortKey="sort") => {
  let obj: any = {},
    newArr: any = [];
  arr = sortArray(arr, sortKey, 0)
  arr.forEach((element: any) => {
    obj[element[id]] = element;
  });
  arr.map((item: any) => {
    if (obj[item[pid]] && item[id] != 0) {
      obj[item[pid]].children && obj[item[pid]].children.push(item);
      obj[item[pid]].children || (obj[item[pid]].children = [item]);
    } else {
      newArr.push(item);
    }
  });
  return newArr;
};

// 平级结构
export const convertLevel = (arr: any, isLeaf?: boolean) => {
  let newArr: any = [],
    copyArr = JSON.parse(JSON.stringify(arr)); // 数组深拷贝
  copyArr.forEach((item: any, index: number) => {
    if (item.children) {
      newArr.push(...convertLevel(item.children, isLeaf));
      delete item.children;
    } else {
      isLeaf && newArr.push({ ...item });
    }
    isLeaf || newArr.push({ ...item });
  });
  return newArr;
};

// 判定是否有重复值
export const isRepeat = (arr: any) => {
  let hash = {};
  for (let i in arr) {
    if (hash[arr[i]]) return true;
    hash[arr[i]] = true;
  }
  return false;
};

/**
 *格式化时间显示
 *
 * @param {string} time 时间
 * @param {string} [format="YYYY-MM-DD HH:mm:ss"] 显示格式
 * @return {*}
 */
export const showTime = (
  time: string,
  format: string = "YYYY-MM-DD HH:mm:ss"
) => {
  if (time) {
    return dayjs(time).format(format);
  }

  return dayjs().format(format);
};

/**
 *
 *格式化时间参数
 * @param {*} time 时间
 * @param {string} flag 日首 | 日尾
 * @param {string} [format="YYYY-MM-DD HH:mm:ss"] 格式
 */
export const sendTime = (
  time: any,
  flag: string,
  format: string = "YYYY-MM-DD HH:mm:ss"
) => {
  if (time) {
    return dayjs(time)[`${flag}`]("day").format(format);
  }
  return "";
};

/**
 * 获得日期
 * @param unit 颗粒度单位 'month' | 'year'
 * @param scope 范围 默认最近6个时间单位
 * @param format 日期格式
 * @param sort 排序 'descend' | 'ascend' 默认倒序
 */
export const getDate = ({
  unit = "year" as any,
  scope = 10,
  format = "YYYY",
  sort = "descend",
}) => {
  const date = [];
  for (let i = 0; i < scope; i++) {
    const next = dayjs().subtract(i, unit);
    const formatDate = next.format(format);
    date.push(formatDate);
  }
  if (sort === "ascend") {
    // 正序
    date.sort((a: any, b: any) => {
      if (a > b) return 1;

      if (a < b) return -1;

      return 0;
    });
  }
  return date;
};

/**
 * 生成数组
 * @param min 最小值
 * @param len 长度
 * @returns
 */
export const getArray = (min = 1, len = 12) => {
  let arr = Array(len).fill(0);
  arr = arr.map((item: any, $index) => $index + min);

  return arr;
};


 /**
 *
 *获取界面path
 * @param {String} title 界面名称
 * @param {*} routers 路由
 */
 export const getPath=(title:String,routers:any)=>{
    if(Array.isArray(routers)){
      const current=routers.filter((item:any)=>item.title===title)[0]
      if(current){
        console.log('-------getPath-----',current);
        
        return current.path;
      }
    }
    return null;
 }