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
          <el-button style="font-size: 13px" type="text" @click="toAdd(row.rowData)">预定</el-button>
          <!--<el-button style="font-size: 13px" type="text" @click="toEdit(row.rowData)">编辑</el-button>
          <el-button style="font-size: 13px" type="text" @click="toDelete(row.rowData)">删除</el-button>-->
        </template>
      </zljTable>
    </div>
    <el-dialog title="预定" :visible.sync="visible">
      <el-form :inline="true" :rules="myRule" ref="myForm" label-position="left":model="confirm" label-width="80px">
        <el-form-item label="上课时间" style="width: 40%" prop="time">

          <el-date-picker
            style="display: inline-block;width: 200px;"
            v-model="confirm.time"
            type="datetime"
            placeholder="选择日期时间"
            @change="myDateTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
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
        <el-form-item label="老师" style="width: 40%" prop="teacher">
          <el-input style="width: 200px;" v-model="confirm.teacher"></el-input>
        </el-form-item>
        <el-form-item label="签到状态" style="width: 40%" prop="status">
          <el-select v-model="confirm.status" style="width: 200px;" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :value="item.id"
              :label="item.value"
              disabled
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" style="width: 40%" prop="class">

          <el-select v-model="confirm.class" style="width: 200px;" clearable placeholder="请选择">
            <el-option
              v-for="item in classList"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系" style="width: 40%" prop="faculty">

          <el-select v-model="confirm.faculty" style="width: 200px;" clearable placeholder="请选择">
            <el-option
              v-for="item in facultyList"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课人数" style="width: 40%" prop="num">
          <el-input style="width: 200px;" v-model.number="confirm.num"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addCancel('myForm')">取 消</el-button>
          <el-button type="primary" @click="addSure('myForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    inquireManagement, // 公共课管理-查询
    addManage, // 公共课管理-新增
  } from "@/network/API/appApi"
  import zljTable from "@/components/zlj-table"
  export default {
    name: "bookAPublicClass",
    components: {
      zljTable
    },
    data() {
      return {
        // 预定的当前项
        currentItem:{},
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
        classList:[
          {
            value:'计算机1801班',
          },
          {
            value:'物联网1901班',
          },
          {
            value:'大数据2001班',
          },
          {
            value:'人工智能1801班',
          },

        ],
        facultyList:[
          {
            value:'计算机学院',
          },
          {
            value:'航空学院',
          },
          {
            value:'物理学院',
          },
          {
            value:'智能制造学院',
          },

        ],
        statusList:[
          {
            id:'0',
            value:'未签到'
          },
          {
            id:'1',
            value:'已签到'
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
          status:'0',
          class:'',
          faculty:'',
          num:'',
        },
        myRule: {
          time: [
            {required: true, message: '请选择上课时间', trigger: 'change'},
            // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          site: [
            {required: true, message: '请选择上课地点', trigger: 'change'}
          ],
          course: [
            {required: true, message: '请输入课程名称', trigger: 'blur'}
          ],
          teacher: [
            {required: true, message: '请输入教师名称', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '请选择签到状态', trigger: 'change'}
          ],
          class: [
            {required: true, message: '请选择班级', trigger: 'change'}
          ],
          faculty: [
            {required: true, message: '请选择院系', trigger: 'change'}
          ],
          num: [
            {required: true, message: '请输入上课人数', trigger: 'blur'},
            { type: 'number', message: '上课人数必须为数字值'}
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
      myDateTime(item) {
        this.confirm.time = item
      },
      // 预定取消
      addCancel(formName) {
        this.confirm = {
          time:'',
          site:'',
          course:'',
          teacher:'',
          status:'',
          class:'',
          faculty:'',
          num:'',
        }
        this.$refs[formName].resetFields();
        this.visible = false
      },
      // 预定确定
      addSure(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let data = this.confirm
            addManage(data).then(res=>{
              if(res == '插入数据成功') {
                this.$message({
                  type:'success',
                  message:'预定成功',
                })
                this.confirm = {
                  time:'',
                  site:'',
                  course:'',
                  teacher:'',
                  status:'',
                  class:'',
                  faculty:'',
                  num:'',
                }
                this.selectPage()
                this.visible = false
              }

            }).catch(err => {
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

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
        inquireManagement(data).then(res=>{
          if(res instanceof Array) {
            let arr = res
            arr.forEach(i=> {
              i.num = Number(i.num)
            })
            this.tableDataLin = arr
          }
          else {
            this.tableDataLin = []
          }
        }).catch(err => {
          console.log(err)
        })
      },


      // 预定
      toAdd(item) {
        this.currentItem = item
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

