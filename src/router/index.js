import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/music'
        },
        {
            path: '/music',
            component: () => import('../pages/music'),
            redirect: '/music/index',
            meta: {
                title: 'ZZ-music',
                keepAlive: true
            },
            children: [
                {
                    path: 'index',
                    component: () => import('../pages/index/index'),
                    meta: {
                        title: '搜索'
                    }
                },
                {
                    path: 'search',
                    component: () => import('../pages/search/search'),
                    meta: {
                        title: '搜索'
                    }
                },
                {
                    path: 'playlist',
                    component: () => import('../pages/playlist/playlist'),
                    meta: {
                        title: '歌单'
                    }
                }
            ]
        }
    ]
})
