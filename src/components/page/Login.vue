<template>
    <div style="height: 100%;width: 100%">
        <el-header style="background-color: #417e9f;height: 85px">
            <img style="margin-left:80px;display:inline" src="../../assets/img/login_logo.png"><li class="active">世界大港&nbsp;&nbsp;&nbsp;服务世界</li>
        </el-header>
        <div class="login-wrap">
            <div class="ms-login" >
                <div class="ms-title">新沙项目系统</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="username">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="password" v-model="ruleForm.password"
                                  @keyup.enter.native="submitForm('ruleForm')">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary"  @click="submitForm()">登录</el-button>
                    </div>
                    <p class="login-tips">Tips : 请向管理员申请相关账号。</p>
                </el-form>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        data: function () {
            return {
                ip: 'http://localhost:8080',
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                axios.get(this.ip + '/user/login', {
                    params: {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                    }
                })
                    .then(res => {
                        if (res.data) {
                            localStorage.setItem('userId', this.ruleForm.username);
                            localStorage.setItem('passWord',this.ruleForm.password);
                            axios.get(this.ip+'/user/getuser',{
                                params:{
                                    userId: localStorage.getItem('userId'),
                                    passWord: localStorage.getItem('passWord')
                                }
                            })
                                .then(res=>{
                                    localStorage.setItem('groupId',res.data.groupId)
                                    localStorage.setItem('userName',res.data.userName)
                                })
                            this.$router.push('/');
                        } else {
                            alert("用户名或者密码错误！")
                            return false;
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.png);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 80%;
        top: 40%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
    .active {
        margin-left: 300px;
        display:inline;
        color: #FFF;
        font-size: 18px;
        border-bottom: 3px solid #f46425;
        height: 80px;
        line-height: 80px;
    }
</style>