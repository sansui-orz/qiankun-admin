# qiankun-admin

qiankun-admin是一个免费开源的中后台模版。使用了最新的`qiankun`, `Vue3`, `Webpack5`, `Vite4`, `React18`, `TypeScript`等主流技术框架，开箱即用的中后台前端解决方案。

## 启动服务

首先在根文件夹，mock文件夹，以及sub-projects下的`react-admin`,`vue-admin`文件夹下都执行`npm install`进行依赖安装。

主应用使用`webpack5`+`React18`搭建。
子应用分别使用`vite`+`Vue3`与`vite`+`React`搭建。
数据mock服务使用`koa`搭建。

- 在根目录运行`npm run start-all`启动以下四个服务
- 在根目录运行`npm run start`启动主服务
- 在根目录运行`npm run start-sub-vue`启动vue3子应用服务
- 在根目录运行`npm run start-sub-react`启动react18子应用服务
- 在根目录运行`npm run start-mock`启动接口mock服务

### 目录结构

```txt
├── mock // mock服务
├── src // 主应用
├── sub-projects // 子应用
│   ├── react-admin // react子应用
│   └── vue-admin // vue3子应用
```

## 功能

1. 多语言
2. 主题色切换
3. 基础图表
4. 基础表单
5. 页面tab缓存 ✅
6. 全局数据状态管理封装
7. 模块联邦共享全局模块 ✅
8. 构建优化
9. 编码规范eslint&提交规范husky
