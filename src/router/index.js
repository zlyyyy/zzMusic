import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: '浙江公安全息搜索-手机号码'
            }
        }
    ]
})
