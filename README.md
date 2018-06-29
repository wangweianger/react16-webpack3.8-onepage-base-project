# react 集成开发框架

>  * 使用知识点：
>  * react            
>  * webpack             前端自动话打包工具
>  * react-router-dom       
>  * react-redux       
>  * redux            
>  * babel            

## 项目webpack 优化说明文档 
## http://blog.seosiwei.com/detail/9

## react-router的4种异步加载方式
## http://blog.seosiwei.com/detail/10

## 基于react-router-config的路由拆分
## http://blog.seosiwei.com/detail/11

## 项目步骤

1.安装node.js

2.安装项目依赖包

```
npm install
或
yarn install
```

3.运行开发环境

```
npm run dev 

```

4.打包生产文件

```
npm run build:dll   //此命令一般只运行一次 请参考上面weboack构建优化文章说明

npm run build

``` 


### 增加flow 
- 参考链接： flow使用请参考官网：https://flow.org/


```
使用flow检查的文件在顶部增加  
// @flow   或者  /* @flow */  标识

检查全部文件
npm run flow

```

### 如果Sublime要开启eslint的flow检测 需要做如下另个步骤  

- 1.安装 npm install babel-preset-flow --save-dev    npm install flow-bin --save-dev
- 2.sublime text安装 flow  SublimeLinter-flow两个插件
- 参考链接：https://flow.org/en/docs/editors/sublime-text/


### 新增eslint代码检查 
- sublime text 安装插件：SublimeLinter,SublimeLinter-contrib-eslint 插件
 参考链接： 
- https://eslint.org/docs/user-guide/integrations
- http://www.jianshu.com/p/e826e13c67ec
- 提醒：提交代码之前会进行 eslint 检测，若检测不通过提交不了代码。

### DEMO图片
![](https://github.com/wangweianger/react16-webpack3.8-onepage-base-project/blob/master/demoImg/01.png "")





