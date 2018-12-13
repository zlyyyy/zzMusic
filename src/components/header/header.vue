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
        <search-input
            :hots="hots"
            @getSearchHot="setSearchHot"
        ></search-input>
    </div>
</template>

<script>
import SearchInput from '../searchInput/searchInput'
import { mapGetters, mapActions } from 'vuex'
export default {
    created() {
        this.setMusicInfor('158655')
    },
    components: {
        SearchInput
    },
    computed: {
        ...mapGetters([
            'hots'
        ])
    },
    data() {
        return {}
    },
    methods: {
        ...mapActions([
            'setSearchHot',
            'setMusicInfor'
        ])
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.header{
    padding: 10px;
    height: 100%;
    .page{
        overflow: hidden;
        float: left;
        .button{
            @include wh(30px, 30px);
            border: 1px solid $border_first;
            @include borderRadius(4px);
            width: 30px;
            text-align: center;
            padding-top: 6px;
            float: left;
            margin: 5px 10px 0 0;
            cursor: pointer;
        }
    }
}
</style>