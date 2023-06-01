<template>
  <div class="industry-concept-table">
    <el-table
        :data="tableData"
        style="width: 100%"
        class="stock-table"
        size="mini"
        @sort-change="handleSortChange"
        @row-dblclick="handleDblClick"
    >
      <el-table-column
          label="序号"
          width="50"
          align="center"
          sortable
          fixed
      >
        <template slot-scope="scope">
          {{ (pageParam.pageIndex - 1) * pageParam.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
          prop="bkCode"
          label="板块代码"
          align="center"
          width="90"
          sortable
          fixed
          class="index-name"
          :class-name="indexNameClass"
      >
        <template slot-scope="scope">
          <el-link type="primary" class="stock-link" @click="handleBkJump(scope.row)">{{ scope.row.bkCode }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="bkName"
          label="板块名称"
          align="center"
          width="123"
          sortable
          fixed
          class="index-name"
          :class-name="indexNameClass"
      >
        <template slot-scope="scope">
          <el-link type="primary" class="stock-link" @click="handleBkJump(scope.row)">{{ scope.row.bkName }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
          label="涨幅"
          prop="bkIncrease"
          align="center"
          width="85"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.increase>0" :class="increaseUpClass">{{ scope.row.bkIncrease }}%</span>
          <span v-else-if="scope.row.increase<0" :class="increaseDownClass">{{ scope.row.bkIncrease }}%</span>
          <span v-else class="increase">{{ scope.row.bkIncrease }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="riseCount"
          label="上涨数量"
          align="center"
          sortable
          width="73"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.riseCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="bkCount"
          label="总数量"
          align="center"
          sortable
          width="73"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.bkCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="i3"
          label="3日涨幅"
          align="center"
          width="76"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.i3>0" :class="increaseUpClass">{{ scope.row.i3 }}%</span>
          <span v-else-if="scope.row.i3<0" :class="increaseDownClass">{{ scope.row.i3 }}%</span>
          <span v-else class="increase">{{ scope.row.i3 }}%</span>
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
          align="center"
          width="76"
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
          align="center"
          width="76"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.i60>0" :class="increaseUpClass">{{ scope.row.i60 }}%</span>
          <span v-else-if="scope.row.i60<0" :class="increaseDownClass">{{ scope.row.i60 }}%</span>
          <span v-else class="increase">{{ scope.row.i60 }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="iavg"
          label="范围涨幅"
          align="center"
          width="76"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.iavg>0" :class="increaseUpClass">{{ scope.row.iavg }}%</span>
          <span v-else-if="scope.row.iavg<0" :class="increaseDownClass">{{ scope.row.iavg }}%</span>
          <span v-else class="increase">{{ scope.row.iavg }}%</span>
        </template>
      </el-table-column>

      <el-table-column
          prop="bkType"
          label="板块类型"
          align="center"
          sortable
          width="76"
          :class-name="stockCodeNameClass"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.bkType==0">自定义</span>
          <span v-else-if="scope.row.bkType==1">行业</span>
          <span v-else-if="scope.row.bkType==2">概念</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="maxStockCode"
          label="领涨代码"
          align="center"
          sortable
          width="93"
          :class-name="stockCodeNameClass"
      >
        <template slot-scope="scope">
          <el-link type="primary" class="stock-link"
                   href=""
                   target="_blank">{{ scope.row.maxStockCode }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="maxStockName"
          label="领涨名称"
          align="center"
          sortable
          width="93"
          :class-name="stockCodeNameClass"
      >
        <template slot-scope="scope">
          <el-link type="primary" class="stock-link"
                   href=""
                   target="_blank">{{ scope.row.maxStockName }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="maxIncrease"
          label="领涨涨幅"
          align="center"
          sortable
          width="93"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.maxIncrease>0" :class="increaseUpClass">{{ scope.row.maxIncrease }}%</span>
          <span v-else-if="scope.row.maxIncrease<0" :class="increaseDownClass">{{ scope.row.maxIncrease }}%</span>
          <span v-else class="increase">{{ scope.row.maxIncrease }}%</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="maxIncreasePrice"
          label="领涨当前价"
          align="center"
          width="105"
          sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.maxIncreasePrice>0" :class="increaseUpClass">{{ scope.row.maxIncreasePrice }}</span>
          <span v-else-if="scope.row.maxIncreasePrice<0" :class="increaseDownClass">{{
              scope.row.maxIncreasePrice
            }}</span>
          <span v-else class="increase">{{ scope.row.maxIncreasePrice }}</span>
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
          label="操作"
          align="center"
          width="120"
      >
        <template slot-scope="scope">
          <el-button class="" @click="handleRefreshKLine(scope.row)" type="text" size="small">刷新K线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
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
  name: "IndustryConceptTable",
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
      indexNameClass: 'index-name stock-code-name',
      increaseUpClass: 'increase-up',
      increaseDownClass: 'increase-down',
      total: 0,
      stockCodeImage: null,
      imageTabActiveName: 'daily',
      defaultPageSize: 12,
      pageSize: null
    }
  },
  created() {
    if (window.localStorage.theme == 1) {
      this.increaseUpClass = 'increase-up'
      this.increaseDownClass = 'increase-down'
      this.stockCodeNameClass = 'stock-code-name'
      this.indexNameClass = 'index-name stock-code-name'
    } else {
      this.increaseUpClass = 'increase-up-gray'
      this.increaseDownClass = 'increase-down-gray'
      this.stockCodeNameClass = 'stock-code-name-gray'
      this.indexNameClass = 'index-name stock-code-name-gray'
    }
  }, methods: {
    loadTable() {
      this.getIndustryConceptList()
    },
    getIndustryConceptList(param) {
      if (!param) {
        param = this.pageParam
      }
      this.$http.post('/bkInfo/getBkInfoPageList', param).then(({data}) => {
        if (data && data.code === 200) {
          this.tableData = data.data.records
          this.total = Number(data.data.total)
          let bkCodes = []
          let bkNames = []
          console.log(data.data)
          data.data.records.forEach(item => {
            bkCodes.push(item.bkCode)
            bkNames.push(item.bkName)
          })
          window.sessionStorage.bkCodes = JSON.stringify(bkCodes)
          window.sessionStorage.bkNames = JSON.stringify(bkNames)
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
      this.getIndustryConceptList()
    },
    handleCurrentChange(pageIndex) {
      this.pageParam.pageIndex = pageIndex
      this.getIndustryConceptList()
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
      this.getIndustryConceptList(this.pageParam)
    },
    handleShowImage(stockCode, type) {
      this.imageTabActiveName = 'daily'
      if (!type) {
        type = 'daily'
      }
      let market
      if (stockCode.indexOf('6') == 0) {
        market = 'sh'
      } else {
        market = 'sz'
      }
      let src = 'http://image.sinajs.cn/newchart/' + type + '/n/' + market + stockCode + '.gif?_=' + new Date().getTime()
      this.stockCodeImage = src
    },
    handleImageTabClick(tab) {
      let name = tab.name
      let stockCode = tab.$el.dataset.id
      this.handleShowImage(stockCode, name)
    },
    handleDblClick(row, column, event) {
      let bkCode = row.bkCode
      let bkName = row.bkName
      this.$router.push({
        path: '/bkKLine',
        query: {
          bkCode: bkCode,
          bkName: bkName
        }
      })
    },
    handleBkJump(row) {
      let bkIncreaseType
      if (row.bkIncrease > 0) {
        bkIncreaseType = 1
      } else {
        bkIncreaseType = -1
      }
      let route = this.$router.resolve({
        path: "/bkKLine",
        query: {
          bkCode: row.bkCode,
          bkName: row.bkName,
          bkDetail: true,
          bkIncreaseType: bkIncreaseType,
        },
      });
      window.open(route.href, '_blank');
    },
    handleRefreshKLine(row) {
      alert(1)
    }
  }
}
</script>

<style scoped>

</style>

<style>
.industry-concept-table {
  clear: both;
  width: 1369px;
  margin: 0px auto;
  /*border: 1px solid red;*/
}

.industry-concept-table .stock-table {
  /*border: 1px solid red;*/
  width: 1369px;
}

.industry-concept-table .stock-table .cell {
  color: #333;
  padding: 2px 0px;
}

.industry-concept-table .stock-table th {
  padding: 1px 0px;
  /*border: 1px solid red;*/
}

.industry-concept-table .stock-table th .cell {
  font-size: 14px;
  font-weight: normal;
  padding: 0px 2px;
}

.industry-concept-table .stock-table th .cell .caret-wrapper {
  width: 12px;
  text-align: center;
}

.industry-concept-table .stock-table th .cell .caret-wrapper .sort-caret {
  border-width: 4px;
  left: 3px;
}

.industry-concept-table .stock-table th .cell .caret-wrapper .sort-caret.ascending {
  top: 7px;
}

.industry-concept-table .stock-table th .cell .caret-wrapper .sort-caret.descending {
  bottom: 9px;
}

.industry-concept-table .stock-table td {
  /*border: 1px solid red;*/
  padding: 2px 0px;
}

.industry-concept-table .stock-table td .cell {
  font-size: 15px;

  /*border: 1px solid blue;*/
}

.industry-concept-table .stock-table .increase-up {
  color: #eb4436;
}

.industry-concept-table .stock-table .increase-down {
  color: #0e9d58;
}

.industry-concept-table .stock-table td .cell .el-link--inner {
  color: #3266CF;
  /*color: #3A6CD2;*/
  /*color: #3266CF;*/
  /*color: #1E5BD6;*/
  /*color: #1657d9;*/
  /*color: #07519a;*/
}

.industry-concept-table .stock-table td.index-name .cell {
  text-align: left;
  padding-left: 22px;
}

.industry-concept-table .stock-table td.stock-code-name-gray .cell {
  color: #333;
}

.industry-concept-table .stock-table .increase-up-gray {
  color: #333;
}

.industry-concept-table .stock-table .increase-down-gray {
  color: #ccc;
}

.industry-concept-table .stock-page {
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

.industry-concept-table .stock-table .stock-link {
  font-weight: normal;
}

.image-tab .el-tabs__item {
  font-weight: normal;
  text-align: center;
}

.industry-concept-table .stock-table td.concept-name-info .cell {
  border: 1px solid red;
  font-size: 13px;
  color: #1657d9;
}

</style>
