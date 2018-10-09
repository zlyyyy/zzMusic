<template>
    <div class="header">
        <div class="page">
            <div class="button page-back">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="button page-go">
                <i class="el-icon-arrow-right"></i>
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
.header{
    padding: 10px;
    .page{
        .button{
            @include wh(50px, 30px);
            border: 1px solid $border_color;
            @include borderRadius(4px);
        }
    }
}
</style>