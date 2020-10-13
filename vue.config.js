/**
 * vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。
 * 你也可以使用 package.json 中的 vue 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写。
 */
const fs = require('fs')
const path = require('path')
/**
 * @readdirSync fs模块，用于读取文件夹下所有的文件/文件夹，返回数组，fs.readdir的同步版本
 * @resolve path模块，用于拼接文件路径
 * @existsSync fs模块，判断路径是否存在，返回布尔值
 * process.cwd() 方法会返回 Node.js 进程的当前工作目录，是当前执行node命令时候的文件夹地址，路径始终不变。__dirname 是被执行的js 文件的地址
 */
const dirs = fs.readdirSync(path.resolve(process.cwd(), "src/pages")) // 新建pages文件夹，将所有的小模块的页面都放入pages里，一个模块一个文件夹
const pages = dirs.reduce((config,dirname)=>{
    const filePath = `src/pages/${dirname}/main.js`
    const tplPath = path.resolve(process.cwd(), `./public/${dirname}.html`)

    if(fs.existsSync(tplPath)){
      config[dirname] = filePath
    }else{
      config[dirname] = {
        entry:filePath, // page的入口
        template:'public/index.html', // 模板的来源
        filename:`${dirname}.html` // 在dist/xx.html输出
      }
    }
    return config
},{})
// 多页面 pages 使用的模版默认为 public/[dir-name].html，如果找不到该模版，默认使用 public/index.html

/**
 * publicPath: 应用会默认部署在根路径，使用publicPath可以定义部署在子路径，pages模式不要使用相对路径
 * productionSourceMap: 为true 则打包会生成.map文件
 * contentBase: 告诉服务器从那个目录提取静态文件
 * compress: 一切服务都启用 gzip 压缩
 * historyApiFallback: 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
 * disableHostCheck: 绕过主机检查
 * devServer.proxy.changeOrigin: 默认情况下，代理时会保留主机标头的来源，您可以将changeOrigin设置为true来覆盖此行为
 * devServer.proxy.secure: 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器,设置为false表示接受
 * chainWebpack: webpack的链式操作
 * configureWebpack：可能是个对象，也可能是个函数，主要是通过webpack-merge合并到配置里
 * configureWebpack.resolve: 相当于合并内容到webpack原来的resolve[https://webpack.docschina.org/configuration/resolve/#resolve]
 * configureWebpack.resolve.alias: 创建 import 或 require 的别名，来确保模块引入变得更简单
 */
module.exports = {
  publicPath: process.env.VUE_APP_MODE === "production" ? "/prod/" : "/",
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/", 
  // publicPath: './', // Default: '/'，部署应用包时的基本 URL
  pages,
  // outputDir: 'dist',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  outputDir: process.env.VUE_APP_MODE === "production"? path.resolve(`${process.cwd()}/dist-prod/`):path.resolve(`${process.cwd()}/dist-beta/`),
  productionSourceMap:process.env.VUE_APP_MODE === "beta",

  // 自动化导入
  chainWebpack: config => {
    // 通过 url-loader 调整内联文件的大小限制，以减少 HTTP 请求的数量，下面是小于 10kb 的资源内联
    // config.module
    //   .rule('images')
    //     .use('url-loader')
    //       .loader('url-loader')
    //       .tap(options => Object.assign(options, { limit: 10240 }));
    config.module
      .rule("images")
        .use("url-loader")
          .tap(args => {
            return {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "images/[name].[hash:8].[ext]"
                }
              }
            };
          });
    config.module
      .rule("svg")
        .use("file-loader")
          .tap(args => {
            return {
              name: "images/[name].[hash:8].[ext]"
            };
          });
  },

  /**
   * 1、如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
   * 调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象：
   * configureWebpack: { plugins: [new MyAwesomeWebpackPlugin()] }该对象将会被 webpack-merge 合并入最终的 webpack 配置。
   * 2、如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   */
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  // },
  configureWebpack: {
    resolve:{
        // 目录引用简写
        alias:{
            "@_src": path.resolve(__dirname,"src/")
        }
    }
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  vueLoader: {},

  devServer: {
    open: true, // 设置，是否自动启动浏览器 、 open: process.platform === 'darwin',
    host: 'localhost',
    port: 8080,
    https: false,
    // contentBase: "./dist",
    // compress: true,
    // historyApiFallback: true,
    // disableHostCheck: true,

    proxy: {
      '/api': {
        target: 'http://****.****.****.****:8001',  // target: process.env.VUE_APP_URL, // 使用.env.development文件中的访问的mock地址配置
        secure: false, //false为http访问，true为https访问
        changeOrigin: true,  //是否跨域
        // pathRewrite: {
        //     //用'/api'代替target里面的地址,比如要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        //     '^/api': ''
        // }
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
      },
      // 给 sass-loader 传递选项
      // sass: {
      //   // @/ 是 src/ 的别名
      //   // 所以这里假设你有 `src/variables.sass` 这个文件
      //   // 注意：在 sass-loader v7 中，这个选项名是 "data"
      //   prependData: `@import "~@/variables.sass"`
      // },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `data` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      // scss: {
      //   prependData: `@import "~@/variables.scss";`
      // },
      // 给 less-loader 传递 Less.js 相关选项
      less:{
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff'
        }
      }
    }
  }
}
