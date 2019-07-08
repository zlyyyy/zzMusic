import { getPlaylistDetail } from "../../api";
import { timeChange } from "../../utils/utils";

const state = {
  loading: false,
  playlistDetail: []
};

const getters = {};

const mutations = {
  SET_PLAYLIST_DETAIL: (state, data) => {
    state.playlistDetail = data;
  },
  SET_LOADING: state => {
    state.loading = !state.loading;
  }
};

const actions = {
  // 歌单详情
  setPlaylistDetail({ commit }, id) {
    commit("SET_LOADING");
    getPlaylistDetail(id).then(res => {
      const ele = res.playlist;
      let _tags = "<b>标签：</b>";
      ele.tags.forEach((el, index) => {
        index > 0
          ? (_tags += ` / <em>${el}</em>`)
          : (_tags += `<em>${el}</em>`);
      });
      ele.tags.length > 0 ? null : (_tags = null);
      const _data = {
        id: ele.id,
        coverImgUrl: ele.coverImgUrl,
        name: ele.name,
        description: ele.description
          ? "<b>简介：</b>" + ele.description.replace(/\n/g, "<br />")
          : null,
        trackCount: ele.trackCount,
        playCount: ele.playCount,
        tags: _tags,
        createTime: timeChange(ele.createTime),
        updateTime: timeChange(ele.updateTime),
        userId: ele.userId,
        nickname: ele.creator.nickname,
        avatarUrl: ele.creator.avatarUrl,
        tracks: ele.tracks
      };
      commit("SET_PLAYLIST_DETAIL", _data);
      commit("SET_LOADING");
    });
  }
};

export default {
  //	注册login空间模块
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
