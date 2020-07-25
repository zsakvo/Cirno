module.exports = {
  lintOnSave: true,
  productionSourceMap: true,
  devServer: {
    port: 9012,
    open: false,
    proxy: {
      '/hbooker': {
        //测试
        target: process.env.VUE_APP_TARGET_URL, //目标主机
        changeOrigin: true, //是否跨域 默认 true
        ws: true, //代理的 WebSockets 默认 true
        secure: false, //是否开启 ssl 加密 https
        pathRewrite: {
          '^/hbooker': '/hbooker' //路径替换
        }
      }
    }
  }
}
