<template>
  <div class="hold-stock-list">
    <el-table
        :data="tableData"
        style="width: 100%"
        class="stock-table"
        size="mini"
        @sort-change="handleSortChange"
    >
      <el-table-column
          label="序号"
          width="50"
          align="center"
          sortable
          fixed
      >
        <template slot-scope="scope">
          <span v-if="scope.$index + 1 == tableSize">合计</span>
          <span v-else>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="stockCode"
          label="代码"
          align="center"
          width="80"
          sortable
          fixed
          :class-name="stockCodeNameClass"
      >
        <template slot-scope="scope">
          <el-link type="primary" class="stock-link"
                   :href="'https://www.iwencai.com/unifiedwap/result?w='+scope.row.stockCode"
                   target="_blank">{{ scope.row.stockCode }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="stockName"
          label="名称"
          align="center"
          sortable
          width="80"
          fixed
          :class-name="stockCodeNameClass"
      >
        <template slot-scope="scope">
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
      </el-table-column>
      <el-table-column
          prop="holdCount"
          label="持仓数量"
          align="center"
          width="80"
          sortable
      >
      </el-table-column>
      <el-table-column
          prop="useCount"
          label="可用数量"
          align="center"
          width="80"
          sortable
      >
      </el-table-column>
      <el-table-column
          prop="costPrice"
          label="成本价"
          align="center"
          width="80"
          sortable
      >
      </el-table-column>
      <el-table-column
          prop="currentPrice"
          label="当前价"
          align="center"
          width="80"
          sortable
      >
      </el-table-column>
      <el-table-column
          prop="holdMarketValue"
          label="持仓市值"
          align="center"
          width="80"
          sortable
      >
      </el-table-column>
      <el-table-column
          prop="holdAmount"
          label="持仓盈亏"
          align="center"
          width="80"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.holdAmount>0" :class="increaseUpClass">{{ scope.row.holdAmount.toFixed(2) }}</span>
          <span v-else-if="scope.row.holdAmount<0" :class="increaseDownClass">{{
              scope.row.holdAmount.toFixed(2)
            }}</span>
          <span v-else class="increase">{{ scope.row.holdAmount.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="holdIncrease"
          label="持仓涨幅"
          align="center"
          width="80"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.holdIncrease>0" :class="increaseUpClass">{{ scope.row.holdIncrease }}%</span>
          <span v-else-if="scope.row.holdIncrease<0" :class="increaseDownClass">{{ scope.row.holdIncrease }}%</span>
          <span v-else class="increase">{{ scope.row.holdIncrease }}%</span>
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--          prop="todayHoldAmount"-->
      <!--          label="当日盈亏"-->
      <!--          align="center"-->
      <!--          width="80"-->
      <!--          sortable-->
      <!--      >-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--          prop="increase"-->
      <!--          label="当日涨幅"-->
      <!--          align="center"-->
      <!--          width="80"-->
      <!--          sortable-->
      <!--      >-->
      <!--        <template slot-scope="scope">-->
      <!--          <span v-if="scope.row.increase>0" :class="increaseUpClass">{{ scope.row.increase }}%</span>-->
      <!--          <span v-else-if="scope.row.increase<0" :class="increaseDownClass">{{ scope.row.increase }}%</span>-->
      <!--          <span v-else class="increase">{{ scope.row.increase }}%</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <el-table-column
          prop="percentage"
          label="个股仓位"
          align="center"
          width="80"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.percentage!=null">{{ scope.row.percentage }}%</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column
          prop="holdDay"
          label="持有天数"
          align="center"
          width="80"
          sortable
      >
      </el-table-column>
      <el-table-column
          prop="marketTypeName"
          label="市场类型"
          align="center"
          width="80"
          sortable
      >
      </el-table-column>
      <!--      <el-table-column-->
      <!--          :formatter="formatDate"-->
      <!--          prop="buyDate"-->
      <!--          label="买入日期"-->
      <!--          align="center"-->
      <!--          width="150"-->
      <!--          sortable-->
      <!--      >-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--          prop="buyPrice"-->
      <!--          label="买入价格"-->
      <!--          align="center"-->
      <!--          width="80"-->
      <!--          sortable-->
      <!--      >-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--          prop="buyIncrease"-->
      <!--          label="买入涨幅"-->
      <!--          align="center"-->
      <!--          width="80"-->
      <!--          sortable-->
      <!--      >-->
      <!--        <template slot-scope="scope">-->
      <!--          <span v-if="scope.row.increase>0" :class="increaseUpClass">{{ scope.row.increase }}%</span>-->
      <!--          <span v-else-if="scope.row.increase<0" :class="increaseDownClass">{{ scope.row.increase }}%</span>-->
      <!--          <span v-else class="increase">{{ scope.row.increase }}%</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
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

    </el-table>
  </div>
</template>

<script>

export default {
  name: "HoldStockList",
  props: {
    userId: null
  },
  watch: {
    userId() {
      this.loadTable()
    }
  },
  data() {
    return {
      tableData: [],
      tableSize: null,
      stockCodeNameClass: 'stock-code-name',
      increaseUpClass: 'increase-up',
      increaseDownClass: 'increase-down',
      stockCodeImage: null,
      imageTabActiveName: 'daily',
      queryParam: {
        userId: null
      }
    }
  },
  created() {
    if (window.localStorage.theme == 1) {
      this.increaseUpClass = 'increase-up'
      this.increaseDownClass = 'increase-down'
      this.stockCodeNameClass = 'stock-code-name'
    } else {
      this.increaseUpClass = 'increase-up-gray'
      this.increaseDownClass = 'increase-down-gray'
      this.stockCodeNameClass = 'stock-code-name-gray'
    }
  }, methods: {
    loadTable() {
      this.getStockList()
    },
    getStockList() {
      this.$http.post('/userStock/getUserStockList', this.queryParam).then(({data}) => {
        if (data && data.code === 200) {
          this.tableData = data.data
          this.tableSize = this.tableData.length
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
    handleSortChange(column) {
      let asc = column.order == 'ascending'
      this.queryParam.order = {
        column: column.prop,
        asc: asc
      }
      this.getStockList()
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
      console.log(stockCode)
      this.handleShowImage(stockCode, name)
    },
    formatDate(row, column) {
      let date = row[column.property]
      console.log(date)
      if (date == null) {
        return ''
      }
      return this.$moment(date).format("YYYY-MM-DD")
    }
  }
}
</script>

<style>
.hold-stock-list {
  clear: both;
  width: 100%;
  /*width: 1369px;*/
  margin: 0px auto;
  /*border: 1px solid #EBEEF5;*/
}

.hold-stock-list .stock-table {
  /*border: 1px solid red;*/
  /*width: 1369px;*/
  width: 100%;
}

.hold-stock-list .stock-table .cell {
  color: #333;

}

.hold-stock-list .stock-table th {
  padding: 1px 0px;
  /*border: 1px solid red;*/
}

.hold-stock-list .stock-table th .cell {
  font-size: 14px;
  font-weight: normal;
  padding: 0px 2px;
}

.hold-stock-list .stock-table th .cell .caret-wrapper {
  width: 12px;
  text-align: center;
}

.hold-stock-list .stock-table th .cell .caret-wrapper .sort-caret {
  border-width: 4px;
  left: 3px;
}

.hold-stock-list .stock-table th .cell .caret-wrapper .sort-caret.ascending {
  top: 7px;
}

.hold-stock-list .stock-table th .cell .caret-wrapper .sort-caret.descending {
  bottom: 9px;
}

.hold-stock-list .stock-table td {
  /*border: 1px solid red;*/
}

.hold-stock-list .stock-table td .cell {
  font-size: 15px;
  padding: 2px 0px;
}

.hold-stock-list .stock-table .increase-up {
  color: #eb4436;
}

.hold-stock-list .stock-table .increase-down {
  color: #0e9d58;
}

.hold-stock-list .stock-table td .cell .el-link--inner {
  color: #3266CF;
  /*color: #3A6CD2;*/
  /*color: #3266CF;*/
  /*color: #1E5BD6;*/
  /*color: #1657d9;*/
  /*color: #07519a;*/
}

.hold-stock-list .stock-table td.stock-code-name-gray .cell {
  color: #333;
}

.hold-stock-list .stock-table .increase-up-gray {
  color: #333;
}

.hold-stock-list .stock-table .increase-down-gray {
  color: #ccc;
}

.hold-stock-list .stock-page {
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

.hold-stock-list .stock-table .stock-link {
  font-weight: normal;
}

.image-tab .el-tabs__item {
  font-weight: normal;
  text-align: center;
}

.hold-stock-list .stock-table td.concept-name-info .cell {
  border: 1px solid red;
  font-size: 13px;
  color: #1657d9;
}
</style>
