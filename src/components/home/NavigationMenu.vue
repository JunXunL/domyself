<template>
  <div>
    <van-tabbar :fixed="false" route>
      <van-tabbar-item to="/" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item to="/summer" icon="search">标签</van-tabbar-item>
      <van-tabbar-item to="/autumn" icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item to="/winter" icon="setting-o">标签</van-tabbar-item>
      <van-tabbar-item to="/jacket" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item to="/trousers" icon="search">标签</van-tabbar-item>
      <van-tabbar-item to="/shoe" icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item to="/more" icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  data () {
    return {
      active: 'spring'
    }
  },
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem
  }
}
</script>
<style>
</style>
