import Vue from 'vue'
import App from './App'
import request from './utils/request'
// moment 本地化
import moment from 'moment'
moment.locale('zh-cn')

Vue.config.productionTip = false
Vue.prototype.request = request

App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
