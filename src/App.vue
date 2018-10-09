<template>
    <div id="app">
        <el-container>
            <el-container>
                <el-aside>
                    <nav-bar></nav-bar>
                </el-aside>
                <el-container>
                    <el-header>
                        <page-head></page-head>
                    </el-header>
                    <el-main>
                        <router-view/>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
import NavBar from './components/navBar/navBar'
import PageHead from './components/header/header'
export default {
    created() {
    },
    mounted() {
    },
    components: {
        NavBar,
        PageHead
    },
    computed: {
    },
    data () {
        return {
            
        }
    },
    methods: {
    }
}
</script>

<style lang="scss">
@import './style/common';
@import './style/mixin';

#app{
    display: flex;
    height: 100%;
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
