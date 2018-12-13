<template>
    <div class="music-bar">
        <div class="music-info">
            <div class="music-img" v-if="musicInfor.al">
                <img :src="musicInfor.al.picUrl" />
            </div>
            <div class="music-name">
                <i class="iconfont icon-like like"></i>
                <div class="info">
                    <span class="name">谁明浪子心</span>
                    <span class="author">王杰</span>
                </div>
            </div>
        </div>
        <div class="music-btn">
            <span class="btn-prev">
                <i class="iconfont icon-prev"></i>
            </span>
            <span class="btn-play" @click="play()">
                <i class="iconfont" :class="playIcon"></i>
            </span>
            <span class="btn-next">
                <i class="iconfont icon-next"></i>
            </span>
        </div>
        <div class="music-progress">
            <span class="time-now">00:45</span>
            <div class="progress-inner">
                <div class="load"></div>
                <div class="play">
                    <i class="dot"></i>
                </div>
            </div>
            <span class="time">{{ musicInfor.duration | timeFormat }}</span>
        </div>
    </div>
</template>

<script>
import SearchInput from '../searchInput/searchInput'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    components: {
        SearchInput
    },
    filters: {
        timeFormat(time) {
            let minute = Math.floor(time / 60)
            let second = Math.floor(time % 60)
            let _minute = minute < 10 ? '0' + minute : minute
            let _second = second < 10 ? '0' + second : second
            return `${_minute}:${_second}`
        }
    },
    mounted() {
        this.$nextTick(() => {
            //获取当前播放时间
            this.audio.ontimeupdate = () => {
                this.currentTime = this.audio.currentTime
            }
        })
    },
    watch: {
        playing(newVal, oldVal) {
            this.$nextTick(() => {
                this.playing ? this.audio.play() : this.audio.pause()
            })
        }
    },
    computed: {
        ...mapGetters([
            'audio',
            'percent',
            'playing',
            'musicInfor'
        ]),
        playIcon() {
            return this.playing ? 'icon-playing2' : 'icon-play2'
        },
        musicPercent() {
            const duration = this.musicInfor.duration;
            return this.currentTime && duration ? this.currentTime / duration : 0
        }
    },
    data() {
        return {
            currentTime: 0
        }
    },
    methods: {
        ...mapActions([
            'setSearchHot'
        ]),
        ...mapMutations({
            setPlaying: 'SET_PLAYING'
        }),
        play() {
            this.setPlaying()
        }
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.music-bar{
    @include wh(100%, 100px);
    box-sizing: border-box;
    border-top: 1px solid $border_first;
    position: absolute;
    .music-info{
        position: absolute;
        @include wh(250px, 100px);
        font-size: 0;
        .music-img{
            display: inline-block;
            vertical-align: top;
            height: 100%;
            padding: 10px;
            img{
                height: 100%;
                border-radius: 6px;
            }
        }
        .music-name{
            display: inline-block;
            vertical-align: top;
            height: 100%;
            width: 150px;
            padding: 30px 10px 0 0;
            .like{
                display: inline-block;
                vertical-align: top;
                font-size: 20px;
            }
            .info{
                display: inline-block;
                vertical-align: top;
                span{
                    display: block;
                    font-size: 14px;
                }
                .author{
                    @include sc(14px, $font_second);
                    margin-top: 5px;
                }
            }
        }
    }
    .music-btn{
        position: absolute;
        top: 25px;
        left: 250px;
        width: 156px;
        height: 50px;
        font-size: 0;
        span{
            float: left;
        }
        .btn-prev,.btn-next{
            position: relative;
            top: 8px;
        }
        .btn-play{
            background: $main;
            width: 50px;
            height: 50px;
            margin: 0 10px;
            border-radius: 100px;
            .iconfont{
                position: relative;
                @include sc(26px, $white);
                &.icon-play2{
                    top: 11px;
                    left: 14px;
                }
                &.icon-playing2{
                    top: 11px;
                    left: 12px;
                }
            }
        }
        .icon-prev,.icon-next{
            font-size: 30px;
        }
    }
    .music-progress{
        position: relative;
        margin: 0 200px 0 400px;
        height: 18px;
        top: 41px;
        .time-now{
            position: absolute;
            left: 0;
        }
        .progress-inner{
            position: absolute;
            top: 6px;
            left: 0;
            border-radius: 100px;
            width: calc(100% - 100px);
            height: 6px;
            margin: 0 50px;
            .load{
                background-color: #ebeef5;
                height: 6px;
                border-radius: 100px;
            }
            .play{
                position: absolute;
                top: 0;
                background: $main;
                height: 6px;
                width: 20%;
                border-radius: 100px;
                .dot{
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    padding: 1px;
                    top: -3px;
                    right: -3px;
                    border-radius: 100px;
                    &:before{
                        position: absolute;
                        content: '';
                        width: 8px;
                        height: 8px;
                        border-radius: 100px;
                        border: 3px solid $white;
                        background: $main;
                        box-shadow: 0 0 5px 0 rgba(0, 0, 0, .8);
                    }
                }
            }
        }
        .time{
            position: absolute;
            right: 0;
        }
    }
}
</style>