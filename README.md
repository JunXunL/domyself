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

# .env 环境文件讲解 https://cli.vuejs.org/zh/guide/mode-and-env.html
## 一个环境文件只包含环境变量的“键=值”对。被载入的变量将会对 vue-cli-service 的所有命令、插件和依赖可用。
## [环境加载属性]，为一个特定模式准备的环境文件 (例如 .env.production) 将会比一般的环境文件 (例如 .env) 拥有更高的优先级。此外，Vue CLI 启动时已经存在的环境变量拥有最高优先级，并不会被 .env 文件覆写。
## *注意：NODE_ENV，如果在环境中有默认的 NODE_ENV，你应该移除它或在运行 vue-cli-service 命令的时候明确地设置 NODE_ENV。
## .env                # 在所有的环境中被载入
## .env.local          # 在所有的环境中被载入，但会被 git 忽略
## .env.[mode]         # 只在指定的模式中被载入
## .env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略

# 使用scss (注意版本问题)
##  "css-loader": "^0.28.11",    "node-sass": "^4.11.0",    "sass-loader": "^7.1.0",    "vue-loader": "^13.7.3",    "vue-style-loader": "^3.1.2"
## 1.先安装sass 依赖包：npm  install sass-loader --save-dev 和 npm install node-sass --sava-dev
## 2.在build文件夹下的webpack.base.conf.js的rules里面添加配置 {test: /\.scss$/, loaders: ['style', 'css', 'sass']}
## 3.使用scss时候，在style样式标签上添加  lang="scss" 即可
## 4.应用对应的语法，否则报错，如：修改字体颜色  <style lang="scss"> $color:red;  div {color:$color;} </style>
## @import '文件路径'， 命令导入外部sass、scss、css文件
