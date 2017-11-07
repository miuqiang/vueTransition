<!--首页 -->
<template>
    <div class="home">
        <h1>This is home.</h1>
        <a href="javascript:;" @click="login">登陆</a>
        <router-link to="/detail">detail</router-link>
    </div>
</template>

<script>
export default {
    name: "hello",
    data() {
        return {
            logform:{
                username:'',
                password:'',
                terminal: 0
            }
        };
    },
    methods:{
        login(){
            this.$http.post('/v1/users/login',this.logform).then(res => {
                console.log(res);
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
