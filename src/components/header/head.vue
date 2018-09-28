<template>
    <el-header class="unimas-head" height="50">
        <div class="title">浙江公安全息搜索</div>
    </el-header>
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
.unimas-head{
    @include wh(100%, 50px);
    background: $blue;
    padding: 0 10px;
    line-height: 50px;
    .title{
        @include sc(18px, $white);
        font-weight: bolder;
    }
}
</style>

