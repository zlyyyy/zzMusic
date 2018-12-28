// 时间戳转换
function timeChange(timestamp) {
    let Y, M, D
    var date = timestamp > 1e10 ? new Date(timestamp) : new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-'
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ''
    // h = date.getHours() + ':'
    // m = date.getMinutes() + ':'
    // s = date.getSeconds()
    return Y + M + D
}

export {
    timeChange
}