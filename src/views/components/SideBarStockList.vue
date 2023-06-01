<template>
  <div class="stock-sidebar" :class="stockSidebarTheme">
    <el-form :inline="true" class="search-form">
      <el-form-item>
        <el-input v-model="keyword"
                  placeholder="代码/拼音/名称"
                  prefix-icon="el-icon-search"
                  clearable
                  @keyup.enter.native='search'
        ></el-input>
      </el-form-item>
    </el-form>
    <el-table
        ref="sideBarStockTable"
        :data="tableData"
        width="100%"
        height="100%"
        class="stock-table"
        size="mini"
        highlight-current-row
        :row-class-name="handleRowClassName"
        @row-click="handleRowClick"
        @sort-change="handleSortChange"
    >
      <!--      <el-table-column-->
      <!--          label="序号"-->
      <!--          width="30"-->
      <!--          align="center"-->
      <!--          class-name="serial-number-col"-->
      <!--      >-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.$index + 1 }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column
          prop="stockCode"
          label="名称代码"
          align="left"
          width="68"
          sortable
          class-name="stock-code-name-col"
      >
        <template slot-scope="scope">
          <span class="stock-name">{{ scope.row.stockName }}</span><br/>
          <span class="stock-code">{{ scope.row.stockCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="price"
          label="价格"
          align="right"
          width="60"
          sortable
          class-name="price-col price-increase-col"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.increase>0" :class="increaseUpClass">{{ scope.row.price }}</span>
          <span v-else-if="scope.row.increase==0" class="increase">{{ scope.row.price }}</span>
          <span v-else :class="increaseDownClass">{{ scope.row.price }}</span>
          <br/>&nbsp;
        </template>
      </el-table-column>
      <el-table-column
          label="涨幅"
          prop="increase"
          align="right"
          width="68"
          sortable
          class-name="increase-col price-increase-col"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.increase>0" :class="increaseUpClass">{{ scope.row.increase }}%</span>
          <span v-else-if="scope.row.increase<0"
                :class="increaseDownClass">{{ scope.row.increase }}%</span>
          <span v-else-if="scope.row.suspensionYn==1" class="increase">停牌</span>
          <span v-else class="increase">{{ scope.row.increase }}%</span>
          <br/>&nbsp;
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'SideBarStockList',
  props: {
    pageParam: {},
    tableConfig: {}
  },
  watch: {
    pageParam() {

    }
  },
  data() {
    return {
      keyword: null,
      tableData: [],
      riseColor: null,
      fallColor: null,
      stockSidebarTheme: '',
      increaseUpClass: 'increase-up',
      increaseDownClass: 'increase-down',
      riseClass: '',
      fallClass: '',
      currentIndex: 0,
    }
  },
  created() {
    this.getStockList()
  },
  mounted() {
    let _this = this
    document.onkeyup = function (e) {
      let keyCode = e.keyCode
      if (keyCode != 38 && keyCode != 40) {
        return
      }
      if (window.location.hash.indexOf('#/kLine') == -1) {
        return
      }
      let tableSize = _this.tableData.length
      let tableData = _this.tableData
      if (keyCode == 38) {
        // 上
        if (_this.currentIndex > 0) {
          _this.currentIndex--
        } else {
          _this.currentIndex = tableSize - 1
        }
        let scrollTop = _this.$refs.sideBarStockTable.bodyWrapper.scrollTop;
        _this.$refs.sideBarStockTable.bodyWrapper.scrollTop = scrollTop - 47;
      } else if (keyCode == 40) {
        console.log("currentIndex" + _this.currentIndex)
        console.log("tableSize" + tableSize)
        // 下
        if (_this.currentIndex < (tableSize - 1)) {
          _this.currentIndex++
        } else {
          _this.currentIndex = 0
        }
        let scrollTop = _this.$refs.sideBarStockTable.bodyWrapper.scrollTop;
        _this.$refs.sideBarStockTable.bodyWrapper.scrollTop = scrollTop + 47;
      }
      let row = tableData[_this.currentIndex]
      console.log(row)
      // table行高亮
      _this.$refs.sideBarStockTable.setCurrentRow(row)
      // 刷新K线
      let stockCode = row.stockCode
      console.log(stockCode)
      _this.getKLineList(stockCode)

    }
  },
  methods: {
    setColors() {
      if (window.localStorage.theme == 1) {
        this.riseColor = '#db4a39'
        this.fallColor = '#008e00'
        this.riseClass = 'rise'
        this.fallClass = 'fall'
      } else {
        this.riseColor = '#188df0'
        this.fallColor = '#ddd'
        this.riseClass = 'rise-gray'
        this.fallClass = 'fall-gray'
      }
    },
    loadInfo() {
      this.setColors()
    },
    search() {
      if (this.keyword) {
        let index = this.keyword.indexOf(",")
        let bkIndex = this.keyword.indexOf("BK")
        if (index > 0 || bkIndex != -1) {
          // 股票列表搜索
          this.pageParam.keyword = this.keyword
          this.getStockList()
        } else {
          // K线列表搜索
          this.getKLineList(this.keyword)
        }
      }
      this.keyword = null
    },
    getStockList() {
      console.log("pageParam...")
      console.log(this.pageParam)
      this.$http.post('/stock/getStockBasicList', this.pageParam).then(({data}) => {
        if (data && data.code === 200) {
          this.tableData = data.data
          console.log(this.tableData)
          let firstRow = data.data[0]
          let firstStockCode = firstRow.stockCode
          this.$refs.sideBarStockTable.setCurrentRow(firstRow)
          this.getKLineList(firstStockCode)
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    handleRowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    handleRowClick(row, column, event) {
      console.log(row.index)
      this.currentIndex = row.index
      this.getKLineList(row.stockCode);
    },
    handleSortChange(column) {
      console.log("handleSortChange")
      console.log(column)
      console.log(column.prop)
      console.log(column.order)
      // ascending
      // descending
      let asc = column.order == 'ascending'
      this.pageParam.order = {
        column: column.prop,
        asc: asc
      }
      console.log(this.pageParam)
      this.getStockList()
    },
    getKLineList(stockCode) {
      this.$emit("getKLineList", stockCode)
    },
  }
}
</script>

<style scoped>

.stock-sidebar {
  width: 196px;
  position: fixed;
  top: 50px;
  left: 5px;
  background-color: #fff;
  z-index: 999;
  height: 675px;
  border: 1px solid #eeeeee;
  padding: 0px 2px;
}

.search-form {
  /*width: 220px;*/
  margin: 0px auto;
  /*border: 1px solid red;*/
  padding: 6px 2px 2px 2px;
}

.search-form .el-form-item {
  margin: 0px;
  /*border: 1px solid blue;*/
  /*width: 217px;*/
}
</style>

<style>
.stock-sidebar .search-form .el-form-item {
  width: 100%;
}

.stock-sidebar .search-form .el-form-item .el-form-item__content {
  width: 99%;
  height: 28px;
  line-height: 28px;
}

.stock-sidebar .search-form .el-form-item .el-form-item__content input {
  height: 28px;
  line-height: 28px;
  font-size: 13px;
}

.stock-sidebar .search-form .el-form-item .el-form-item__content i {
  height: 28px;
  line-height: 28px;
}

.stock-sidebar .stock-table {
}

.stock-sidebar .stock-table th {
  font-weight: normal;
  color: #555555;
  padding: 1px 0px;
  /*border: 1px solid red;*/
}


.stock-sidebar .stock-table th .cell {
  /*border: 1px solid red;*/
  padding-left: 3px;
  padding-right: 3px;
}

.stock-sidebar .stock-table th .cell .caret-wrapper {
  width: 12px;
  text-align: center;
}

.stock-sidebar .stock-table th .cell .caret-wrapper .sort-caret {
  border-width: 4px;
  left: 3px;
}

.stock-sidebar .stock-table th .cell .caret-wrapper .sort-caret.ascending {
  top: 7px;
}

.stock-sidebar .stock-table th .cell .caret-wrapper .sort-caret.descending {
  bottom: 9px;
}


.stock-sidebar .stock-table td {
  /*border: 1px solid red;*/
}

.stock-sidebar .stock-table td .cell {
  color: #333333;
  font-size: 13px;
  /*border: 1px solid red;*/
  padding-left: 0px;
  padding-right: 8px;
  padding-top: 3px;
  height: 45px;
}


.stock-sidebar .stock-table .increase-up {
  color: #eb4436;
}

.stock-sidebar .stock-table .increase-down {
  color: #0e9d58;
}

.stock-sidebar .stock-table th.serial-number-col .cell {
  padding-right: 0px;
  height: 36px;
  line-height: 34px;
}

.stock-sidebar .stock-table td.serial-number-col .cell {
  padding-right: 0px;
  line-height: 36px;
}

.stock-sidebar .stock-table td.stock-code-name-col .cell {
  padding-left: 8px;
  padding-right: 2px;
  /*border: 1px solid red;*/
}

.stock-sidebar .stock-table td.stock-code-name-col .stock-name {
  display: block;
  float: left;
  /*border: 1px solid blue;*/
  font-size: 13px;
  height: 19px;
  padding-top: 3px;
}

.stock-sidebar .stock-table td.stock-code-name-col .stock-code {
  color: #555555;
  font-size: 12px;
  clear: both;
  /*-webkit-transform: scale(0.95);*/
  display: block;
  height: 13px;
  line-height: 17px;
  margin-left: 0px;
  margin-top: 0px;
  /*border: 1px solid red;*/
}

.stock-sidebar .stock-table td.price-increase-col .cell {
  height: 36px;
  line-height: 30px;
  /*border: 1px solid red;*/
}

.stock-sidebar .stock-table td.increase-col .cell {
  /*border: 1px solid blue;*/
  padding-right: 10px;
}

.stock-sidebar .stock-table .increase-up-gray {
  color: #333;
}

.stock-sidebar .stock-table .increase-down-gray {
  color: #ccc;
}


</style>
