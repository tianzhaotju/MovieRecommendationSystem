import axios from 'axios';
import store from './store/store';
import * as types from './store/types';
import index from './router';

// const qs = require('qs');

// axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.crossDomain = true;
// axios.defaults.transformRequest = [data => qs.stringify(data)];
// axios.defaults.withCredentials = true;
// http response 拦截器
axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除登录并跳转到登录页面
          store.commit(types.LOGOUT);
          index.replace({
            path: 'login',
            query: { redirect: index.currentRoute.fullPath },
          });
          break;
        default:
          break;
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data);
  });


export default axios;
