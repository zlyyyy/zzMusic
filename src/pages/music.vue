<template>
    <div class="music">
        <z-head></z-head>
        <div class="z-content">
            <div class="z-slider">
                <nav-bar></nav-bar>
            </div>
            <div class="main-content">
                <router-view />
            </div>
        </div>
        <div class="z-foot">
            <z-player></z-player>
        </div>
        <login/>
        <audio ref="zzMusic" :src="musicInfor.url"></audio>
    </div>
</template>

<script>
import NavBar from '../components/navBar/navBar'
import ZHead from '../components/header/header'
import ZPlayer from '../components/player/player'
import Login from '../components/login/login'
import { mapGetters, mapMutations } from 'vuex'

export default {
    created() {
        this.$nextTick(() => {
            this.setAudio(this.$refs.zzMusic)
        })
    },
    mounted() {
    },
    components: {
        NavBar,
        ZHead,
        ZPlayer,
        Login
    },
    computed: {
        ...mapGetters([
            'musicInfor'
        ])
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapMutations({
            setAudio: 'SET_AUDIO'
        })
    }
}
</script>

<style lang="scss">
@import '../style/mixin';

.music{
    height: 100%;
    color: $font_first;
    .z-head{
        @include wh(100%, 60px);
        background: $main;
    }
    .z-content{
        display: flex;
        @include wh(100%, calc(100% - 160px));
        .z-slider{
            width: 200px;
        }
        .main-content{
            height: 100%;
            overflow-y: auto;
            padding: 20px;
            flex: 1;
        }
    }
    .z-foot{
        position: absolute;
        bottom: 0;
        @include wh(100%, 100px);
    }
}
/*  返回顶部 */
.go-top-m {
    bottom: 50px;
    width: 48px;
    position: fixed;
    left: 50%;
    margin-left: 590px;
    -webkit-transition: top .3s;
    -o-transition: top .3s;
    transition: top .3s;
    z-index: 999;
    .go-top {
        cursor: pointer;
        width: 46px;
        height: 48px;
        background-color: #f6f9fa;
        border: 1px solid #e5e9ef;
        overflow: hidden;
        border-radius: 4px;
        .el-icon-arrow-up{
            font-size: 30px;
            margin-left: 8px;
            margin-top: 6px;
        }
    }
}
</style>
