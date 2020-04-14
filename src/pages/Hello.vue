<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>文档及插件</h2>
    <p>
      <a href="https://cn.vuejs.org/" target="_blank">核心文档</a> /
      <a href="https://router.vuejs.org/zh/" target="_blank">vue-router</a> /
      <a href="https://vuex.vuejs.org/zh/" target="_blank">vuex</a> /
      <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
    </p>
    <button @click="getHitokoto">换一句</button>
    <blockquote>
      {{hitokoto.hitokoto}}——
      <em>{{hitokoto.from}}</em>
    </blockquote>
    <button @click="getMock">换一批</button>
    <table width="100%" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>城市</th>
          <th>颜色</th>
          <th>生日</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="list.value" v-for="(list , index) in tableData">
          <td>{{index + 1}}</td>
          <td>{{list.name}}</td>
          <td>{{list.city}}</td>
          <td><div v-bind:style="{ backgroundColor: list.color }">&nbsp;</div></td>
          <td>{{list.birthday}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "当你看到这个，说明项目已经初始化完成！",
      hitokoto: {},
      tableData: []
    }
  },
  mounted: function() {
    this.getHitokoto()
    this.getMock()
  },
  components: {},
  methods: {
    getHitokoto() {
      let vueObj = this
      vueObj.$ajax.get("https://v1.hitokoto.cn/").then(function(res) {
        console.log(res.data)
        vueObj.hitokoto = res.data
      })
    },
    getMock() {
      let vueObj = this
      vueObj.$ajax.get(process.env.API_HOST + "test").then(function(res) {
        console.log(res.data)
        vueObj.tableData = res.data.list
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.hello {
  font-size: 14px;
  text-align: center;
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 28px;
  }
  p {
  }
  a {
    color: #42b983;
  }
  table {
    border: 1px solid #ccc;
    th,
    td {
      text-align: left;
      border: 1px solid #ccc;
    }
  }
}
</style>