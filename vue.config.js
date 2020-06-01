/**
 * vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。
 * 你也可以使用 package.json 中的 vue 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写。
 */
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
  filenameHashing: true,//默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  /**
   * 构建一个多页应用
   * 不是每个应用都需要是一个单页应用。Vue CLI 支持使用 vue.config.js 中的 pages 选项构建一个多页面的应用。
   * 构建好的应用将会在不同的入口之间高效共享通用的 chunk 以获得最佳的加载性能。
   */
  pages: {//pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {//除了 entry 之外都是可选的
      entry: 'src/index/main.js',// page 的入口，每个“page”应该有一个对应的 JavaScript 入口文件
      template: 'public/index.html',// 模板来源
      filename: 'index.html',// 在 dist/index.html 的输出
      title: 'Index Page',// 当使用 title 选项时，在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    },
    // login: { // 例如，增加一个登录页面，且路由独立，此时该应用就是个多页应用
    //   entry: 'src/pages/login.js',
    //   title: '登录'
    // },
    /**
     * 当使用只有入口的字符串格式时，模板会被推导为 `public/subpage.html`
     * 并且如果找不到的话，就回退到 `public/index.html`。
     * 输出文件名会被推导为 `subpage.html`。
     */
    // subpage: 'src/subpage/main.js'
  },
  /**
   * 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
   * 设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。
   * 在生产构建时禁用 eslint-loader，可以配置为: process.env.NODE_ENV !== 'production'
   */
  lintOnSave: true,
  /**
   * Default: '/'，部署应用包时的基本 URL。
   * 用法和 webpack 本身的 output.publicPath 一致，但是 Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 publicPath 而不要直接修改 webpack 的 output.publicPath。
   * 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
   * 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
   * 例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
   * （baseUrl 从 Vue CLI 3.3 起已弃用，请使用publicPath）
   * publicPath: process.env.NODE_ENV === "production" ? "./" : "/", 
   **/ 
  publicPath: './',
  // compiler: false, // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
  // 自动化导入。是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 通过 url-loader 调整内联文件的大小限制，以减少 HTTP 请求的数量，下面是小于 10kb 的资源内联
    config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 10240 }))
  },
  /**
   * https://cli.vuejs.org/zh/guide/webpack.html
   * 1、如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
   * 调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象：configureWebpack: { plugins: [new MyAwesomeWebpackPlugin()] }该对象将会被 webpack-merge 合并入最终的 webpack 配置。
   * 2、如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   */
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  vueLoader: {},
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   * 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   * map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   **/
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。

  /**
   * 所有 webpack-dev-server 的选项都支持。注意：
   * 有些值像 host、port 和 https 可能会被命令行参数覆写。
   * 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。
   */
  devServer: {
    open: true, // 设置，是否自动启动浏览器 、 open: process.platform === 'darwin',
    host: 'localhost', // host: '0.0.0.0',
    port: 8080,
    https: false, // https:{type:Boolean}
    /**
     * 如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'error'。
     * 这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
     * 或者，你也可以通过设置让浏览器 overlay 同时显示警告和错误：
     */
    overlay: {
      warnings: true,
      errors: true
    },
    hotOnly: false,
    // 获取数据
    before: app => {
      // app.get('/api/goods',(req,rep)=>{
      //   rep.json(data)
      // })
    },

    /**
     * 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
     * 这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
     * devServer.proxy 可以是一个指向开发环境 API 服务器的字符串：
     */
    proxy: {
      // '/api': {
      //   target: 'http://', // 设置，要访问的接口域名和端口号，要加http
      //   // target: process.env.VUE_APP_URL, // 使用.env.development文件中的访问的mock地址配置
      //   // ws: true, // 是否启用websockets
      //   changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      //   pathRewrite: {
      //     //这里理解成用'/api'代替target里面的地址,比如要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
      //     '^/api': ''
      //   }
      // },
      // '/BeMoralOfficial': {
      //   target: 'http://****.****.****.****:8001',  //目标接口域名
      //   secure: false, //false为http访问，true为https访问
      //   changeOrigin: true,  //是否跨域
      //   pathRewrite: {
      //     '^/BeMoralOfficial': '/BeMoralOfficial'   //重写接口
      //   }
      // },
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
    /**
     * 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
     * 同样当构建 Web Components 组件时它总是会被禁用 (样式是 inline 的并注入到了 shadowRoot 中)。
     * 当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS。
     */
    extract: true, // Default: 生产环境下是 true，开发环境下是 false。
    sourceMap: false, // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
    requireModuleExtension: false, // css.modules从v4起已弃用。 默认情况下true，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    /**
     * 支持的 loader 有：
     * css-loader、postcss-loader、sass-loader、less-loader、stylus-loader
     * 另外，也可以使用 scss 选项，针对 scss 语法进行单独配置（区别于 sass 语法）。
     */
    loaderOptions: { // 向 CSS 相关的 loader 传递选项。css预设器配置项
      // css: { // 这里的选项会传递给 css-loader
        // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
        // Vue CLI v3 用户可参考 css-loader v1 文档 https://github.com/webpack-contrib/css-loader/tree/v1.0.1
        // modules: {
        //   localIdentName: '[name]-[hash]'
        // },
        // localsConvention: 'camelCaseOnly'
      // },
      postcss: { // 这里的选项会传递给 postcss-loader
        plugins: [require('postcss-px2rem')({
          remUnit: 75
        })] // 安装scss时使用，将px转换成rem
      // },
      // // 给 sass-loader 传递选项
      // sass: {
      //   // @/ 是 src/ 的别名
      //   // 所以这里假设你有 `src/variables.sass` 这个文件
      //   // 注意：在 sass-loader v7 中，这个选项名是 "data"
      //   prependData: `@import "~@/variables.sass"`
      // },
      // // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // // 但是在配置 `data` 选项的时候
      // // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      // scss: {
      //   prependData: `@import "~@/variables.scss";`
      // },
      // // 给 less-loader 传递 Less.js 相关选项
      // less:{
      //   // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
      //   // `primary` is global variables fields name
      //   globalVars: {
      //     primary: '#fff'
      //   }
      }
    }
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  dll: false, // 是否启用dll  https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  pwa: {}, // 向 PWA 插件传递选项  https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
  pluginOptions: {
    // foo: {
    //   // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
    // }
  }
}
