import * as types from './mutation-types'
import { getBanner, getSearchHot } from '../api'

// 轮播图
export const setBanner = function( {commit} ) {
    getBanner().then( res => {
        commit( types.SET_BANNER, res.banners )
    })
}
// 热搜
export const setSearchHot = function( {commit} ) {
    getSearchHot().then( res => {
        commit( types.SET_SEARCH_HOT, res.result.hots )
    })
}