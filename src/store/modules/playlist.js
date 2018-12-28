import { getPlaylistDetail } from '../../api'
import { timeChange } from '../../utils/utils'

const state = {
    playlistDetail: []
}

const getters = {}

const mutations = {
    SET_PLAYLIST_DETAIL: ( state, data ) => {
        state.playlistDetail = data
    }
}

const actions = {
    // 歌单详情
    setPlaylistDetail( { commit, state }, id ) {
        getPlaylistDetail(id).then(res => {
            const ele = res.playlist
            let _tags
			ele.tags.forEach((el, index) => {
					index > 0 ? _tags += ` / <em>${el}</em>` : _tags = `<em>${el}</em>`
			})
            const _data = {
                id: ele.id,
                coverImgUrl: ele.coverImgUrl,
                name: ele.name,
                description: '<b>简介：</b>' + ele.description.replace(/\n/g, '<br />' ),
                trackCount: ele.trackCount,
                playCount: ele.playCount,
                tags: '<b>标签：</b>' + _tags,
                createTime: timeChange(ele.createTime),
                updateTime: timeChange(ele.updateTime),
                userId: ele.userId,
                nickname: ele.creator.nickname,
                avatarUrl: ele.creator.avatarUrl,
                tracks: ele.tracks
            }
            commit('SET_PLAYLIST_DETAIL', _data)
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