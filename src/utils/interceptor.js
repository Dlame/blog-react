import axios from "axios";
import { apiSeviceUrl } from "../config";
import { message } from "antd";
import { showLoading, hideLoading } from "../store/actions/global";

axios.defaults.timeout = 10000; // 设置超时时间
axios.defaults.showLoading = true; // 设置请求是否loading

function createInterceptor(instance) {
  instance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      if (config.showLoading) {
        showLoading(true);
      }
      return config;
    },
    function(error) {
      // Do something with request error
      if (error.showLoading) {
        hideLoading(false);
      }
      message.error("网络错误");
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function(response) {
      // Do something with response data
      if (response.config.showLoading) {
        hideLoading(false);
      }
      return response;
    },
    function(error) {
      // Do something with response error
      if (error.config.showLoading) {
        hideLoading(false);
      }
      message.error("网络错误");
      return Promise.reject(error);
    }
  );
}

// 初始化实例
const axiosInstance = axios.create();
const apiInstance = axios.create({
  baseURL: apiSeviceUrl
});

createInterceptor(apiInstance);

export const $axios = axiosInstance;
export const $api = apiInstance;
