const baseSrc = 'src/pages',
  fs = require('fs')
  path = require('path'),
  dirs = fs.readdirSync('./src/pages') // 新建pages文件夹，将所有的小模块的页面都放入pages里，一个模块一个文件夹

let pages = {}

function resolve(dir) {
  return path.join(__dirname, dir)
}

dirs.forEach( (dir) => {
  pages[dir] = '${baseSrc}${dir}/main.js'
})

module.exports = {
  // 部署应用时的基本 URL
  // baseUrl: process.env.NODE_ENV === 'production' ? '192.168.60.110:8080' : '192.168.60.110:8080',
  baseUrl: '/',// 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: 'dist',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: '',//放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'index.html',//指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  // pages,
  pages: {//pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {//除了 entry 之外都是可选的
      entry: 'src/index/main.js',// page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: 'public/index.html',// 模板来源
      filename: 'index.html',// 在 dist/index.html 的输出
      title: 'Index Page',// 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    },
    subpage: 'src/subpage/main.js'//官方解释：当使用只有入口的字符串格式时,模板会被推导为'public/subpage.html',若找不到就回退到'public/index.html',输出文件名会被推导为'subpage.html'
  },
  lintOnSave: true,// eslint-loader 是否在保存的时候检查  
  publicPath: './',
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  devServer: { // webpack-dev-server 相关配置
  // open: process.platform === 'darwin',
  open: true, //配置自动启动浏览器
  // host: '0.0.0.0',
  host: 'localhost',
  port: 8080,
  https: false,
  hotOnly: false,
  // 获取数据
  before: app => {
    // app.get('/api/goods',(req,rep)=>{
    //   rep.json(data)
    // })
  },
  proxy: { // 跨域 - 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
    '/api': {
    target: 'http://', // 设置你调用的接口域名和端口号，要加http
    // ws: true,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '' // 这里理解成用'/api'代替target里面的地址，后面组件中我们调用接口时直接用api代替
    }
    },
    '/BeMoralOfficial': {
      target: 'http://****.****.****.****:8001',  //目标接口域名
      secure: false, //false为http访问，true为https访问
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/BeMoralOfficial': '/BeMoralOfficial'   //重写接口
      }
    },
    //跨域
    '/api2':{
      target:'http://api.localhost:80/api',
      ws:true,
      changeOrigin:true,
      pathRewrite:{
        '^/api2': ''
      }
    }
  }
  },
  css: { // css相关配置
  extract: true, // 是否使用css分离插件 ExtractTextPlugin
  sourceMap: false, // 开启 CSS source maps?
  modules: false, // 启用 CSS modules for all css / pre-processor files.
  loaderOptions: { // css预设器配置项
    postcss: {
    plugins: [require('postcss-px2rem')({
      remUnit: 75
    })] // 安装scss时使用，将px转换成rem
    }
  }
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // 第三方插件配置
  pluginOptions: {
  // ...
  }
}
