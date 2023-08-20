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
const exportToExcel = ({ data, header, filename,titles,autoWidth }: any) => {
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
  const newData=formatData(titles,header,data);
  let ws = XLSX.utils.json_to_sheet(newData, {skipHeader:true }); //将JS对象数组转换为工作表。

  if(autoWidth){
    const newData=jsonToArray(Object.values(header),data);
    setAutoWidth(newData,ws); // 设置列宽度自适应
  }else{
    setFixedWidth(header,ws); // 设置固定列宽
  }  
  
  setTableMerges(titles,header,ws); // 表格合并
  setCellStyle(ws); // 设置样式
  wb.SheetNames.push(sheetName);
  wb.Sheets[sheetName] = ws;
  const defaultCellStyle = {
    font: { name: "Verdana", sz: 14, color: "FF0000" },
    fill: { fgColor: { rgb: "FFFFAA00" } },
    alignment: {
        /// 自动换行
        wrapText: true,
        // 居中
        horizontal: "center",
        vertical: "center",
        indent: 0
      }
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

/**
 * 设置固定列宽
 * @param ws 
 */
const setFixedWidth=(header:any,ws:any)=>{
    if(header){
        const keys=Object.keys(header);
        const cols=[] as any;
        keys.forEach((key:any)=>{
            cols.push({wpx:200}); // 像素宽 wpx：200，字符宽 wch: 50
        })
        ws['!cols']=cols;
    }
}

const formatData=(titles:any,header:any,data:any)=>{
    const tableTitels=setTableTitle(titles,header);
    // 处理表格头
    const keys=Object.keys(header);
    keys.forEach((key:any)=>{
        const label=header[`${key}`]
        header[`${label}`]=label;
        delete header[`${key}`]
    });
    const newData=[...tableTitels,header,...data]
    console.log('---formatData----',newData);
    return newData;
}


/**
 * 设置表格标题
 * @param titles 标题
 * @param header 表格头
 * @param ws 表格
 */
const setTableTitle=(titles:any,header:any)=>{
    const keys=Object.keys(header);
    const tableTitels=[] as any;
    if(titles){
        if(Array.isArray(titles)){
            titles.forEach((item:any)=>{
                const title={} as any;
                keys.forEach((key:any,$index)=>{
                    const label=header[`${key}`]
                    title[`${label}`]='';
                    if($index===0){
                        title[`${label}`]=item;
                    }
                    
                })
                tableTitels.push(title);
            });
        }
    }
    console.log('---setTableTitle----',tableTitels);
    return tableTitels;
}

/**
 * 设置标题合并
 * @param header 表头
 * @param ws 表格
 */
const setTableMerges=(titles:any,header:any,ws:any)=>{
    const cols=Object.keys(header).length;
    const merges=[] as any;
    if(titles){
        if(Array.isArray(titles)){
            titles.forEach((item:any,$index:any)=>{
                merges.push(
                    {
                        s:{c:0,r:$index},
                        e: { c: cols-1, r: $index }, 
                    }
                );
            });
        }
    }    
    ws['!merges'] = merges;
};

const setCellStyle=(ws:any)=>{
    for (const key in ws) {
        // 所有单元格居中
      if (key.indexOf("!") === -1 && ws[key].v) {
        ws[key].s = {
          font: { name: "Verdana", sz: 14, color: "FF0000" },
          alignment: {
             wrapText: true, // 自动换行
             horizontal: "center", // 居中
             vertical: "center",
             indent: 0
          }
        }
      }
    }
};

export default exportToExcel;