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
// 日期
function day() {
    let date = new Date()
    return date.getDate()
}
// 周几
function weekDay() {
    let date = new Date()
    let weekDay = date.getDay()
    switch (weekDay) {
        case 1:
            return '一'
        case 2:
            return '二'
        case 3:
            return '三'
        case 4:
            return '四'
        case 5:
            return '五'
        case 6:
            return '六'
        case 7:
            return '日'
        default:
            break
    }
}
// 创建画布
function createCanvas(width = 300, height = 300, id) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    id && (canvas.id = id)
    document.body.appendChild(canvas)
    return canvas
}
// 歌词解析
function parseLyric(lrc) {
    let lyrics = lrc.split('\n')
    let lrcObj = []
    for (let i = 0; i < lyrics.length; i++) {
        let lyric = decodeURIComponent(lyrics[i])
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
        let timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        let clause = lyric.replace(timeReg, '')
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
            let t = timeRegExpArr[k]
            let min = Number(String(t.match(/\[\d*/i)).slice(1))
            let sec = Number(String(t.match(/\:\d*/i)).slice(1))
            let time = min * 60 + sec
            if (clause !== '') {
                lrcObj.push({time: time, text: clause})
            }
        }
    }
    return lrcObj
}

export {
    timeChange,
    day,
    weekDay,
    createCanvas,
    parseLyric
}