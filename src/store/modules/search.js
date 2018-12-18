import { getSearchHot, getSearchSuggest } from '../../api'
const state = {
	keyword: '',
	hots: [],
	suggest: []
}

const getters = {}

const mutations = {
	SET_SEARCH_KEYWORD: ( state, data ) => {
		state.keyword = data
    },
    SET_SEARCH_HOT: ( state, data ) => {
		state.hots = data
	},
	SET_SEARCH_SUGGEST: ( state, data ) => {
		state.suggest = data
    }
}

const actions = {
	// 热搜
	setSearchHot( { commit, state }, msg ) {
        getSearchHot().then( res => {
			const hots = [
				{
					title: '热门搜索',
					children: res.result.hots
				}
			]
			commit('SET_SEARCH_HOT', hots)
		})
	},
	// 搜索建议
	setSearchSuggest( { commit, state }, keywords ) {
		if (keywords !== '' ) {
			getSearchSuggest(keywords).then( res => {
				// 返回匹配结果
				const _data = res.result
				// 结果分类
				const _order = _data.order
				let suggest = []
				// 数据拼接
				_order.forEach((val,key) => {
					const title = setTitle(_order[key])
					const item = {
						title,
						children: _data[_order[key]]
					}
					suggest = [...suggest, item]
				})
				// 根据分类字段中文映射title
				function setTitle(val) {
					switch (val) {
						case 'songs':
							return '单曲'
						case 'artists':
							return '歌手'
						case 'albums':
							return '专辑'
						case 'mvs':
							return '视频'
						case 'playlists':
							return '歌单'
					}
				}
				console.log(suggest)
				commit('SET_SEARCH_SUGGEST', suggest)
			})
		}
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