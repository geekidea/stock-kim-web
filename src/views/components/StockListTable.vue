<template>
  <div class="stock-list" :class="tableThemeClass">
    <el-table
        :data="tableData"
        style="width: 100%"
        class="stock-table"
        :class="tableThemeClass"
        size="mini"
        @row-click="handleRowClick"
        @sort-change="handleSortChange"
    >
      <el-table-column
          label="序号"
          :width="columnWidth.serialNumber"
          align="center"
          fixed
          v-if="layoutSmall==false"
      >
        <template slot-scope="scope">
          {{ (pageParam.pageIndex - 1) * pageParam.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
          prop="stockCode"
          label="代码"
          align="center"
          :width="columnWidth.stockCode"
          sortable
          fixed
          :class-name="stockCodeNameClass"
      >
        <template slot-scope="scope">
          <template v-if="layoutSmall">
            <span>{{ scope.row.stockCode }}</span>
          </template>
          <template v-else>
            <el-link type="primary" class="stock-link"
                     :href="'https://www.iwencai.com/unifiedwap/result?w='+scope.row.stockCode"
                     target="_blank">{{ scope.row.stockCode }}
            </el-link>
          </template>
        </template>
      </el-table-column>
      <el-table-column
          label="名称"
          align="center"
          sortable
          :width="columnWidth.stockName"
          fixed
          :class-name="stockCodeNameClass"
      >
        <template slot-scope="scope">
          <template v-if="layoutSmall">
            <span>{{ scope.row.stockName }}</span>
          </template>
          <template v-else>
            <el-popover
                popper-class="stock-name-popover"
                placement="right"
                @show="handleShowImage(scope.row.stockCode)"
                trigger="hover">

              <el-tabs class="image-tab" v-model="imageTabActiveName" @tab-click="handleImageTabClick"
                       :id="scope.row.stockCode">
                <el-tab-pane label="分时" name="min" :data-id="scope.row.stockCode"></el-tab-pane>
                <el-tab-pane label="日K" name="daily" :data-id="scope.row.stockCode"></el-tab-pane>
                <el-tab-pane label="周K" name="weekly" :data-id="scope.row.stockCode"></el-tab-pane>
                <el-tab-pane label="月K" name="monthly" :data-id="scope.row.stockCode"></el-tab-pane>
              </el-tabs>

              <img class="popover-image" :src="stockCodeImage" :alt="scope.row.stockName">
              <el-link type="primary" class="stock-link" slot="reference"
                       :href="'http://stockpage.10jqka.com.cn/'+scope.row.stockCode"
                       target="_blank">{{ scope.row.stockName }}
              </el-link>
            </el-popover>
          </template>

        </template>
      </el-table-column>
      <el-table-column
          prop="price"
          label="最新"
          align="center"
          :width="columnWidth.price"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.increase>0" :class="increaseUpClass">{{ scope.row.price }}</span>
          <span v-else-if="scope.row.increase==0" class="increase">{{ scope.row.price }}</span>
          <span v-else :class="increaseDownClass">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="涨幅"
          prop="increase"
          align="center"
          :width="columnWidth.increase"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.increase>0" :class="increaseUpClass">{{ scope.row.increase }}%</span>
          <span v-else-if="scope.row.increase<0" :class="increaseDownClass">{{ scope.row.increase }}%</span>
          <span v-else-if="scope.row.suspensionYn==1" class="increase">停牌</span>
          <span v-else class="increase">{{ scope.row.increase }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="industry"
          label="行业"
          align="center"
          :width="columnWidth.industry"
          sortable
      >
        <template slot-scope="scope">
          <template v-if="layoutSmall">
            <span>{{ scope.row.industry }}</span>
          </template>
          <template v-else>
            <el-link type="primary" class="stock-link"
                     :href="'https://www.iwencai.com/unifiedwap/result?w='+scope.row.industry+'，非ST，非科创'"
                     target="_blank">{{ scope.row.industry }}
            </el-link>
          </template>
        </template>
      </el-table-column>
      <el-table-column
          prop="totalMarketValue"
          label="总市值"
          align="center"
          sortable
          width="86"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.totalMarketValue }}亿</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="circulationMarketValue"
          label="流通市值"
          align="center"
          sortable
          width="86"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.circulationMarketValue }}亿</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="tradeAmount"
          label="交易金额"
          align="center"
          sortable
          width="86"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.tradeAmount }}亿</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="amplitude"
          label="振幅"
          align="center"
          width="76"
          sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.amplitude }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="i5"
          label="5日涨幅"
          align="center"
          width="76"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.i5>0" :class="increaseUpClass">{{ scope.row.i5 }}%</span>
          <span v-else-if="scope.row.i5<0" :class="increaseDownClass">{{ scope.row.i5 }}%</span>
          <span v-else class="increase">{{ scope.row.i5 }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="i10"
          label="10日涨幅"
          align="center"
          width="76"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.i10>0" :class="increaseUpClass">{{ scope.row.i10 }}%</span>
          <span v-else-if="scope.row.i10<0" :class="increaseDownClass">{{ scope.row.i10 }}%</span>
          <span v-else class="increase">{{ scope.row.i10 }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="i20"
          label="20日涨幅"
          align="center"
          width="76"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.i20>0" :class="increaseUpClass">{{ scope.row.i20 }}%</span>
          <span v-else-if="scope.row.i20<0" :class="increaseDownClass">{{ scope.row.i20 }}%</span>
          <span v-else class="increase">{{ scope.row.i20 }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="i30"
          label="30日涨幅"
          width="76"
          align="center"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.i30>0" :class="increaseUpClass">{{ scope.row.i30 }}%</span>
          <span v-else-if="scope.row.i30<0" :class="increaseDownClass">{{ scope.row.i30 }}%</span>
          <span v-else class="increase">{{ scope.row.i30 }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="i60"
          label="60日涨幅"
          width="76"
          align="center"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.i60>0" :class="increaseUpClass">{{ scope.row.i60 }}%</span>
          <span v-else-if="scope.row.i60<0" :class="increaseDownClass">{{ scope.row.i60 }}%</span>
          <span v-else class="increase">{{ scope.row.i60 }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="i90"
          label="90日涨幅"
          width="76"
          align="center"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.i90>0" :class="increaseUpClass">{{ scope.row.i90 }}%</span>
          <span v-else-if="scope.row.i90<0" :class="increaseDownClass">{{ scope.row.i90 }}%</span>
          <span v-else class="increase">{{ scope.row.i90 }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="i120"
          label="120日涨幅"
          width="86"
          align="center"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.i120>0" :class="increaseUpClass">{{ scope.row.i120 }}%</span>
          <span v-else-if="scope.row.i120<0" :class="increaseDownClass">{{ scope.row.i120 }}%</span>
          <span v-else class="increase">{{ scope.row.i120 }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="marketType"
          label="市场类型"
          align="center"
          width="75"
          sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.marketTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
          width="150"
          sortable
      >
      </el-table-column>
      <el-table-column
          prop="batchNo"
          label="批次号"
          align="center"
          width="130"
          sortable
      >
      </el-table-column>
      <el-table-column
          prop="optionalDate"
          label="自选日期"
          align="center"
          width="105"
          sortable
          :formatter="dateFormat"
      >
      </el-table-column>
    </el-table>
    <el-pagination
        v-if="showPage"
        class="stock-page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParam.pageIndex"
        :page-sizes="[12, 15, 20, 50, 100, 200, 500]"
        :page-size="pageParam.pageSize"
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, sizes, total"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: "StockListTable",
  props: {
    pageParam: {
      pageIndex: 1,
      pageSize: 12,
      type: 0,
    }
  },
  watch: {
    pageParam() {
      this.pageParam.pageIndex = 1
      if (this.pageSize) {
        this.pageParam.pageSize = this.pageSize
      } else {
        if (!this.pageParam.pageSize) {
          this.pageParam.pageSize = this.defaultPageSize
        }
      }
      this.loadTable()
    }
  },
  data() {
    return {
      tableData: [],
      stockCodeNameClass: 'stock-code-name',
      increaseUpClass: 'increase-up',
      increaseDownClass: 'increase-down',
      total: 0,
      stockCodeImage: null,
      imageTabActiveName: 'daily',
      defaultPageSize: 15,
      pageSize: null,
      tableThemeClass: [],
      showPage: true,
      columnWidth: {},
      defaultColumnWidth: {
        serialNumber: 50,
        stockCode: 80,
        stockName: 80,
        price: 70,
        increase: 76,
        industry: 80
      },
      smallColumnWidth: {
        stockCode: 57,
        stockName: 63,
        price: 53,
        increase: 55,
        industry: 58
      },
      layoutSmall: false
    }
  },
  created() {
    if (window.localStorage.theme == 1) {
      this.tableThemeClass.push(this.$theme.HIGHLIGHT)
      this.increaseUpClass = 'increase-up'
      this.increaseDownClass = 'increase-down'
      this.stockCodeNameClass = 'stock-code-name'
    } else {
      this.tableThemeClass = []
      this.increaseUpClass = 'increase-up-gray'
      this.increaseDownClass = 'increase-down-gray'
      this.stockCodeNameClass = 'stock-code-name-gray'
    }


    let clientWidth = document.body.clientWidth
    if (clientWidth < 1000) {
      this.columnWidth = this.smallColumnWidth
      this.tableThemeClass.push('layout-small')
      this.layoutSmall = true
      console.log('tableThemeClass')
      console.log(this.tableThemeClass)
    } else {
      this.columnWidth = this.defaultColumnWidth
      this.layoutSmall = false
    }

  }, methods: {
    loadTable() {
      this.getStockList()
    },
    getStockList(param) {
      if (!param) {
        param = this.pageParam
      }
      this.$http.post('/stock/getStockPageList', param).then(({data}) => {
        if (data && data.code === 200) {
          this.tableData = data.data.records
          this.total = Number(data.data.total)
          if (this.total <= this.pageParam.pageSize) {
            this.showPage = false
          } else {
            this.showPage = true
          }
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    dateFormat(row, column) {
      let date = row[column.property];
      if (date == undefined) {
        return ''
      }
      return this.$moment(date).format("YYYY-MM-DD")
    },
    handleSizeChange(pageSize) {
      this.pageParam.pageSize = pageSize
      this.pageSize = pageSize
      this.getStockList()
    },
    handleCurrentChange(pageIndex) {
      this.pageParam.pageIndex = pageIndex
      this.getStockList()
    },
    handleSortChange(column) {
      // ascending
      // descending
      let asc = column.order == 'ascending'
      this.pageParam.pageIndex = 1
      this.pageParam.order = {
        column: column.prop,
        asc: asc
      }
      this.getStockList(this.pageParam)
    },
    handleShowImage(stockCode, type) {
      if (type) {
        this.imageTabActiveName = type
      }
      let market
      if (stockCode.indexOf('6') == 0) {
        market = 'sh'
      } else {
        market = 'sz'
      }
      let src = 'http://image.sinajs.cn/newchart/' + this.imageTabActiveName + '/n/' + market + stockCode + '.gif?_=' + new Date().getTime()
      this.stockCodeImage = src
    },
    handleImageTabClick(tab) {
      let name = tab.name
      let stockCode = tab.$el.dataset.id
      this.handleShowImage(stockCode, name)
    },
    handleRowClick(row, column, event) {
      this.$emit("toggleShow")
    }
  }
}
</script>

<style>
.stock-list {
  clear: both;
  width: 100%;
  /*width: 1369px;*/
  margin: 0px auto;
  /*border: 1px solid #EBEEF5;*/
}

.stock-list .stock-table {
  /*border: 1px solid red;*/
  /*width: 1369px;*/
  width: 100%;
}

.stock-list .stock-table .cell {
  color: #333;

}

.stock-list .stock-table th {
  padding: 1px 0px;
  /*border: 1px solid red;*/
}

.stock-list .stock-table th .cell {
  font-size: 14px;
  font-weight: normal;
  padding: 0px 2px;
}

.stock-list .stock-table th .cell .caret-wrapper {
  width: 12px;
  text-align: center;
}

.stock-list .stock-table th .cell .caret-wrapper .sort-caret {
  border-width: 4px;
  left: 3px;
}

.stock-list .stock-table th .cell .caret-wrapper .sort-caret.ascending {
  top: 7px;
}

.stock-list .stock-table th .cell .caret-wrapper .sort-caret.descending {
  bottom: 9px;
}

.stock-list .stock-table td {
  /*border: 1px solid red;*/
}

.stock-list .stock-table td .cell {
  font-size: 15px;
  padding: 2px 0px;
}

.stock-list .stock-table .increase-up {
  color: #eb4436;
}

.stock-list .stock-table .increase-down {
  color: #0e9d58;
}

.stock-list .stock-table td.stock-code-name-gray .cell {
  color: #333;
}

.stock-list .stock-table .increase-up-gray {
  color: #333;
}

.stock-list .stock-table .increase-down-gray {
  color: #ccc;
}

.stock-list .stock-page {
  /*border: 1px solid red;*/
  text-align: center;
  margin-top: 12px;
  font-size: 13px;
}

.stock-name-popover {
  /*border: 1px solid red;*/
}

.stock-name-popover .popover-image {
  width: 545px;
  height: 300px;
  /*width: 654px;*/
  /*height: 320px;*/
  /*border: 1px solid red;*/
}

.stock-list .stock-table .stock-link {
  font-weight: normal;
}

.image-tab .el-tabs__item {
  font-weight: normal;
  text-align: center;
}


.stock-list.layout-small {
  /*border: 1px solid red;*/
}

.stock-table.layout-small {
  /*border: 1px solid red;*/
}

.stock-table.layout-small th, .stock-table.layout-small td {
  /*border: 1px solid red;*/
  /*background-color: #cccccc;*/
}

.stock-table.layout-small.el-table--mini th.el-table__cell {
  padding: 0px 0px;
}

.stock-table.layout-small.el-table--mini .el-table__cell {
  padding: 1px 0px;
}

.stock-table.layout-small.el-table--mini .el-table__cell .cell {
  font-size: 13px;
  color: #363636;
}

.stock-list .stock-table td.stock-code-name-gray .cell {
  color: #666;
}

.stock-table.layout-small .increase-up-gray {
  color: #cccccc;
}

.stock-table.layout-small .increase-down-gray {
  color: #666;
}

.stock-table.layout-small.el-table--border::after,
.stock-table.layout-small.el-table--group::after,
.stock-table.layout-small.el-table::before,
.stock-table.layout-small .el-table__fixed-right::before,
.stock-table.layout-small .el-table__fixed::before {
  content: none;
}

</style>
