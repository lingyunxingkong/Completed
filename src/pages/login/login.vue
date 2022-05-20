<template>
<!--  -->
  <div class="login-main">
    <div class="login-body">
      <div class="login-text">登录</div>
      <div class="login-box">
        <span>账号：</span>
        <el-input class="login-input" v-model="account"></el-input>
      </div>
      <div class="login-box">
        <span>密码：</span>
        <el-input class="login-input" v-model="password"></el-input>
      </div>
      <div class="login-btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>

    </div>

  </div>
</template>

<script>
  import {inquirePersonalCenter} from "@/network/API/appApi";

  export default {
    name: "",
    data() {
      return {
        myArrData:[],
        account:'',
        password:'',
      }
    },
    mounted() {
      this.selectPage()
    },
    methods:{
      selectPage() {
        let data = {}
        inquirePersonalCenter(data).then(res=>{
          if(res instanceof Array) {
            this.myArrData = res
          }
          else {
            this.myArrData = []
          }
        }).catch(err => {
          console.log(err)
        })
      },
      login() {
        let arr = this.myArrData
        let myTrue = arr.find(item=> {
          return item.account == this.account
        })
        if(myTrue) {
          if(myTrue.password == this.password) {
            // 1，存储token
            localStorage.setItem('user', JSON.stringify(myTrue))
            this.$router.push('/home')
          }
          else {
            this.$message({
              type:'warning',
              message:'密码错误',
            })

          }
        }
        else {
          this.$message({
            type:'warning',
            message:'账号不存在',
          })
        }
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
