import { ref, reactive, toRef, onMounted, toRefs } from "vue";
import { Modal, message } from "ant-design-vue";
import request from "@/utils/axios";
import exportToExcel from "@/utils/exportToExcel";
import { useRoute, } from "vue-router";
import service from '@/service'
export const usePage = (opts: any) => {
  const route = useRoute();
  const { queryApi,exportApi,filename } = opts;
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

  const exportData=(header?:any)=>{
    if(exportApi){
      // 后端api
    }else{
      // 前端导出
      exportDataFront(header);
    }
  }

  const exportDataFront=(header:any)=>{
    const fileName=route.meta.title||filename;
    const opts={
      data:JSON.parse(JSON.stringify(state.dataSource)),
      filename:fileName,
      header,
    };
    exportToExcel(opts);
  }

  return {
    ...toRefs(state),
    exportData,
  };
};