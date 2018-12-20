import http from '../utils/http'

//  banner
export function getBanner (id) {
    return http.get('/banner')
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