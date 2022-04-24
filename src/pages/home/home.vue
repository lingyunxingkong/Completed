<template>
<!-- 主页 -->
  <div style="text-align: left">
    home
<!--    {{tableData}}-->
    <br/>
<!--    {{tableData[0].course}}-->
    公共课考勤系统的目录可分为四个模块，分别为：    <br/>
    公共课管理 publicClassManagement，考勤管理 attendanceManagement，    <br/>
    统计分析 statisticalAnalysis 和 系统设置 systemSettings。    <br/>
    每个模块下面又分为几个小模块，    <br/>
    公共课管理包括：公共课查询 publicClassEnquiry，公共课预定 bookAPublicClass，我的公共课 myPublicClass；    <br/>
    考勤管理包括：公共课签到 signInForPublicClass，考勤率查询 attendanceRateQuery，考勤排名 attendanceRanking；    <br/>
    统计分析包括：按课程统计 statisticsByCourse，按教室统计 statisticsByClassroom，按教师统计 statisticsByTeacher；    <br/>
    系统设置包括：个人中心 personalCenter，修改密码 changePassword。    <br/>
  </div>
</template>

<script>
  import {
    inquireManagement,
    list
  } from "@/network/API/appApi"
  export default {
    name: "home",
    data() {
      return {
        tableData:null,
      }
    },
    mounted() {
      // this.selectPage()
    },
    methods:{
      selectPage() {
        let data = {
          name:'张林健',
        }
        list(data).then(res=>{
          this.tableData = res
        }).catch(err => {
          console.log(err)
        })
      },
    },
  }
</script>

<style scoped lang="scss">
</style>
