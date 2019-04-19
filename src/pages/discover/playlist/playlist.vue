<template>
    <div class="playlist">
		<span class="check-tag" @click="moreTagShow = !moreTagShow" v-clickoutside="handleTagClose">
            {{checkedTag}}
            <Icon type="ios-arrow-down" />
        </span>
        <div ref="playlistCatlist" class="playlist-catlist" v-show="moreTagShow">
            <div class="arrow-top"></div>
            <div
                class="all-tag"
                @click="searchTagPlaylist({name:'全部'})"
                :class="{checked: checkedTag == '全部'}"
                >
                <div class="sub" v-if="checkedTag == '全部'"></div>
                全部歌单
            </div>
            <div class="playlist-catlist-box">
                <div
                    class="playlist-catlist-item"
                    v-for="(item, index) in playlistCatlist"
                    :key="`${item.name}${index}`"
                    >
                    <div class="name">{{item.name}}</div>
                    <div class="playlist-catlist-item-content">
                        <div
                            v-if="item.tags"
                            class="tags-item"
                            v-for="(tag, ind) in item.tags"
                            :key="`${tag.name}${ind}`"
                            :class="{checked: tag.name == checkedTag}"
                            @click="searchTagPlaylist(tag)"
                            >
                                <i class="iconfont icon-hot_surface hot" v-if="tag.hot"></i>
                                <div class="sub" v-if="tag.name == checkedTag"></div>
                                {{tag.name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="playlist-style">
            <div
                class="playlist-style-item"
                v-for="(item, index) in playlistStyle"
                :key="`${item.name}${index}`"
                :class="{active: index == playlistStyleCurrent}"
                @click="playlistStyleCurrent=index"
                >
                {{item.name}}
            </div>
        </div>
        <div class="hot-tag">
            热门歌单：
            <div
                class="hot-tag-item"
                v-for="(item, index) in playlistHot"
                :key="`${item.name}${index}`"
                @click="searchTagPlaylist(item)"
                >
                {{item.name}}
            </div>
        </div>
        <zz-imglist>
            <template slot="content">
                <li class="img songs" v-for="(item, index) in topPlaylist" :key="`${item.picUrl}${index}`">
                    <div class="cover">
                        <img :src="item.coverImgUrl" />
                        <p class="msk-1">{{ '播放数:' + numFormat(item.playCount) }}</p>
                        <p class="author">{{ `by ${item.nickname}` }}</p>
                        <router-link
                            class="link"
                            :to="{path: '/music/playlist', query: { id: item.id }}"
                            tag="a"
                        />
                    </div>
                    <a class="title" :title="item.name" :href="'/playlist?id=' + item.id">
                        {{ item.name }}
                    </a>
                </li>
            </template>
        </zz-imglist>
        <!-- <Page
			:total="topPlaylistTotal"
			show-total
			v-if="topPlaylistTotal > 20"
			:page-size="20"
			:current="pageCurrent"
			@on-change="getPageData"
		/> -->
        <zz-loading v-if="loading"></zz-loading>
    </div>
</template>

<script>
import zzImglist from '@/components/zzImglist/zzImglist'
import { numFormat } from '@/utils/utils'
import { getPlaylistCatlist, getPlaylistHot, getTopPlaylist } from '@/api'
export default {
	props: {
	},
	created() {
		this.$nextTick(() => {
            // 获取歌单分类
            getPlaylistCatlist().then(res => {
                let _playlistCatlist = []
                for (let ele in res.categories) {
                    let _ele = {
                        name: res.categories[ele],
                        tags: []
                    }
                    _playlistCatlist = [..._playlistCatlist, _ele]
                }
                res.sub.forEach(ele => {
                    _playlistCatlist[ele.category].tags = [..._playlistCatlist[ele.category].tags, ele]
                })
                this.playlistCatlist = _playlistCatlist
            })
            // 获取热门歌单分类
            getPlaylistHot().then(res => {
                this.playlistHot = res.tags
            })
            this.setTopPlaylist()
		})
    },
	components: {
        zzImglist
	},
	computed: {
    },
    watch: {
        playlistStyleCurrent(newVal) {
            this.setTopPlaylist()
        }
    },
	data() {
		return {
            loading: true,
            playlistHot: [],
            playlistCatlist: [],
            checkedTag: '全部',
            moreTagShow: false,
            playlistStyle: [
                {
                    name: '热门',
                    value: 'hot'
                },
                {
                    name: '最新',
                    value: 'new'
                }
            ],
            playlistStyleCurrent: 0,
            topPlaylist: [],
            topPlaylistTotal: 0,
            pageCurrent: 1
        }
	},
	methods: {
        // tag点击事件
        searchTagPlaylist(item) {
            this.checkedTag = item.name
            this.moreTagShow = false
            this.pageCurrent = 1
            this.setTopPlaylist()
        },
        // 查询歌单 ( 网友精选碟 )
        setTopPlaylist() {
            this.loading = true
            this.topPlaylist = []
            const params = {
                limit: 25,
                order: this.playlistStyle[this.playlistStyleCurrent].value,
                cat: this.checkedTag,
                offset: this.pageCurrent - 1
            }
            getTopPlaylist(params).then(res => {
                console.log(res)
                let _data = []
                res.playlists.forEach((ele, index) => {
                    const _ele = {
                        id: ele.id,
                        name: ele.name,
                        coverImgUrl: ele.coverImgUrl,
                        nickname: ele.creator.nickname,
                        userId: ele.creator.userId,
                        trackCount: ele.trackCount,
                        playCount: ele.playCount,
                        updateTime: ele.updateTime
                    }
                    _data = [..._data, _ele]
                })
                this.topPlaylist = _data
                this.topPlaylistTotal = res.total
                this.loading = false
            })
        },
        handleTagClose() {
            this.moreTagShow = false
        },
        // 分页获取数据
		getPageData(page) {
            this.pageCurrent = page
			this.setTopPlaylist()
        },
        // 数量转换
		numFormat(num) {
            return numFormat(num)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../style/mixin";
.playlist{
    position: relative;
    .check-tag{
        display: inline-block;
        padding:  0 10px;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        border: 1px solid $border_first;
        cursor: pointer;
        transition: all .3s;
        &:hover{
            color: $main;
            border-color: $main;
        }
    }
    .playlist-catlist{
        position: absolute;
        z-index: 99;
        top: 50px;
        border-radius: 3px;
        border: 1px solid $border_first;
        padding: 10px;
        @include wh(500px, 400px);
        background-color: #fff;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        @include sc(14px, $font_second);
        .arrow-top{
            position: absolute;
            top: -6px;
            left: 20px;
            @include wh(10px, 10px);
            border: 1px solid $border_first;
            background: #fff;
            border-left: none;
            border-bottom: none;
            -webkit-transform: rotate(45deg);
            transform: rotate(-45deg);
        }
        .playlist-catlist-box{
            height: calc(100% - 50px);
            margin-top: 10px;
            overflow-y: auto;
            .playlist-catlist-item{
                width: 100%;
                overflow: hidden;
                margin-bottom: 10px;
                .name{
                    float: left;
                    width: 60px;
                    line-height: 40px;
                    margin-right: 10px;
                    padding: 0 10px;
                }
                .playlist-catlist-item-content{
                    float: left;
                    width: calc(100% - 70px);
                    overflow: hidden;
                    .tags-item{
                        display: inline-block;
                        padding:  0 10px;
                        margin: 0 10px 10px 0;
                        .hot{
                            color: $red;
                        }
                    }
                }
            }
        }
        .all-tag, .tags-item{
            position: relative;
            border-radius: 3px;
            border: 1px solid $border_first;
            text-align: center;
            line-height: 40px;
            height: 40px;
            cursor: pointer;
            transition: all .3s;
            &:hover, &.checked{
                color: $main;
                border-color: $main;
            }
            &.checked{
                .sub{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width:0px;
                    height:0px;
                    border-top: 7px solid $main;
                    border-right: 7px solid $main;
                    border-bottom: 7px solid transparent;
                    border-left: 7px solid transparent;
                    transform: rotate(90deg);
                    &::before{
                        position: absolute;
                        content: '';
                        right: -5px;
                        bottom: 2px;
                        @include wh(6px, 3px);
                        border: 1px solid $white;
                        border-left: 0;
                        border-bottom: 0;
                        transform: rotate(45deg);
                    }
                }
            }
        }
    }
    .playlist-style{
        position: absolute;
        top: 0;
        right: 0;
        .playlist-style-item{
            display: inline-block;
            @include wh(60px, 30px);
            text-align: center;
            line-height: 30px;
            border: 1px solid $border_first;
            padding: 0 10px;
            cursor: pointer;
            &:first-child{
                border-right: none;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
            }
            &:last-child{
                border-left: none;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
            }
            &.active{
                background: $main;
                color: $white;
                border-color: $main;
            }
        }
    }
    .hot-tag{
        margin-top: 10px;
        @include sc(14px, $font_first);
        .hot-tag-item{
            display: inline-block;
            @include sc(12px, $font_second);
            border-right: 1px solid $border_first;
            padding: 0 20px;
            cursor: pointer;
            &:hover{
                color: $main;
            }
            &:last-child{
                border: none;
            }
        }
    }
}
</style>
