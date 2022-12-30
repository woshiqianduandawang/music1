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
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
) {
  // 执行相应代码或直接跳转到手机页面
  window.location.href = "https://miniccmusic.netlify.app/";
} else {
  // 执行桌面端代码
  console.log('桌面');
  window.location.href = "https://ccmusic.netlify.app/";
}
