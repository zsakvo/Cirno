import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/ant-design-vue.js'
import cirnoHttp from './plugins/http'

import 'remixicon/fonts/remixicon.css'

Vue.config.productionTip = false

cirnoHttp.install(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
