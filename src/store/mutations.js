import * as types from './mutation-types'

const mutations = {
    // 轮播图
    [ types.SET_BANNER ]( state, data ) {
        state.banner = data
    },
    // 未登录推荐歌单
    [ types.SET_PERSONALIZED ]( state, data ) {
        state.personalized = data
    },
    // 播放器
    // 设置播放器
    [ types.SET_AUDIO ]( state, audio ) {
        state.player.audio = audio
    },
    // 播放暂停
    [ types.SET_PLAYING ]( state, data ) {
        state.player.playing = (data ? data : !state.player.playing)
    },
    // 当前播放音乐信息
    [ types.SET_PLAYER_MUSIC_INFOR ]( state, music ) {
        const _infor = {
            id: music.id,
            name: music.name,
            singer: music.artists,
            albumId: music.album.id,
            album: music.album.name,
            image: music.album.picUrl,
            duration: music.duration / 1000,
            url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
        }
        state.player.musicInfor = _infor
    },
    // 设置播放列表
    [ types.SET_PLAYLIST ]( state, data ) {
        state.player.playlist = data
    },
    // 设置播放历史列表
    [ types.SET_HISTORY_LIST ]( state, data ) {
        state.player.historyList = data
    }
}
export default mutations