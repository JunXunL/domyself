// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 是项目的核心文件
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' // 引入状态管理 store

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 注册store(这可以把 store 的实例注入所有的子组件)
  components: { App },
  template: '<App/>'
})
