import { getRecommend } from '../../api'
import locs from '../../utils/locs'
const state = {
    loginStatus: locs.get('profile') ? true : false,
    account: locs.get('account'),
    bindings: locs.get('bindings'),
    profile: locs.get('profile'),
    recommend: [] // 推荐歌单
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