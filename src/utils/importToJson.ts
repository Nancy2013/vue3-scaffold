import xlsx from "xlsx";
import { message } from "ant-design-vue";

/**
 * 异步读取Excel文件的sheet表为json数据
 * @param file 文件
 */
const importToJson = (file: any) => {
  // 读取文件不是立马能够读取到的，所以是异步的，使用Promise
  return new Promise((resolve, reject) => {
    if (!file) {
      //如果没有文件
      const msg='请选择文件';
      message.error(msg);
      return reject({msg});
    } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
      const msg="文件格式不正确，请上传xls或者xlsx文件"
      message.error(msg);
      return reject({msg});
    }

    // Web API构造函数FileReader，可实例化对象，去调用其身上方法，去读取解析文件信息
    let reader = new FileReader(); // 实例化对象有各种方法
    reader.onload = (ev: any) => {
      let workBook = xlsx.read(ev.target.result, {
        type: "binary",
        cellDates: true,
      });
      const wsname = workBook.SheetNames[0]; // excel中有很多的sheet，这里取了第一个sheet
      let firstWorkSheet = workBook.Sheets[wsname];
      const header = getHeaderRow(firstWorkSheet); // 分为第一行的数据
      console.log("读取的excel表头数据（第一行）", header); 
      const data = xlsx.utils.sheet_to_json(firstWorkSheet); // 第一行下方的数据
      console.log("读取所有excel数据", data);
      resolve({header,data});
    };
    reader.readAsBinaryString(file);
  });
};

/**
 * 获取表单头
 * @param sheet 表单
 * @returns 
 */
const getHeaderRow = (sheet: any) => {
  const headers = []; // 定义数组，用于存放解析好的数据
  const range = xlsx.utils.decode_range(sheet["!ref"]); // 读取sheet的单元格数据
  let C;
  const R = range.s.r;
  // 从第一行开始
  for (C = range.s.c; C <= range.e.c; ++C) {
    // 每一列
    const cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })];
    // 第一行每个单元格
    let hdr = "UNKNOWN " + C; // <-- replace with your desired default
    if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers; // 经过上方一波操作遍历，得到最终的第一行头数据
};

export default importToJson;