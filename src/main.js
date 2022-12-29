import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'amfe-flexible'

import Request from '@/network/request' //全局网络请求模块
Vue.prototype.$Request = Request

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

})

