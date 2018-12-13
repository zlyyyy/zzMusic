import * as types from './mutation-types'

const mutations = {
    [ types.SET_SEARCH_HOT ]( state, data ) {
        state.search.hots = data
    },
    [ types.SET_BANNER ]( state, data ) {
        state.banner = data
    },
    [ types.SET_PERSONALIZED ]( state, data ) {
        state.search.personalized = data
    },
    [ types.SET_AUDIO ]( state, audio ) {
        state.player.audio = audio
    },
    [ types.SET_PLAYING ]( state ) {
        state.player.playing = !state.player.playing
    },
    [ types.SET_PLAYER_MUSIC_INFOR ]( state, music ) {
        const _infor = {
            id: music.id,
            name: music.name,
            singer: music.ar[0].name,
            album: music.al.name,
            image: music.al.picUrl,
            duration: music.dt / 1000,
            url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
        }
        state.player.musicInfor = _infor
    }
}
export default mutations