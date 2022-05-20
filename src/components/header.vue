<template>
<!-- 顶部导航栏 -->
  <div class="body">
<!--    左侧系统名字-->
    <div class="left">
      公共课考勤系统
    </div>
    <div class="middle">
    </div>
    <div class="right">
      您好！张林健
      <el-button type="primary" circle size="small" @click="back">退出</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "myHeader",
    data() {
      return {
      }
    },
    mounted() {
    },
    methods:{
      back() {
        // 1.清空token
        localStorage.removeItem('user')
        this.$router.push('/login')
      },
    },
  }
</script>

<style scoped lang="scss">
  .body {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*background-color: rgb(42, 143, 196);*/
    background: -webkit-linear-gradient(left, rgb(83, 170, 255) , rgb(0, 64, 129)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgb(83, 170, 255) , rgb(0, 64, 129)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, rgb(83, 170, 255) , rgb(0, 64, 129)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgb(83, 170, 255) , rgb(0, 64, 129)); /* 标准的语法 */
    /*background-color: rgb(8, 94, 179);*/
    .left {
      width: 15%;
      height: 100%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;

      /*background-color: blueviolet;*/
    }
    .middle {
      width: 70%;
      height: 100%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      /*background-color: red;*/
    }
    .right {
      width: 15%;
      height: 100%;
      color: white;
      display: flex;
      justify-content: space-around;
      align-items: center;
      /*background-color: blue;*/
    }
  }
</style>
