import Vuex from 'vuex';
import Vue from 'vue';
import * as types from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户信息
    users: {},
    // login_status表示登录状态
    enter_status: null,
    // 暂时未知
    title: '',
  },
  actions: {
  },
  mutations: {
    [types.SYNC]: (state) => {
      if (localStorage.enter_status) {
        state.enter_status = localStorage.enter_status;
      }
    },
    [types.LOGIN]: (state) => {
      localStorage.enter_status = 1;
      state.enter_status = localStorage.enter_status;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('enter_status');
      state.enter_status = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    },
    [types.FETCH]: (state, data) => {
      state.users = data;
    },
  },
});
