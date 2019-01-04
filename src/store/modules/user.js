import { getRecommend, getUserPlaylist } from '../../api'
import locs from '../../utils/locs'
const state = {
    loginStatus: locs.get('profile') ? true : false,
    account: locs.get('account'),
    bindings: locs.get('bindings'),
    profile: locs.get('profile'),
    playlistSet: [], // 用户创建的歌单
    playlistCollect: [], // 用户收藏的歌单
    recommend: [] // 登录推荐歌单
}

const getters = {}

const mutations = {
	SET_LOGIN_INFOR: ( state, data ) => {
		Object.keys(data).forEach(key => {
            state[key] = data[key]
        })
    },
    SET_RECOMMEND: ( state, data ) => {
        state.recommend = data
    },
    SET_PLAYLIST_SET: ( state, data ) => {
        state.playlistSet = data
    },
    SET_PLAYLIST_COLLECT: ( state, data ) => {
        state.playlistCollect = data
    }
}

const actions = {
	// 用户信息
	setLoginInfor( { commit, state }, data ) {
        let _data = {
            loginStatus: true,
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
                    playcount: ele.playcount
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