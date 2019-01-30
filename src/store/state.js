const state = {
    banner: [], // 轮播图
    personalized: [], // 未登录推荐歌单
    player: {
        audio: null,
        playing: false,
        currentTime: 0,
        musicInfor: [],
        playlist: [],
        historyList: []
    }
}

export default state