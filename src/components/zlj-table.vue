<template>
<!-- table组件 -->
  <div class="body">
    <div class="top">

    </div>
    <div class="bottom">
      <el-table
        tooltip-effect="dark"
        :data="tableData"
        :row-key="getRowKeys"
        style="width: 100%"
        :border="true"
        :cell-style="{ textAlign: 'center',  fontSize: '13px' }"
        :header-cell-style="{
          background: 'rgb(215, 232, 255)',

          color: 'rgb(81,81,81)',
          fontSize: '14px',
          textAlign: 'center'
        }"
        :height="height"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-for="item in titleList" :width="item.width" :label="item.key" :key="item.prop" show-overflow-tooltip :fixed="item.fix">
          <template slot-scope="scope" >
            <!--可能字体颜色需要改变一下，这个时候需要动态添加-->
            <div v-if="item.prop !== 'operation' && item.prop !== 'image'" :style="`color: ` + item.color" v-html="scope.row[item.prop]">
            </div>
            <div v-if="item.prop === 'operation'" >
              <slot  :rowData="scope.row"></slot>
            </div>
            <img v-if="item.prop === 'image'" :src="scope.row.src" class="image" />
          </template>
        </el-table-column>
      </el-table>
      <div class="myPage" v-if="isShowPagination">
        <el-pagination
          background
          ref="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="sizes,prev, pager, next,jumper"
          :total="total"
          prev-text="上一页"
          next-text="下一页"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "zlj-table",
    props: {
      height:{
        type:Number,
      },
      titleList: {
        type: Array,
        default: () => {
          return [
            {
              key: '课件名称',
              prop: 'coursewareName'
            },
            {
              key: '课程名称',
              prop: 'courseName'
            },
            {
              key: '课件大小',
              prop: 'coursewareSize'
            },
            {
              key: '上传时间',
              prop: 'uploadTime'
            },
            {
              key: '使用次数',
              prop: 'useTime'
            },
            {
              key: '访问次数',
              prop: 'viewTime'
            },
            {
              key: '操作',
              prop: 'operation'
            }
          ]
        }
      },
      tableData: {
        type: Array,
        default: () => {
          return [
            {
              coursewareName: '111',
              courseName: '222',
              coursewareSize: '1024kb',
              uploadTime: '2020-11-11 11:11',
              useTime: '1',
              viewTime: '2'
            }
          ]
        }
      },
      total: {
        type: Number,
        default: 1000,
      },
      showSelection: {
        type: Boolean,
        default: true
      },
      isShowPagination: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 10,

      }
    },
    mounted() {
    },
    methods: {
      getRowKeys(row) {
        return row.id
      },
      handleSelectionChange(val) {
        // this.selectTableList = val
        this.$emit('handleSelectionChange', val)
      },
      // 在外界请求数据并修改total、pageNum，pageSize
      handleSizeChange(size) {
        this.$emit('handleSizeChange', size)
      },
      handleCurrentChange(page) {
        this.$emit('handleCurrentChange', page)
      },
      // 这个方法外界通过 this.$refs.xxx.handleReset() 来调用就可以了
      // 所以还可以通过 ref 和 $refs 属性来进行父子组件之间的通讯
      handleReset() {
        this.pageNum = 1;
        this.pageSize = 10;

        // 改变内部el组件里面的page和pageSize来实现重置
        this.$refs.pagination.internalCurrentPage = 1;
        this.$refs.pagination.internalPageSize = 10;
      }
    },
  }
</script>

<style scoped lang="scss">
  /* 左侧菜单栏宽度250px */
  .body {
    width: calc(100vw - 250px);
    height: calc(100vh - 50px);
    /*怪异盒模型*/
    box-sizing: border-box;
    overflow: hidden;
    padding: 10px;
    background-color: rgb(233, 240, 251);
    .top {
      width: calc(100vw - 250px - 20px);
      /*height: calc(100vh - 50px - 20px);*/
      height: 50px;
      background-color: white;
      display: flex;
      /*justify-content: center;*/
      align-items: center;
    }
    .bottom {
      margin-top: 10px;
      /*margin-bottom: 10px;*/
      width: calc(100vw - 250px - 20px - 20px);
      height: calc(100vh - 50px - 20px - 50px - 30px);
      /*height: 50px;*/
      background-color: white;
      padding: 10px;
      .myPage {
        margin-top: 10px;
        width: calc(100vw - 250px - 30px);
        display: flex;
        justify-content: right;
      }
    }
  }

</style>
