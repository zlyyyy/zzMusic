<template>
    <div class="search-content">
		<div class="note" v-html="note"></div>
		<Tabs :animated="false" @on-click="getSearchResult">
			<TabPane label="单曲" name="0">
				<zz-table
					v-if="type == 1"
					:data="searchData.songs.result"
					:columns="searchData.songs.tableColumns"
				/>
			</TabPane>
			<TabPane label="歌手" name="1">
				<div class="zz-table" v-if="type == 100">
					<ul class="zz-table-list">
						<li class="artists" v-for="(item, index) in searchData.artists.result" :key="index">
							<div class="zz-table-list-item">
								<span class="img"><img :src="item.picUrl"/></span>
								<span class="name">{{ item.name }}</span>
								<span class="alias">{{ item.alias==''? '' : item.alias }}</span>
							</div>
						</li>
					</ul>
				</div>
			</TabPane>
			<TabPane label="专辑" name="2">
				<div class="zz-table" v-if="type == 10">
					<ul class="zz-table-list">
						<li class="artists" v-for="(item, index) in searchData.albums.result" :key="index">
							<div class="zz-table-list-item">
								<span class="img"><img :src="item.picUrl"/></span>
								<span v-html="keywordsHighlight(item.name)"></span>
								<span>{{ item.artists==''? '' : item.artists }}</span>
							</div>
						</li>
					</ul>
				</div>
			</TabPane>
			<TabPane label="视频" name="3">
				<div class="zz-video" v-if="type == 1014">
					<ul class="zz-video-list">
						<li class="video" v-for="(item, index) in searchData.videos.result" :key="index">
							<div class="cover">
								<img :src="item.coverUrl" />
								<p class="msk-1">{{ Math.floor(item.playTime/1e4)+'万'  }}</p>
								<p class="msk-2">{{ timeFormat(item.durationms) }}</p>
							</div>
							<p class="title">{{ item.title }}</p>
							<p class="name">{{ 'by ' + item.creator[0].userName }}</p>
						</li>
					</ul>
				</div>
			</TabPane>
		</Tabs>
    </div>
</template>

<script>
import zzTable from '../../components/zzTable/zzTable'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
	created() {
		this.$nextTick(() => {
			this.setSearchKeywords(this.keywords)
			this.getSearchResult(0)
		})
	},
	components: {
		zzTable
	},
	computed: {
		...mapState('search', [
			'nav',
			'result'
		]),
		keywords() {
			return this.$route.query.keywords
		},
		queryType() {
			return this.$route.query.type ? this.$route.query.type : 1
		}
	},
	watch: {
		result(newVal, oldVal) {
			let _data = []
			let _text = `搜索"<em>${this.keywords}</em>"，找到`
			let _searchData = this.searchData
			// 列表数据筛选
			switch (this.type) {
				case 1:
					const songs = _searchData.songs
					songs.resultCount = newVal.songCount
					this.note = `${_text}${songs.resultCount}首单曲`
					songs.tableColumns = [
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
					songs.result = _data
					break
				case 100:
					const artists = _searchData.artists
					artists.resultCount = newVal.artistCount
					this.note = `${_text}${artists.resultCount}位歌手`
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
					artists.result = _data
					break
				case 10:
					const albums = _searchData.albums
					albums.resultCount = newVal.albumCount
					this.note = `${_text}${albums.resultCount}位歌手`
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
					albums.result = _data
					break
				case 1014:
					const videos = _searchData.videos
					videos.resultCount = newVal.videoCount
					this.note = `${_text}${videos.resultCount}位歌手`
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
					videos.result = _data
					break
				default:
					break
			}
		}
	},
	data() {
		return {
			type: 0,
			note: '',
			searchData: {
				songs: {},
				artists: {},
				albums: {},
				videos: {},
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
		getSearchResult(key) {
			let type = this.nav[key].type
			this.type = type
			this.setSearchResult({
				keywords: this.keywords,
				limit: 10,
				offset: 0,
				type,
				key
			})
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
        }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../style/mixin";
.search-content{
	height: 100%;
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
		height: 100%;
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
			height: 100%;
			.zz-table-list{
				.artists{
					padding: 10px 0;
					height: 60px;
					.zz-table-list-item{
						.img{
							flex: none;
							img{
								@include wh(40px, 40px);
							}
						}
						.name{
							flex: none;
						}
						.alias{
							flex: none;
							padding: 0;
							@include sc(12px, $font_second);
						}
					}
				}
			}
			.zz-video{
				@include wh(100%, 100%);
				.zz-video-list{
					.video{
						float: left;
						width: 20%;
						padding: 0 0 40px 26px;
						line-height: 1.5;
						overflow: hidden;
						.cover{
							width: 100%;
							img{
								width: 100%;
							}
						}
					}
				}
			}
		}
	}
}
</style>
