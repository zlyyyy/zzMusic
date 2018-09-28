<template>
    <div id="app">
        <el-container>
            <app-header></app-header>
            <router-view :scrollTop="scrollTop" />
            <el-footer class="unimas-foot" height="30">
                <div class="text">Copyright by 杭州合众数据信息技术有限公司</div>
            </el-footer>
            <div class="go-top-m" v-show="gotop" @click="goTop()">
                <div title="返回顶部" class="go-top">
                    <i class="el-icon-arrow-up"></i>
                </div>
            </div>
        </el-container>
    </div>
</template>

<script>
import AppHeader from './components/header/head'
export default {
    created() {
        this.getScrollTop()
    },
    mounted(){
        
    },
    components: {
        AppHeader
    },
    computed: {
    },
    data () {
        return {
            gotop: false,
            step: 100,
            scrollTop: 0
        }
    },
    methods: {
        getScrollTop(){
            let vm = this,
            html = document.documentElement;
            window.onscroll = scroll
            function scroll(){
                vm.scrollTop=html.scrollTop
                if (html.scrollTop>60) {
                    vm.gotop=true;
                }else {
                    vm.gotop=false;
                }
            }
        },
        goTop(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
    }
}
</script>

<style lang="scss">
@import './style/common';
@import './style/mixin';

.el-container{
    min-height: 100%;
}
.unimas-foot{
    @include wh(100%, 30px);
    background: $blue;
    line-height: 30px;
    text-align: center;
    .text{
        @include sc(12px, $white);
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
