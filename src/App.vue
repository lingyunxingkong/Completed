<template>
  <div id="app">
<!--    主页面-->
    <div>
      <!--导航栏-->
      <myHeader />
      <!--主题-->
      <div class="theme">
        <!--左侧菜单栏-->
        <myMenu />
        <!--右侧主题-->
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import myHeader from "@/components/header"
import myMenu from "@/components/menu"
export default {
  name: 'App',
  components: {
    myHeader,
    myMenu
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // 字体抗锯齿渲染 下面两行
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // 字体居中 颜色
  /*text-align: center;*/
  color: #2c3e50;

  width: 100vw;
  height: 100vh;
  /*background-color: red;*/

  .theme {
    display: flex;

  }
}
</style>
