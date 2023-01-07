import axios from 'axios';
import { Session } from '@/utils/storage';
import { showSuccessToast, showFailToast, showLoadingToast, closeToast } from 'vant';

let loadingReqCount = 0;

const showLoading = () => {
  if (loadingReqCount === 0) {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    })
  }
  loadingReqCount += 1;
}

const hideLoading = () => {
  if (loadingReqCount <= 0) return;
  loadingReqCount -= 1;
  if (loadingReqCount === 0) {
    closeToast();
  }
}

const service = axios.create({
  baseURL: 'http://localhost:9091/',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json'
  }
});
service.interceptors.request.use(
  config => {
    if(config.state) {
      showLoading();
    }
    if (Session.get('token')) {
      (<any>config.headers).common['Authorization'] = `Bearer ${Session.get('token')}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
service.interceptors.response.use(
  response => {
    hideLoading();
    const res = response.data;
    if (res.status && res.status !== 200) {
      showSuccessToast(res.message);
      return Promise.reject(service.interceptors.response)
    } else {
      return response.data;
    }
  },
  err => {
    console.log(err);
    if (err.message.indexOf('timeout') !== -1) {
      showFailToast('网络超时');
    } else if(err.message == 'Network Error') {
      showFailToast('网络连接错误');
    } else {
      if (err.response.data) {
        showFailToast('【' + err.response.data.path + '】' + err.response.data.error)
      } else {
        showFailToast('接口路径找不到');
      }
    }
  }
);
export default service;
