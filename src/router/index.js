import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Hello from '@/components/Hello'
// vue-router 的动态路由，获取传值：path 属性加上 /:id，使用 router 对象的 params.id 获取

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
