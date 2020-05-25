<template>
  <div>
    <!-- 监听切换事件 -->
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="flower-o">搭配</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
// import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
export default {
  data () {
    return {
      active: 0
    }
  },
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem
  },
  methods: {
    onChange (index) {
      switch (index) {
        case '0': {
          this.$router.push('/')
          break
        }
        case '1': {
          this.$router.push('/search')
          break
        }
        case '2': {
          this.$router.push('/match')
          break
        }
        case '3': {
          this.$router.push('/myself')
          break
        }
        default: {
          this.$router.push('/')
          break
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
