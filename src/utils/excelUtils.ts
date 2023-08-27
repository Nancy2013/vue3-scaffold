import fs from "file-saver";
import Excel from "exceljs";
import { message } from "ant-design-vue";

/**
 * 导出表格
 * @param param 导出表格参数
 */
export const exportToExcel = ({ data, columns, filename, title,subTitle,cellStyle,titleStyle,subTitleStyle }: any) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet(filename);
  let headerCount=1; // 表头位置
  setCell(columns, data, worksheet,cellStyle);
  if(title){
    // 设置主标题
    headerCount++
    setTitle(title,columns, worksheet,titleStyle); 
  }

  if(subTitle){
    // 设置副标题
    headerCount++
    setSubTitle(subTitle,columns, worksheet,subTitleStyle);
  }

  setFrozen(headerCount,worksheet);
  save(workbook, filename);
};

/**
 * 设置表格头冻结
 * @param titles 标题
 * @param worksheet 工作表
 */
const setFrozen=(frozenRows:number,worksheet:any)=>{
    worksheet.views = [
        { state: 'frozen', xSplit: 0, ySplit: frozenRows }
      ];
};

/**
 * 设置单元格
 * @param columns 列
 * @param data 数据
 * @param worksheet 工作表
 */
const setCell = (columns: any, data: any, worksheet: any, style?: any) => {
  worksheet.columns = columns.map((col:any)=>({
    ...col,
    width:col.width || style?.width,
  }));
  worksheet.addRows(data);
   // 设置行高
   worksheet.eachRow({ includeEmpty: true }, (row:any) => {
    row.height = style?.height || 20;
  })
  // 获取每一列数据，再依次对齐
  worksheet!.columns.forEach((column: any) => {
    column.alignment = style?.alignment || {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
  });
};

/**
   * 设置标题
   * @param title 标题
   * @param columns  列
   * @param worksheet 工作表
   * @param style 样式
   */

const setTitle = (title: any, columns: any, worksheet: any,style?:any) => {
    if (title) {
        worksheet.spliceRows(1, 0, [title]);
        worksheet.mergeCells(1, 1, 1, columns.length);
        // 调整标题样式
        const titleRow = worksheet.getRow(1);
        // 高度
        titleRow.height = style?.height || 25;
        // 字体设置
        titleRow.font = style?.font || {
          size: 12,
        //   bold: true,
        };
        // 对齐方式
        titleRow.alignment = style?.alignment || {
          horizontal: "center",
          vertical: "middle",
        };
      }
  };

  /**
   * 设置副标题
   * @param title 标题
   * @param columns  列
   * @param worksheet 工作表
   * @param style 样式
   */
const setSubTitle=(title: any, columns: any, worksheet: any,style?:any)=>{
    if (title) {
        worksheet.spliceRows(2, 0, [title]);
        worksheet.mergeCells(2, 1, 2, columns.length);
        // 调整标题样式
        const titleRow = worksheet.getRow(2);
        // 高度
        titleRow.height = style?.height || 20;
        // 字体设置
        titleRow.font = style?.font || {
          size: 10,
        };
        // 对齐方式
        titleRow.alignment = style?.alignment || {
          horizontal: "right",
          vertical: "middle",
        };
      }
}

/**
 * 保存
 * @param workbook 工作簿
 * @param filename 文件名称
 */
const save = (workbook: any, filename: string) => {
  // 导出文件
  workbook.xlsx.writeBuffer().then((data: any) => {
    const blob = new Blob([data], { type: "" });
    fs.saveAs(blob, filename + ".xlsx");
  });
};

const DEFAULT_TYPE="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // 只支持xlsx文档
/**
 * 导入表格
 * @param file 文件
 * @param options 配置
 * @returns 导入的数据
 */
export const importExcel=(file:any,options:any)=>{
  return new Promise(async (resolve, reject) =>{
    if (!file) {
      //如果没有文件
      const msg='请选择文件';
      message.error(msg);
      return reject({msg});
    } else if (file.type!==DEFAULT_TYPE) {
      const msg="文件格式不正确，请上传xlsx文件"
      message.error(msg);
      return reject({msg});
    }
    
    const { sheet = 1, header } = options; // 默认导入第一张表
    const workbook = await getWorkBook(file);
    const worksheet = workbook.getWorksheet(sheet);    
    const excelList= [] as any;// excel导入后返回的数组
    worksheet.getSheetValues().filter((temp:any) => !!temp?.length).forEach((item:any) => {   
      // 移除空行
      // 移除每行首个空元素
      (item as string[]).shift();
      // 定义临时对象存储每一行内容
      let tempObj= {} as any;
      (item as string[]).forEach((item2, index2) => {
        tempObj[header[index2]] = item2;
      })
      excelList.push(tempObj);
    })
    resolve(excelList)
  });
}

/**
 * 获取工作薄
 * @param file 文件
 * @returns 
 */
const getWorkBook=async (file:any)=>{
  let buffer:any = await readFile(file);
  const workbook = new Excel.Workbook();
  const loadBook=await workbook.xlsx.load(buffer);
  return loadBook;
}

/**
 * 读取文件
 * @param file 文件
 * @returns 
 */
const readFile=(file:any)=>{
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (ev) => {
      resolve(ev.target!.result as ArrayBuffer);
    };
  });
}