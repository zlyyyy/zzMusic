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
                    active-class="active"
                >
                    <i class="iconfont" :class="option.icon"></i>
                    {{ option.name }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                {
                    title: '推荐',
                    children: [
                        {
                            name: '发现音乐',
                            icon: 'icon-music',
                            path: '/'
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
                    children: [
                        {
                            name: '我喜欢的音乐',
                            icon: 'icon-music',
                            path: '/playlist'
                        }
                    ]
                },
                {
                    title: '收藏的歌单',
                    children: []
                }
            ]
        }
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.nav-bar{
    @include wh(200px, 100%);
    padding: 10px 0 10px 10px;
    background: #f5f7fa;
    .logo{
        margin-top: 20px;
    }
    .menu{
        .menu-group{
            margin-bottom: 20px;
            .menu-title{
                @include sc(14px, $font_second);
                margin-bottom: 10px;
            }
            .menu-item{
                @include sc(14px, $font_first);
                margin: 0 0 0 10px;
                padding: 5px;
                cursor: pointer;
                &.active{
                    color: $main;
                    font-weight: bolder;
                    border-right: 4px solid $main;
                }
            }
        }
    }
}
</style>