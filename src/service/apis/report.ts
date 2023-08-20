import request from "utilsPath/axios";

const formatData=(url:string,method:string,params:any,system:string='VITE_REPORT_URL')=>{
    const data={
        url:import.meta.env[`${system}`] +url,
        type: "json",
        method,
    } as any
    if(method==='get'){
        data.params=params;
    }else{
        data.data=params;
    }
    return data;
};

export default {
    // 品牌管理-码量授权趋势
    queryCode: (params:any) => request(formatData('/teaReport/codeAuthorizeRanking','post',params)),
};