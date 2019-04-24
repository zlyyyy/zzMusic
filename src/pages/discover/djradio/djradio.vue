<template>
    <div class="djradio">
        <div class="dj-catelis">
            <div ref="djCatelisContent" class="dj-catelis-content" :style="{left: catelisLeft+'px'}">
                <div
                    class="dj-catelis-item"
                    v-for="(item, index) in djCatelist"
                    :key="`${item.name}${index}`"
                    :class="{active: index == djCatelistCurrent}"
                    >
                    <div class="icon-box">
                        <div class="icon" :style="{'background-image':'url('+item.pic96x96Url+')'}"></div>
                    </div>
                    <div class="name">{{item.name}}</div>
                </div>
            </div>
        </div>
        <div class="handle-btns">
            <div class="handle-btns-left" @click="catelisBtnLeft">
                <Icon size="30" color="#7B7B7B" type="ios-arrow-back" />
            </div>
            <div class="handle-btns-right" @click="catelisBtnRight">
                <Icon size="30" color="#7B7B7B" type="ios-arrow-forward" />
            </div>
        </div>
        <zz-loading v-if="loading"></zz-loading>
    </div>
</template>

<script>
import { getDjCatelist, getDjRecommendType } from '@/api'

export default {
	props: {
	},
	created() {
		this.$nextTick(() => {
            // 获取当前屏幕宽度
            this.screenWidth = document.documentElement.clientWidth - 240
            // 获取电台分类
            getDjCatelist().then(res => {
                this.djCatelist = res.categories
                this.setDjCatelistData()
            })
		})
    },
    mounted() {
        // 监听窗口宽度变化
        let _this = this
        window.onresize = function() {
            _this.screenWidth = document.documentElement.clientWidth - 240
        }
    },
	components: {
	},
	computed: {
        djCatelisContentWidth() {
            return this.$refs.djCatelisContent.offsetWidth
        }
	},
	data() {
		return {
            screenWidth: 0,
            loading: false,
            catelisLeft: 0,
            djCatelist: [],
            djCatelistCurrent: 0,
            djCatelistData: []
        }
	},
	methods: {
        catelisBtnLeft() {
            if (this.catelisLeft != 0) {
                this.catelisLeft += this.screenWidth
            }
        },
        catelisBtnRight() {
            if (this.catelisLeft * -1 < this.djCatelisContentWidth - this.screenWidth) {
                this.catelisLeft -= this.screenWidth
            }
        },
        setDjCatelistData() {
            const params = {
                type: this.djCatelist[this.djCatelistCurrent].id
            }
            getDjRecommendType(params).then(res => {
                console.log(res)
            })
        }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../style/mixin";
.djradio{
    position: relative;
    .dj-catelis{
        position: relative;
        height: 110px;
        overflow: hidden;
        .dj-catelis-content{
            position: absolute;
            width: auto;
            @include wh(300%, 110px);
            transition: all .3s;
            .dj-catelis-item{
                position: relative;
                display: inline-block;
                margin-right: 10px;
                padding: 10px 20px;
                border-radius: 3px;
                box-sizing: border-box;
                cursor: pointer;
                .icon-box{
                    @include wh(50px, 50px);
                    overflow: hidden;
                    margin: 0 auto;
                    .icon{
                        @include wh(50px, 50px);
                        background-repeat: no-repeat;
                        background-size: cover;
                        transform: translateY(-50px);
                        filter: drop-shadow(#7B7B7B 0 50px);
                    }
                }
                .name{
                    margin-top: 10px;
                    @include sc(14px, $font_second);
                    line-height: 30px;
                    text-align: center;
                }
                &:hover{
                    background: #f6f7f7;
                }
                &.active{
                    .icon-box{
                        .icon{
                            filter: drop-shadow($main 0 50px);
                        }
                    }
                    .name{
                        color: $main;
                    }
                }
            }
        }
    }
    .handle-btns{
        position: absolute;
        top: 30px;
        left: 0;
        width: 100%;
        .handle-btns-left{
            position: absolute;
            left: -15px;
            @include wh(30px, 30px);
            cursor: pointer;
        }
        .handle-btns-right{
            position: absolute;
            right: -15px;
            @include wh(30px, 30px);
            cursor: pointer;
        }
    }
}
</style>
