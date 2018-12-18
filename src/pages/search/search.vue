<template>
    <div class="search">
		<div class="note">搜索"{{ keyword }}"</div>
		<Tabs :animated="false">
			<TabPane label="标签一">标签一的内容</TabPane>
			<TabPane label="标签二">标签二的内容</TabPane>
			<TabPane label="标签三">标签三的内容</TabPane>
		</Tabs>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('search')

export default {
	created() {
	},
	components: {
	},
	computed: {
		...mapState([
		]),
		keyword() {
			return this.$route.query.keyword
		},
		type() {
			return this.$route.query.type
		}
	},
	data() {
		return {}
	},
	methods: {
		...mapActions([
		])
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../style/mixin";
.search{
	.note{
		font-size: 14px;
		margin-bottom: 10px;
	}
}
</style>
