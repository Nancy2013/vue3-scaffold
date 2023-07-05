import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { message } from 'ant-design-vue'


// 取消重复请求
const pending: Array<pendingType> = [];
// 中断请求 —— 类似原生abort()
const CancelToken = axios.CancelToken;

// axios 实例
const instance = axios.create({
    timeout: 30000,
    responseType: 'json'
});

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
    pending.forEach((item, index) => {
        let count: number = +index;
        // 对象比较
        const strObj = (obj: pendingType | AxiosRequestConfig ): string => {
            return Object.entries(obj).toString();
        };
        // 执行存在请求体函数
        if(Object.is(strObj(item), strObj(config))) {
            // 执行取消操作
            item.cancel("操作太频繁，请稍后再试!");
            // 数组中移除记录
            pending.splice(count, 1);
        };
    })
};

// 添加请求拦截器
instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        removePending(config);
        const notToken = (config as any).notToken
        config.cancelToken = new CancelToken((c: Function) => {
            let { url, method, params, data } = config;
            
            
            pending.push({ url, method, params, data, cancel: c });
        });
        console.log(notToken)
        const token: string | null = localStorage.getItem('token');
        if(!notToken && token) {
            const headers = config.headers as AxiosRequestHeaders;
            headers.Authorization = `${token}`;
        }
        return config;
    },
    (error:any) => {
        return Promise.reject(error);
    }
);

// 添加响应式拦截器 (对错误信息做过滤处理)
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response;
        const code = res.status;
        switch(code) {
            default:break;
        };
        return response;
    },
    (error) => {
        message.error(error.message)
        return Promise.reject(error);
    }
);


/**
 * axios 基础构建
 */

const request = (info: requestType): Promise<resposeType> => {
    
    const baseURL: string = ""  // '/api';
    
    const contentType = (): string => {
        switch(info.type) {
            case 'json': return "application/json;charset=UTF-8";
            case 'form-data': return "multipart/form-data"

            default: return "application/json;charset=UTF-8"
        }
    }

    // 自定义heaader头
    const headers: AxiosRequestHeaders = {
        "Content-Type": contentType()
    };

    // 请求体
    return new Promise((resolve, reject) => {
        const assignInfo: requestType = Object.assign({ baseURL, headers }, info);
        instance(assignInfo as AxiosRequestConfig).then((res:any) => {
            if (assignInfo.notCheck) {
                resolve(res.data)
                return
            }
            if (assignInfo.isDownload) {
                resolve(res as any)
            } else {
                if (res.data.code === 0 || res.data.code === 200) {
                    resolve(res.data)
                } else {
                    if (res.data.code == 2001) {
                        window.location.href = '/#/login'
                    }
                    message.error(res.data.msg)
                    reject(res.data)
                }
            }
        }).catch((error:any) => {
            reject(error);
        });
    });
     
};

export default request;