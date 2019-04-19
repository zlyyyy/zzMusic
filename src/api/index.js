import http from '../utils/http'

//  手机登录
export function getLoginPhone (data) {
    return http.get('/login/cellphone', {
        params: {
            phone: data.phone,
            password: data.password
        }
    })
}
//  退出登录
export function loginOut (data) {
    return http.get('/logout')
}
//  获取登录状态
export function getLoginStatus () {
    return http.get('/login/status')
}
//  用户每日推荐歌曲-需登录
export function getRecommendSongs() {
    return http.get('/recommend/songs')
}
//  用户每日推荐歌单-需登录
export function getRecommend() {
    return http.get('/recommend/resource')
}
//  获取用户歌单
export function getUserPlaylist(uid) {
    return http.get('/user/playlist', {
        params: {
            uid
        }
    })
}

//  banner
export function getBanner (id) {
    return http.get('/banner')
}
// 未登录推荐歌单
export function getPersonalized() {
    return http.get('/personalized')
}
//  获取歌曲详情
export function getMusicInfor (ids) {
    return http.get('/song/detail', {
        params: {
            ids
        }
    })
}
//  获取歌曲详情
export function getMusicLyric (id) {
    return http.get('/lyric', {
        params: {
            id
        }
    })
}
//  获取音乐url
export function getMusicUrl (id) {
    return http.get('/song/url', {
        params: {
            id
        }
    })
}

//  搜索结果
export function getSearchResult(keywords, limit, offset, type) {
    return http.get('/search', {
        params: {
            keywords,
            limit,
            offset,
            type
        }
    })
}
//  热搜
export function getSearchHot() {
    return http.get('/search/hot')
}
//  搜索建议
export function getSearchSuggest(keywords) {
    return http.get('/search/suggest', {
        params: {
            keywords
        }
    })
}

//  获取歌单详情
export function getPlaylistDetail(id) {
    return http.get('/playlist/detail', {
        params: {
            id
        }
    })
}
//  获取歌单分类
export function getPlaylistCatlist() {
    return http.get('/playlist/catlist')
}
//  获取热门歌单分类
export function getPlaylistHot() {
    return http.get('/playlist/hot')
}
//  获取歌单 ( 网友精选碟 )
export function getTopPlaylist(params) {
    return http.get('/top/playlist', {
        params
    })
}

//  获取电台 - 分类
export function getDjCatelist() {
    return http.get('/dj/catelist')
}
//  获取电台 - 分类推荐
export function getDjCatelistType(params) {
    return http.get('/dj/recommend/type', {
        params
    })
}