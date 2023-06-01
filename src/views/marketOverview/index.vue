<template>
  <div class="quotation">
    <el-row :gutter="0" class="bar distribution-bar">
      <el-col :span="6">
        <market-overview-info ref="marketOverviewInfo" :info-data="componentData.infoData"/>
      </el-col>
      <el-col :span="12">
        <market-overview-distribution-bar ref="distributionBar" class="stock-charts"
                                          :chart-data="chartsData.distributionBar"
                                          @clickBar="handleClickBar"/>
      </el-col>
      <el-col :span="6">
        <market-overview-score-pie ref="temperaturePie" class="stock-charts"
                                   :chart-data="chartsData.temperaturePie"
                                   title="大盘评级"
                                   @clickBar="handleClickPie"/>
      </el-col>
    </el-row>

    <stock-list-table ref="stockList" :page-param="stockPageList.pageParam"/>

  </div>
</template>

<script>
import MarketOverviewDistributionBar from "~/views/components/MarketOverviewDistributionBar";
import MarketOverviewScorePie from "~/views/components/MarketOverviewScorePie";
import MarketOverviewInfo from "~/views/components/MarketOverviewInfo";
import StockListTable from "~/views/components/StockListTable";

export default {
  name: "index",
  components: {
    StockListTable,
    MarketOverviewInfo,
    MarketOverviewScorePie, MarketOverviewDistributionBar
  },
  data() {
    return {
      chartsData: {
        distributionBar: [],
        temperaturePie: [],
      },
      stockPageList: {
        pageParam: {}
      },
      defaultPageListParam: {
        pageIndex: 1,
        type: 0,
      },
      queryParam: {
        typeName: 'industry'
      },
      componentData: {
        infoData: {}
      }
    }
  },
  created() {
    this.getMarketOverviewDistribution()
    this.getMarketOverviewScore()
    this.getMarketOverviewInfo()
  },
  mounted() {
    this.loadStockPageList()
  },
  methods: {
    getMarketOverviewDistribution() {
      this.$http.post('/stock/getMarketOverviewDistribution').then(({data}) => {
        if (data && data.code === 200) {
          this.$set(this.chartsData, 'distributionBar', data.data.increaseDistributions)
        }
      })
    },
    getMarketOverviewScore() {
      this.$http.post('/stock/getMarketOverviewScore').then(({data}) => {
        if (data && data.code === 200) {
          let score = data.data
          let array = []
          array.push({
            name: 1,
            value: score
          })
          array.push({
            name: -1,
            value: (100 - score).toFixed(2)
          })
          console.log(array)
          this.$set(this.chartsData, 'temperaturePie', array)
        }
      })
    },
    getMarketOverviewInfo() {
      this.$http.post('/stock/getMarketOverviewInfo').then(({data}) => {
        if (data && data.code === 200) {
          this.$set(this.componentData, 'infoData', data.data)
        }
      })
    },
    loadStockPageList(param) {
      if (!param) {
        param = this.defaultPageListParam
      }
      this.$set(this.stockPageList, 'pageParam', param)
    },
    handleClickPie(name) {
      console.log(name)
      let pageParam = {
        pageIndex: 1,
        type: 0,
        industry: null,
        concept: null
      }
      let typeName = this.queryParam.typeName
      if ('industry' == typeName) {
        pageParam.type = 2
        pageParam.industry = name
      } else if ('concept' == typeName) {
        pageParam.type = 3
        pageParam.concept = name
      }
      this.loadStockPageList(pageParam)
    },
    handleClickBar(name) {
      console.log(name)
      let pageParam = {
        pageIndex: 1,
        type: 4,
        distributionType: 4
      }
      let typeName = this.queryParam.typeName
      // 涨停 涨停～5% 5%～1% 1%～0% 平盘 0～-1% -1～-5 -5～跌停 跌停
      if ('涨停' == name) {
        pageParam.distributionType = 4
      } else if ('5%～涨停' == name) {
        pageParam.distributionType = 3
      } else if ('1%～5%' == name) {
        pageParam.distributionType = 2
      } else if ('0%～1%' == name) {
        pageParam.distributionType = 1
      } else if ('平盘' == name) {
        pageParam.distributionType = 0
      } else if ('0～-1%' == name) {
        pageParam.distributionType = -1
      } else if ('-1%～-5%' == name) {
        pageParam.distributionType = -2
      } else if ('-5%～跌停' == name) {
        pageParam.distributionType = -3
      } else if ('跌停' == name) {
        pageParam.distributionType = -4
      }
      console.log(pageParam.distributionType)
      this.loadStockPageList(pageParam)
    }
  }
}
</script>

<style scoped>
.quotation {
  /*border: 1px solid red;*/
  height: 1500px;
}

.quotation .el-row {
  height: 460px;
  /*border: 1px solid blue;*/
  margin-bottom: 10px;
}

.quotation .el-row.bar .el-col {
  height: 350px;
  /*border: 1px solid #ccc;*/
  padding: 0px 20px 0px 20px;
}

.quotation .el-row.distribution-bar .el-col {
  height: 460px;
  border: 1px solid #eeeeee;
  border-right: none;
}

.quotation .el-row.distribution-bar .el-col:first-child {
  padding: 0px;
}

.quotation .el-row.distribution-bar .el-col:last-child {
  border-right: 1px solid #eeeeee;
}

</style>
