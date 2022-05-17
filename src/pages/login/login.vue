<template>
<!--  -->
  <div class="login-main">
    <div class="login-body">
      <div class="login-text">登录</div>
      <div class="login-box">
        <span>账号：</span>
        <el-input class="login-input"></el-input>
      </div>
      <div class="login-box">
        <span>密码：</span>
        <el-input class="login-input"></el-input>
      </div>
      <div class="login-btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
      }
    },
    mounted() {
    },
    methods:{
      login() {
        this.$router.push('/home')
        /*if (this.username === 'admin' && this.password === '123456') {
          // 登录成功
          // 1，存储token
          localStorage.setItem('token', 'token')
          // 2.跳转到后台主页
          this.$router.push('/home')
        } else {
          // 登录失败
          localStorage.removeItem('token')
        }*/
      }
    },
  }
</script>

<style scoped lang="scss">
  .login-main {
    width: 100vw;
    height: 100vh;
    background-color: rgb(233,233,248);
    display: flex;
    justify-content: center;
    align-items: center;
    .login-body {
      width: 350px;
      height: 400px;
      background-color: rgb(255,255,255);
      border-radius: 20px;
      box-shadow: 2px 4px 8px 0 #bdbcbc;

      .login-text {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 120px;
        line-height: 120px;
        /*background-color: red;*/
        color: #2c73e2;
        font-size: 30px;
        letter-spacing: 10px;
      }
      .login-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 80px;
        /*background-color: red;*/
      }
      .login-input {
        width: 200px;
      }
      .login-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 80px;
        /*background-color: blue;*/
      }

    }
  }
</style>
