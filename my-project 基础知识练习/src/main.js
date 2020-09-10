import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.baseURL='http://www.baidu.com'

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
