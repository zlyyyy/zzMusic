<template>
    <div class="music-bar">
        <div class="music-info">
            <div class="music-img">
                <div class="more-info">
                    <i class="iconfont icon-full"></i>
                </div>
                <img :src="musicInfor.image" />
            </div>
            <div class="music-name">
                <i class="iconfont icon-like like"></i>
                <div class="info">
                    <span class="name" :title="musicInfor.name">{{ musicInfor.name }}</span>
                    <span class="author" :title="musicInfor.singer">{{ musicInfor.singer }}</span>
                </div>
            </div>
        </div>
        <div class="music-btn">
            <span class="btn-prev">
                <i class="iconfont icon-prev"></i>
            </span>
            <span class="btn-play" @click="play()">
                <i class="iconfont icon-play2" :class="{'icon-playing2':playing}"></i>
            </span>
            <span class="btn-next">
                <i class="iconfont icon-next"></i>
            </span>
        </div>
        <div class="music-progress">
            <span class="time-now">{{ currentTime | timeFormat }}</span>
            <zz-progress
                :percent = "musicPercent"
                :percentLoad = "musicLoad"
                @changePercent = "setCurrentTime"
             />
            <span class="time">{{ musicInfor.duration | timeFormat }}</span>
        </div>
        <div class="music-volume">
            <i class="iconfont icon-volume" :class="{'icon-mute':mute}" @click="setMute"></i>
            <zz-progress
                class="progress-volume"
                :percent = "volume"
                @changePercent = "setVolume"
             />
        </div>
        <div class="music-style">
            <i class="iconfont icon-random"></i>
        </div>
        <div class="music-list">
            <i class="iconfont icon-list"></i>
        </div>
    </div>
</template>

<script>
import zzProgress from '../zzProgress/zzProgress'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    components: {
        zzProgress
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
            const _audio = this.audio
            // 设置缓冲进度
            _audio.onprogress = () => {
                if (_audio.buffered.length > 0) {
                    // 获取第一段缓存范围
                    const _duration = this.musicInfor.duration
                    let _buffered = _audio.buffered.end(0) > _duration ? _duration : _audio.buffered.end(0)
                    this.musicLoad = _buffered / _duration
                }
            }
            // 获取当前播放时间
            _audio.ontimeupdate = () => {
                this.currentTime = this.audio.currentTime
            }
        })
    },
    watch: {
        // 播放、暂停控制
        playing(newVal, oldVal) {
            this.$nextTick(() => {
                this.playing ? this.audio.play() : this.audio.pause()
            })
        }
    },
    computed: {
        ...mapGetters([
            'audio',
            'playing',
            'musicInfor'
        ]),
        // 播放按钮
        playIcon() {
            return this.playing ? 'icon-playing2' : 'icon-play2'
        },
        // 实时播放进度
        musicPercent() {
            const duration = this.musicInfor.duration
            return this.currentTime && duration ? this.currentTime / duration : 0
        },
        musicVolume() {
            return this.audio.volume
        }
    },
    data() {
        return {
            currentTime: 0, // 实时播放时间
            musicLoad: 0, // 缓冲进度
            mute: false, // 是否静音
            volume: 1 // 音量
        }
    },
    methods: {
        ...mapActions([
            'setSearchHot'
        ]),
        ...mapMutations({
            setPlaying: 'SET_PLAYING'
        }),
        // 播放、暂停控制
        play() {
            this.setPlaying()
        },
        // 设置播放时间
        setCurrentTime(percent) {
            this.audio.currentTime = this.musicInfor.duration * percent
        },
        // 设置音量
        setVolume(percent) {
            percent === 0 ? this.mute = true : this.mute = false
            this.volume = percent
            this.audio.volume = percent
        },
        // 静音设置
        setMute() {
            this.mute = !this.mute
            this.mute ? this.audio.volume = 0 : this.audio.volume = this.volume
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
    bottom: 1px;
    .music-info{
        position: absolute;
        @include wh(320px, 100px);
        font-size: 0;
        .music-img{
            position: relative;
            display: inline-block;
            vertical-align: top;
            cursor: pointer;
            @include wh(80px, 80px);
            margin: 10px;
            img{
                height: 100%;
                border-radius: 6px;
            }
            .more-info{
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 6px;
                @include wh(100%, 100%);
                background: rgba(0, 0, 0, .2);
                .iconfont{
                    position: relative;
                    top: 7px;
                    left: 10px;
                    @include sc(60px, $white);
                    opacity: .5;
                }
            }
            &:hover{
                .more-info{
                    display: block;
                }
            }
        }
        .music-name{
            display: inline-block;
            vertical-align: top;
            height: 100%;
            width: 220px;
            padding: 30px 10px 0 0;
            font-size: 0;
            .like{
                display: inline-block;
                vertical-align: top;
                font-size: 20px;
                width: 20px;
                margin: -2px 5px 0 0;
                cursor: pointer;
            }
            .info{
                display: inline-block;
                vertical-align: top;
                width: 185px;
                span{
                    display: block;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
        left: 320px;
        width: 156px;
        height: 50px;
        font-size: 0;
        span{
            float: left;
            cursor: pointer;
        }
        .btn-prev,.btn-next{
            position: relative;
            top: 2px;
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
                    top: 6px;
                    left: 14px;
                }
                &.icon-playing2{
                    top: 6px;
                    left: 12px;
                }
            }
        }
        .icon-prev,.icon-next{
            @include sc(30px, $font_second);
        }
    }
    .music-progress{
        position: relative;
        margin: 0 290px 0 470px;
        height: 18px;
        top: 41px;
        font-size: 14px;
        .time-now{
            position: absolute;
            left: 0;
        }
        .time{
            position: absolute;
            right: 0;
        }
    }
    .music-volume{
        position: absolute;
        top: 38px;
        right: 130px;
        @include wh(140px, 24px);
        .icon-volume{
            position: relative;
            top: -2px;
            left: 0;
            @include sc(20px, $font_second);
        }
        .progress-volume{
            top: 9px;
            left: 20px;
            margin: 0 10px;
            @include wh(110px, 6px);
        }
    }
    .music-style{
        position: absolute;
        top: 30px;
        right: 70px;
        .iconfont{
            @include sc(30px, $font_second);
        }
    }
    .music-list{
        position: absolute;
        width: 30px;
        top: 30px;
        right: 20px;
        .iconfont{
            @include sc(30px, $font_second);
        }
    }
    .progress-inner{
        position: absolute;
        top: 6px;
        left: 0;
        border-radius: 100px;
        width: calc(100% - 120px);
        height: 6px;
        margin: 0 60px;
        background-color: #ebeef5;
        cursor: pointer;
        .load{
            height: 6px;
            width: 0;
            border-radius: 100px;
            background-color: #dde2ec;
            cursor: pointer;
            transition: all ease-in .3s;
        }
        .play{
            position: absolute;
            top: 0;
            background: $main;
            height: 6px;
            width: 0;
            border-radius: 100px;
            cursor: pointer;
            .dot{
                position: absolute;
                width: 14px;
                height: 14px;
                top: -4px;
                right: -8px;
                border-radius: 100px;
                &:before{
                    position: absolute;
                    content: '';
                    width: 14px;
                    height: 14px;
                    border-radius: 100px;
                    border: 3px solid $white;
                    background: $main;
                    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .8);
                }
            }
        }
    }
}
</style>