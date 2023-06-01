<template>
  <div class="stock-operate-dialog">
    <el-dialog title="" center :visible.sync="dialogTableVisible"
               width="350px"
               @open="handleOpen" @close="handleClose">

      <el-form class="stock-operate-form">
        <el-form-item label="">
          <el-input v-model="keyword" placeholder="请输入代码\名称" clearable style="width: 100%;"
                    @keyup.enter.native="handleSearch"
                    @clear="handleClear"
          >
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </el-form-item>
      </el-form>

      <el-table :data="tableData"
                class="stock-operate-table"
                size="mini"
                max-height="508"
      >
        <el-table-column
            label="序号"
            align="center"
            width="46"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column property="stockCode" label="代码" width="70" align="center"></el-table-column>
        <el-table-column property="stockName" label="名称" width="75" align="center"></el-table-column>
        <el-table-column property="marketTypeName" label="市场" width="60" align="center"></el-table-column>
        <el-table-column label="操作" width="65" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.exists" @click="handleDeleteStock(scope.row)"
                       type="text" size="medium">删股票
            </el-button>
            <el-button v-else @click="handleAddStock(scope.row)" type="text" size="medium">加股票</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StockOperateDialog",
  props: {},
  watch: {},
  data() {
    return {
      dialogTableVisible: false,
      bkCode: null,
      keyword: null,
      tableData: [],
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    show(bkCode) {
      this.bkCode = bkCode
      console.log(bkCode)
      this.dialogTableVisible = true
    },
    handleSearch() {
      console.log(this.keyword)
      this.$http.post('/stockSearch', {
        keyword: this.keyword,
        bkCode: this.bkCode
      }).then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.tableData = data.data
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    handleAddStock(row) {
      console.log('add...')
      this.handleToggleClickStock(row)

      this.$http.post('/bkStock/addBkStock', {
        bkCode: this.bkCode,
        stockCode: row.stockCode,
        stockName: row.stockName
      }).then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.$message.success('添加成功')
          this.getOperateList()
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    handleDeleteStock(row) {
      console.log('delete...')
      this.handleToggleClickStock(row)

      this.$http.post('/bkStock/deleteBkStock', {
        bkCode: this.bkCode,
        stockCode: row.stockCode,
        stockName: row.stockName
      }).then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.$message.success('删除成功')
          this.getOperateList()
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    handleToggleClickStock(row) {
      this.tableData.map(item => {
        if (item.stockCode == row.stockCode) {
          item.exists = !item.exists
          return
        }
      })
    },
    handleOpen() {
    },
    handleClose() {
      this.bkCode = null
      this.keyword = null
      this.tableData = []
    },
    handleClear() {
      this.tableData = []
    },
    getOperateList() {
      this.$emit("getOperateList")
    },
  }
}
</script>

<style scoped>
.stock-operate-dialog {

}

.stock-operate-dialog .el-form-item {
  /*border: 1px solid red;*/
  margin-bottom: 12px;
}

.stock-operate-table {
  /*border: 1px solid red;*/
}

</style>

<style>
.stock-operate-dialog .el-dialog {
  margin-top: 66px !important;
}

.stock-operate-dialog .el-dialog__body {
  /*border: 1px solid red;*/
  padding: 15px 17px 20px 17px;
}

.stock-operate-table th.el-table__cell, .stock-operate-table td.el-table__cell {
  /*border: 1px solid blue;*/
  /*padding: 6px 0px;*/
}

.stock-operate-table {
  /*border: 1px solid red;*/
}
.stock-operate-table td {
  /*border: 1px solid red;*/
}

.stock-operate-table .cell {
  color: #333333;
  font-weight: normal;
  font-size: 13px;
}

.stock-operate-table .cell .el-button--medium {
  font-size: 13px;
  font-weight: 400;
}

.stock-operate-table .el-table__cell {
  padding: 2px 0px;
}


</style>
