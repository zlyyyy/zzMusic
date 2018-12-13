<template>
    <div id="app">
        <el-container>
            <el-container>
                <el-aside>
                    <nav-bar></nav-bar>
                </el-aside>
                <el-container class="container">
                    <el-header>
                        <zz-head></zz-head>
                    </el-header>
                    <el-main>
                        <router-view/>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer height="100px">
                <zz-player></zz-player>
            </el-footer>
        </el-container>
        <audio ref="zzMusic" :src="musicInfor.url"></audio>
    </div>
</template>

<script>
import NavBar from './components/navBar/navBar'
import ZzHead from './components/header/header'
import ZzPlayer from './components/player/player'
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
        ZzHead,
        ZzPlayer
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
@import './style/common';
@import './style/mixin';

#app{
    display: flex;
    height: 100%;
    color: $font_first;
    .container{
        padding: 20px;
    }
    .el-footer{
        padding: 0;
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
