<template>
    <div class="nav-bar">
        <!-- <div class="logo">
            <img src="../../assets/logo.png" />
        </div> -->
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
    data() {
        return {}
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.nav-bar{
    @include wh(200px, 100%);
    padding: 20px 0 20px 20px;
    background: #f5f7fa;
    .logo{
        margin-top: 20px;
    }
    .menu{
        padding-top: 40px;
        .menu-group{
            margin-bottom: 30px;
            .menu-title{
                @include sc(14px, $font_second);
                margin-bottom: 10px;
            }
            .menu-item{
                @include sc(16px, $font_first);
                margin: 0 0 10px 10px;
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