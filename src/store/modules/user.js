import { getRecommendSongs, getRecommend, getUserPlaylist } from '../../api'
import locs from '../../utils/locs'
const state = {
    loginStatus: locs.get('profile') ? true : false,
    account: locs.get('account'),
    bindings: locs.get('bindings'),
    profile: locs.get('profile'),
    playlistSet: [], // 用户创建的歌单
    playlistCollect: [], // 用户收藏的歌单
    recommend: [], // 登录推荐歌单
    recommendSongs: [] // 已登录-每日歌曲推荐
}

const getters = {}

const mutations = {
	SET_LOGIN_INFOR: ( state, data ) => {
		Object.keys(data).forEach(key => {
            state[key] = data[key]
        })
    },
    SET_PLAYLIST_SET: ( state, data ) => {
        state.playlistSet = data
    },
    SET_PLAYLIST_COLLECT: ( state, data ) => {
        state.playlistCollect = data
    },
    SET_RECOMMEND: ( state, data ) => {
        state.recommend = data
    },
    SET_RECOMMEND_SONGS: ( state, data ) => {
        state.recommendSongs = data
    }
}

const actions = {
	// 用户信息
	setLoginInfor( { commit, state }, {data, status} ) {
        let _data = {
            loginStatus: status,
            account: data.account,
            bindings: data.bindings,
            profile: data.profile
        }
        locs.set('account', data.account)
        locs.set('bindings', data.bindings)
        locs.set('profile', data.profile)
        commit('SET_LOGIN_INFOR', _data)
    },
    // 每日推荐歌单
    setRecommend( { commit, state } ) {
        getRecommend().then(res => {
            let _data = []
            res.recommend.forEach((ele, index) => {
                const _ele = {
                    id: ele.id,
                    name: ele.name,
                    copywriter: ele.copywriter,
                    picUrl: ele.picUrl,
                    nickname: ele.creator.nickname,
                    userId: ele.creator.userId,
                    trackCount: ele.trackCount,
                    playCount: ele.playcount
                }
                _data = [..._data, _ele]
            })
            commit('SET_RECOMMEND', _data)
        })
    },
    // 获取用户歌单
    setUserPlaylist( { commit, state } ) {
        const uid = state.profile.userId
        getUserPlaylist(uid).then(res => {
            let _set = []
            let _collect = []
            res.playlist.forEach((ele, index) => {
                const _ele = {
                    id: ele.id,
                    name: ele.name,
                    icon: 'icon-music-list',
                    path: `/music/playlist?id=${ele.id}`
                }
                if (ele.subscribed) {
                    _collect = [..._collect, _ele]
                } else {
                    _set = [..._set, _ele]
                }
            })
            commit('SET_PLAYLIST_SET', _set)
            commit('SET_PLAYLIST_COLLECT', _collect)
        })
    },
    // 已登录-每日歌曲推荐
    setRecommendSongs( { commit, state } ) {
        getRecommendSongs().then(res => {
            let _data = []
            res.recommend.forEach((ele, index) => {
                let _artists = []
                ele.artists.forEach((el, index) => {
                    const _el = {
                        id: el.id,
                        name: el.name
                    }
                    _artists = [..._artists, _el]
                })
                const _ele = {
                    name: ele.name,
                    id: ele.id,
                    artists: _artists,
                    album: {
                        id: ele.album.id,
                        name: ele.album.name,
                        picUrl: ele.album.picUrl
                    },
                    duration: ele.duration
                }
                _data = [..._data, _ele]
            })
            commit('SET_RECOMMEND_SONGS', _data)
        })
    },
    // 退出登录
    setLoginOut( { dispatch, commit, state } ) {
        // 重置登录信息
        dispatch('setLoginInfor', {
            data: [],
            status: false
        })
        // 重置歌单信息
        commit('SET_PLAYLIST_SET', [])
        commit('SET_PLAYLIST_COLLECT', [])
    }
}

export default {
	//	注册login空间模块
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}