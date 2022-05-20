<template>
<!-- 个人中心 -->
  <div class="big">
    <div class="mainBox">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light flexCent bgc1" >
          <div>
            <iconfont-svg icon="icon-yonghu" size="38"></iconfont-svg>
            <span class="myText test1">姓名</span>
          </div>
          <span class="data1">{{userInfo.name}}</span>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light flexCent bgc2">
          <div>
            <iconfont-svg icon="icon-wangzhanzhanghao" size="38"></iconfont-svg>
            <span class="myText test2">账号</span>
          </div>
          <span class="data2">{{userInfo.account}}</span>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="4"><div class="grid-content bg-purple flexCent bgc3">
          <div>
            <iconfont-svg icon="icon-a-shenfenzhiwei" size="38"></iconfont-svg>
            <span class="myText test3">职位</span>
          </div>
          <span class="data3">{{userInfo.position}}</span>

        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple myImg">
            <img class="dogStyle" :src="dogUrl" />
            <span class="btnUpdate" @click="toEditInfo">修改资料</span>
          </div>
        </el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple flexCent bgc4">
          <div>
            <iconfont-svg icon="icon-gebuchuyuanxiguidanggongshi" size="38"></iconfont-svg>
            <span class="myText test4">院系</span>
          </div>
          <span class="data4">{{userInfo.faculty}}</span>

        </div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light flexCent bgc5">
          <div>
            <iconfont-svg icon="icon-zengjianianji-" size="38"></iconfont-svg>
            <span class="myText test5">年级</span>
          </div>
          <span class="data5">{{userInfo.grade}}</span>

        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light flexCent bgc6">
          <div>
            <iconfont-svg icon="icon-zengjiabanji-" size="38"></iconfont-svg>
            <span class="myText test6">班级</span>
          </div>
          <span class="data6">{{userInfo.class}}</span>

        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
    <el-dialog title="修改资料"  :visible.sync="visible">
      <el-form :inline="true" :rules="myRule" ref="myForm" label-position="left" :model="confirm" label-width="80px">

        <el-form-item label="姓名" style="width: 40%" prop="name">
          <el-input style="width: 200px;" v-model="confirm.name"></el-input>
        </el-form-item>

        <el-form-item label="账号" style="width: 40%" prop="account">
          <el-input style="width: 200px;" v-model.number="confirm.account"></el-input>
        </el-form-item>
        <el-form-item label="职位" style="width: 40%" prop="position">
          <el-select v-model="confirm.position" style="width: 200px;" clearable placeholder="请选择">
            <el-option
              v-for="item in positionList"
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
        <el-form-item label="年级" style="width: 40%" prop="grade">
          <el-select v-model="confirm.grade" style="width: 200px;" clearable placeholder="请选择">
            <el-option
              v-for="item in gradeList"
              :key="item.value"
              :value="item.value">
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
    inquirePersonalCenter, // 个人中心-查询
    editPersonalCenter, // 个人中心-编辑
    editPassword, // 个人中心-修改密码
  } from "@/network/API/appApi"
  import "../../assets/icon/icon.js"
  export default {
    name: "personalCenter",
    data() {
      return {
        visible:false,
        dogUrl:require("../../assets/images/icon/manstudent.png"),
        myArrData:[],
        userInfo:{
          id:0,
          name:"张三丰",
          account:"admin",
          position:"学生",
          faculty:"计算机学院",
          grade:"大四",
          class:"物联网1801班",
          password:'',
        },
        confirm:{
        },
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
        gradeList:[
          {
            value:'大一',
          },
          {
            value:'大二',
          },
          {
            value:'大三',
          },
          {
            value:'大四',
          },

        ],
        positionList:[
          {
            value:'学生',
          },
          {
            value:'教师',
          },
          {
            value:'管理员',
          },

        ],
        myRule: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'change'}
          ],
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          position: [
            {required: true, message: '请选择职位', trigger: 'change'}
          ],
          faculty: [
            {required: true, message: '请选择院系', trigger: 'change'},
          ],
          grade: [
            {required: true, message: '请选择年级', trigger: 'change'},
          ],
          class: [
            {required: true, message: '请选择班级', trigger: 'change'},
          ],


        },
      }
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem('user'))

    },
    methods:{
      toEditInfo() {
        this.confirm = this.userInfo
        this.visible = true
      },
      myCancel(val) {
        this.confirm = {}
        this.visible = false
        this.userInfo = JSON.parse(localStorage.getItem('user'))
        this.$refs[val].resetFields();
      },
      mySure(val) {
        this.$refs[val].validate((valid) => {
          if (valid) {
            let dsfag = this.confirm
            // debugger
            this.check()
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },
      check() {
        let data = this.confirm
        editPersonalCenter(data).then(res=>{

          if(res == '修改数据成功') {
            this.$message({
              type:'success',
              message:'编辑成功',
            })
            this.confirm = {}
            this.visible = false
            inquirePersonalCenter(data).then(res=>{
              if(res instanceof Array) {
                this.myArrData = res
                let arr = this.myArrData
                let myTrue = arr.find(item=> {
                  return item.id == this.userInfo.id
                })
                if(myTrue) {
                  localStorage.setItem('user', JSON.stringify(myTrue))
                  this.userInfo = JSON.parse(localStorage.getItem('user'))
                  this.userInfo = myTrue
                }

              }
              else {
                this.myArrData = []
              }
            }).catch(err => {
              console.log(err)
            })

          }
          else {
            this.$message({
              type:'warning',
              message:'编辑失败',
            })
          }


        }).catch(err => {
          console.log(err)
        })
      },
    },
  }
</script>

<style scoped lang="scss">


  .flexCent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .myText {
    font-family: 华文彩云;
    font-size: 38px;

  }
  .btnUpdate {
    font-family: 华文琥珀;
    font-size: 28px;
    color: rgb(119, 196, 249);
    /*鼠标经过变小手*/
    cursor: pointer
  }
  .bgc1 {
    background-color: rgba(146, 190, 51,.5) !important;
    border-radius: 107.5px!important;
    box-shadow: 0 0 15px 0px rgb(158, 156, 156);
  }
  .test1 {
    color: #92be33;
  }
  .data1 {
    font-family: 华文彩云;
    font-size: 30px;
    color: #92be33;
    margin-bottom: 20px;
  }

  .bgc2 {
    background-color: rgba(66, 165, 245,.5) !important;
    border-radius: 107.5px!important;
    box-shadow: 0 0 15px 0px rgb(158, 156, 156);
  }
  .test2 {
    color: #42a5f5;
  }
  .data2 {
    font-family: 华文彩云;
    font-size: 30px;
    color: #42a5f5;

    margin-bottom: 20px;
  }

  .bgc3 {
    background-color: rgba(246, 188, 160,.5) !important;
    border-radius: 107.5px!important;
    box-shadow: 0 0 15px 0px rgb(158, 156, 156);
  }
  .test3 {
    color: #f6bca0;
  }
  .data3 {
    font-family: 华文彩云;
    font-size: 30px;
    color: #f6bca0;

    margin-bottom: 20px;
  }

  .bgc4 {
    background-color: rgba(29, 204, 161,.5) !important;
    border-radius: 107.5px!important;
    box-shadow: 0 0 15px 0px rgb(158, 156, 156);
  }
  .test4 {
    color: #1dcca1;
  }
  .data4 {
    font-family: 华文彩云;
    font-size: 30px;
    color: #1dcca1;

    margin-bottom: 20px;
  }

  .bgc5 {
    background-color: rgba(223, 110, 229,.5) !important;
    border-radius: 107.5px!important;
    box-shadow: 0 0 15px 0px rgb(158, 156, 156);
  }
  .test5 {
    color: #df6ee5;
  }
  .data5 {
    font-family: 华文彩云;
    font-size: 30px;
    color: #df6ee5;

    margin-bottom: 20px;
  }

  .bgc6 {
    background-color: rgba(160, 193, 62,.5) !important;
    border-radius: 107.5px!important;
    box-shadow: 0 0 15px 0px rgb(158, 156, 156);
  }
  .test6 {
     color: #a0c13e;
   }
  .data6 {
    font-family: 华文彩云;
    font-size: 22px;
    color: #a0c13e;

    margin-bottom: 20px;
  }
  .myImg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 80px!important;
    background-color: rgb(211, 220, 230);
    padding: 10px!important;


    .dogStyle {
      width: 140px;
      height: 140px;

      background-color: rgb(212, 180, 140);
      border-radius: 75px;
    }
  }

  .big {
    width: calc(100vw - 250px);
    height: calc(100vh - 50px);
    /*怪异盒模型*/
    box-sizing: border-box;
    overflow: hidden;
    padding: 10px;
    background-color: rgb(233, 240, 251);
    .mainBox {
      width: calc(100vw - 250px - 20px);
      height: calc(100vh - 50px - 20px);
      background-color: white;
      box-shadow: 0 0 8px 0px rgb(222, 222, 222);

      .el-row {
        height: 215px;
        /*margin-bottom: 20px;*/
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        height: 100%;
        border-radius: 4px;
      }
      .bg-purple-dark {
        /*background: #99a9bf;*/


      }
      .bg-purple {
        /*background: #d3dce6;*/


      }
      .bg-purple-light {
        /*background: #e5e9f2;*/
      }
      /*控制每个盒子的内边距*/
      .grid-content {
        padding: 20px;
        box-sizing: border-box;
        height: 100%;
        border-radius: 4px;
        min-height: 36px;
      }
      .row-bg {
        padding: 10px 0;
        /*background-color: #f9fafc;*/
      }
    }
  }
</style>
