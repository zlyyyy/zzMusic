import * as types from "./mutation-types";
import locs from "../utils/locs";
import { getBanner, getPersonalized } from "../api";

// 轮播图
export const setBanner = function({ commit }) {
  getBanner().then(res => {
    let _data = [];
    res.banners.forEach(ele => {
      const _ele = {
        picUrl: ele.imageUrl,
        titleColor: ele.titleColor,
        typeTitle: ele.typeTitle
      };
      _data = [..._data, _ele];
    });
    commit(types.SET_BANNER, _data);
  });
};
// 推荐歌单
export const setPersonalized = function({ commit }) {
  getPersonalized().then(res => {
    commit(types.SET_PERSONALIZED, res.result);
  });
};
// 播放器当前音乐信息
export const setMusicInfor = function({ commit }, music) {
  commit(types.SET_PLAYING, false);
  // 设置播放器音乐展示信息
  commit(types.SET_PLAYER_MUSIC_INFOR, music);
  // commit( types.SET_PLAYING, true )
  // 播放当前音乐
  setTimeout(() => {
    commit(types.SET_PLAYING, true);
  }, 10);
};
// 设置播放列表
export const setPlaylist = function({ commit, dispatch }, list) {
    dispatch("setMusicInfor", list[0])
    commit(types.SET_PLAYLIST, list);
};
// 设置播放历史
export const setHistoryList = function({ commit }, list) {
  commit(types.SET_HISTORY_LIST, list);
  locs.set("history_list", list);
};
