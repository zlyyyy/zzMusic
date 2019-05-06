<template>
    <div class="toplist">
		<div class="toplist-menu-official">
			<div class="toplist-menu-title">
				官方榜
			</div>
			<div class="toplist-menu-official-content">
				<div
					class="toplist-menu-official-content-item"
					v-for="(item, index) in toplist"
					:key="`${item.name}${index}`"
					v-if="index<4"
					>
					<div class="toplist-menu-official-content-item-infor">
						<div class="img">
							<img :src="item.coverImgUrl" />
						</div>
						<div class="update-text">
							{{ item.updateTime | timeFormatterMD }}
						</div>
					</div>
					<div class="toplist-menu-official-content-item-content">
						<div
							class="toplist-menu-official-content-item-content-item"
							v-for="(option, ind) in item.data"
							:key="`${option.name}${ind}`"
							v-if="ind<5"
							@dblclick="setSelectMusicInfor(option)"
							>
							<div class="number" :class="{top: ind<3}">{{ ind+1 }}</div>
							<div class="ratio">{{ option.ratio}}</div>
							<div class="name ellipsis">{{ option.album.name }}</div>
							<div class="artists">{{ option.artists | artistsFormat }}</div>
						</div>
						<router-link
							class="toplist-menu-official-content-item-content-more"
							:to="{path: '/music/playlist', query: { id: item.id }}"
							tag="div"
						>
						查看全部 >
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="toplist-menu-global">
			<div class="toplist-menu-title">
				全球榜
			</div>
			<div class="toplist-menu-global-content">
				<div
					class="toplist-menu-global-content-item"
					v-for="(item, index) in toplist"
					:key="`${item.name}${index}`"
					v-if="index>3"
					>
					<router-link
						class="toplist-menu-global-content-item-infor"
						:to="{path: '/music/playlist', query: { id: item.id }}"
						tag="div"
						>
						<div class="img">
							<img :src="item.coverImgUrl" />
						</div>
						<div class="name">{{item.name}}</div>
					</router-link>
				</div>
			</div>
		</div>
		<zz-loading v-if="loading"></zz-loading>
    </div>
</template>

<script>
import { getToplist, getTopListData } from '@/api'
import { mapActions } from 'vuex'

