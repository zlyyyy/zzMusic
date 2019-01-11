<template>
    <div class="music">
        <z-head></z-head>
        <div class="z-content">
            <div class="z-slider">
                <nav-bar></nav-bar>
            </div>
            <div class="main-content">
                <router-view />
            </div>
        </div>
        <div class="z-foot">
            <z-player @setPlaylistStatus="setPlaylistStatus"></z-player>
        </div>
        <div class="player-playlist" v-if="playlistStatus">
            <div class="list-menu">
                <div class="list-menu-item" :class="{'active': active == 0}" @click="active=0">
                    播放列表
                </div>
                <div class="list-menu-item" :class="{'active': active == 1}" @click="active=1">
                    历史记录
                </div>
                <div class="close" @click="playlistStatus=false">
                    <Icon :size="40" type="ios-close" />
                </div>
            </div>
            <div class="list-content">
                <div class="lc-head">
                    <div class="lc-total">总{{listData.length}}首</div>
                    <div class="clear-btn">
                        <Icon :size="20" :color="'#303133'" type="ios-trash-outline" />
                        清空
                    </div>
                </div>
                <div class="lc-content">
                    <zz-table
                        :data="listData"
                        @setSelectMusicInfor="setMusicInfor"
                    />
                </div>
            </div>
        </div>
        <login/>
        <audio ref="zzMusic"></audio>
    </div>
</template>

<script>
import NavBar from '../components/navBar/navBar'
import ZHead from '../components/header/header'
import ZPlayer from '../components/player/player'
import Login from '../components/login/login'
import zzTable from '../components/zzTable/zzTable'
import locs from '../utils/locs'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    created() {
        this.$nextTick(() => {
            this.setAudio(this.$refs.zzMusic)
            this.getHistoryList()
        })
    },
    mounted() {
    },
    components: {
        NavBar,
        ZHead,
        ZPlayer,
        Login,
        zzTable
    },
    computed: {
        ...mapGetters([
            'musicInfor',
            'playlist',
            'historyList'
        ]),
        listData() {
            return this.active == 0 ? this.playlist : this.historyList
        }
    },
    data() {
        return {
            active: 0,
            playlistStatus: false
        }
    },
    methods: {
        ...mapMutations({
            setAudio: 'SET_AUDIO',
            setPlaying: 'SET_PLAYING'
        }),
        ...mapActions([
            'setMusicInfor',
            'setHistoryList'
        ]),
        getHistoryList() {
            let list = JSON.parse(locs.get('history_list'))
            this.setHistoryList(list)
        },
        setPlaylistStatus() {
            this.playlistStatus = !this.playlistStatus
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin';

.music{
    height: 100%;
    color: $font_first;
    .z-head{
        @include wh(100%, 60px);
        background: $main;
    }
    .z-content{
        display: flex;
        @include wh(100%, calc(100% - 160px));
        .z-slider{
            width: 200px;
        }
        .main-content{
            height: 100%;
            overflow-y: auto;
            padding: 20px;
            flex: 1;
            .btns{
                margin-bottom: 10px;
                height: 30px;
                .playall-btn{
                    border: 1px solid $main;
                    border-radius: 3px;
                    cursor: pointer;
                    @include wh(120px, 30px);
                    .i-play{
                        position: relative;
                        display: block;
                        float: left;
                        @include wh(20px, 20px);
                        border-radius: 50%;
                        border: 1px solid $main;
                        margin: 4px 0 0 10px;
                        i{
                            position: absolute;
                            left: 4px;
                            top: 1px;
                            @include sc(10px, $main);
                        }
                    }
                    .txt{
                        display: block;
                        float: left;
                        @include sc(12px, $main);
                        line-height: 30px;
                        padding: 0 5px;
                    }
                    .i-add{
                        position: relative;
                        display: block;
                        float: left;
                        @include wh(30px, 100%);
                        border-left: 1px solid $main;
                        i{
                            position: absolute;
                            top: 3px;
                            left: 7px;
                            @include sc(16px, $main);
                        }
                    }
                }
            }
        }
    }
    .z-foot{
        position: absolute;
        bottom: 0;
        @include wh(100%, 100px);
    }
    .player-playlist{
        position: absolute;
        right: 0;
        bottom: 100px;
        background: #fff;
        @include wh(600px, 600px);
        box-shadow: -2px -7px 12px 0 rgba(0, 0, 0, 0.15);
        border: 1px solid $border_first;
        border-right: none;
        z-index: 99;
        .list-menu{
            position: relative;
            height: 50px;
            padding: 10px 200px;
            border-bottom: 1px solid $border_first;
            .list-menu-item{
                float: left;
                border: 1px solid $border_first;
                width: 100px;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
                &.active{
                    background: $main;
                    border: 1px solid $main;
                    color: $white;
                }
                &:nth-child(1){
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                    margin-left: -1px;
                }
                &:nth-child(2){
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                    margin-left: -1px;
                }
            }
            .close{
                position: absolute;
                right: 0;
                top: 5px;
                cursor: pointer;
            }
        }
        .list-content{
            height: calc(100% - 50px);
            overflow: hidden;
            .lc-head{
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                border-bottom: 1px solid $border_first;
                .lc-total{
                    float: left;
                    margin-left: 30px;
                }
                .clear-btn{
                    float: right;
                    margin-right: 30px;
                    cursor: pointer;
                    .ivu-icon{
                        margin-top: -3px;
                    }
                }
            }
            .lc-content{
                height: calc(100% - 30px);
                .zz-table{
                    overflow-y: scroll;
                    .zz-table-list-item{
                        padding-left: 20px;
                    }
                }
            }
        }
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
