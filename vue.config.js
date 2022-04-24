const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    // 自动打开浏览器
    open: false,
    port: 70,

    proxy: {
      // // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
}