export default {
	props: {
	},
	created() {
		this.$nextTick(() => {
			// 获取所有榜单
			getToplist().then(res => {
				let _data = []
				res.list.forEach((ele, index) => {
					let data = []
					const {
						id,
						name,
						coverImgUrl,
						createTime,
						description,
						updateFrequency,
						updateTime
					} = ele
					let _ele = {
						id,
						name,
						coverImgUrl,
						createTime,
						description,
						updateFrequency,
						updateTime,
						data
					}
					if (index < 4) {
						const params = {
							idx: this.getKey(name)
						}
						getTopListData(params).then(_res => {
							let _eleData = []
							_res.playlist.tracks.forEach(trackEle => {
								let _artists = []
								// 歌手数据筛选
								trackEle.ar.forEach((arEle, index) => {
									const _arEle = {
										name: arEle.name,
										id: arEle.id
									}
									_artists = [..._artists, _arEle]
								})
								// 歌单列表数据筛选
								const _trackEle = {
									name: trackEle.name,
									id: trackEle.id,
									artists: _artists,
									album: {
										id: trackEle.al.id,
										name: trackEle.al.name,
										picUrl: trackEle.al.picUrl
									},
									fee: trackEle.fee,
									duration: trackEle.dt,
									ratio: _res.playlist.trackIds[index].ratio ? `${_res.playlist.trackIds[index].ratio}%` : '-'
								}
								_eleData = [..._eleData, _trackEle]
							})
							_ele.data = _eleData
						})
					}
					_data = [..._data, _ele]
				})
				this.toplist = _data
				this.loading = false
			})
		})
	},
	filters: {
		timeFormatterMD(timestamp) {
			let date = timestamp > 1e10 ? new Date(timestamp) : new Date(timestamp * 1000)
			let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
			let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ''
			return `${M}月${D}日更新`
		},
		// 歌手格式化
		artistsFormat(val) {
			let _val
			if (!val) {
				return
			}
			val.forEach((ele, index) => {
				if (ele.name != '') {
					index > 0 ? _val += ` / ${ele.name}` : _val = ele.name
				}
			})
			return _val
		}
	},
	components: {
	},
	computed: {
	},
	data() {
		return {
			loading: true,
			toplist: []
		}
	},
	methods: {
		...mapActions([
            'setMusicInfor'
		]),
		// 播放音乐
		setSelectMusicInfor(item) {
            if (item.fee != 0) {
                this.setMusicInfor(item)
            } else {
                this.$Message.warning('暂无资源版权')
            }
		},
		getKey(name) {
			const _keys = [
				'云音乐新歌榜',
				'云音乐热歌榜',
				'网易原创歌曲榜',
				'云音乐飙升榜',
				'云音乐电音榜',
				'UK排行榜周榜',
				'美国Billboard周榜',
				'KTV嗨榜',
				'iTunes榜',
				'Hit FM Top榜',
				'日本Oricon周榜',
				'韩国Melon排行榜周榜',
				'韩国Mnet排行榜周榜',
				'韩国Melon原声周榜',
				'中国TOP排行榜(港台榜)',
				'中国TOP排行榜(内地榜)',
				'香港电台中文歌曲龙虎榜',
				'华语金曲榜',
				'中国嘻哈榜',
				'法国 NRJ EuroHot 30周榜',
				'台湾Hito排行榜',
				'Beatport全球电子舞曲榜',
				'云音乐ACG音乐榜',
				'云音乐嘻哈榜'
			]
			let _name = ''
			_keys.forEach((ele, index) => {
				ele == name ? _name = index : null
			})
			return _name
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../style/mixin";
.toplist{
	position: relative;
	.toplist-menu-title{
		@include sc(16px, $font_first);
		font-weight: bold;
		line-height: 40px;
		margin-bottom: 10px;
	}
	.toplist-menu-official-content{
		width: 100%;
		overflow: hidden;
		font-size: 0;
		.toplist-menu-official-content-item{
			width: 100%;
			margin-bottom: 20px;
			.toplist-menu-official-content-item-infor{
				position: relative;
				display: inline-block;
				@include wh(200px, 200px);
				.img{
					@include wh(100%, 100%);
					border-radius: 8px;
					overflow: hidden;
					img{
						@include wh(100%, 100%);
					}
				}
				.update-text{
					position: absolute;
					top: 130px;
					width: 100%;
					text-align: center;
					@include sc(14px, $white);
				}
			}
			.toplist-menu-official-content-item-content{
				display: inline-block;
				width: calc(100% - 220px);
				vertical-align: top;
				margin-left: 20px;
				.toplist-menu-official-content-item-content-item{
					line-height: 40px;
					font-size: 0;
					width: 100%;
					cursor: pointer;
					&:not(:nth-child(2n)){
						transition: all ease .3s;
						background: #f5f7fa;
					}
					&:hover{
						transition: all ease .3s;
						background: #f2f2f2;
					}
					.number{
						display: inline-block;
						vertical-align: top;
						font-size: 14px;
						font-weight: bolder;
						color: $font_second;
						text-align: center;
						width: 20px;
						padding-left: 10px;
						&.top{
							color: $red;
						}
					}
					.ratio{
						display: inline-block;
						vertical-align: top;
						@include sc(12px, $font_third);
						text-align: center;
						transform: scale(0.7);
						width: 40px;
					}
					.name{
						display: inline-block;
						vertical-align: top;
						@include sc(12px, $font_first);
						text-align: left;
						width: calc(100% - 280px);
					}
					.artists{
						display: inline-block;
						vertical-align: top;
						@include sc(12px, $font_first);
						text-align: right;
						width: 200px;
						padding-right: 10px;
					}
				}
				.toplist-menu-official-content-item-content-more{
					line-height: 40px;
					@include sc(12px, $font_second);
					text-align: left;
					width: 100%;
					padding-left: 10px;
					cursor: pointer;
				}
			}
		}
	}
	.toplist-menu-global-content{
		.toplist-menu-global-content-item{
			display: inline-block;
			width: calc(25% - 20px);
			margin:  0 26px 20px 0;
			cursor: pointer;
			&:nth-child(4n){
				margin-right: 0;
			}
			.toplist-menu-global-content-item-infor{
				position: relative;
				display: inline-block;
				width: 100%;
				.img{
					width: 100%;
					overflow: hidden;
					img{
						width: 100%;
						border-radius: 8px;
					}
				}
				.name{
					width: 100%;
					@include sc(14px, $font_first);
					text-align: left;
					line-height: 30px;
				}
			}
		}
	}
}
</style>
