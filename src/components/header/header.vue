<template>
    <div class="z-head">
        <router-link :to="{path:'/'}" tag="div" class="logo">
            ZZ-MUSIC
        </router-link>
        <div class="page">
            <div class="button page-back">
                <Icon type="ios-arrow-back" />
            </div>
            <div class="button page-go">
                <Icon type="ios-arrow-forward" />
            </div>
        </div>
        <search-input />
        <div class="nav-con">
            <span v-if="!loginStatus" class="login" @click="loginShow = true">登录</span>
            <div class="user-infor" v-if="loginStatus">
                <Dropdown class="user-dropdown" trigger="click">
                    <a href="javascript:void(0)" >
                        <div class="avatar">
                            <img class="" :src="profile.avatarUrl" />
                        </div>
                        <span class="name">
                            {{ profile.nickname }}
                        </span>
                        <Icon class="arrow-down" type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list" class="infor">
                        <DropdownItem>
                            <Icon type="md-person" />
                            个人主页
                        </DropdownItem>
                        <DropdownItem>
                            <Icon type="md-power" />
                            退出登录
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <Login v-if="loginShow" :loginShow="loginShow" @setLoginShow="setLoginShow" />
    </div>
</template>

<script>
import { getLoginStatus } from '../../api'
import SearchInput from '../searchInput/searchInput'
import Login from '../login/login'
import { mapState, mapActions } from 'vuex'

export default {
    created() {
        // this.setMusicInfor('32102855')
    },
    components: {
        SearchInput,
        Login
    },
    watch: {
    },
    computed: {
        ...mapState('user', {
            user: state => state,
            loginStatus: state => state.loginStatus,
            profile: state => state.profile
        })
    },
    data() {
        return {
            loginShow: false, // 登录框显示隐藏
            visible: false // 用户信息下拉框显示隐藏
        }
    },
    methods: {
        ...mapActions([
            'setLoginPhone',
            'setMusicInfor'
        ]),
        setLoginShow(val) {
            this.loginShow = val
        },
        getLoginStatus() {
            getLoginStatus().then( res => {
                console.log(res)
            })
        },
        handleOpen () {
            this.visible = true
        },
        handleClose () {
            this.visible = false
        }
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.z-head{
    position: relative;
    padding: 10px 20px;
    height: 100%;
    .logo{
        position: absolute;
        cursor: pointer;
        @include sc(24px, $white);
        margin-right: 30px;
    }
    .page{
        position: absolute;
        height: 30px;
        top: 15px;
        left: 220px;
        .button{
            @include wh(30px, 30px);
            border: 1px solid $border_first;
            @include borderRadius(4px);
            text-align: center;
            padding-top: 4px;
            float: left;
            margin: 0 10px 0 0;
            cursor: pointer;
            i{
                @include sc(20px, $white);
            }
        }
    }
    .search{
        position: absolute;
        top: 14px;
        left: 300px;
    }
    .nav-con{
        position: absolute;
        right: 20px;
        .login{
            cursor: pointer;
            @include sc(14px, $white);
            line-height: 40px;
        }
        .user-infor{
            height: 40px;
            .user-dropdown{
                @include wh(100%, 100%);
                margin: 0 20px;
                .ivu-dropdown-rel{
                    @include wh(100%, 100%);
                    a{
                        display: block;
                        position: relative;
                        @include wh(100%, 100%);
                        .avatar{
                            float: left;
                            @include wh(40px, 40px);
                            @include borderRadius(20px);
                            overflow: hidden;
                            img{
                                width: 100%;
                            }
                        }
                        .name{
                            float: left;
                            @include sc(14px, $white);
                            line-height: 40px;
                            margin: 0 10px;
                        }
                        .arrow-down{
                            position: absolute;
                            @include sc(14px, $white);
                            top: 13px;
                        }
                    }
                }
                .ivu-select-dropdown{
                    .ivu-dropdown-menu{
                        .ivu-dropdown-item{
                            color: $font_first;
                            i{
                                margin: -2px 5px 0 0;
                            }
                            &:hover{
                                background: rgba(59, 117, 255, .1);
                            }
                        }
                    }
                }
            }
        }
    }
}
.login-modal{
    .ivu-modal-body{
        padding: 16px 50px;
        .login-form{
            margin-top: 10px;
            .login-btn{
                padding-top: 20px;
            }
        }
    }
}
</style>