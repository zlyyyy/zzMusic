<template>
    <div class="discover">
        <div class="subnav" v-if="routePath!='recommend/taste'">
            <router-link
                v-for="item in subnav"
                :key="item.name"
                class="subnav-item"
                :to="{path: item.path}"
                tag="div"
                :class="{'active': item.path == routePath}"
            >
                {{ item.name }}
            </router-link>
        </div>
        <router-view />
    </div>
</template>

<script>

export default {
    created() {
    },
    mounted() {
    },
    components: {
    },
    watch: {
    },
    computed: {
        routePath() {
            return this.$route.path
        }
    },
    data() {
        return {
            subnav: [
                {
                    name: '个性推荐',
                    path: '/music/discover/index'
                },
                {
                    name: '歌单',
                    path: '/music/discover/playlist'
                },
                {
                    name: '主播电台',
                    path: '/music/discover/djradio'
                },
                {
                    name: '排行榜',
                    path: '/music/discover/toplist'
                },
                {
                    name: '歌手',
                    path: '/music/discover/artist'
                },
                {
                    name: '最新音乐',
                    path: '/music/discover/song'
                }
            ]
        }
    },
    methods: {
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';

.discover{
     .subnav{
        @include wh(100%, 40px);
        text-align: center;
        border-bottom: 1px solid $border_second;
        margin-bottom: 20px;
        .subnav-item{
            position: relative;
            display: inline-block;
            @include sc(14px, $font_second);
            text-align: center;
            line-height: 40px;
            @include wh(100px, 40px);
            cursor: pointer;
            &:hover{
                color: $main;
            }
            &.active{
                color: $main;
                &::after{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    content: '';
                    @include wh(100%, 2px);
                    background: $main;
                }
            }
        }
    }
}
</style>
