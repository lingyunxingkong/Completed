<template>
<!-- 主页 -->
  <div class="my-home">
<!--    home
&lt;!&ndash;    {{tableData}}&ndash;&gt;
    <br/>
&lt;!&ndash;    {{tableData[0].course}}&ndash;&gt;
    公共课考勤系统的目录可分为四个模块，分别为：    <br/>
    公共课管理 publicClassManagement，考勤管理 attendanceManagement，    <br/>
    统计分析 statisticalAnalysis 和 系统设置 systemSettings。    <br/>
    每个模块下面又分为几个小模块，    <br/>
    公共课管理包括：公共课查询 publicClassEnquiry，公共课预定 bookAPublicClass，我的公共课 myPublicClass；    <br/>
    考勤管理包括：公共课签到 signInForPublicClass，考勤率查询 attendanceRateQuery，考勤排名 attendanceRanking；    <br/>
    统计分析包括：按课程统计 statisticsByCourse，按教室统计 statisticsByClassroom，按教师统计 statisticsByTeacher；    <br/>
    系统设置包括：个人中心 personalCenter，修改密码 changePassword。    <br/>-->

    <div class="my-home-body">
      <div class="home-top">
        <div class="home-top-left">
          <el-table
            height="100%"
            :data="tableData"
            style="width: 100%;overflow: auto">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </div>
        <div class="home-bottom-left">
          <el-table
            height="100%"
            :data="tableData"
            style="width: 100%;overflow: auto">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="home-bottom">
        <div class="myHistogram" id="histogram">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    inquireManagement, inquireStatisticalAnalysis,
    list
  } from "@/network/API/appApi"
  export default {
    name: "home",
    data() {
      return {
        tableData: [
          {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          },
        ],
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
                      '#3e89e6',
                      '#7171e9',
                      '#af72ed',
                      '#de4bdc',
                      '#f59970',
                      '#e9a606',
                      '#e2e01e',
                      '#aed633',
                      '#de4bdc',
                      '#f53c6c',
                      '#f6656d',

                      '#5fd87e',
                      '#108e7c',
                      '#3fd5ba',
                      '#2ab7df',

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
      selectPage() {

        let data = {
          teacher: "",
          course: "",
          site: "",
        }
        inquireStatisticalAnalysis(data).then(res=>{
          let arr = res

          // 柱状图清空
          this.getHistogramData.yAxis.data = []
          this.getHistogramData.series[0].data = []


          arr.forEach(i=> {
            // 柱状图赋值
            this.getHistogramData.yAxis.data.push(i.teacher)
            this.getHistogramData.series[0].data.push(i.rate)


          })
          // 绘制柱状图
          this.getHistogram()


        }).catch(err => {
          console.log(err)
        })
      },

    },
  }
</script>

<style scoped lang="scss">
  .my-home {
    width: calc(100vw - 250px);
    height: calc(100vh - 50px);
    /*怪异盒模型*/
    box-sizing: border-box;
    overflow: hidden;
    padding: 10px;
    background-color: rgb(233, 240, 251);

    .my-home-body {
      width: calc(100vw - 250px - 20px);
      height: calc(100vh - 50px - 20px);
      background-color: white;
      box-shadow: 0 0 8px 0px rgb(222, 222, 222);
      box-sizing: border-box;
      /*外边距合并问题，解决方案：1，给父元素设置内边距；2，overflow: hidden；3，让元素脱离标准文档流，例如：浮动、固定、绝对定位等*/
      /*padding: 30px 30px 30px 30px;*/

      .home-top {
        width: 100%;
        height: 50%;
        /*background-color: red;*/
        padding: 10px;
        display: flex;
        box-sizing: border-box;

        .home-top-left {
          width: 50%;
          height: 100%;
          /*background-color: greenyellow;*/
          border-right: 3px solid rgb(19, 89, 158);
          padding: 10px;
          box-sizing: border-box;
          /*overflow: auto*/

        }
        .home-bottom-left {
          width: 50%;
          height: 100%;
          /*background-color: deepskyblue;*/
          padding: 10px;
          box-sizing: border-box;

        }
      }
      .home-bottom {
        width: 100%;
        height: 50%;
        /*background-color: teal;*/
        padding: 10px 10px 10px 50px;
        box-sizing: border-box;
        .myHistogram {
          width: 100%;
          height: 100%;
        }

      }
    }
  }
</style>
