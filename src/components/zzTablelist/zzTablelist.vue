<template>
    <div class="zz-table">
		<ul class="zz-table-list">
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

.zz-table{
	@include wh(100%, 100%);
	.zz-table-list{
		.artists{
			height: 60px;
			.zz-table-list-item{
				padding: 10px 0;
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
}
</style>
