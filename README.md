# vue组件化开发-示例  vue2.0

>  * 使用知识点：
>  * vue.js           轻量级mvvm框架
>  * webpack          前端自动话打包工具
>  * vue-router       vue路由
>  * vue-loader       vue组件化开发插件
>  * vuex             前端状态管理 类式于flux 和 radux
>  * babel            es6转译工具，用最前言的javascript做前端开发

## 图片
![图片](https://gitee.com/uploads/images/2017/1013/183050_be6f69e3_818875.png "在这里输入图片标题")


## 目录结构

```
- vue-loader/
  + package.json //npm配置文件
  + index.html //入口html
  - node_modules //npm加载的模块
  - build //webpack 配置文件
    + webpack.base.config.js //基本配置
    + webpack.dev.config.js //开发环境
    + webpack.product.config.js //生产环境
  - src //开发资源目录
    - assets //一些资源
      + css  
      + js
      + img
    - components //vue组件
      + home.vue 
      + index.vue
      + user.vue
      + userDetails.vue
  -vuex  //状态等管理
    -actions  
      +indexActions.js
      ...
    -modles
      +indexModles.js
      ...
    +getters.js
    +mutation-types.js
    +store.js
    + app.vue //布局文件
    + main.js  //入口文件
    + filter.js //vue的过滤器
    + router.js //vue路由插件

```

## 项目步骤

1.安装node.js

2.安装项目依赖包

```
npm install
```

3.运行开发环境

```
npm run dev 
```

```
浏览器中访问：localhost:8000
```


4.打包生产文件

```
npm run build
``` 

##大致说明

```
webpack : 前端模块化打包工具
vue.js  : vue.js  清量级的mvvm的框架
babel   : 项目使用babel编译 可用最新的es6编写我们的javascript （当然用es5写也是一样的）
vue-loader ：模块化的开发vue插件
vue-router ：vue的路由插件
vuex  :  一个专门为 Vue.js 应用设计的状态管理架构
```
