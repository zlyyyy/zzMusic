<template>
    <div class="nav-bar">
        <div class="menu">
            <div class="menu-group" v-for="item in menu" :key="item.key">
                <div class="menu-title">{{ item.title }}</div>
                <router-link
                    v-for="option in item.children"
                    :key="option.key"
                    class="menu-item"
                    :to="{path: option.path}"
                    tag="div"
                    :class="{'active': option.path == locationUrl}"
                >
                    <i class="iconfont" :class="option.icon"></i>
                    {{ option.name }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    created() {
        this.$nextTick(() => {
			// 是否登录获取用户歌单
			this.loginStatus ? this.setUserPlaylist() : null
		})
    },
    watch: {
        playlistSet(newVal, oldVal) {
            // 设置创建的歌单
            if (newVal.length != 0) {
                newVal.forEach(ele => {
                    this.menu[2].children = [...this.menu[2].children, ele]
                })
            } else {
                this.menu[2].children = []
            }
        },
        playlistCollect(newVal, oldVal) {
            // 设置收藏的歌单
            if (newVal.length != 0) {
                newVal.forEach(ele => {
                    this.menu[3].children = [...this.menu[3].children, ele]
                })
            } else {
                this.menu[3].children = []
            }
        }
    },
    computed: {
        ...mapState('user', {
            loginStatus: state => state.loginStatus, // 登录状态
			playlistSet: state => state.playlistSet, // 用户创建的歌单
			playlistCollect: state => state.playlistCollect // 用户收藏的歌单
        }),
        locationUrl() {
            return this.$route.fullPath
        }
    },
    data() {
        return {
            menu: [
                {
                    title: '推荐',
                    children: [
                        {
                            name: '发现音乐',
                            icon: 'icon-music',
                            path: '/discover/index'
                        },
                        {
                            name: '私人FM',
                            icon: 'icon-music',
                            path: '/private'
                        }
                    ]
                },
                {
                    title: '我的音乐',
                    children: [
                        {
                            name: '我的电台',
                            icon: 'icon-music',
                            path: '/my/radio'
                        }
                    ]
                },
                {
                    title: '创建的歌单',
                    children: []
                },
                {
                    title: '收藏的歌单',
                    children: []
                }
            ]
        }
    },
    methods: {
        ...mapActions('user', [
			'setUserPlaylist'
		])
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.nav-bar{
    @include wh(200px, 100%);
    padding: 10px 0;
    background: #f5f7fa;
    overflow: hidden;
    overflow-y: auto;
    .logo{
        margin-top: 20px;
    }
    .menu{
        .menu-group{
            margin-bottom: 20px;
            .menu-title{
                @include sc(12px, $font_second);
                margin-bottom: 10px;
                padding-left: 10px;
            }
            .menu-item{
                @include sc(12px, $font_first);
                padding: 5px 5px 5px 20px;
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                &.active{
                    color: $main;
                    font-weight: bolder;
                    background: rgba(59, 117, 255, .2);
                    border-left: 4px solid $main;
                }
            }
        }
    }
}
</style>