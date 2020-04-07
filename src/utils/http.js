import axios from "axios";
import { Message } from "iview";

//  创建axios实例
const service = axios.create({
  //  withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true,
  baseURL: "http://api.zhaoly.cn",
  timeout: 150000 // 请求超时时间
});
//  添加请求拦截器
service.interceptors.request.use(
  config => {
    //  config.headers['Accept'] = 'application/json'
    return config;
  },
  error => {
    Message.error("加载失败");
    return Promise.reject(error);
  }
);

//  添加响应拦截器
service.interceptors.response.use(
  response => {
    // Message.success('加载成功')
    return response.data;
  },
  error => {
    Message.error("加载失败");
    return Promise.reject(error);
  }
);

export default service;
