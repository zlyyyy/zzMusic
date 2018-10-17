<template>
    <el-carousel :interval="4000" type="card" height="260px">
        <el-carousel-item v-for="(item, index) in banner" :key="index">
            <img class="el-carousel-img" :src=item.picUrl />
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    props: {
        banner: {
            type: [Object, Array],
            default: () => []
        }
    },
    data () {
        return {}
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.el-carousel-img{
    width: 100%;
}
.el-carousel__arrow{
    color: $main;
}
.el-carousel__indicators--outside{
    .el-carousel__button{
        height: 3px;
    }
    button{
        background-color: $main;
    }
}
</style>