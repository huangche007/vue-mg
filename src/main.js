import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import 'lib-flexible/flexible.js'
import mgUtils from '@/utils/mgUtils'
import Vconsole from 'vconsole'
import '@/styles/index.scss' // global css

Vue.config.productionTip = false

new Vconsole()

Vue.prototype.$api = api
Vue.prototype.$mgUtils = mgUtils
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
