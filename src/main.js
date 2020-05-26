// 应用的入口文件【js文件入口】

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' // 引入状态管理 store
// import './assets/css/common.scss'

// 结合vue-axios使用，它是按照vue插件的方式去写的，就可以使用vue.use()方法了。
// npm install axios vue-axios --save
// import Vue from 'vue'
// import axios from 'axios'
// 首先在主入口文件main.js中引用，之后挂在vue的原型链上： // Vue.prototype.$ajax= axios
// 使用：this.$ajax.get('api').then((response)=>{    console.log(response.data)}).catch((response)=>{    console.log(response);})
// import VueAxios from 'vue-axios'
// 项目组件上面使用------------------
// Vue.axios.get(api).then((response) => {
//   console.log(response.data)
// }).catch((response)=>{
//   console.log(response.data);
// })

// this.axios.get(api).then((response) => {
//   console.log(response.data)
// }).catch((response)=>{
//   console.log(response.data);
// })

// this.$http.get(api).then((response) => {
//   console.log(response.data)
// }).catch((response)=>{
//   console.log(response.data);
// })

// Vue.use(VueAxios, axios)

import axios from './axios/ajax.js'
// axios 是一个基于 promise 的 HTTP 库，axios并没有install方法，所以是不能使用vue.use()方法的。
Vue.prototype.$ajax = axios

process.env.Mock && require('./mock/mock.js')

// if(process.env.NODE_ENV === "development"){
//   // 直接在main.js里面引用
//   // 此处有坑，因为只在开发环境使用。if里面不能用import方式导入，只能用require方式引入
//   // import "./mock"
//   require('./mock.js')
//   // 当项目启动后，mock会拦截他规则内的http请求
// }

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 注册store(这可以把 store 的实例注入所有的子组件)
  components: { App },
  template: '<App/>'
})
