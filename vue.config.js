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
  indexPath: 'index.html',//指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。(打包之后，改变系统默认的index.html的文件名)
  filenameHashing: false,//默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
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
  lintOnSave: true,// eslint-loader 是否在保存的时候检查，在生产构建时禁用 eslint-loader，可以配置为: process.env.NODE_ENV !== 'production'
  // runtimeCompiler: false, //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
  
  /**
   * 部署生产环境和开发环境下的URL。默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
   * 例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
   * 例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 baseUrl 为 /my-app/。
   * baseUrl 从 Vue CLI 3.3 起已弃用，请使用publicPath
   * baseUrl: process.env.NODE_ENV === "production" ? "./" : "/"
   **/ 
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/", 
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
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   * 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   * map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   **/
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // 支持webPack-dev-server的所有选项配置
  devServer: {
    // open: process.platform === 'darwin',
    open: true, // 设置，是否自动启动浏览器
    // host: '0.0.0.0',
    host: 'localhost',
    port: 8080,
    https: false, // https:{type:Boolean}
    hotOnly: false,
    // 获取数据
    before: app => {
      // app.get('/api/goods',(req,rep)=>{
      //   rep.json(data)
      // })
    },
    // 跨域 - 配置多个代理
    proxy: { // (如果只配置一个，直接写 proxy: 'http://localhost:4000' )
      '/api': {
        target: 'http://', // 设置，要访问的接口域名和端口号，要加http
        // target: process.env.VUE_APP_URL, // 使用.env.development文件中的访问的mock地址配置
        // ws: true, // 是否启用websockets
        changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          //这里理解成用'/api'代替target里面的地址,比如要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
          '^/api': ''
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
    // 下边这个， 如果你是本地自己mock 的话用after这个属性，线上环境一定要干掉
    // after: require("./mock/mock-server.js")
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
