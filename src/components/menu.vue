<template>
<!-- 左侧菜单栏 -->
  <div class="body">
<!--    :collapse="isCollapse"
      :default-openeds.sync="openKeys"
      :default-active.sync="activeNav"-->
    <el-menu
      class="menuStyle"
      mode="vertical"
      style="user-select:none;"
      active-text-color="rgb(55,55,230)"
      :unique-opened="true"
      router

      text-color="black"
      collapse-transition>
      <template v-for="(item,index) in menuList">
<!--        这里绑定id，因为不同一级菜单的url一样，都是‘’   index是字符串-->
        <el-submenu v-if="item.children.length !== 0" :key="item.id" :index="item.id">
          <template slot="title">
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.url"
          >
            <span>{{ subItem.label }}</span>
          </el-menu-item>

        </el-submenu>
        <el-menu-item v-if="item.children.length === 0" :key="item.id" :index="item.url" style="user-select:none">
<!--          <i :class="item.icon" />-->
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "myMenu",
    data() {
      return {
        menuList:[],
        asyncRoute: {
          '/home': {
            path: '/home',
            name: '/home',
            component: () => import('@/pages/home/home'),
            meta: {
              title: '会议室管理系统',
              auth: false
            }
          },
          '/publicClassEnquiry': {
            path: '/publicClassEnquiry',
            name: '/publicClassEnquiry',
            component: () => import('@/pages/publicClassManagement/publicClassEnquiry'),
            meta: {
              title: '公共课查询',
              auth: false
            }
          },
          '/bookAPublicClass': {
            path: '/bookAPublicClass',
            name: '/bookAPublicClass',
            component: () => import('@/pages/publicClassManagement/bookAPublicClass'),
            meta: {
              title: '公共课预定',
              auth: false
            }
          },
          '/myPublicClass': {
            path: '/myPublicClass',
            name: '/myPublicClass',
            component: () => import('@/pages/publicClassManagement/myPublicClass'),
            meta: {
              title: '我的公共课',
              auth: false
            }
          },
          '/signInForPublicClass': {
            path: '/signInForPublicClass',
            name: '/signInForPublicClass',
            component: () => import('@/pages/attendanceManagement/signInForPublicClass'),
            meta: {
              title: '公共课签到',
              auth: false
            }
          },
          '/attendanceRateQuery': {
            path: '/attendanceRateQuery',
            name: '/attendanceRateQuery',
            component: () => import('@/pages/attendanceManagement/attendanceRateQuery'),
            meta: {
              title: '考勤率查询',
              auth: false
            }
          },
          '/attendanceRanking': {
            path: '/attendanceRanking',
            name: '/attendanceRanking',
            component: () => import('@/pages/attendanceManagement/attendanceRanking'),
            meta: {
              title: '考勤排名',
              auth: false
            }
          },
          '/statisticsByCourse': {
            path: '/statisticsByCourse',
            name: '/statisticsByCourse',
            component: () => import('@/pages/statisticalAnalysis/statisticsByCourse'),
            meta: {
              title: '按课程统计',
              auth: false
            }
          },
          '/statisticsByClassroom': {
            path: '/statisticsByClassroom',
            name: '/statisticsByClassroom',
            component: () => import('@/pages/statisticalAnalysis/statisticsByClassroom'),
            meta: {
              title: '按教室统计',
              auth: false
            }
          },
          '/statisticsByTeacher': {
            path: '/statisticsByTeacher',
            name: '/statisticsByTeacher',
            component: () => import('@/pages/statisticalAnalysis/statisticsByTeacher'),
            meta: {
              title: '按教师统计',
              auth: false
            }
          },
          '/personalCenter': {
            path: '/personalCenter',
            name: '/personalCenter',
            component: () => import('@/pages/systemSettings/personalCenter'),
            meta: {
              title: '个人中心',
              auth: false
            }
          },
          '/changePassword': {
            path: '/changePassword',
            name: '/changePassword',
            component: () => import('@/pages/systemSettings/changePassword'),
            meta: {
              title: '修改密码',
              auth: false
            }
          },
        }
      }
    },
    created() {
      this.addRoute()
    },
    methods:{
      addRoute() {
      // let menuList = JSON.parse(localStorage.getItem('menus'))
        let menuList =[
          {
            id:1,label:'首页',url:'/home',pid: 0,children:[]
          },
          {
            id:2,label:'公共课管理',url:'',pid: 0,
            children: [
              {id:21,label:'公共课查询',url:'/publicClassEnquiry',pid:2},
              {id:22,label:'公共课预定',url:'/bookAPublicClass',pid:2},
              {id:23,label:'我的公共课',url:'/myPublicClass',pid:2},
            ]
          },
          {
            id:3,label:'考勤管理',url:'',pid: 0,
            children: [
              {id:31,label:'公共课签到',url:'/signInForPublicClass',pid:2},
              {id:32,label:'考勤率查询',url:'/attendanceRateQuery',pid:2},
              {id:33,label:'考勤排名',url:'/attendanceRanking',pid:2},
            ]
          },
          {
            id:4,label:'统计分析',url:'',pid: 0,
            children: [
              {id:41,label:'按课程统计',url:'/statisticsByCourse',pid:2},
              {id:42,label:'按教室统计',url:'/statisticsByClassroom',pid:2},
              {id:43,label:'按教师统计',url:'/statisticsByTeacher',pid:2},
            ]
          },
          {
            id:5,label:'系统设置',url:'',pid: 0,
            children: [
              {id:51,label:'个人中心',url:'/personalCenter',pid:2},
              {id:52,label:'修改密码',url:'/changePassword',pid:2},
            ]
          },


      ]
      this.menuList = menuList
      // 生成vue路由表
      const route = []
      for (let i = 0; i < menuList.length; i++) {
        const item = menuList[i]
        if (item.url && this.asyncRoute[item.url]) {
          route.push(this.asyncRoute[item.url])
        }
        if (item.children) {
          for (let j = 0; j < item.children.length; j++) {
            const subItem = item.children[j]
            if (subItem.url && this.asyncRoute[subItem.url]) {
              route.push(this.asyncRoute[subItem.url])
            }
          }
        }
      }
      this.$router.addRoutes(route)
      // console.log('生成的路由表', route)
    }
    },
  }
