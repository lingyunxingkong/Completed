<template>
<!-- 按教室统计 -->
  <div class="bigStyle">
<!--    <div>-->

    <analyze :my-url="imgUrl" :text-data="textData" :title-data="titleData" :my-name-data="myNameData"
             :dog-url="dogUrl" :nightingale-data="nightingaleData" />
  </div>
</template>

<script>
  import {
    inquireStatisticalAnalysis, // 考勤管理
  } from "@/network/API/appApi"
  import analyze from "@/components/analyze"
  export default {
    name: "statisticsByClassroom",
    components: {
      analyze
    },
    data() {
      return {
        textData:'',
        titleData:'最受欢迎教室',
        myNameData:'',
        imgUrl:require("../../assets/images/icon/fall.png"),
        dogUrl: require("../../assets/images/icon/husky.png"),
        nightingaleData:{
          legend: {
            top: 'bottom'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} <br/>{a} : {c} %'
          },
          toolbox: {
            show: true,
            /*feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }*/
          },
          series: [
            {
              /*itemStyle: {
                borderRadius: 80
              },*/
              name: '签到率',
              type: 'pie',
              radius: [50, 250],
              center: ['50%', '50%'],
              roseType: 'area',

              data: [
                { value: 40, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 28, name: 'rose 5' },
                { value: 26, name: 'rose 6' },
                { value: 22, name: 'rose 7' },
                { value: 18, name: 'rose 8' }
              ],
              itemStyle: {
                borderRadius: 10,
                normal: {
                  //这里是重点
                  color: function (params) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    let colorList = [
                      '#f6656d',
                      '#7171e9',
                      '#de4bdc',
                      '#2ab7df',
                      '#f59970',

                      '#e2e01e',
                      '#af72ed',
                      '#aed633',
                      '#5fd87e',
                      '#108e7c',
                      '#3fd5ba',

                      '#3e89e6',
                      '#e9a606',

                      '#de4bdc',

                      '#f53c6c'
                    ];
                    return colorList[params.dataIndex % 15];
                  }
                },


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
      selectPage() {
        let data = {
          teacher: "",
          course: "",
          site: "",
        }
        inquireStatisticalAnalysis(data).then(res=>{
          this.textData = res[res.length - 1].rate + '%'
          this.myNameData = res[res.length - 1].site
          let arr = res
          // 清空
          this.nightingaleData.series[0].data = []
          arr.forEach(i=> {
            // 饼图赋值
            this.nightingaleData.series[0].data.push({
              value:i.rate,
              // 按教室统计
              name:i.site,
            })
          })
        }).catch(err => {
          console.log(err)
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .bigStyle {
    margin: 10px;
    /*background-color: #d71010;*/
    width: calc(100vw - 250px - 20px);
    height: calc(100vh - 50px - 20px);
  }
</style>
