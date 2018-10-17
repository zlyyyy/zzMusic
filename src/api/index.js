import http from '../utils/http'

//  banner
export function getBanner (id) {
    return http.get('/banner')
}
//  热搜
export function getSearchHot () {
    return http.get('/search/hot')
}
