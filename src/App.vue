<template>
<!-- 是项目入口文件 -->
  <div id="app">
    <v-header></v-header>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
// import router from '@/router/index'
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    'v-header': Header,
    Footer
  //   router
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
