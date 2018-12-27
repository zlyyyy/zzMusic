<template>
    <div class="zz-img">
		<ul class="zz-img-list">
			<slot name="content"></slot>
		</ul>
	</div>
</template>

<script>
export default {
    props: {
	},
	filters: {
	},
    computed: {
    },
    data () {
        return {
        }
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../style/mixin";

.zz-img{
	@include wh(100%, 100%);
	.zz-img-list{
		margin: 26px 0 0 -26px;
		height: 100%;
		.img, .video{
			float: left;
			width: 20%;
			padding: 0 0 26px 26px;
			line-height: 1.5;
			cursor: pointer;
			overflow: hidden;
			.cover{
				position: relative;
				@include wh(134px, 134px);
				img{
					width: 100%;
				}
				p{
					height: 20px;
					line-height: 20px;
					color: $white;
					text-shadow: -2px 1px rgba(0,0,0,.4);
				}
				.msk-1{
					position: absolute;
					top: 0;
					right: 0;
					padding-right: 5px;
					box-sizing: border-box;
					text-align: right;
				}
				.msk-2{
					position: absolute;
					bottom: 3px;
					left: 0;
					padding-left: 5px;
				}
			}
			.title{
				width: 100%;
				height: auto;
				margin: 7px 0 1px;
				border: none;
				font-size: 14px;
				font-weight: normal;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-wrap: normal;
			}
		}
	}
}
</style>
