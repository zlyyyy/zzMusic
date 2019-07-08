import * as types from "./mutation-types";

const mutations = {
  // 轮播图
  [types.SET_BANNER](state, data) {
    state.banner = data;
  },
  // 未登录推荐歌单
  [types.SET_PERSONALIZED](state, data) {
    state.personalized = data;
  },
  // 播放器
  // 设置播放器
  [types.SET_AUDIO](state, audio) {
    state.player.audio = audio;
  },
  // 播放暂停
  [types.SET_PLAYING](state, data) {
    state.player.playing = data ? data : !state.player.playing;
  },
  [types.SET_CURRENT_TIME](state, data) {
    state.player.currentTime = data;
  },
  // 当前播放音乐信息
  [types.SET_PLAYER_MUSIC_INFOR](state, music) {
    // console.log(music)
    // 加入播放列表
    let _music = music;
    // 判断添加的音乐是否已存在
    let _filterResult = state.player.playlist.filter(v => v.id == _music.id);
    // console.log(_filterResult)
    if (_filterResult.length == 0) {
      // 播放列表下标添加
      _music._index = state.player.playlist.length;
      state.player.playlist = [...state.player.playlist, _music];
    } else {
      _music = _filterResult[0];
    }
    // 设置播放器当前音乐信息
    const _infor = {
      _index: _music._index,
      id: music.id,
      name: music.name,
      singer: music.artists,
      albumId: music.album.id,
      album: music.album.name,
      image: music.album.picUrl,
      duration: music.duration / 1000,
      url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
    };
    state.player.musicInfor = _infor;
  },
  // 设置播放列表
  [types.SET_PLAYLIST](state, data) {
    state.player.playlist = data;
  },
  // 设置播放历史列表
  [types.SET_HISTORY_LIST](state, data) {
    state.player.historyList = data;
  }
};
export default mutations;
