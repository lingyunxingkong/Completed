<template>
<!-- 修改密码 -->
  <div class="myPsw">
    <div class="my-psw-body">
      <div class="psw-before">
        <iconfont-svg style="margin-right: 10px;margin-left: 5px;" icon="icon-a-jisuanjidiannaokoulingmima" size="38"></iconfont-svg>
        <span style="font-size: 24px;color: rgb(55,55,55)">原始密码：</span>
        <el-input v-model="oldPsw" clearable class="psw-input" placeholder="请输入原始密码"></el-input>
      </div>
      <div class="psw-new">
        <iconfont-svg style="margin-right: 10px;margin-left: 5px;" icon="icon-denglu" size="38"></iconfont-svg>
        <span style="font-size: 24px;color: rgb(55,55,55)">最新密码：</span>
        <el-input v-model="newPsw" clearable class="psw-input" placeholder="请输入最新密码"></el-input>
      </div>
      <div class="psw-again">
        <iconfont-svg style="margin-right: 10px;margin-left: 5px;" icon="icon-bijibendiannao" size="38"></iconfont-svg>
        <span style="font-size: 24px;color: rgb(55,55,55)">再次确认：</span>
        <el-input v-model="againPsw" clearable class="psw-input" placeholder="请再次输入最新密码"></el-input>
      </div>
      <div class="psw-btn">
        <el-button type="success" icon="el-icon-check">提交</el-button>
        <el-button type="warning" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "changePassword",
    data() {
      return {
        oldPsw:'',
        newPsw:'',
        againPsw:'',
      }
    },
    mounted() {
    },
    methods:{
    },
  }
</script>

<style scoped lang="scss">

  .myPsw {
    width: calc(100vw - 250px);
    height: calc(100vh - 50px);
    /*怪异盒模型*/
    box-sizing: border-box;
    overflow: hidden;
    padding: 10px;
    background-color: rgb(233, 240, 251);
    .my-psw-body {
      width: calc(100vw - 250px - 20px);
      height: calc(100vh - 50px - 20px);
      background-color: white;
      box-shadow: 0 0 8px 0px rgb(222, 222, 222);
      box-sizing: border-box;
      /*外边距合并问题，解决方案：1，给父元素设置内边距；2，overflow: hidden；3，让元素脱离标准文档流，例如：浮动、固定、绝对定位等*/
      padding: 30px 30px 30px 300px;
      .psw-input {
        width: 400px;
      }
      .psw-before {
        border-radius: 20px;
        display: flex;
        align-items: center;
        width: 600px;
        height: 100px;
        padding: 10px;
        background-color: rgb(242, 241, 247);
      }
      .psw-new {
        border-radius: 20px;
        display: flex;
        align-items: center;
        width: 600px;
        height: 100px;
        padding: 10px;
        background-color: rgb(242, 241, 247);
        margin-top: 30px;
      }
      .psw-again {
        border-radius: 20px;
        display: flex;
        align-items: center;
        width: 600px;
        height: 100px;
        padding: 10px;
        background-color: rgb(242, 241, 247);
        margin-top: 30px;
      }
      .psw-btn {
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 600px;
        height: 100px;
        padding: 10px;
        background-color: rgb(242, 241, 247);
        margin-top: 30px;
      }
    }
  }
</style>
