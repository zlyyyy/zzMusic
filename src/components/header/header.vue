<template>
    <div class="z-head">
        <div class="logo">
            ZZ-MUSIC
        </div>
        <div class="page">
            <div class="button page-back">
                <Icon type="ios-arrow-back" />
            </div>
            <div class="button page-go">
                <Icon type="ios-arrow-forward" />
            </div>
        </div>
        <search-input />
    </div>
</template>

<script>
import SearchInput from '../searchInput/searchInput'
import { mapActions } from 'vuex'

export default {
    created() {
        this.setMusicInfor('32102855')
    },
    components: {
        SearchInput
    },
    computed: {
    },
    data() {
        return {}
    },
    methods: {
        ...mapActions([
            'setMusicInfor'
        ])
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.z-head{
    position: relative;
    padding: 10px 20px;
    height: 100%;
    .logo{
        position: absolute;
        @include sc(24px, $white);
        margin-right: 30px;
    }
    .page{
        position: absolute;
        height: 30px;
        top: 15px;
        left: 220px;
        .button{
            @include wh(30px, 30px);
            border: 1px solid $border_first;
            @include borderRadius(4px);
            text-align: center;
            padding-top: 4px;
            float: left;
            margin: 0 10px 0 0;
            cursor: pointer;
            i{
                @include sc(20px, $white);
            }
        }
    }
    .search{
        position: absolute;
        top: 14px;
        left: 300px;
    }
}
</style>