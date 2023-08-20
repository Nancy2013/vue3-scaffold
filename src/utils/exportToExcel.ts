import fs from "file-saver";
import XLSX from "xlsx";

// 基本配置
const baseConfig = {
  autoWidth: true,
  bookType: "xlsx",
};

/**
 * 数据导出
 * @param param0 配置项，data:数据，header:表格头,filename:文件名称
 */
const exportToExcel = ({ data, header, filename }: any) => {
  data.forEach((item: any) => {
    for (let i in item) {
      if (header.hasOwnProperty(i)) {
        item[header[i]] = item[i];
      }
      delete item[i]; //删除原先的对象属性
    }
  });

  let sheetName = filename; //excel的文件名称
  let wb = XLSX.utils.book_new(); //工作簿对象包含一SheetNames数组，以及一个表对象映射表名称到表对象。XLSX.utils.book_new实用函数创建一个新的工作簿对象。
  let ws = XLSX.utils.json_to_sheet(data, { header: Object.values(header) }); //将JS对象数组转换为工作表。
  const newData=jsonToArray(Object.values(header),data);
  setAutoWidth(newData,ws); // 设置列宽度自适应
  wb.SheetNames.push(sheetName);
  wb.Sheets[sheetName] = ws;
  const defaultCellStyle = {
    font: { name: "Verdana", sz: 13, color: "FF00FF88" },
    fill: { fgColor: { rgb: "FFFFAA00" } },
  }; //设置表格的样式
  let wopts = {
    bookSST: false,
    type: "binary",
    cellStyles: true,
    defaultCellStyle: defaultCellStyle,
    showGridLines: false,
    ...baseConfig,
  } as any; //写入的样式
  let wbout = XLSX.write(wb, wopts);
  let blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  fs.saveAs(blob, filename + ".xlsx");
};

/**
 * 转换数组
 * @param key 数组key
 * @param jsonData 转换数据
 * @returns 
 */
const jsonToArray=(keys:any,jsonData:any)=>{
  const header=keys;
  const data=jsonData.map((v:any) => keys.map((j:any) => { return v[j] }));
  return [header,...data];
};

/**
 * 设置列自动宽度
 * @param data 数据
 * @param ws 表单
 */
const setAutoWidth=(data:any,ws:any)=>{
  /*设置worksheet每列的最大宽度*/
  const colWidth = data.map((row:any) => row.map((val:any) => {
    /*先判断是否为null/undefined*/
    if (val == null) {
      return {
        'wch': 10
      };
    }
    /*再判断是否为中文*/
    else if (val.toString().charCodeAt(0) > 255) {
      return {
        'wch': val.toString().length * 2
      };
    } else {
      return {
        'wch': val.toString().length
      };
    }
  }))
  /*以第一行为初始值*/
  let result = colWidth[0];
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch'];
      }
    }
  }
  ws['!cols'] = result;
};

/**
 * 字符串转字符流
 * @param s 字符串
 * @returns 
 */
const s2ab = (s: any) => {
  if (typeof ArrayBuffer !== "undefined") {
    const buf = new ArrayBuffer(s.length) as any;
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  } else {
    const buf = new Array(s.length);
    for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
};

export default exportToExcel;