import { getSearchHot, getSearchSuggest, getSearchResult } from '../../api'
const state = {
	keywords: '',
	hots: [],
	suggest: [],
	nav: [
		{
			title: '单曲',
			type: 1,
			result: false
		},
		{
			title: '歌手',
			type: 100,
			result: false
		},
		{
			title: '专辑',
			type: 10,
			result: false
		},
		{
			title: '视频',
			type: 1014,
			result: false
		},
		{
			title: '歌单',
			type: 1000,
			result: false
		},
		{
			title: '歌词',
			type: 1006,
			result: false
		},
		{
			title: '主播电台',
			type: 1009,
			result: false
		},
		{
			title: '用户',
			type: 1002,
			result: false
		}
	],
	result: []
}

const getters = {}

const mutations = {
	SET_SEARCH_KEYWORDS: ( state, data ) => {
		state.keywords = data
    },
    SET_SEARCH_HOT: ( state, data ) => {
		state.hots = data
	},
	SET_SEARCH_SUGGEST: ( state, data ) => {
		state.suggest = data
	},
	SET_SEARCH_RESULT: ( state, data ) => {
		state.result = data.result
		state.nav[data.key].result = true
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
				_order.forEach((val, key) => {
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
	},
	// 搜索结果
	setSearchResult( { commit, state }, { keywords, limit, offset, type, key } ) {
		if (keywords !== '' && state.nav[key].result == false) {
			getSearchResult(keywords, limit, offset, type).then( res => {
				const data = {
					result: res.result,
					key
				}
				commit('SET_SEARCH_RESULT', data)
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