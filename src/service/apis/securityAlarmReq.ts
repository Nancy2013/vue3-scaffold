import request from "utilsPath/axios";

const formatData=(url:string,method:string,params:any)=>{
    const data={
        url:import.meta.env.VITE_NODE_URL +url,
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
    // 获取地区接口
    getAddressTree: (params:any)  =>request(formatData('/geo/getAddressTree','get',params)),
    
};