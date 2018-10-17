<template>
    <el-main class="contain">
		<h1 class="title">个性推荐</h1>
        <carousel :banner="banner"></carousel>
    </el-main>
</template>

<script>
import Carousel from '../../components/carousel/carousel'
import { mapGetters, mapActions } from 'vuex'

export default {
	props: {
		scrollTop: {
			type: [Number],
			default: 0
		}
	},
	created() {
		this.setBanner()
	},
	components: {
		Carousel
	},
	computed: {
		...mapGetters([
			'banner'
		])
	},
	data() {
		return {}
	},
	methods: {
		...mapActions([
			'setBanner'
		])
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../style/mixin";
.contain{
	.title{
		font-weight: bolder;
		font-size: 18px;
		margin-bottom: 10px;
	}
}
</style>
