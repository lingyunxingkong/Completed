
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
        <template v-slot:form>
          <div class="my-form">
            <span class="text">地点:</span>
            <el-select v-model="mySite" clearable class="mt-input" size="small" placeholder="请选择">
              <el-option
                v-for="item in siteList"
                :key="item.value"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="text">课程:</span>
            <el-input v-model="myCourse" class="mt-input" size="small"></el-input>
<!--            <span class="text">教师:</span>-->
<!--            <el-input v-model="myTeacher" class="mt-input" size="small"></el-input>-->
            <el-button type="success" icon="el-icon-search" size="small" @click="checkData">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" size="small" @click="resetData">重置</el-button>
          </div>

        </template>
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
        siteList:[
          {
            value:'A栋2楼204',
          },
          {
            value:'A栋2楼101',
          },
          {
            value:'B栋2楼101',
          },
          {
            value:'B栋2楼202',
          },
        ],
        mySite:'',
        myCourse:'',
        myTeacher:'',
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

      checkData() {
        this.selectPage()
      },
      resetData() {
        this.myTeacher = ""
        this.myCourse = ""
        this.mySite = ""
        this.selectPage()
      },
      selectPage() {
        let data = {
          teacher: this.myTeacher,
          course: this.myCourse,
          site: this.mySite,
        }
        inquireManagement(data).then(res=>{
          if(res instanceof Array) {
            this.tableDataLin = res
          }
          else {
            this.tableDataLin = []
          }
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
  .my-form {
    padding-left: 10px;
    .text {
      color: #979696;
      margin-right: 10px;
    }
    .mt-input {
      width: 200px;
      margin-right: 10px;
    }
  }
</style>

