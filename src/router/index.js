import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require(['@/pages/home/home'], resolve)
const Search = resolve => require(['@/pages/search/search'], resolve)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: 'ZZ-music'
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                title: '搜索'
            }
        }
    ]
})
