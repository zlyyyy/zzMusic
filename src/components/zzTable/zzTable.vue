<template>
    <div class="zz-table">
        <ul class="zz-table-header">
			<li v-for="(item, index) in columns" :class="item.class" :key="index">
				{{ item.title }}
			</li>
		</ul>
		<ul class="zz-table-list">
			<li v-for="(item, index) in data" :key="index" :class="{ 'all-list': item.lyrics }">
				<div class="zz-table-list-item" :class="{ all: item.lyrics }">
					<span class="number">{{ index | numberFormat }}</span>
					<span class="handle">
						<i class="iconfont icon-like"></i>
					</span>
					<span v-html="keywordsHighlight(item.name)"></span>
					<span>{{ item.artists | artistsFormat }}</span>
					<span v-html="keywordsHighlight(item.album.name)"></span>
					<span class="duration">{{ item.duration | timeFormat }}</span>
				</div>
				<div class="lyrics" v-if="item.lyrics" :class="{ 'show': item.lyricsShow }">
					<div class="lyrics-list" v-html="lyricsFormat2(item.lyrics)"></div>
					<div class="lyrics-set">
						<span class="lyrics-show" @click="setLyricsShow(index)">{{ setLyricsBtnText(item.lyricsShow) }}</span>
					</div>
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
		},
		// 歌词格式化
		lyricsFormat(val) {
			let keywords = this.$route.query.keywords
			let _val = val.replace(/\n/g, '<br />' )
			let first = _val.indexOf(keywords)
			// 字符串所有组合结果
			let tree = function(leafs) {
				let branches = []
				if ( leafs.length == 1 ) return leafs
				for ( let k in leafs ) {
					let leaf = leafs[k]
					tree(leafs.join('').replace(leaf, '').split('')).concat('').map(function(subtree) {
						branches.push([leaf].concat(subtree))
					})
				}
				return branches
			}
			let allVal = tree(keywords.split('')).map( function(str) { return str.join('') })
			if (first == 0 || first == -1) {
				allVal.forEach((val, key) => {
					if (first == 0 || first == -1) {
						first = _val.indexOf(val)
						keywords = allVal[key]
					}
				})
			}
			let em = `<em>${keywords}</em>`
			let resultVal = _val.substring(first).replace(keywords, em)
			console.log(resultVal)
			return resultVal
		},
		lyricsFormat2(val) {
			let keywords
			let first
			let second
			val.range.forEach(item => {
				first = item.first
				second = item.second
				keywords = val.txt.substring(first, second)
			})
			let _val = val.txt.substring(first).replace(/\n/g, '<br />' )
			let em = `<em>${keywords}</em>`
			let resultVal = _val.replace(keywords, em)
			return resultVal
		},
		// 歌词显示隐藏
		setLyricsShow(index) {
			this.$emit('setLyricsShow', index)
			this.$forceUpdate()
		},
		// 歌词显示隐藏
		setLyricsBtnText(state) {
			return state ? '收起歌词' : '展开歌词'
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
			// height: 40px;
			cursor: pointer;
			transition: all ease .3s;
			&:nth-child(2n){
				.zz-table-list-item{
					transition: all ease .3s;
					background: #f5f7fa;
				}
			}
			&:hover{
				.zz-table-list-item{
					transition: all ease .3s;
					background: #ecf5ff;
				}
			}
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
			&.all-list{
				cursor: auto;
				.zz-table-list-item{
					&.all{
						background: #f5f7fa;
					}
				}
				.lyrics{
					padding: 10px 0 10px 120px;
					@include sc(12px, $font_second);
					line-height: 20px;
					overflow: hidden;
					height: 100px;
					transition: all ease .3s;
					&:hover{
						transition: all ease .3s;
						background: #ecf5ff;
					}
					&.show{
						height: 100%;
					}
					.lyrics-list{
						float: left;
						padding:  0 10px;
						width: calc((100% - 140px) / 3);
						height: 100%;
						overflow: hidden;
						em{
							font-style: normal;
							color: $main;
						}
					}
					.lyrics-set{
						float: left;
						width: calc((100% - 140px) / 3);
						height: 30px;
						padding:  0 10px;
						.lyrics-show{
							cursor: pointer;
							border: 1px solid $border_first;
							border-radius: 3px;
							padding: 5px 10px;
							@include sc(12px, $font_first);
							transition: all ease .3s;
							&:hover{
								transition: all ease .3s;
								border: 1px solid $main;
								color: $main;
							}
						}
					}
				}
			}
		}
	}
}

</style>
