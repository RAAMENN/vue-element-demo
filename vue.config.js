module.exports = {
  // webpack-dev-server 相关配置
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    open: true,
    proxy: {
      "/": {
        // mock服务器
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: false
      }
    }
  },
  // 如果不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  outputDir: "dist",
  // 部署应用包时的基本 URL
  publicPath: "/demo/"
}
