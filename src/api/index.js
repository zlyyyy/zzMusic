import http from '../utils/http'

//  banner
export function getBanner (id) {
    return http.get('/banner')
}
//  热搜
export function getSearchHot() {
    return http.get('/search/hot')
}
//  推荐歌单
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
export function getMusicUrl (id) {
    return http.get('/song/url', {
        params: {
            id
        }
    })
}