<template>
    <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="username">
            <el-input type="text" clearable v-model="ruleForm.username" @keyup.enter.native="loginIn" autofocus auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" clearable v-model="ruleForm.password" @keyup.enter.native="loginIn" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="loginIn" :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data(){
            return {
                logining: false,
                ruleForm: {
                    name: '',
                    password: ''
                },
                rules2: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                },
                checked: true
            }
        },
        methods:{
            loginIn() {
                var str = 'username='+this.ruleForm.username+'&password='+this.ruleForm.password;
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.logining = true;
                        this.$http.post('login?'+str).then(response => {
                            if(response.data.code === 0){
                                localStorage.setItem("token",response.data.token);
                                localStorage.setItem("username",this.ruleForm.username);
                                this.$router.push('/start');
                            }else{
                                this.$message({message: response.data.msg});
                            }
                            this.logining = false;
                        }, response => {
                            // error callback
                            this.logining = false;

                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>


