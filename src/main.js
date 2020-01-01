// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {store} from './store/index'
import Mint from 'mint-ui'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueResource from 'vue-resource'
import 'mint-ui/lib/style.css'
import './assets/my_mint.scss'
import utils from './utils/utils'
import cookieutils from './utils/cookieutils'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(Mint)
Vue.use(ElementUI) // 全局使用ElenmentUI
Vue.use(VueResource)
Vue.use(VueCookies) // cookie方法
Vue.prototype.utils = utils//自定义的一些方法
Vue.prototype.cookieutils = cookieutils
Vue.prototype.$ajax = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//监听变化，相当于全局广播的作用
  components: { App },
  template: '<App/>'
})
