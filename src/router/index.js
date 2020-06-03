import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Match from '@/pages/Match'
import Myself from '@/pages/Myself'
// vue-router 的动态路由，获取传值：path 属性加上 /:id，使用 router 对象的 params.id 获取

// 解决 重复点击相同路由报错问题（一定要加）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  // 动态路径参数 以冒号开头
  // { path: '/user/:id', component: User }
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        name: 'spring',
        component: () => import('../components/home/Spring.vue'),
        meta: {
          title: '春装'
        }
      }, {
        path: 'summer',
        name: 'summer',
        component: () => import('../components/home/Summer.vue'),
        meta: {
          title: '夏装'
        }
      }, {
        path: 'autumn',
        name: 'autumn',
        component: () => import('../components/home/Autumn.vue'),
        meta: {
          title: '秋装'
        }
      }, {
        path: 'winter',
        name: 'winter',
        component: () => import('../components/home/Winter.vue'),
        meta: '冬装'
      }, {
        path: 'jacket',
        name: 'jacket',
        component: () => import('../components/home/Jacket.vue'),
        meta: {
          title: '上衣'
        }
      }, {
        path: 'trousers',
        name: 'trousers',
        component: () => import('../components/home/Trousers.vue'),
        meta: {
          title: '裤子'
        }
      }, {
        path: 'shoe',
        name: 'shoe',
        component: () => import('../components/home/Shoe.vue'),
        meta: {
          title: '鞋子'
        }
      }, {
        path: 'more',
        name: 'more',
        component: () => import('../components/home/More.vue'),
        meta: {
          title: '更多'
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
  }, {
    // 重定向
    path: '/',
    redirect: '/home'
  }
]

// 配置路由导航守卫
// router.beforeEach((to,from,next)=>{
//   let writeTitle=false
//   for(let i=0;i<writeTitleRoutes.length;i++){
//     const pathReg = new RegExp(writeTitleRoutes[i].path);
//     if (pathReg.test(to.path)) {
//       writeTitle = true;
//       break;
//     }
//   }

//   if (store.state.index.writeTitle !== writeTitle) {
//     store.commit("index/SET_TITLE", writeTitle);
//   }
//   next();
// })

export default new VueRouter({
  /**
   * 1、hash 模式，vue-router 默认 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载
   * 2、history 模式，利用 html5 history interface 中新增的 pushState() 和 replaceState() 方法 来完成 URL 跳转而无须重新加载页面
   *    # 这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求。
   * */
  mode: 'history',
  base: 'home',
  routes
})
