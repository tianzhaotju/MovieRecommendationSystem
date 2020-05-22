# moviefront
基于Vue的大数据电影推荐系统前端页面，采用前后端分离架构  
后端代码  [https://github.com/pq-dong/movierecommend](https://github.com/pq-dong/movierecommend)  

### demo地址：[http://movie.pqdong.com/#/](http://movie.pqdong.com/#/)  
由于首页资源比较多，且服务器带宽太小，所以首次访问时加载速度会很慢（大约在30s左右，可怕！），请多等一下；  
待功能开发完毕后会优化此页面加载速度  

### 开发部署

> A Vue.js project

## Build Setup

``` bash
# 本地开发，需要将域名 0.0.0.0换成127.0.0.1
npm install

npm run dev

# 线上部署
npm run build

# 单元测试
npm run unit

# run all tests
npm test
```

### 任务点
- [x] 开发环境搭建测试
- [x] 初步架构方案
- [x] Vue学习，开源项目学习
- [x] 等待后端mock接口
- [x] 用户登录页面，退出
- [x] demo部署
- [ ] 用户信息详情页，修改页
- [ ] 电影详情页
- [ ] 评论页
- [ ] 演员详情页
- [ ] 首页
- [ ] 部署方案

### Git
``` bash
# 创建本地分支并切换
git checkout -b dev
# 暂存代码
git add .
# 提交代码
git commit -m "本次提交说明"
# 推送到远程仓库
git push
```


### 技术栈
- [Vue.js](https://cn.vuejs.org/index.html)
- [Vuex](https://vuex.vuejs.org/zh/guide/)
- [element-ui](https://element.eleme.cn/)
- [Axios](https://github.com/axios/axios)
- [Eslint](https://github.com/eslint/eslint)
- [Postcss](https://github.com/postcss/postcss)

### 接口文档

### 工程结构

```
.
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.dev.conf.js  // webpack配置文件
├── config
│   ├── dev.env.js           // 配置文件
│   ├── index.js
├── index.html               // vue加载页
├── package.json
├── package-lock.json
├── README.md
├── server.js
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── css
│   │   ├── ele-custom-theme
│   │   ├── logo.png
│   │   ├── main.css
│   │   └── util
│   ├── components
│   │   ├── home.vue
│   │   ├── index.vue         // 首页
│   │   └── login.vue         // 登录页面
│   ├── http.js
│   ├── main.js
│   ├── index.js            // 路由
│   └── store                 // vuex store
│       ├── store.js
│       └── types.js          // 常量
├── static
└── yarn.lock
```
