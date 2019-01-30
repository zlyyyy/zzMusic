<template>
    <div class="login">
        <Modal
            class="login-modal"
            width="400"
            v-model="modalShow"
            title="手机号登录"
            footer-hide
            :styles="{top: '200px'}">
            <Form class="login-form" ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="user" >
                    <Input size="large" type="text" v-model="formInline.user" placeholder="请输入用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input size="large" type="password" v-model="formInline.password" placeholder="请输入密码 ">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem class="login-btn">
                    <Button size="large" :type="btnState" :loading="loading" @click="handleSubmit('formInline')" long>
                        <span v-if="!loading">登录</span>
                        <span v-else>正在登录中...</span>
                    </Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import { getLoginPhone } from '../../api'
import { mapState, mapActions } from 'vuex'
export default {
    props: {
        loginShow: {
            type: Boolean,
            default: false
        }
    },
    components: {
    },
    mounted() {
        this.$nextTick(() => {
            this.modalShow = this.loginShow
        })
    },
    watch: {
        loginShow(newVal, oldVal) {
            this.modalShow = newVal
        },
        modalShow(newVal, oldVal) {
            this.$emit('setLoginShow', newVal)
        },
        'formInline.user': function(newVal, oldVal) {
            if (newVal != '' && this.formInline.password.length >= 6) {
                this.btnState = 'primary'
            }
        },
        'formInline.password': function(newVal, oldVal) {
            if (this.formInline.user != '' && newVal.length >= 6) {
                this.btnState = 'primary'
            }
        }
    },
    computed: {
        ...mapState('user', [
            'loginStatus'
        ])
    },
    data() {
        return {
            modalShow: false,
            loading: false, // 登录按钮loading
            btnState: 'primary', // 登录按钮实时状态
            // 用户名账号、密码
            formInline: {
                user: '',
                password: ''
            },
            // 表单验证方式，配置
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码小于六位请重新输入', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        ...mapActions('user', [
            'setLoginInfor',
            'setRecommend',
            'setUserPlaylist'
        ]),
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.loading = true
                    getLoginPhone({
                        phone: this.formInline.user,
                        password: this.formInline.password
                    }).then(res => {
                        if (res.code == 200) {
                            // 登录按钮loading
                            this.loading = false
                            // 关闭登录框
                            this.modalShow = false
                            this.loginState = false
                            this.$Message.success('登录成功!')
                            // 设置登录用户信息
                            this.setLoginInfor({
                                data: res,
                                status: true
                            })
                            // 获取用户每日推荐歌单
                            this.setRecommend()
                            // 获取用户歌单
                            this.setUserPlaylist()
                        }
                    }).catch(err => {
                        this.loading = false
                        let errMsg = err.response.data.msg || '登录失败'
                        this.$Message.error(errMsg)
                    })
                } else {
                    this.btnState = 'error'
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';

</style>