import axios from "axios";
// import Qs from 'qs';
// import { ElMessage } from 'element-plus'
import router from '@/routerHook.ts';

let axios_instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 1000 * 60 * 5,
    // transformRequest: [function (data) {
    //     data = Qs.stringify(data, { indices: false });
    //     return data;
    // }],
    headers: {
        'Content-Type': 'application/json'
    }
});

//请求拦截
axios_instance.interceptors.request.use(
    function (config: any) {
        // console.log(config.url);
        // if (config.url.includes('gov')) config.baseURL = import.meta.env.VITE_BASE_API2;
        // else config.baseURL = import.meta.env.VITE_BASE_API;

        // config.headers.token = token
        return config;
    },
    function (error: any) {

        ElMessage({
            message: '请求失败',
            showClose: true,
            type: 'error',
        })
        return Promise.reject(error);
    }
);

//响应拦截
axios_instance.interceptors.response.use(
    function (response: any) {
        let data = response.data;

        if (data.success) {
            return data;
        } else {
            if (data.errors) {
                ElMessage({
                    message: data.errors.reason,
                    showClose: true,
                    type: 'error',
                })
                return Promise.reject(data.errors)
            }
            return data
        }
    },
    function (error: any) {
        if (error.response.status === 401) {
            router.push({ name: 'login' })
        };
        ElMessage({
            message: '请求失败',
            showClose: true,
            type: 'error',
        })
        return Promise.reject(error);
    }
);




const get = (url: string, data = {}) => {
    return axios_instance({
        url: url,
        method: 'get',
        params: data
    })
}
const post = (url: string, data = {}) => {
    return axios_instance({
        url: url,
        method: 'post',
        data: data
    })
}


export {
    get,
    post,
}
