<template>
    <div class="nav-bar">
        <div class="logo">
            <img src="../../assets/logo.png" />
        </div>
        <div class="menu">
            <div class="menu-group">
                <div class="menu-title">推荐音乐</div>
                <div class="menu-item active">
                    <i class="iconfont icon-music"></i>
                    发现音乐
                </div>
                <div class="menu-item">
                    <i class="iconfont icon-music"></i>
                    私人FM
                </div>
            </div>
            <div class="menu-group">
                <div class="menu-title">我的音乐</div>
                <div class="menu-item">
                    <i class="iconfont icon-music"></i>
                    我喜欢的音乐
                </div>
                <div class="menu-item">
                    <i class="iconfont icon-music"></i>
                    私人FM
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.nav-bar{
    @include wh(300px, 100%);
    padding: 20px;
    background: #f5f7fa;
    .logo{
        margin-top: 20px;
    }
    .menu{
        padding-top: 40px;
        .menu-group{
            margin-bottom: 30px;
            .menu-title{
                @include sc(14px, $title);
                margin-bottom: 10px;
            }
            .menu-item{
                @include sc(16px, $text);
                margin: 0 0 10px 10px;
                padding: 5px;
                &.active{
                    background: $main;
                    color: $white;
                    @include borderRadius(4px);
                }
            }
        }
    }
}
</style>