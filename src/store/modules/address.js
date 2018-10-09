const state = {
	navList: [],
	navOffsetTop: []
}

const getters = {}

const mutations = {
    SET_NAV_OFFSET_TOP: ( state, data ) => {
        state.navOffsetTop.push( data )
    }
}

const actions = {
	setNavoffsetTop( { commit, state }, msg ) {
        commit( 'error', msg )
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