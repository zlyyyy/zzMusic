<template>
  <div class="progress-inner" ref="zzProgress" @click="proClick">
    <div class="load" ref="zzProgressLoad"></div>
    <div class="play" ref="zzProgressPlay">
      <i class="dot" @mousedown="proDown"></i>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.bindEvents();
      const playWidth = this.percent * this.$refs.zzProgress.clientWidth;
      this.progressMove(playWidth);
    });
  },
  props: {
    // 进度
    percent: {
      type: [Number],
      default: 0
    },
    // 缓冲进度
    percentLoad: {
      type: [Number],
      default: 0
    }
  },
  watch: {
    // 进度条设置
    percent(newVal) {
      if (newVal >= 0) {
        const barWidth = this.$refs.zzProgress.clientWidth;
        const playWidth = newVal * barWidth;
        this.progressMove(playWidth);
      }
    },
    // 缓冲进度设置
    percentLoad(newVal) {
      if (newVal >= 0) {
        const loadWidth = newVal * this.$refs.zzProgress.clientWidth;
        this.$refs.zzProgressLoad.style.width = `${loadWidth}px`;
      }
    }
  },
  data() {
    return {
      move: {
        state: false, // 是否可拖动
        start: 0, // 点击的X坐标
        left: 0 // 已移动距离
      }
    };
  },
  methods: {
    // 添加绑定事件
    bindEvents() {
      document.addEventListener("mousemove", this.proMove);
      document.addEventListener("mouseup", this.proUp);
    },
    // 鼠标按下事件
    proDown(e) {
      this.move.state = true;
      this.move.start = e.clientX;
      this.move.left = this.$refs.zzProgressPlay.clientWidth;
    },
    // 鼠标移动事件
    proMove(e) {
      if (!this.move.state) {
        return false;
      }
      // 最后拖动停止的点距离屏幕左侧距离
      let endX = e.clientX;
      // 开始到结束移动的距离
      let dist = endX - this.move.start;
      //  this.move.left + dist 上次开始拖动的位置加上新的拖动的距离，进度条宽度
      let playWidth = Math.min(
        this.$refs.zzProgress.clientWidth,
        Math.max(0, this.move.left + dist)
      );
      // console.log("endX："+endX)
      // console.log("dist："+dist)
      // console.log(this.move.left)
      // console.log("playWidth："+playWidth)
      this.progressMove(playWidth);
      this.setPercent(playWidth);
    },
    // 鼠标释放事件
    proUp(e) {
      e.stopPropagation();
      this.move.state = false;
    },
    // 进度条宽度设置
    progressMove(val) {
      this.$refs.zzProgressPlay.style.width = `${val}px`;
    },
    // 播放时间设置
    setPercent(playWidth) {
      // 进度条百分比
      let percent = playWidth / this.$refs.zzProgress.clientWidth;
      // 设置音乐进度
      this.$emit("changePercent", percent);
    },
    // 进度条点击事件
    proClick(e) {
      // 返回元素的大小及其相对于视口的位置
      let rect = this.$refs.zzProgress.getBoundingClientRect();
      // 元素的内部宽度
      // this.$refs.zzProgress.clientWidth
      // 点击位置与进度条的距离
      //  e.clientX-rect.left
      //  偏移位置控制在进度条宽度内
      let playWidth = Math.min(
        this.$refs.zzProgress.clientWidth,
        Math.max(0, e.clientX - rect.left)
      );
      // 设置滚动条位置
      this.progressMove(playWidth);
      // 设置播放时间
      this.setPercent(playWidth);
    }
  }
};
</script>

<style></style>
