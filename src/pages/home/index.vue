<template>
    <el-main class="contain">
        <h1 class="title">手机号码</h1>
    </el-main>
</template>

<script>
import { mapState } from 'vuex'

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
		return {}
	},
	methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../style/mixin";

</style>
