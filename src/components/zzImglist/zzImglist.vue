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
		font-size: 0;
		.img, .video{
			display: inline-block;
			width: 20%;
			vertical-align: top;
			padding: 0 0 26px 26px;
			line-height: 1.5;
			cursor: pointer;
			overflow: hidden;
			.cover{
				position: relative;
				width: 100%;
				img{
					width: 100%;
				}
				p{
					width: 100%;
					height: 20px;
					line-height: 20px;
					@include sc(12px, $white);
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
				.link{
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					z-index: 9;
				}
			}
			.name{
				width: 100%;
				height: auto;
				margin: 2px 0 1px;
				@include sc(12px, $font_second);
			}
			.title{
				display: block;
				@include wh(100%, auto);
				margin: 7px 0 1px;
				border: none;
				line-height: 20px;
				@include sc(14px, $font_first);
				font-weight: normal;
				&.el{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					word-wrap: normal;
				}
			}
		}
	}
}
</style>
