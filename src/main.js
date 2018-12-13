// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Carousel, CarouselItem, Autocomplete, Container, Header, Main, Aside, Footer, Loading } from 'element-ui'
import './style/element-variables.scss'
import App from './App'
import router from './router'
import store from './store/index'
import axios from './utils/http'

Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Autocomplete)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
