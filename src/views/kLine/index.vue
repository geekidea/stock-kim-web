<template>
  <div class="k-line">
    <side-bar-stock-list class="sidebar-stock-list"
                         :table-config="tableConfig"
                         :page-param="pageParam"
                         @getKLineList="getKLineList"/>
    <stock-k-line :class="getStockKLineClass()" :chart-data="chartsData.kLine" k-line-type="stock"/>
  </div>
</template>

<script>
import StockKLine from "~/views/components/StockKLine";
import SideBarStockList from "~/views/components/SideBarStockList";

export default {
  name: "index",
  components: {SideBarStockList, StockKLine},
  data() {
    return {
      chartsData: {
        kLine: null
      },
      keyword: '',
      inputKeyword: null,
      tableData: null,
      stockCodeNameClass: 'stock-code-name',
      increaseUpClass: 'increase-up',
      increaseDownClass: 'increase-down',
      pageParam: {
        type: 0,
        // day51020Increase: false,
      },
      tableConfig: {
        showI51020: false,
      }
    }
  },
  mounted() {
    this.getStockList()
  },
  methods: {
    search() {
      this.keyword = this.inputKeyword
      this.inputKeyword = null
      this.getKLineList()
    },
    getStockList() {

    },
    handleRowClick(row) {
      console.log(row.stockCode)
      this.keyword = row.stockCode
      this.getKLineList();
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
    getKLineList(keyword) {
      if (keyword) {
        this.keyword = keyword
      }
      let startDate = this.$preferences.getKLineStartDate()
      this.$http.post('/stockKLine/getKLineList', {
        keyword: this.keyword,
        startDate: startDate
      }).then(({data}) => {
        if (data && data.code === 200) {
          let chartData = data.data
          this.$set(this.chartsData, 'kLine', data.data)
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getStockKLineClass() {
      let classArray = []
      classArray.push('stock-k-line')
      if (this.tableConfig.showI51020) {
        classArray.push('stock-k-line-i51020')
      } else {
        classArray.push('stock-k-line-simple')
      }
      return classArray
    }
  }
}
</script>

<style scoped>
.k-line {
  /*border: 1px solid red;*/
  margin: 0px 5px;
  position: relative;
  height: 100%;
}

.k-line .stock-k-line {
  width: 1225px;
  height: 666px;
  margin-left: 180px;
  /*border: 1px solid red;*/
}

.k-line .stock-sidebar .stock-table {
  /*border: 1px solid blue;*/
}

.k-line .stock-sidebar .stock-table td {
  /*border: 1px solid #cccccc;*/
}

</style>

<style>
.k-line .stock-sidebar .stock-table th {
  font-weight: normal;
  color: #555555;
  padding: 1px 0px;
}

.k-line .stock-sidebar .stock-table td {
  color: #333333;
  font-size: 13px;
  /*border: 1px solid red;*/
  padding: 0px 0px;
}

</style>