</script>

<style scoped lang="scss">
  .body {
    width: 250px;
    height: calc(100vh - 50px);
    .menuStyle {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-right: 10px;
      padding-top: 10px;
      padding-left: 10px;
      /*background-color: rgba(166, 221, 231, 0.68);*/
      background-color: white;
      .el-menu-item {
        /*padding-left: 90px!important;*/
      }
      /*菜单选中*/
      .el-menu-item.is-active {
        border-radius: 4px;

        //设置背景颜色
        /*padding-left: 90px!important;*/
        /*background-color: rgb(42, 143, 196) !important;*/
        //设置字体颜色
        /*color: rgb(140, 0, 0) !important;*/
        background: linear-gradient(
            to left,
            /*  右边*/
            /*rgba(189, 26, 45,.5),*/
            /*  #7d0404,*/
            rgb(42, 143, 150),
            /*  左边*/
            rgb(42, 143, 196)
        ) !important;
        //设置字体颜色
        /*color: rgb(255, 255, 255) !important;*/
        color: rgb(255, 255, 255) !important;
      }
      /*  鼠标经过每一项*/
      .el-menu-item:hover {
        color: black !important;

        //设置背景颜色
        border-radius: 4px;
        /*background-color: rgb(42, 143, 196) !important;*/
        background: linear-gradient(
            to left,
            /*  右边*/
            /*rgba(189, 26, 45,.5),*/
            /*  #7d0404,*/
            rgb(106, 170, 203),
            /*  左边*/
            rgb(163, 196, 213)


        ) !important;
        //设置字体颜色
        /*color: rgb(255, 255, 255) !important;*/

      }
    }


  }
</style>
