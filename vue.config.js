const backEndServer = {
  服务器1: "http://oiayiyi.top"
  // '模拟环境': 'http://localhost:11041''
}
// 判断开发环境
const isProduction = process.env.NODE_ENV === "production"

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = isProduction ? "/" : "/"

module.exports = {
  // webpack-dev-server 相关配置
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    open: true,
    proxy: {
      "/": {
        // 服务器
        target: Object.values(backEndServer)[0],
        changeOrigin: true,
        ws: false
      }
    }
  },
  chainWebpack: config => {
    if (process.env.use_analyzer) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1]
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`
            }
          }
        }
      }
    }
  },
  // 如果不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  outputDir: "dist",
  // 部署应用包时的基本 URL
  // publicPath: "/calc/"
  publicPath: BASE_URL
}
