<template>
    <div class="playlist">
		<div class="infor">
			<div class="cover">
				<img :src="playlistDetail.coverImgUrl"/>
			</div>
			<div class="infor-content">
				<div class="title">
					<span class="sign">歌单</span>
					<span class="txt">{{ playlistDetail.name }}</span>
				</div>
				<div class="user">
					<div class="avatar">
						<img :src="playlistDetail.avatarUrl"/>
					</div>
					<div class="nickname">{{ playlistDetail.nickname }}</div>
					<div class="create-time">{{ playlistDetail.createTime + '创建' }}</div>
					<div class="update-time">{{ playlistDetail.updateTime + '更新' }}</div>
				</div>
				<div class="btns">
					<div class="playall-btn">
						<span class="i-play">
							<i class="iconfont icon-play2"></i>
						</span>
						<span class="txt">
							播放全部
						</span>
						<span class="i-add">
							<i class="iconfont icon-enlarge"></i>
						</span>
					</div>
				</div>
				<div v-if="playlistDetail.tags != null" class="tags" v-html="playlistDetail.tags">
				</div>
				<div v-if="playlistDetail.description != null" class="des" v-html="playlistDetail.description" :class="{ 'el': !desShow }">
				</div>
				<div v-if="playlistDetail.description != null" class="des-btn" @click="desShow = !desShow">
					{{ desShow ? '收起' : '展开' }}
					<Icon v-if="!desShow" type="ios-arrow-down" />
					<Icon v-else type="ios-arrow-up" />
				</div>
				<div class="total">
					<div class="trackCount">
						<span class="txt">歌曲数</span>
						<span class="num">{{ playlistDetail.trackCount }}</span>
					</div>
					<div class="playCount">
						<span class="txt">播放数</span>
						<span class="num">{{ numFormat(playlistDetail.playCount) }}</span>
					</div>
				</div>
			</div>
		</div>
		<Tabs :animated="false" :value="currentKey + ''">
			<TabPane label="歌曲列表" name="0">
				<zz-table
					:data="playlist.result"
					:columns="playlist.tableColumns"
				/>
			</TabPane>
		</Tabs>
		<zz-loading v-if="loading"></zz-loading>
    </div>
</template>

<script>
import zzTable from '../../components/zzTable/zzTable'
import zzLoading from '../../components/zzLoading/zzLoading'
import { mapState, mapActions } from 'vuex'

export default {
	created() {
		this.$nextTick(() => {
			// 获取数据
			this.setPlaylistDetail(this.queryId)
		})
	},
	components: {
		zzTable,
		zzLoading
	},
	computed: {
		...mapState('playlist', [
			'loading',
			'playlistDetail'
		]),
		queryId() {
			// 动态展示地址栏查询id
			return this.$route.query.id
		}
	},
	watch: {
		queryId(newVal, oldVal) {
			// 获取数据
			this.setPlaylistDetail(newVal)
		},
		playlistDetail(newVal, oldVal) {
			this.playlist.tableColumns = [
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
			let _data = []
			newVal.tracks.forEach((ele, index) => {
				let _artists = []
				// 歌手数据筛选
				ele.ar.forEach((el, index) => {
					const _el = {
						name: el.name,
						id: el.id
					}
					_artists = [..._artists, _el]
				})
				// 歌单列表数据筛选
				const _ele = {
					name: ele.name,
					id: ele.id,
					artists: _artists,
					album: {
						id: ele.al.id,
						name: ele.al.name
					},
					duration: ele.dt
				}
				_data = [..._data, _ele]
			})
			this.playlist.result = _data
		}
	},
	data() {
		return {
			currentKey: 0,
			desShow: false,
			playlist: {}
		}
	},
	methods: {
		...mapActions('playlist', [
			'setPlaylistDetail'
		]),
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
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../style/mixin";
.playlist{
	overflow: hidden;
	.infor{
		overflow: hidden;
		.cover{
			float: left;
			width: 198px;
			img{
				width: 100%;
			}
		}
		.infor-content{
			position: relative;
			float: left;
			width: calc(100% - 198px);
			padding: 0 0 30px 20px;
			.title{
				height: 30px;
				margin-bottom: 10px;
				.sign{
					float: left;
					@include sc(14px, $main);
					padding: 5px;
					height: 30px;
					border: 1px solid $main;
				}
				.txt{
					float: left;
					line-height: 30px;
					padding-left: 10px;
					@include sc(20px, $font_first);
				}
			}
			.user{
				height: 40px;
				margin-bottom: 10px;
				.avatar{
					float: left;
					@include wh(40px, 40px);
					border-radius: 50%;
					overflow: hidden;
					img{
						width: 100%;
					}
				}
				.nickname{
					float: left;
					padding-left: 10px;
					@include sc(14px, $font_second);
					line-height: 40px;
				}
				.create-time, .update-time{
					float: left;
					padding-left: 10px;
					@include sc(12px, $font_third);
					line-height: 40px;
				}
			}
			.tags{
				@include sc(12px, $font_first);
				height: 26px;
				line-height: 26px;
				em{
					@include sc(12px, $main);
					font-style: normal;
				}
			}
			.des{
				@include sc(12px, $font_first);
				line-height: 26px;
				overflow: hidden;
				&.el{
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
			}
			.des-btn{
				position: absolute;
				right: 0;
				bottom: 0;
				@include sc(12px, $main);
				cursor: pointer;
				i{
					position: relative;
					left: -3px;
					top: -2px;
					font-size: 18px;
				}
			}
			.total{
				position: absolute;
				right: 0;
				top: 0;
				span{
					display: block;
					@include sc(12px, $font_second);
					text-align: right;
				}
				.trackCount{
					float: left;
					padding-right: 10px;
				}
				.playCount{
					float: left;
					padding-left: 10px;
					border-left: 1px solid $border_first;
				}
			}
		}
	}
}
</style>
