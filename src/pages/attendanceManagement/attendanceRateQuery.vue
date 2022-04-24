<template>
  <!-- 考勤率查询-->
  <div>
    <div>
      <zljTable
        ref="multipleTable"
        :title-list="TitleListLin"
        :total="totalListLin"
        :table-data="tableDataLin"
        @handleSelectionChange="handleChange"
        @handleSizeChange="handleSize"
        @handleCurrentChange="handleCurrent"
      >
        <template slot-scope="row" >
          <el-button style="font-size: 13px" type="text" @click="toAdd(row.rowData)">新增</el-button>
          <el-button style="font-size: 13px" type="text" @click="toEdit(row.rowData)">编辑</el-button>
          <el-button style="font-size: 13px" type="text" @click="toDelete(row.rowData)">删除</el-button>
        </template>
      </zljTable>
    </div>
  </div>
</template>

<script>
  import {
    inquireStatisticalAnalysis, // 考勤管理
  } from "@/network/API/appApi"
  import zljTable from "@/components/zlj-table"
  export default {
    name: "attendanceRateQuery",
    components: {
      zljTable
    },
    data() {
      return {
        TitleListLin:[

          {
            key: '上课地点',
            prop: 'site',
            width: ''
          },
          {
            key: '课程名称',
            prop: 'course',
            width: ''
          },
          {
            key: '老师',
            prop: 'teacher',
            width: ''
          },
          {
            key: '应到人数',
            prop: 'arrive',
            width: ''
          },
          {
            key: '实到人数',
            prop: 'actual',
            width: ''
          },
          {
            key: '考勤率',
            prop: 'rate',
            width: ''
          },

          {
            key: '操作',
            prop: 'operation',
            width: '',
          }
        ],
        totalListLin:1,
        tableDataLin:[],
      }
    },
    mounted() {
      this.selectPage()
    },
    methods:{
      selectPage() {
        let data = {
          name:'张林健',
        }
        inquireStatisticalAnalysis(data).then(res=>{
          let data = res
          data.forEach(item=> {
            item.rate = item.rate + "%"
          })
          this.tableDataLin = data
        }).catch(err => {
          console.log(err)
        })
      },


      // 新增
      toAdd() {
        let data = {
          name:'张林健',
        }
        this.visible = true
      },
      // 编辑
      toEdit() {

      },
      // 删除
      toDelete() {

      },
      // 表格复选框事件
      handleChange() {

      },
      // 表格页数大小变化
      handleSize() {

      },
      // 表格当前页变化
      handleCurrent() {

      },

    },
  }
</script>

<style scoped lang="scss">


</style>

