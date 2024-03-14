import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { BASE_URL } from '@/url.config';

export interface Result<T> {
  // 定义接口返回类型
  data: T
  message: string
  code: number
}
// 打包上线后的url-在url-config.ts文件中
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})
// 添加请求拦截器
service.interceptors.request.use((config: any) => {
  // var token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : null;
  // if (token) {
  //   var userid = token
  // } else {
  //   userid = ''
  // }
  let contentData = {
    "Content-Type": "application/json;charset=utf-8",
    // accessToken: userid
  }
  let contentType: any = config.header
  contentData = Object.assign(contentData, contentType)
  config.params;
  config.headers = contentData
  // 在发送请求之前做些什么
  return config;
}, (error: AxiosError) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
  // 对相应成功做些什么
  return response;
  // 对响应错误做点什么 
}, (error: AxiosError) => {
  const status = error.response?.status
  switch (status) {
    case 400:
      break;
    case 401:
      alert("未授权，请登录");
      break;

    case 403:
      alert("拒绝访问");
      break;

    case 404:
      alert("请求地址出错");
      break;

    case 408:
      alert("请求超时");
      break;

    case 500:
      alert("服务器内部错误");
      break;

    case 501:
      alert("服务未实现");
      break;

    case 502:
      alert("网关错误");
      break;

    case 503:
      alert("服务不可用");
      break;

    case 504:
      alert("网关超时");
      break;

    case 505:
      alert("HTTP版本不受支持");
      break;
    default:
  }
  return Promise.reject(error);
});

export const http = {
  get<T = any>(url: string, config?: any): Promise<Result<T>> {
    return service.get(url, config)
  },
  post<T = any>(url: string, data?: object): Promise<T> {
    const config: any = {
      header: {
        "Content-Type": "application/json;charset=utf-8"
      },
    }
    return service.post(url, data, config)
  },
  // 文件流格式
  postFile<T = any>(url: string, data?: object): Promise<Result<T>> {
    const config: any = {
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      responseType: 'blob'
    }
    return service.post(url, data, config)
  },
  // 请求头是form格式
  postForm<T = any>(url: string, data?: object): Promise<Result<T>> {
    const config: any = {
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
    }
    return service.post(url, data, config)
  }
}