import * as types from './mutation-types'
import { getBanner } from '../api'

// 轮播图
export const setBanner = function( {commit} ) {
    getSlidePop().then( res => {
        commit( types.SET_BANNER, res.data )
    })
}