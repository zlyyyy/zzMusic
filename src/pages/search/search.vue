<template>
    <div class="search-content">
		<div class="note" v-html="note"></div>
		<Tabs :animated="false" @on-click="getSearchResult" :value="currentKey + ''">
			<TabPane label="单曲" name="0">
				<zz-table
					v-if="type == 1 && searchData.songs.result"
					:data="searchData.songs.result"
					:columns="searchData.songs.tableColumns"
				/>
				<div class="errNote" v-if="type == 1 && !searchData.songs.result" v-html="errNote"></div>
			</TabPane>
			<TabPane label="歌手" name="1">
				<zz-tablelist v-if="type == 100 && searchData.artists.result">
					<li slot="content" class="artists" v-for="(item, index) in searchData.artists.result" :key="index">
						<div class="zz-table-list-item">
							<span class="img"><img :src="item.picUrl"/></span>
							<span class="name">{{ item.name }}</span>
							<span class="alias">{{ item.alias==''? '' : item.alias }}</span>
						</div>
					</li>
				</zz-tablelist>
				<div class="errNote" v-if="type == 100 && !searchData.artists.result" v-html="errNote"></div>
			</TabPane>
			<TabPane label="专辑" name="2">
				<zz-tablelist v-if="type == 10 && searchData.albums.result">
					<li slot="content" class="artists" v-for="(item, index) in searchData.albums.result" :key="index">
						<div class="zz-table-list-item">
							<span class="img"><img :src="item.picUrl"/></span>
							<span v-html="keywordsHighlight(item.name)"></span>
							<span>{{ item.artists==''? '' : item.artists }}</span>
						</div>
					</li>
				</zz-tablelist>
				<div class="errNote" v-if="type == 10 && !searchData.albums.result" v-html="errNote"></div>
			</TabPane>
			<TabPane label="视频" name="3">
				<zz-imglist v-if="type == 1014 && searchData.videos.result">
					<li slot="content" class="video" v-for="(item, index) in searchData.videos.result" :key="index">
						<div class="cover">
							<img :src="item.coverUrl" />
							<p class="msk-1">{{ numFormat(item.playTime) }}</p>
							<p class="msk-2">{{ timeFormat(item.durationms) }}</p>
						</div>
						<p class="title el" :title="item.title">{{ item.title }}</p>
						<p class="name">{{ 'by ' + item.creator[0].userName }}</p>
					</li>
				</zz-imglist>
				<div class="errNote" v-if="type == 1014 && !searchData.videos.result" v-html="errNote"></div>
			</TabPane>
			<TabPane label="歌单" name="4">
				<zz-tablelist v-if="type == 1000 && searchData.playlists.result">
					<li slot="content" class="artists" v-for="(item, index) in searchData.playlists.result" :key="index">
						<div class="zz-table-list-item">
							<span class="img"><img :src="item.coverImgUrl"/></span>
							<span v-html="keywordsHighlight(item.name)"></span>
							<span>{{ item.trackCount + '首' }}</span>
							<span>{{ 'by ' + item.nickname }}</span>
							<span>{{ '收藏:' + numFormat(item.bookCount) }}</span>
							<span>{{ '播放:' + numFormat(item.playCount) }}</span>
						</div>
					</li>
				</zz-tablelist>
				<div class="errNote" v-if="type == 1000 && !searchData.playlists.result" v-html="errNote"></div>
			</TabPane>
			<TabPane label="歌词" name="5">
				<zz-table
					v-if="type == 1006 && searchData.lyrics.result"
					:data="searchData.lyrics.result"
					:columns="searchData.lyrics.tableColumns"
					@setLyricsShow="setLyricsShow"
				/>
				<div class="errNote" v-if="type == 1006 && !searchData.lyrics.result" v-html="errNote"></div>
			</TabPane>
			<TabPane label="主播电台" name="6">
				<zz-imglist v-if="type == 1009 && searchData.djRadios.result">
					<li slot="content" class="video" v-for="(item, index) in searchData.djRadios.result" :key="index">
						<div class="cover">
							<img :src="item.picUrl" />
						</div>
						<p class="title" :title="item.name">{{ item.name }}</p>
						<p class="name">
							{{ 'by ' + item.dj.nickname }}
							<!-- <span>{{ item.dj.gender==1 ?  '男' : '女' }}</span> -->
							<!-- <i class="iconfont" :class="[{'icon-nan': item.dj.gender =='1'},{'icon-nv': item.dj.gender =='2' }]"></i> -->
						</p>
					</li>
				</zz-imglist>
				<div class="errNote" v-if="type == 1009 && !searchData.djRadios.result" v-html="errNote"></div>
			</TabPane>
			<TabPane label="用户" name="7">
				<zz-tablelist v-if="type == 1002 && searchData.userprofiles.result">
					<li slot="content" class="artists" v-for="(item, index) in searchData.userprofiles.result" :key="index">
						<div class="zz-table-list-item">
							<span class="img"><img :src="item.avatarUrl"/></span>
							<span class="username" v-html="keywordsHighlight(item.nickname)"></span>
							<span v-if="item.userType == 4" class="autograph">网易音乐人</span>
							<span v-else class="autograph" v-html="keywordsHighlight(item.signature)"></span>
						</div>
					</li>
				</zz-tablelist>
				<div class="errNote" v-if="type == 1002 && !searchData.userprofiles.result" v-html="errNote"></div>
			</TabPane>
		</Tabs>
		<Page
			:total="pageTotal"
			show-total
			v-if="pageTotal > 20"
			:page-size="20"
			:current="pageCurrent"
			@on-change="getPageData"
		/>
		<zz-loading v-if="loading"></zz-loading>
    </div>
