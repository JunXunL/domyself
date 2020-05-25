import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Match from '@/pages/Match'
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
          path: '/spring',
          name: 'spring',
          component: () => import('../components/home/Spring.vue'),
          meta: {
            title: '春装'
          }
        }, {
          path: '/summer',
          name: 'summer',
          component: () => import('../components/home/Summer.vue'),
          meta: {
            title: '夏装'
          }
        }, {
          path: '/autumn',
          name: 'autumn',
          component: () => import('../components/home/Autumn.vue'),
          meta: {
            title: '秋装'
          }
        }, {
          path: '/winter',
          name: 'winter',
          component: () => import('../components/home/Winter.vue'),
          meta: '冬装'
        }, {
          path: '/jacket',
          name: 'jacket',
          component: () => import('../components/home/Jacket.vue'),
          meta: {
            title: '上衣'
          }
        }, {
          path: '/trousers',
          name: 'trousers',
          component: () => import('../components/home/Trousers.vue'),
          meta: {
            title: '裤子'
          }
        }, {
          path: '/shoe',
          name: 'shoe',
          component: () => import('../components/home/Shoe.vue'),
          meta: {
            title: '鞋子'
          }
        }
      ]
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }, {
      path: '/match',
      name: 'match',
      component: Match
    }, {
      path: '/myself',
      name: 'myself',
      component: Myself
    }
  ]
})
