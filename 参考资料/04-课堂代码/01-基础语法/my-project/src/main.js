import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 定义全局数据 通过 vue的原型来实现 
Vue.prototype.baseurl="www.baidu.com";

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
