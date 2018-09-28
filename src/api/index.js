import http from '../utils/http'

//  banner
export function getBanner (id) {
    return http.get('/banner')
}
