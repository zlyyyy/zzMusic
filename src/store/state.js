const state = {
  banner: [], // 轮播图
  personalized: [], // 未登录推荐歌单
  player: {
    audio: null,
    playing: false,
    currentTime: 0,
    musicInfor: {
      duration: 0,
      name: "欢迎使用zzMusic",
      image: require("../assets/zzmusic.png")
    },
    playlist: [],
    historyList: []
  }
};

export default state;
