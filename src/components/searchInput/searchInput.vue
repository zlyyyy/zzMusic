<template>
    <div class="search">
        <AutoComplete
            class="search-select-dropdown"
            v-model="keywords"
            icon="ios-search"
            @on-focus="getHots"
            @on-select="searchMusic"
            @on-change="setSearchSuggest"
            placeholder="搜索音乐、视频、歌词、电台"
            style="width:300px"
            element-id="searchV"
            clearable
            transfer>
            <div class="demo-auto-complete-item" v-for="(item, index) in searchResult" :key="index" :class="{border: searchResult.length > 2}">
                <div class="demo-auto-complete-group">
                    <span>{{ item.title }}</span>
                </div>
                <Option v-for="option in item.children" :value="setOption(item,option)" :key="option.index">
                    <span class="demo-auto-complete-title" v-html="setOption(item,option)"></span>
                </Option>
            </div>
            <a :href="'/search?keywords='+keywords" class="demo-auto-complete-more" v-if="searchResult.length > 2">查看所有结果</a>
        </AutoComplete>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    watch: {
        suggest(newVal, oldVal) {
            if (newVal.length == 0) {
                this.setSearchOldSuggest(oldVal)
            }
        }
    },
    computed: {
        ...mapState('search', {
            hots: state => state.hots,
            suggest: state => state.suggest
        }),
        keywords: {
            get() {
                return this.$store.state.search.keywords
            },
            set(value) {
                this.setSearchKeywords(value)
            }
        },
        searchResult() {
            return this.keywords.length > 0 ? this.suggest : this.hots
        }
    },
    data() {
        return {
            title: '热门搜索'
        }
    },
    methods: {
        ...mapMutations('search', {
            setSearchKeywords: 'SET_SEARCH_KEYWORDS',
            setSearchOldSuggest: 'SET_SEARCH_SUGGEST'
        }),
        ...mapActions('search', [
            'setSearchHot',
            'setSearchSuggest'
        ]),
        // 字符串高亮匹配
        keywordsHighlight(str) {
            if (this.keywords !== '') {
                const em = `<em>${this.keywords}</em>`
                return str.replace(this.keywords, em)
            }
        },
        // option切换值
        setOption(item, option) {
            return item.title == '热门搜索' ? option.first : this.keywordsHighlight(option.name)
        },
        // 获取热搜
        getHots() {
            if (!this.hots.length > 0) {
                this.setSearchHot()
            }
        },
        // 建议跳转
        searchMusic(val) {
            console.log(val)
            this.$router.push( {path: 'search', query: { keywords: val }} )
        }
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.ivu-select-dropdown{
    max-width: 300px;
}
.demo-auto-complete-item{
    padding: 4px 0;
    &.border{
        border-bottom: 1px solid $border_first;
    }
    .demo-auto-complete-group{
        font-size: 12px;
        padding: 4px 6px;
        span{
            @include sc(14px, $font_second);
        }
    }
    li{
        span{
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            em{
                font-style: normal;
                color: $main;
            }
        }
    }
}
.demo-auto-complete-more{
    display: block;
    margin: 0 auto;
    padding: 4px;
    text-align: center;
    font-size: 12px;
    a{
        color: $main;
    }
}
</style>