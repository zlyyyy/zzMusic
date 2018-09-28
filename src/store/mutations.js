import * as types from './mutation-types'

const mutations = {
    [ types.SET_BANNER ]( state, data ){
        state.banner = data
    }
}
export default mutations