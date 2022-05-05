
<template>
  <!-- 公共课签到-->
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
          <el-button style="font-size: 13px" type="text" @click="toAdd(row.rowData)">签到</el-button>

        </template>
      </zljTable>
    </div>
  </div>
</template>

<script>
  import {
    inquireAttendance, // 考勤管理
    inquireManagement, // 公共课管理
  } from "@/network/API/appApi"
  import zljTable from "@/components/zlj-table"
  export default {
    name: "signInForPublicClass",
    components: {
      zljTable
    },
    data() {
      return {
        TitleListLin:[
          {
            key: '上课时间',
            prop: 'time',
            width: '200'
          },
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
            key: '签到状态',
            prop: 'status',
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
          teacher: "",
          course: "",
          site: "",
        }
        inquireManagement(data).then(res=>{
          this.tableDataLin = res
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

