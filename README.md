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

## 应用状态同步

主应用与子应用分别拥有自己的状态，React主应用与子应用皆使用`react-redux`与`@reduxjs/toolkit`创建全局状态管理。Vue子应用则用官方推荐的`Pinia`库。

![状态流转图示](./src/assets/images/class/global-store.drawio.png)

相关方法使用:
1. 主应用`src/store/connectMainStore.ts`与`src/qiankun.ts`
  - 其中`src/store/connectMainStore.ts`暴露出`connect`方法，接收一个字符串数组参数。用以指明哪些`state`需要与子应用共享。
  - `connect`方法返回值为`connectReactStore`与`connectVueStore`。分别提供给React与Vue子应用使用。通过`qiankun`的`props`传递。
2. 子应用中，接收到`connectReactStore`与`connectVueStore`, 分别与自身`store`关联（注册监听以及同步初始值）。同时为了让主应用能够同步状态，分别需要在对应store中声明指定action。
3. 子应用中分别通过`context`与`Provide/inject`向全局提供主应用的`dispatch`方法。

## 功能

1. 多语言
3. 基础图表 ✅
4. 基础表单 ✅
5. 页面tab缓存 ✅
6. 全局数据状态管理封装 ✅
7. 模块联邦共享全局模块 ✅
8. 构建优化
9. 编码规范eslint&提交规范husky
