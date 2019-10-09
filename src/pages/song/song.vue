<template>
  <div class="song">
    <div class="infor">
      <template v-if="songId">
        <div class="cd">
          <img :src="musicInfor.image" />
        </div>
        <div class="des-infor">
          <h1 class="name">{{ musicInfor.name }}</h1>
          <div class="album">专辑：{{ musicInfor.album }}</div>
          <div class="singer">歌手：{{ musicInfor.singer | artistsFormat }}</div>
          <div class="lyric-content">
            <div class="lyric" :style="lyricTop">
              <p
                v-for="(item, index) in lyric"
                :class="{ on: index == lyricIndex }"
                :key="item.index"
              >
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>
      </template>
      <h1 class="no-song-text" v-else>暂无正在播放的音乐，快去播放喜欢的音乐吧！</h1>
    </div>
  </div>
</template>

<script>
import { getMusicLyric } from "../../api";
import { createCanvas, parseLyric } from "../../utils/utils";
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
    this.$nextTick(() => {
      // 获取歌词
      this.songId&&this.setMusicLyric(this.songId);
    });
  },
  components: {},
  filters: {
    // 歌手格式化
    artistsFormat(val) {
      let _val;
      if (!val) {
        return;
      }
      val.forEach((ele, index) => {
        if (ele.name != "") {
          index > 0 ? (_val += ` / ${ele.name}`) : (_val = ele.name);
        }
      });
      return _val;
    }
  },
  computed: {
    ...mapGetters(["currentTime", "musicInfor"]),
    songId() {
      // 动态展示地址栏查询type
      return this.musicInfor&&this.musicInfor.id? this.$route.query.id : null
    },
    lyricTop() {
      return `transform :translate3d(0, ${-26 *
        (this.lyricIndex - this.top)}px, 0)`;
    }
  },
  watch: {
    currentTime(newVal) {
      this.lyric.forEach((v, index) => {
        if (newVal > v.time) {
          this.lyricIndex = index;
        }
      });
    }
  },
  data() {
    return {
      top: 6, // 歌词居中
      lyric: [], // 歌词
      lyricIndex: 0 // 歌词下标
    };
  },
  methods: {
    ...mapActions([]),
    // 根据ID设置音乐歌词
    setMusicLyric(id) {
      getMusicLyric(id).then(res => {
        this.lyric = parseLyric(res.lrc.lyric);
      });
    },
    // 基于Web Audio API实现音频可视化效果-音源跨域无法实现
    musicCanvas() {
      // 创建画布
      const W = 500;
      const H = 500;
      const canvas = createCanvas(W, H, "music");
      const ctx = canvas.getContext("2d");
      // const myAudio = document.querySelector('audio')
      // 获取web audio 上下文对象
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // 获取声音源
      // const source = audioCtx.createMediaElementSource(myAudio)
      // 获取分析对象
      const analyser = audioCtx.createAnalyser();
      // 设置-创建波形器
      analyser.fftSize = 1024;
      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);
      // // 连接解析器-音源跨域无法使用
      // source.connect(analyser)
      // // 输出音频
      // source.connect(audioCtx.destination)
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      function audioSourceByUser(audioCtx, analyser) {
        if (navigator.getUserMedia) {
          //   console.log("getUserMedia supported.");
          navigator.getUserMedia(
            // constraints - only audio needed for this app
            {
              audio: true
            },
            // Success callback
            function(stream) {
              const source = audioCtx.createMediaStreamSource(stream);
              source.connect(analyser);
              // analyser.connect(audioCtx.destination);
              requestAnimationFrame(draw2);
            },
            // Error callback
            function() {
              //   console.log("The following gUM error occured: " + err);
            }
          );
        } else {
          //   console.log("getUserMedia not supported on your browser!");
        }
      }
      audioSourceByUser(audioCtx, analyser);
      //   const draw = () => {
      //     // 获取当前声音的波形；将当前波形，或者时域数据拷贝进 Uint8Array数组（无符号字节数组）
      //     analyser.getByteTimeDomainData(dataArray);
      //     ctx.clearRect(0, 0, W, H);
      //     ctx.fillStyle = "rgb(200,200,200)";
      //     ctx.fillRect(0, 0, W, H);
      //     ctx.strokeStyle = "rgb(0,0,0)";
      //     ctx.beginPath();
      //     const sliceWidth = (W * 1.0) / bufferLength;
      //     let x = 0;
      //     for (let i = 0; i < bufferLength; i++) {
      //       let v = dataArray[i] / 128.0;
      //       let y = (v * H) / 2;
      //       if (i === 0) {
      //         ctx.moveTo(x, y);
      //       } else {
      //         ctx.lineTo(x, y);
      //       }
      //       x += sliceWidth;
      //     }
      //     ctx.lineTo(W, H / 2);
      //     ctx.stroke();
      //     requestAnimationFrame(draw);
      //   };
      const draw2 = () => {
        // 获取当前频域数据；将当前频域数据拷贝进Uint8Array数组（无符号字节数组）
        analyser.getByteTimeDomainData(dataArray);
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, W, H);

        const barWidth = (W / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2;
          ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
          ctx.fillRect(x, H - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
        requestAnimationFrame(draw2);
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../style/mixin";
.song {
  position: relative;
  overflow: hidden;
  .infor {
    overflow: hidden;
    .no-song-text {
      margin-top: calc(50% - 140px);
      width: 100%;
      @include sc(20px, $white);
      font-weight: bolder;
      text-align: center;
    }
    .cd {
      float: left;
      width: 298px;
      img {
        width: 100%;
      }
    }
  }
  .des-infor {
    position: relative;
    float: left;
    width: calc(100% - 298px);
    padding: 0 0 30px 20px;
    color: $white;
    .name {
      line-height: 30px;
      font-size: 20px;
      font-weight: bolder;
    }
    .album,
    .singer {
      font-size: 14px;
      font-weight: bolder;
      line-height: 26px;
    }
    .lyric-content {
      margin-top: 20px;
      max-height: 390px;
      overflow: hidden;
      .lyric {
        transition: transform 0.6s ease-out, -webkit-transform 0.6s ease-out;
        p {
          line-height: 26px;
          &.on {
            @include sc(16px, $main);
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>
