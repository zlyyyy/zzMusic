<template>
    <el-main class="contain">
        <h1 class="title">手机号码</h1>
    </el-main>
</template>

<script>
import { mapState } from "vuex";

export default {
	props: {
		scrollTop: {
			type: [Number],
			default: 0
		}
	},
	created() {},
		components: {},
	computed: {
		...mapState({
			peopleInfor: state => state
		})
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../style/mixin";

.contain {
	width: 1200px;
	margin: 0 auto;
	margin-top: 30px;
	.title {
		@include sc(18px, $blue);
		margin-bottom: 10px;
	}
	.main {
		.main-left {
			width: 290px;
			float: left;
			&.fixed {
				position: fixed;
				top: 0;
			}
		}
		.main-right {
			position: relative;
			float: right;
			width: calc(100% - 290px);
			padding-left: 20px;
		}
	}
}
</style>
