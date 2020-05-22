import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
import * as types from '../store/types';
// eslint-disable-next-line import/extensions
import index from '../views/index.vue';
// eslint-disable-next-line import/extensions
import CommonPage from '../components/common/commonPage.vue';

Vue.use(Router);
// eslint-disable-next-line global-require,import/no-dynamic-require
const login = resolve => require(['../views/login'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const register = resolve => require(['../views/register'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const userInfo = resolve => require(['../views/userInfo.vue'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const movieInfo = resolve => require(['../views/movieInfo.vue'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const personInfo = resolve => require(['../views/personInfo.vue'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const movieList = resolve => require(['../views/movieList.vue'], resolve);
const searchMovie = resolve => require(['../views/searchMovie.vue'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const personList = resolve => require(['../views/personList.vue'], resolve);

const router = new Router({
  routes: [
    {
      path: '/',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'index',
          component: index,
        },
      ],
    },
    {
      path: '/movieInfo',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'movieInfo',
          component: movieInfo,
        },
      ],
    },
    {
      path: '/movieList',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'movieList',
          component: movieList,
        },
      ],
    },
    {
      path: '/searchMovie',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'searchMovie',
          component: searchMovie,
        },
      ],
    },
    {
      path: '/personList',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'personList',
          component: personList,
        },
      ],
    },
    {
      path: '/personInfo',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'personInfo',
          component: personInfo,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/userInfo',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'userInfo',
          component: userInfo,
        },
      ],
    },
  ],
});

export default router;

// 同步 localstorage 信息到 store
store.commit(types.SYNC);

// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }
