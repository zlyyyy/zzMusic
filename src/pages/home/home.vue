<template>
    <div class="home">
		<h1 class="title">个性推荐</h1>
		<!-- <slide :slidedata="banner" :slidetimedata="4000" :pagation="false"></slide> -->
		<h1 class="title">推荐歌单</h1>
    </div>
</template>

<script>
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
		this.setPersonalized()
	},
	components: {
	},
	computed: {
		...mapGetters([
			'banner',
			'personalized'
		])
	},
	data() {
		return {}
	},
	methods: {
		...mapActions([
			'setBanner',
			'setPersonalized'
		])
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../style/mixin";
.home{
	overflow: hidden;
	.title{
		font-weight: bolder;
		font-size: 18px;
		margin-bottom: 10px;
	}
}
</style>
