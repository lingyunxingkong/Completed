<template>
  <!-- 公共课预定-->
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
          <el-button style="font-size: 13px" type="text" @click="toAdd(row.rowData)">预定</el-button>
          <!--<el-button style="font-size: 13px" type="text" @click="toEdit(row.rowData)">编辑</el-button>
          <el-button style="font-size: 13px" type="text" @click="toDelete(row.rowData)">删除</el-button>-->
        </template>
      </zljTable>
    </div>
    <el-dialog title="新增" :visible.sync="visible">
      <el-form :inline="true" :rules="rules" label-position="left" v-model="confirm" label-width="80px">
        <el-form-item label="上课时间" style="width: 40%">
          <el-input v-model="confirm.time"></el-input>
        </el-form-item>
        <el-form-item label="上课地点" style="width: 40%">
          <el-input v-model="confirm.site"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" style="width: 40%">
          <el-input v-model="confirm.course"></el-input>
        </el-form-item>
        <el-form-item label="老师" style="width: 40%">
          <el-input v-model="confirm.teacher"></el-input>
        </el-form-item>
        <el-form-item label="签到状态" style="width: 40%">
          <el-input v-model="confirm.status"></el-input>
        </el-form-item>
        <el-form-item label="班级" style="width: 40%">
          <el-input v-model="confirm.class"></el-input>
        </el-form-item>
        <el-form-item label="院系" style="width: 40%">
          <el-input v-model="confirm.faculty"></el-input>
        </el-form-item>
        <el-form-item label="上课人数" style="width: 40%">
          <el-input v-model="confirm.num"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="visible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    inquireManagement, // 公共课管理
  } from "@/network/API/appApi"
  import zljTable from "@/components/zlj-table"
  export default {
    name: "bookAPublicClass",
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
            key: '老师',
            prop: 'teacher',
            width: ''
          },
          {
            key: '签到状态',
            prop: 'status',
            width: ''
          },
          {
            key: '班级',
            prop: 'class',
            width: ''
          },
          {
            key: '院系',
            prop: 'faculty',
            width: ''
          },
          {
            key: '上课人数',
            prop: 'num',
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
        visible:false,
        confirm:{
          time:'',
          site:'',
          course:'',
          teacher:'',
          status:'',
          class:'',
          faculty:'',
          num:'',
        },
        rules: {
          time: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          site: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
        }
      }
    },
    mounted() {
      this.selectPage()

      // 下面两行用于没开服务器时 代替的假数据
      let data  = JSON.parse(
        JSON.stringify([
          {
            "id": "1",
            "time": "2022-03-11 00:00:00",
            "site": "A栋1楼101",
            "course": "计算机网络",
            "teacher": "刘骁鹏",
            "status": "0",
            "class": "计算机2001班",
            "faculty": "计算机学院",
            "num": "89"
          },
          {
            "id": "2",
            "time": "2022-03-18 08:12:00",
            "site": "B栋2楼202",
            "course": "人工智能基础知识",
            "teacher": "工军宝",
            "status": "1",
            "class": "人工智能",
            "faculty": "计算机学院",
            "num": "75"
          },
          {
            "id": "3",
            "time": "2022-03-24 15:25:00",
            "site": "C栋2楼202",
            "course": "java程序设计",
            "teacher": "高冲",
            "status": "0",
            "class": "软件工程",
            "faculty": "计算机学院",
            "num": "65"
          },
          {
            "id": "4",
            "time": "2020-09-23 12:12:12",
            "site": "A栋2楼204",
            "course": "大学语文",
            "teacher": "张全智",
            "status": "0",
            "class": "给排水1802班",
            "faculty": "计算机学院",
            "num": "99"
          }
        ])
      )
      // this.tableDataLin = data

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
  .dialogStyle {
    width: 70%;
  }

</style>

