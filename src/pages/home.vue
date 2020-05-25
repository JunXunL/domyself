<template>
  <div class="home">
   <!--在前端HTML页面中使用 count-->
    <!-- <HelloWorld :msg="count"/> -->
    <NavigationMenu></NavigationMenu>
    <router-view></router-view>
  </div>
</template>
<script>
import NavigationMenu from '@/components/home/NavigationMenu.vue'
import { mapActions, mapState } from 'vuex' // 注册 action 和 state
export default {
  name: 'home',
  components: {
    NavigationMenu
  },
  created () {
    this.incrementStep()
  },
  mounted () {
    this.getTest()
  },
  computed: {
    // 在这里映射 store.state.count，使用方法和 computed 里的其他属性一样
    ...mapState(['count'])
  },
  methods: {
    // 在这里引入 action 里的方法，使用方法和 methods 里的其他方法一样
    ...mapActions(['incrementStep']),
    getTest () {
      this.$http.get('/api/test').then(function (res) {
        console.log(res.data) // 输出mock形式的随机数据
      })
    }
  }
}
</script>
