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
            <span class="text">教师:</span>
            <el-input v-model="myTeacher" class="mt-input" size="small"></el-input>
            <el-button type="success" icon="el-icon-search" size="small" @click="checkData">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" size="small" @click="resetData">重置</el-button>
          </div>

        </template>
        <template slot-scope="row" >
          <el-button style="font-size: 13px" type="text" @click="toAdd(row.rowData)">新增</el-button>
          <el-button style="font-size: 13px" type="text" @click="toEdit(row.rowData)">编辑</el-button>
          <el-button style="font-size: 13px" type="text" @click="toDelete(row.rowData)">删除</el-button>
        </template>
      </zljTable>
    </div>

    <el-dialog :title="myTitle"  :visible.sync="visible">
      <el-form :inline="true" :rules="myRule" ref="myForm" label-position="left":model="confirm" label-width="80px">

        <el-form-item label="上课地点" style="width: 40%" prop="site">
          <el-select v-model="confirm.site" style="width: 200px;" clearable placeholder="请选择">
            <el-option
              v-for="item in siteList"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称" style="width: 40%" prop="course">
          <el-input style="width: 200px;" v-model="confirm.course"></el-input>
        </el-form-item>

        <el-form-item label="应到人数" style="width: 40%" prop="arrive">
          <el-input @change="arriveChange" style="width: 200px;" v-model.number="confirm.arrive"></el-input>
        </el-form-item>
        <el-form-item label="实到人数" style="width: 40%" prop="actual">
          <el-input @change="actualChange" style="width: 200px;" v-model.number="confirm.actual"></el-input>
        </el-form-item>
        <el-form-item label="老师" style="width: 40%" prop="teacher">
          <el-input style="width: 200px;" v-model="confirm.teacher"></el-input>
        </el-form-item>

        <el-form-item label="考勤率" style="width: 40%" prop="rate">
          <el-input disabled style="width: 200px;" v-model.number="confirm.rate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="myCancel('myForm')">取 消</el-button>
          <el-button type="primary" @click="mySure('myForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    inquireStatisticalAnalysis, // 统计分析-查询
    addStatisticalAnalysis, // 统计分析-新增
    editStatisticalAnalysis, // 统计分析-编辑
    deleteStatisticalAnalysis, // 统计分析-删除

  } from "@/network/API/appApi"
  import zljTable from "@/components/zlj-table"
  export default {
    name: "attendanceRateQuery",
    components: {
      zljTable
    },
    data() {
      let arriveRule = (rule, value, callback) => {
          if (value < this.confirm.actual) {
          callback(new Error('应到人数必须大于等于实到人数'));
        } else {
          callback();
        }
      };
      let actualRule = (rule, value, callback) => {
          if (value > this.confirm.arrive) {
          callback(new Error('实到人数必须小于等于应到人数'));
        } else {
          callback();
        }
      };
      return {
        visible:false,
        confirm:{
          site:'',
          course:'',
          teacher:'',
          arrive:'',
          actual:'',
          rate:'',
        },
        myRule: {
          site: [
            {required: true, message: '请选择上课地点', trigger: 'change'}
          ],
          course: [
            {required: true, message: '请输入课程名称', trigger: 'blur'}
          ],
          teacher: [
            {required: true, message: '请输入教师名称', trigger: 'blur'}
          ],
          arrive: [
            {required: true, message: '请输入应到人数', trigger: 'change'},
            { type: 'number', message: '应到人数必须为数字值'},
            { validator: arriveRule, trigger: 'blur' }
          ],
          actual: [
            {required: true, message: '请输入实到人数', trigger: 'change'},
            { type: 'number', message: '实到人数必须为数字值'},
            { validator: actualRule, trigger: 'blur' }
          ],
          rate: [
            {required: true, message: '请输入考勤率', trigger: 'change'},
          ],


        },
        myTitle:'新增',
        siteList:[
          {
            value:'A栋1楼103',
          },
          {
            value:'C栋3楼304',
          },
          {
            value:'B栋2楼202',
          },
          {
            value:'A栋3楼303',
          },
        ],
        mySite:'',
        myCourse:'',
        myTeacher:'',
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
      // 应到人数变化
      arriveChange() {
        let arrive = this.confirm.arrive
        let actual = this.confirm.actual
        if(arrive !== null || arrive !== '' || actual !== null || actual !== '') {
          let big = Number(arrive)
          let small = Number(actual)
          let num = (small/big)*100
          this.confirm.rate = Math.round(num) + '%'
        }

      },
      // 实到人数变化
      actualChange() {
        let arrive = this.confirm.arrive
        let actual = this.confirm.actual
        if(arrive !== null || arrive !== '' || actual !== null || actual !== '') {
          let big = Number(arrive)
          let small = Number(actual)
          let num = (small/big)*100
          this.confirm.rate = Math.round(num) + '%'
        }
      },
      myCancel(val) {
        this.visible = false
        this.selectPage()
        this.$refs[val].resetFields();

      },
      mySure(val) {
        this.$refs[val].validate((valid) => {
          if (valid) {
            if(this.myTitle === '新增') {
              this.addData()
            }
            else if(this.myTitle === '编辑') {
              this.editData()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },
      addData() {

        addStatisticalAnalysis(this.confirm).then(res=>{
          if(res == '插入数据成功') {
            this.$message({
              type:'success',
              message:'新增成功',
            })
            this.selectPage()
            this.visible = false
          }
          else {
            this.$message({
              type:'success',
              message:'新增失败',
            })
          }
        }).catch(err => {
          console.log(err)
        })

      },
      editData() {
        editStatisticalAnalysis(this.confirm).then(res=>{
          if(res == '修改数据成功') {
            this.$message({
              type:'success',
              message:'编辑成功',
            })
            this.selectPage()
            this.visible = false
          }
          else {
            this.$message({
              type:'success',
              message:'编辑失败',
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
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
        inquireStatisticalAnalysis(data).then(res=>{

          if(res instanceof Array) {
            let data = res
            data.forEach(item=> {
              item.arrive = Number(item.arrive)
              item.actual = Number(item.actual)
              item.rate = item.rate + "%"
            })
            this.tableDataLin = data
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
        this.confirm = {
          site:'',
          course:'',
          teacher:'',
          arrive:'',
          actual:'',
          rate:'',
        }
        this.myTitle = '新增'
        this.visible = true
      },
      // 编辑
      toEdit(item) {
        let obj = item
        this.confirm = obj
        this.myTitle = '编辑'
        this.visible = true

      },
      // 删除
      toDelete(item) {
        this.$confirm('删除后无法恢复，请谨慎操作', '提示', {
          // confirmButtonClass: 'el-button--warning'
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=> {
          let data = {
            id:item.id
          }
          deleteStatisticalAnalysis(data).then(res=>{
            if(res == '删除数据成功') {
              this.$message({
                type:'success',
                message:'删除成功',
              })
              this.selectPage()
            }
            else {
              this.$message({
                type:'warning',
                message:'删除失败',
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
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

