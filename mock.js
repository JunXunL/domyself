/**
 * 主要功能是：
 * 1、基于数据模板生成模拟数据。
 * 2、基于HTML模板生成模拟数据。
 * 3、拦截并模拟 ajax 请求。
 */
import Mock from 'mockjs'
const Random = Mock.Random
const dataRes = function(params){
  // const body = JSON.parse(params.body)
  console.log(params)
  return {
    code:0,
    msg: "mock 响应成功",
    data: [{
      name: Random.cname() // 随机生成一个中文名字
    }]
  }
}
// 设置响应延时
Mock.setup({
  timeout:1000
})
let data = Mock.mock(/^\/baidu*/, 'get', dataRes)

export default data