import * as types from './mutation-types'
import { getBanner, getSearchHot, getPersonalized, getMusicInfor } from '../api'

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
// 推荐歌单
export const setPersonalized = function( {commit} ) {
    getPersonalized().then( res => {
        commit( types.SET_PERSONALIZED, res.result )
    })
}
// 播放器当前音乐详情
export const setMusicInfor = function( {commit}, ids ) {
    getMusicInfor(ids).then( res => {
        commit( types.SET_PLAYER_MUSIC_INFOR, res.songs[0] )
    })
}