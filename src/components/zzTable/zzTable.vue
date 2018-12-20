<template>
    <div class="zz-table">
        <ul class="zz-table-header">
			<li v-for="(item, index) in columns" :class="item.class" :key="index">
				{{ item.title }}
			</li>
		</ul>
		<ul class="zz-table-list">
			<li v-for="(item, index) in data" :key="index">
				<div class="zz-table-list-item">
					<span class="number">{{ index | numberFormat }}</span>
					<span class="handle">
						<i class="iconfont icon-like"></i>
					</span>
					<span v-html="keywordsHighlight(item.name)"></span>
					<span>{{ item.artists | artistsFormat }}</span>
					<span v-html="keywordsHighlight(item.album.name)"></span>
					<span class="duration">{{ item.duration | timeFormat }}</span>
				</div>
			</li>
		</ul>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: [Object, Array],
            default: () => []
        },
        columns: {
            type: [Object, Array],
            default: () => []
        }
	},
	filters: {
		// 序号格式化
		numberFormat(val) {
			const _val = val + 1
			return _val > 9 ? _val : '0' + _val
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
		},
		// 时间转换
		timeFormat(time) {
            let minute = Math.floor(time / 60000)
			let second = (Math.floor( time % 60000) + '')
            let _minute = minute < 10 ? '0' + minute : minute
            let _second = second < 10000 ? ('0' + second).slice(-5, 2) : (second + '').slice(-5, 2)
            return `${_minute}:${_second}`
        }
	},
    computed: {
    },
    data () {
        return {
        }
    },
    methods: {
		// 字符串高亮匹配
        keywordsHighlight(str) {
			const keywords = this.$route.query.keywords
            if (keywords !== '') {
                const em = `<em>${keywords}</em>`
                return str.replace(keywords, em)
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../style/mixin';

.zz-table{
	@include wh(100%, 100%);
	.zz-table-header{
		display: flex;
		@include wh(100%, 40px);
		border-bottom: 1px solid $border_first;
		li{
			flex: 1;
			@include sc(14px, $font_first);
			padding: 0 10px;
			line-height: 40px;
			&.number, &.handle{
				flex: none;
				width: 60px;
			}
			&.duration{
				flex: none;
				width: 80px;
			}
		}
	}
	.zz-table-list{
		li{
			height: 40px;
			cursor: pointer;
			transition: all ease-in .3s;
			.zz-table-list-item{
				display: flex;
				@include wh(100%, 100%);
				span{
					flex: 1;
					@include sc(14px, $font_second);
					padding: 0 10px;
					line-height: 40px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					&.number, &.handle{
						flex: none;
						width: 60px;
					}
					&.duration{
						flex: none;
						width: 80px;
					}
					em{
						font-style: normal;
						color: $main;
					}
				}
			}
			&:nth-child(2n){
				background: #f5f7fa;
			}
			&:hover{
				background: #ecf5ff;
			}
		}
	}
}

</style>
