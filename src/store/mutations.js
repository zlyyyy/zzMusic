import * as types from './mutation-types'

const mutations = {
    [ types.SET_BANNER ]( state, data ) {
        state.banner = data
    },
    [ types.SET_SEARCH_HOT ]( state, data ) {
        state.search.hots = data
    }
}
export default mutations