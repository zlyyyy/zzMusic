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
            redirect: '/music/discover/index',
            meta: {
                title: 'ZZ-music',
                keepAlive: true
            },
            children: [
                {
                    path: 'discover',
                    component: () => import('@/pages/discover/discover'),
                    redirect: '/discover/index',
                    meta: {
                        title: 'ZZ-music',
                        keepAlive: true
                    },
                    children: [
                        {
                            path: 'index',
                            component: () => import('@/pages/discover/index/index'),
                            meta: {
                                title: '推荐'
                            }
                        },
                        {
                            path: 'recommend/taste',
                            component: () => import('@/pages/discover/everyday/everyday'),
                            meta: {
                                title: '每日推荐'
                            }
                        }
                    ]
                },
                {
                    path: 'song',
                    component: () => import('../pages/song/song'),
                    meta: {
                        title: '单曲'
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
