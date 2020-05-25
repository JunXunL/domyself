import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Myself from '@/pages/Myself'
// vue-router 的动态路由，获取传值：path 属性加上 /:id，使用 router 对象的 params.id 获取

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/breakfast',
          name: 'breakfase',
          component: () => import('../components/home/Breakfast.vue'),
          meta: {
            title: '早餐'
          }
        }, {
          path: '/lunch',
          name: 'lunch',
          component: () => import('../components/home/Lunch.vue'),
          meta: {
            title: '午餐'
          }
        }, {
          path: '/nightSnack',
          name: 'nightSnack',
          component: () => import('../components/home/NightSnack.vue'),
          meta: {
            title: '夜宵'
          }
        }, {
          path: '/fruits',
          name: 'fruits',
          component: () => import('../components/home/Fruits.vue'),
          meta: '水果'
        }, {
          path: '/signIn',
          name: 'signIn',
          component: () => import('../components/home/SignIn.vue'),
          meta: {
            title: '签到'
          }
        }, {
          path: '/teatime',
          name: 'teatime',
          component: () => import('../components/home/Teatime.vue'),
          meta: {
            title: '下午茶'
          }
        }
      ]
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }, {
      path: '/myself',
      name: 'myself',
      component: Myself
    }
  ]
})
