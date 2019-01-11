<template>
    <div class="everyday">
		<div class="daily">
			<div class="date">
				<div class="weekday">{{ '星期' + weekDay }}</div>
				<div class="day">{{ day }}</div>
			</div>
			<div class="note">
				<h1>每日歌曲推荐</h1>
				<p>根据你的音乐口味生成，每天6:00更新</p>
			</div>
		</div>
		<div class="content">
			<div class="btns">
				<div class="playall-btn" @click="playAll()">
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
			<zz-table
				:data="recSongs"
				@setSelectMusicInfor="setMusicInfor"
			/>
		</div>
    </div>
</template>

<script>
import zzTable from '../../../components/zzTable/zzTable'
import { day, weekDay } from '../../../utils/utils'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
	created() {
		this.$nextTick(() => {
			// 是否登录获取推荐歌单
			if (this.loginStatus) {
				// 用户每日推荐歌单
				this.setRecommendSongs()
			} else {
			}
		})
	},
	components: {
		zzTable
	},
	computed: {
		...mapState('user', {
			loginStatus: state => state.loginStatus, // 登录状态
			recSongs: state => state.recommendSongs // 已登录-每日歌曲推荐
		}),
		day() {
			return day()
		},
		weekDay() {
			return weekDay()
		}
	},
	data() {
		return {}
	},
	methods: {
		...mapActions([
			'setMusicInfor',
			'setPlaylist',
			'setHistoryList'
		]),
		...mapActions('user', [
			'setRecommendSongs'
		]),
		// 数量转换
		numFormat(num) {
            return num > 1e5 ? (Math.floor(num / 1e4) + '万') : num
		},
		// 播放全部
		playAll() {
			this.setPlaylist(this.recSongs)
			this.setHistoryList(this.recSongs)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../style/mixin";
.everyday{
	overflow: hidden;
	.daily{
		padding: 20px 0;
		overflow: hidden;
		.date{
			display: block;
			float: left;
			@include wh(134px, 134px);
			background: #fff;
			border: 1px solid #DCDFE6;
			.weekday{
				display: block;
				height: 33px;
				line-height: 33px;
				color: #303133;
				font-size: 14px;
				text-align: center;
			}
			.day{
				display: block;
				line-height: 102px;
				text-align: center;
				font-size: 94px;
				font-family: Arial, Helvetica, sans-serif;
				font-weight: bold;
				color: #202020;
			}
		}
		.note{
			float: left;
			margin: 20px 0 0 20px;
			h1{
				margin-bottom: 10px;
			}
		}
	}
	.content{
		padding-top: 10px;
		border-top:1px solid $border_first;
	}
}
</style>
