<template>
  <div class="home">
    <div class="module slide">
      <Carousel autoplay loop>
        <CarouselItem v-for="item in banner" :key="item.index">
          <!-- <div class="item-carousel" :style="{'background-image':'url('+item.backgroundUrl+')'}" > -->
          <div class="item-carousel">
            <a :href="item.url">
              <img :src="item.picUrl" />
            </a>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="module recommend">
      <h1 class="title">推荐歌单</h1>
      <div class="module-contain">
        <zz-imglist>
          <template slot="content">
            <router-link
              v-if="loginStatus"
              tag="li"
              class="img songs"
              :to="{ path: '/music/discover/recommend/taste' }"
            >
              <a
                href="'/music/discover/recommend/taste"
                title="每日歌曲推荐"
                class="date"
              >
                <span class="head">{{ "星期" + weekDay }}</span>
                <span class="bd">{{ day }}</span>
                <!-- <span class="mask"></span> -->
              </a>
              <a
                class="title"
                title="每日歌曲推荐"
                href="/discover/recommend/taste"
              >
                每日歌曲推荐
              </a>
            </router-link>
            <li
              class="img songs"
              v-for="(item, index) in recDataFilter"
              :key="index"
            >
              <div class="cover">
                <img :src="item.picUrl" />
                <p class="msk-1">{{ "播放数:" + numFormat(item.playCount) }}</p>
                <p class="copywriter">{{ item.copywriter }}</p>
                <router-link
                  class="link"
                  :to="{ path: '/music/playlist', query: { id: item.id } }"
                  tag="a"
                />
              </div>
              <a
                class="title"
                :title="item.name"
                :href="'/playlist?id=' + item.id"
              >
                {{ item.name }}
              </a>
            </li>
          </template>
        </zz-imglist>
      </div>
    </div>
  </div>
</template>

<script>
import zzImglist from "@/components/zzImglist/zzImglist";
import { day, weekDay, numFormat } from "@/utils/utils";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  props: {
    scrollTop: {
      type: [Number],
      default: 0
    }
  },
  created() {
    this.$nextTick(() => {
      // 获取slide
      this.setBanner();
      // 是否登录获取推荐歌单
      if (this.loginStatus) {
        // 用户每日推荐歌单
        this.setRecommend();
      } else {
        // 未登录推荐歌单
        this.setPersonalized();
      }
    });
  },
  components: {
    zzImglist
  },
  computed: {
    ...mapGetters(["banner", "personalized"]),
    ...mapState("user", {
      loginStatus: state => state.loginStatus, // 登录状态
      recommend: state => state.recommend // 登录推荐歌单
    }),
    recData() {
      return this.loginStatus ? this.recommend : this.personalized;
    },
    recDataFilter() {
      let _data = [];
      this.recData.forEach((ele, index) => {
        if (index < this.listNumber) {
          _data = [..._data, ele];
        }
      });
      return _data;
    },
    day() {
      return day();
    },
    weekDay() {
      return weekDay();
    },
    listNumber() {
      return this.loginStatus ? 4 : 10;
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setBanner", "setPersonalized"]),
    ...mapActions("user", ["setRecommend"]),
    // 数量转换
    numFormat(num) {
      return numFormat(num);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../style/mixin";
.home {
  overflow: hidden;
  .module {
    margin-bottom: 10px;
    &.slide {
      .item-carousel {
        text-align: center;
      }
    }
    .title {
      font-weight: bolder;
      font-size: 18px;
      line-height: 30px;
      padding: 0 0 5px;
      margin-bottom: 10px;
      border-bottom: 1px solid $border_first;
    }
    &.recommend {
      .songs {
        .date {
          display: block;
          @include wh(134px, 134px);
          background: $white;
          border: 1px solid $border_first;
          .head {
            display: block;
            height: 33px;
            line-height: 33px;
            color: $font_first;
            font-size: 14px;
            text-align: center;
          }
          .bd {
            display: block;
            line-height: 102px;
            text-align: center;
            font-size: 94px;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            color: #202020;
          }
          .mask {
            position: absolute;
            top: 33px;
            left: 0;
            width: 142px;
            height: 107px;
            background-position: 0 -150px;
          }
        }
        .cover {
          @include wh(134px, 134px);
          .copywriter {
            position: absolute;
            top: -50px;
            right: 0;
            @include wh(100%, 48px);
            @include sc(12px, $white);
            background: rgba(0, 0, 0, 0.4);
            padding: 5px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            text-align: left;
            text-shadow: none;
            @include transition(0.3s);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示
            -webkit-box-orient: vertical; // 从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
            -webkit-line-clamp: 2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。
          }
          &:hover {
            .msk-1 {
              display: none;
            }
            .copywriter {
              top: 0;
              @include transition(0.3s);
            }
          }
        }
      }
    }
  }
}
</style>
