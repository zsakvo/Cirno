module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: './',
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
  },
  pwa: {
    // 一些基础配置
    name: 'Cirno',
    themeColor: '#096dd9',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // 自定义的 service worker 文件的位置
      swSrc: 'src/service-worker.js'
      // ...other Workbox options...
    }
  }
}