</template>

<script>
import zzTable from '../../components/zzTable/zzTable'
import zzTablelist from '../../components/zzTablelist/zzTablelist'
import zzImglist from '../../components/zzImglist/zzImglist'
import zzLoading from '../../components/zzLoading/zzLoading'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
	created() {
		this.$nextTick(() => {
			// 设置关键词
			this.setSearchKeywords(this.keywords)
			// 根据地址栏参数设置高亮tab
			this.nav.forEach((val, key) => {
				val.type == this.queryType ? this.currentKey = key : 0
			})
			// 获取数据
			this.getSearchResult(this.currentKey)
		})
	},
	components: {
		zzTable,
		zzTablelist,
		zzImglist,
		zzLoading
	},
	computed: {
		...mapState('search', [
			'nav',
			'result'
		]),
		keywords() {
			// 动态获取地址栏搜索关键词
			return this.$route.query.keywords
		},
		queryType() {
			// 动态展示地址栏查询type
			return this.$route.query.type ? this.$route.query.type : 1
		}
	},
	watch: {
		keywords(newVal, oldVal) {
			this.getSearchResult(this.currentKey)
		},
		result(newVal, oldVal) {
			// 定义当前tab数据
			let currentData
			// 数据过滤结果
			let _data = []
			let _text = `搜索"<em>${this.keywords}</em>"，找到`
			let _errtext = `很抱歉，未能找到与"<em>${this.keywords}</em>"相关的任何`
			let _searchData = this.searchData
			// 列表数据筛选
			switch (this.type) {
				case 1:
					currentData = _searchData.songs
					this.pageTotal = currentData.resultCount = newVal.songCount
					this.note = `${_text}${currentData.resultCount}首单曲`
					if (newVal.songCount != 0) {
						currentData.tableColumns = [
							{
								title: '序号',
								class: 'number'
							},
							{
								title: '操作',
								class: 'handle'
							},
							{
								title: '音乐标题'
							},
							{
								title: '歌手'
							},
							{
								title: '专辑'
							},
							{
								title: '时长',
								class: 'duration'
							}
						]
						newVal.songs.forEach((ele, index) => {
							const _ele = {
								name: ele.name,
								id: ele.id,
								artists: ele.artists,
								album: ele.album,
								duration: ele.duration
							}
							_data = [..._data, _ele]
						})
						currentData.result = _data
					} else {
						this.errNote = `${_errtext}单曲`
					}
					break
				case 100:
					currentData = _searchData.artists
					this.pageTotal = currentData.resultCount = newVal.artistCount
					this.note = `${_text}${currentData.resultCount}位歌手`
					if (newVal.artistCount != 0) {
						newVal.artists.forEach((ele, index) => {
							let _alias
							ele.alias.forEach((el, index) => {
								index > 0 ? _alias += ` / ${el}` : _alias = el
							})
							const _ele = {
								name: ele.name,
								id: ele.id,
								alias: _alias,
								picUrl: ele.picUrl
							}
							_data = [..._data, _ele]
						})
						currentData.result = _data
					} else {
						this.errNote = `${_errtext}歌手`
					}
					break
				case 10:
					currentData = _searchData.albums
					this.pageTotal = currentData.resultCount = newVal.albumCount
					this.note = `${_text}${currentData.resultCount}张专辑`
					if (newVal.albumCount != 0) {
						newVal.albums.forEach((ele, index) => {
							let _artists
							ele.artists.forEach((el, index) => {
								index > 0 ? _artists += ` / ${el.name}` : _artists = el.name
							})
							const _ele = {
								name: ele.name,
								id: ele.id,
								alias: ele.alias[0] ? ele.alias[0] : '',
								artists: _artists,
								picUrl: ele.picUrl
							}
							_data = [..._data, _ele]
						})
						currentData.result = _data
					} else {
						this.errNote = `${_errtext}专辑`
					}
					break
				case 1014:
					currentData = _searchData.videos
					this.pageTotal = currentData.resultCount = newVal.videoCount
					this.note = `${_text}${currentData.resultCount}个视频`
					if (newVal.videoCount != 0) {
						newVal.videos.forEach((ele, index) => {
							const _ele = {
								title: ele.title,
								vid: ele.vid,
								creator: ele.creator,
								coverUrl: ele.coverUrl,
								playTime: ele.playTime,
								durationms: ele.durationms
							}
							_data = [..._data, _ele]
						})
						currentData.result = _data
					} else {
						this.errNote = `${_errtext}视频`
					}
					break
				case 1000:
					currentData = _searchData.playlists
					this.pageTotal = currentData.resultCount = newVal.playlistCount
					this.note = `${_text}${currentData.resultCount}个歌单`
					if (newVal.playlistCount != 0) {
						newVal.playlists.forEach((ele, index) => {
							const _ele = {
								id: ele.id,
								name: ele.name,
								coverImgUrl: ele.coverImgUrl,
								nickname: ele.creator.nickname,
								userId: ele.creator.userId,
								trackCount: ele.trackCount,
								playCount: ele.playCount,
								bookCount: ele.bookCount
							}
							_data = [..._data, _ele]
						})
						currentData.result = _data
					} else {
						this.errNote = `${_errtext}歌单`
					}
					break
				case 1006:
					currentData = _searchData.lyrics
					this.pageTotal = currentData.resultCount = newVal.songCount
					this.note = `${_text}${currentData.resultCount}首单曲`
					if (newVal.songCount != 0) {
						currentData.tableColumns = [
							{
								title: '序号',
								class: 'number'
							},
							{
								title: '操作',
								class: 'handle'
							},
							{
								title: '音乐标题'
							},
							{
								title: '歌手'
							},
							{
								title: '专辑'
							},
							{
								title: '时长',
								class: 'duration'
							}
						]
						newVal.songs.forEach((ele, index) => {
							const _ele = {
								name: ele.name,
								id: ele.id,
								artists: ele.artists,
								album: ele.album,
								duration: ele.duration,
								lyrics: ele.lyrics,
								lyricsShow: false
							}
							_data = [..._data, _ele]
						})
						currentData.result = _data
					} else {
						this.errNote = `${_errtext}歌词`
					}
					break
				case 1009:
					currentData = _searchData.djRadios
					this.pageTotal = currentData.resultCount = newVal.djRadiosCount
					this.note = `${_text}${currentData.resultCount}个节目`
					if (newVal.djRadiosCount && newVal.djRadiosCount != 0) {
						newVal.djRadios.forEach((ele, index) => {
							const _ele = {
								id: ele.id,
								name: ele.name,
								picUrl: ele.picUrl,
								dj: {
									nickname: ele.dj.nickname,
									userId: ele.dj.userId,
									gender: ele.dj.gender
								}
							}
							_data = [..._data, _ele]
						})
						currentData.result = _data
					} else {
						this.errNote = `${_errtext}节目`
					}
					break
				case 1002:
					currentData = _searchData.userprofiles
					this.pageTotal = currentData.resultCount = newVal.userprofileCount
					this.note = `${_text}${currentData.resultCount}位用户`
					if (newVal.userprofileCount != 0) {
						newVal.userprofiles.forEach((ele, index) => {
							const _ele = {
								userId: ele.userId,
								userType: ele.userType,
								nickname: ele.nickname,
								avatarUrl: ele.avatarUrl,
								signature: ele.signature
							}
							_data = [..._data, _ele]
						})
						currentData.result = _data
					} else {
						this.errNote = `${_errtext}用户`
					}
					break
				default:
					break
			}
			this.loading = false
		}
	},
	data() {
		return {
			currentKey: 0, // tab高亮key
			type: 0, // tab高亮type
			pageTotal: 0, // 当前页数据总条数
			pageCurrent: 1, // 当前页码
			errNote: '', // 无数据索引
			note: '', // 有数据索引
			loading: true,
			searchData: {
				songs: {},
				artists: {},
				albums: {},
				videos: {},
				playlists: {},
				lyrics: {},
				djRadios: {},
				userprofiles: {}
			}
		}
	},
	methods: {
		...mapMutations('search', {
            setSearchKeywords: 'SET_SEARCH_KEYWORDS'
        }),
		...mapActions('search', [
			'setSearchResult'
		]),
		// 获取数据
		getSearchResult(key, offset) {
			// 重置分页
			this.pageCurrent = (offset ? offset : 1)
			this.currentKey = key
			let type = this.nav[key].type
			this.type = type
			// && this.nav[key].result == false
			if (this.keywords !== '') {
				this.loading = true
				this.setSearchResult({
					keywords: this.keywords,
					limit: 20,
					offset: offset ? offset - 1 : 0,
					type,
					key
				})
			}
		},
		// 分页获取数据
		getPageData(page) {
			this.getSearchResult(this.currentKey, page)
		},
		// 字符串高亮匹配
        keywordsHighlight(str) {
			const keywords = this.$route.query.keywords
            if (keywords !== '') {
                const em = `<em>${keywords}</em>`
                return str.replace(keywords, em)
            }
		},
		// 时间转换
		timeFormat(time) {
            let minute = Math.floor(time / 60000)
			let second = (Math.floor( time % 60000) + '')
            let _minute = minute < 10 ? '0' + minute : minute
            let _second = second < 10000 ? ('0' + second).slice(-5, 2) : (second + '').slice(-5, 2)
            return `${_minute}:${_second}`
		},
		// 数量转换
		numFormat(num) {
            return num > 1e5 ? (Math.floor(num / 1e4) + '万') : num
		},
		// 设置单条歌词显示隐藏
		setLyricsShow(index) {
			console.log(index)
			let state = this.searchData.lyrics.result[index]
			state.lyricsShow = !state.lyricsShow
			// this.$set(state, 'lyricsShow', !state.lyricsShow)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../style/mixin";
.search-content{
	position: relative;
	overflow: hidden;
	.note{
		font-size: 14px;
		margin-bottom: 10px;
		em{
			font-style: normal;
			color: $main;
		}
	}
	.ivu-tabs{
		// height: 100%;
		color: $font_first;
		.ivu-tabs-bar{
			border-bottom: 2px solid $border_first;
			margin-bottom: 0;
			.ivu-tabs-nav{
				.ivu-tabs-ink-bar{
					background: $main;
				}
				.ivu-tabs-tab-active{
					color: $main;
				}
			}
		}
		.ivu-tabs-content{
			.ivu-tabs-tabpane{
				.errNote{
					margin-top: 100px;
					text-align: center;
					@include sc(14px, $font_first);
					em{
						font-style: normal;
						color: $main;
					}
				}
			}
		}
	}
	.ivu-page{
		text-align: center;
		margin: 20px 0;
	}
}
</style>
