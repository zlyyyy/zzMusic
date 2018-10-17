<template>
    <div class="search">
        <div class="title" v-if="titleShow">{{ title }}</div>
        <el-autocomplete
            name="热门搜索"
            popper-class="my-autocomplete"
            v-model="state"
            label="热门搜索"
            :fetch-suggestions="querySearch"
            placeholder="搜索音乐、视频、歌词、电台"
            @focus="handleFocus"
            @blur="handleBlur"
            @select="handleSelect">
            <i
                class="el-icon-search el-input__icon"
                slot="suffix"
                @click="handleIconClick">
            </i>
            <template slot-scope="{ item }">
                <div v-if="item.key == 0">热门搜索</div>
                <div class="name">{{ item.first }}</div>
            </template>
        </el-autocomplete>
    </div>
</template>

<script>
export default {
    props: {
        hots: {
            type: [Object, Array],
            default: () => []
        }
    },
    data() {
        return {
            title: '热门搜索',
            titleShow: false,
            state: ''
        }
    },
    methods: {
        querySearch(queryString, cb) {
            var hots = this.hots
            var results = queryString ? hots.filter(this.createFilter(queryString)) : hots
            // 调用 callback 返回建议列表的数据
            cb(results)
        },
        createFilter(queryString) {
            return (hots) => {
                return (hots.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
            }
        },
        handleSelect(item) {
            console.log(item)
        },
        handleIconClick(ev) {
            console.log(1)
        },
        handleFocus(event) {
            // fnputocus事件
            this.$emit('getSearchHot')
            this.titleShow = true
        },
        handleBlur(event){
            // input失去焦点
            this.titleShow = false
        }
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.search{
    position: relative;
    float: left;
    margin-left: 20px;
    .title{
        position: absolute;
        top: 56px;
        font-size: 14px;
        padding: 7px 30px;
        width: 100%;
        border-bottom: 1px solid $border_first;
        z-index: 9999;
    }
    .el-autocomplete{
        .el-input{
            width: 300px;
        }
    }
}
.my-autocomplete{
    .el-scrollbar{
        border: 1px solid $border_second;
        .el-scrollbar__wrap{
            margin-top: 40px;
            border: none;
            li {
                line-height: normal;
                padding: 7px 30px
            }
        }
    }
}
</style>