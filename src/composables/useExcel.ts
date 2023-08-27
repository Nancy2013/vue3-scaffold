import { ref, reactive, toRef, onMounted, toRefs } from "vue";
import { Modal, message } from "ant-design-vue";
import request from "@/utils/axios";
import {exportToExcel,importExcel} from "@/utils/excelUtils";
import { useRoute, } from "vue-router";
import service from '@/service'
export const useExcel = (opts: any) => {
  const route = useRoute();
  const { queryApi,exportApi,filename,system='VITE_REPORT_URL', method="post" } = opts;
  const state = reactive({
    loading:false,
    dataSource:[],
  });

  onMounted(() => {
    query();
  });

  const query=()=>{
    const params={};
    const { report } = service;
    state.loading = true;
    report[queryApi](params)
      .then((res: any) => {
        const { code, rows, total = 0, data } = res;
        if (code === 200) {
          const renderData = rows || data; // 兼容后端不同数据结构
          state.dataSource = renderData;
        }
        state.loading = false;
      })
      .catch((e: any) => {
        console.error(e);
        state.loading = false;
      });
  }
/**
 * 导出
 * @param columns 列
 */
  const exportData=(columns?:any)=>{
    if(exportApi){
      // 后端api
      exportDataEnd();
    }else{
      // 前端导出
      exportDataFront(columns);
    }
  }

  /**
   * 后端导出
   */
  const exportDataEnd = () => {
    state.exportLoading = true;
    const {exportSearch}=state;
    const params={
      responseType: "blob",
      url:import.meta.env[`${system}`]+ exportApi,
      method,
      isDownload: true,
    } as any;

    if(method==='post'){
      params.data=exportSearch;
    }else{
      params.params=exportSearch;
    }
    
    request(params)
      .then((res: any) => {
        const fileName=filename || route.meta.title;
        download(res.data, fileName);
      })
      .catch((e: any) => {
        console.error(e);
        state.exportLoading = false;
      });
  };

   /**
   * 下载文件
   * @param data 数据
   * @param fileName 文件名称
   */
  const download = (data: any, fileName: string=filename) => {
    const url = window.URL.createObjectURL(new Blob([data],{type:'applition/vnd.ms-excel'}));
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", fileName+'.xls');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    state.exportLoading = false;
  };

  /**
   * 前端导出
   * @param columns 列
   */
  const exportDataFront=(columns:any)=>{
    const fileName=route.meta.title||filename;
    const opts={
      data:JSON.parse(JSON.stringify(state.dataSource)),
      filename:fileName,
      columns,
      title:fileName,
      subTitle:'13500000002'
    };
    exportToExcel(opts);
  }

  /**
   * 导入
   * @param file 文件
   * @param options 选项
   */
  const importData=(file:any,options:any)=>{
    importExcel(file,options).then((res:any)=>{
      console.log('---usePage---importData-----',res);
    });
  }

  return {
    ...toRefs(state),
    exportData,
    importData,
  };
};