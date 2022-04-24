<template>
<!-- 统计分析框架 -->
  <div class="body">
    <div class="main">
      <div class="left">
        <div class="left-top">
          <img class="dogStyle" :src="dogUrl" />


          <div class="text">
            {{textData}}

          </div>
          <div class="title">
            {{titleData}}

          </div>
          <div class="myName">
            {{myNameData}}

          </div>

        </div>
        <div class="left-bottom">
<!--          'url(' +  myUrl + ')'-->
<!--          <div class="img" :style="{'backgroundImage':'url(' +  myUrl + ')'}"></div>-->
          <img class="img" :src="myUrl" />
        </div>
      </div>
      <div class="right" id="nightingale">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "analyze",
    data() {
      return {

        // myUrl:require("../assets/images/icon/dog.png")
      }
    },
    watch: {
      //观察chartData的变化
      nightingaleData: {
        handler(newVal, oldVal) {

            if (newVal) {
              let myChart = this.$echarts.init(document.getElementById('nightingale'));
              myChart.setOption(newVal,true);
              // 定时器 监听 window的resize事件 自适应大小
              setTimeout(() => {
                window.addEventListener('resize', function () {
                  myChart.resize();
                })
              },100)
            } else {
              let myChart = this.$echarts.init(document.getElementById('nightingale'));
              myChart.setOption(oldVal,true);
              // 定时器 监听 window的resize事件 自适应大小
              setTimeout(() => {
                window.addEventListener('resize', function () {
                  myChart.resize();
                })
              },100)
            }

        },
        deep: true //对象内部属性的监听，关键。
      }
    },
    mounted() {
      this.getNightingale()
    },
    methods:{
      getNightingale() {
        let myChart = this.$echarts.init(document.getElementById('nightingale'));
        myChart.setOption(this.nightingaleData);
        // 定时器 监听 window的resize事件 自适应大小
        setTimeout(() => {
          window.addEventListener('resize', function () {
            myChart.resize();
          })
        },100)
      },
    },
    props: {
      myUrl: {
        type: String,
        default: require("../assets/images/icon/dog.png"),
      },
      dogUrl: {
        type: String,
        default: require("../assets/images/icon/husky.png"),
      },
      textData: {
        type:String,
        default:'90%',
      },
      titleData: {
        type:String,
        default:'最受欢迎课程',
      },
      myNameData: {
        type:String,
        default:'大学生就业指导',
      },
      nightingaleData: {
        type:Object,
        default:()=> {}
      },
    },

  }
</script>

<style scoped lang="scss">

/*注意，子组件和父组件的样式不可重名*/
/*间距*/
$spacing:10px;
/*间距的一半*/
$halfPitch:5px;
  .body {
    width: 100%;
    height: 100%;
  }
  .main {
    display: flex;
    width: 100%;
    height: 100%;
    .left {
      width: 30%;
      height: 100%;
      /*background-color: red;*/
      .left-top {
        width: 100%;
        height: calc(50% - #{$halfPitch});
        /*background-color: #2ea2d0;*/
        box-sizing: border-box;
        /*background-color: #fff;*/
        background-color: rgb(249, 238, 224);
        border-radius: 10px;
        box-shadow: 0 0 20px 4px rgb(217, 137, 17) inset;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      /*  图片*/
        .dogStyle {
          width: 80px;
          height: 80px;
          border-radius: 40px;
          background-color: rgb(212, 180, 140);
        }
        .text {
          width: 50px;
          height: 40px;
          /*background-color: #1900ff;*/
          text-align: center;
          line-height: 40px;
          color: rgb(251, 157, 113);
          font-size: 28px;
        }
        .title {
          width: 100px;
          height: 30px;
          /*background-color: #00ff04;*/
          text-align: center;
          line-height: 30px;
          color: rgb(155, 155, 155);

        }
        .myName {
          /*width: 300px;*/
          height: 50px;
          padding: 0 20px;
          background-color: #fff;
          text-align: center;
          line-height: 50px;
          border-radius: 25px;
          color: rgb(251, 177, 113);
          font-size: 18px;


        }

      }
      .left-bottom {
        margin-top: $spacing;
        width: 100%;
        height: calc(50% - #{$halfPitch});
        /*background-color: #7aba3a;*/
        background-color: rgb(245, 228, 251);
        border-radius: 10px;
        box-shadow: 0 0 20px 4px rgb(164, 17, 217) inset;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 80%;
          height: 80%;

          /*background: url("../assets/images/icon/dog.png") no-repeat;*/
          /*background: no-repeat;*/
          /*background-image: url("../assets/images/icon/dog.png");*/
          /*background-repeat: no-repeat;*/
          /*background-size: 100% 100%;*/
        }


      }
    }
    .right {
      width: calc(70% - #{$spacing});
      margin-left: $spacing;
      height: 100%;
      /*background-color: blue;*/
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 20px 4px rgb(17, 210, 217) inset;
      padding: 20px;
      box-sizing: border-box;

    }
  }
</style>

