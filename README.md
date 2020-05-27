# domyself

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 遇到的问题及解决方案
## 1、vue中用mock制造模拟接口 http://www.likecs.com/show-52362.html
## 2、Vuex持久化插件(vuex-persistedstate)-解决刷新数据消失的问题

## 引入vant组件（参考vant快速上手）：自动按需引入组件 (推荐)
### babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式
### 安装插件： npm i babel-plugin-import -D

# package.js 是npm的配置文件
# vue.config.js 是webpack的配置文件
## vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。也可以使用 package.json 中的 vue 字段，但是注意这种写法需要严格遵照 JSON 的格式来写。

