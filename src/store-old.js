import Vue from 'vue'
import Vuex from 'vuex' // 引入 vuex
import store from './store' // 注册store

// vuex引用多个插件的写法，如：vuex提示的插件和持久化的插件一起使用，配置如下
// import createPersistedState from "vuex-persistedstate"
// import createLogger from 'vuex/dist/logger'
// // 判断环境 vuex提示生产环境中不使用
// const debug = process.env.NODE_ENV !== 'production'
// const createPersisted = createPersistedState({
//  storage: window.sessionStorage
// })
// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//     common,
//     invoice
//   },
//   plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
//   // plugins: [createPersistedState({
//   //   storage: window.localStorage
//   //   // 指定持久化对象，不配置则数据全部持久化
//   //   // reducer (state) {
//   //   //   return {
//   //   //     userInfo: state.userInfo
//   //   //   }
//   //   // }
//   // })]
// })

Vue.use(Vuex) // 使用 vuex

export default new Vuex.Store({
  state: {
    // 初始化状态
    count: 0
  },
  mutations: {
    // 处理状态
    increment (state, payload) {
      state.count += payload.step || 1
    }
  },
  actions: {
    // 提交改变后的状态
    increment (context, param) {
      context.state.count += param.step
      context.commit('increment', context.state.count) // 提交改变后的state.count值
    },
    incrementStep ({state, commit, rootState}) {
      if (rootState.count < 100) {
        store.dispatch('increment', { // 调用increment()方法
          step: 10
        })
      }
    }
  }
})
