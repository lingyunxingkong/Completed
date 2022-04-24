<template>
<!-- 考勤排名 -->
  <div class="body">
    <div class="left">
      <div class="text">
        柱状图
      </div>
      <div class="myHistogram" id="histogram">

      </div>
    </div>
    <div class="right">
      <div class="text">
        饼图
      </div>
      <div class="myPieChart" id="pieChart">

      </div>
    </div>
  </div>
</template>

<script>
  import {
    inquireStatisticalAnalysis, // 考勤管理
  } from "@/network/API/appApi"
  export default {
    name: "attendanceRanking",
    data() {
      return {
        getHistogramData:{
          tooltip: {
            trigger: 'axis',
            // formatter:'99'
            formatter: '{b} <br/>{a} : {c} %'
          },
          grid: {
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '10%',
            containLabel: true,
            width:'90%',
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          series: [
            {

              data: ['50', '40', '88', '80', '70', '90', '68'],
              name: '签到率',
              type: 'bar',
              label: {
                show: true,
                position: 'right'
              },
              smooth: true,
              showBackground: false,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              },
              itemStyle: {
                normal: {
                  //这里是重点
                  color: function (params) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    let colorList = [
                      '#f6656d',
                      '#f59970',
                      '#e9a606',
                      '#e2e01e',
                      '#aed633',
                      '#5fd87e',
                      '#108e7c',
                      '#3fd5ba',
                      '#2ab7df',
                      '#3e89e6',
                      '#7171e9',
                      '#af72ed',
                      '#de4bdc',
                      '#de4bdc',
                      '#f53c6c'
                    ];
                    return colorList[params.dataIndex % 15];
                  }
                }
              }
            }
          ]
        },
        getPieChartData:{
          title: {
            text: 'Attendance',
            subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} <br/>{a} : {c} %'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '签到率',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              itemStyle: {
                normal: {
                  //这里是重点
                  color: function (params) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    let colorList = [

                      '#3fd5ba',
                      '#e2e01e',
                      '#2ab7df',
                      '#108e7c',
                      '#3e89e6',
                      '#de4bdc',
                      '#7171e9',
                      '#af72ed',
                      '#e9a606',


                      '#f6656d',



                      '#aed633',
                      '#5fd87e',

                    ];
                    return colorList[params.dataIndex % 15];
                  }
                }
              }
            }
          ]
        },
      }
    },
    mounted() {
      this.selectPage()


    },

    methods:{
      // 绘制柱状图
      getHistogram() {
        let myChart = this.$echarts.init(document.getElementById('histogram'));
        myChart.setOption(this.getHistogramData);
        // 定时器 监听 window的resize事件 自适应大小
        setTimeout(() => {
          window.addEventListener('resize', function () {
            myChart.resize();
          })
        },100)


      },
      // 绘制饼图
      getPieChart(){
        let myChart = this.$echarts.init(document.getElementById('pieChart'));
        myChart.setOption(this.getPieChartData);
        // 定时器 监听 window的resize事件 自适应大小
        setTimeout(() => {
          window.addEventListener('resize', function () {
            myChart.resize();
          })
        },100)
      },
      selectPage() {

        inquireStatisticalAnalysis().then(res=>{
          let data = res

          // 柱状图清空
          this.getHistogramData.yAxis.data = []
          this.getHistogramData.series[0].data = []

          // 饼图清空
          this.getPieChartData.series[0].data = []
          data.forEach(i=> {
            // 柱状图赋值
            this.getHistogramData.yAxis.data.push(i.teacher)
            this.getHistogramData.series[0].data.push(i.rate)
            // 饼图赋值
            this.getPieChartData.series[0].data.push({
              value:i.rate,
              name:i.teacher,
            })

          })
          // 绘制柱状图
          this.getHistogram()
          // 绘制饼图
          this.getPieChart()

        }).catch(err => {
          console.log(err)
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .body {
    margin: 10px;
    background-color: white;
    width: calc(100vw - 250px);
    height: calc(100vh - 50px - 20px);
    /*怪异盒模型*/
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .left {
      width: 50%;
      height: 80%;
      padding: 10px 10px 10px 20px;
      /*background-color: #8ce58c;*/
      /*border-right: 2px solid #dea180;*/
      .myHistogram {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      width: 50%;
      height: 80%;
      padding: 10px;
      /*background-color: #e58cd6;*/
      .myPieChart {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      padding-left: 10px;
      width: 200px;
      height: 40px;
      border-left: 4px solid #2c73e2;
      line-height: 40px;
      /*background-color: red;*/
    }
  }
</style>

