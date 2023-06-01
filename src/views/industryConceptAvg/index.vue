<template>
  <div class="stock-home">
    <el-tabs class="stock-tabs" v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane :label="tabPanelLabel.riseFall" name="allBar">
        <industry-concept-avg-bar ref="allBar" class="stock-avg-bar" :chart-data="chartsData.allBar"
                                  bar-type="all" @clickBar="handleClickBar"/>
      </el-tab-pane>
      <el-tab-pane :lazy="true" :label="tabPanelLabel.rise" name="riseBar">
        <industry-concept-avg-bar ref="riseBar" class="stock-avg-bar" :chart-data="chartsData.riseBar"
                                  bar-type="rise" @clickBar="handleClickBar"/>
      </el-tab-pane>
      <el-tab-pane :lazy="true" :label="tabPanelLabel.fall" name="fallBar">
        <industry-concept-avg-bar ref="fallBar" class="stock-avg-bar" :chart-data="chartsData.fallBar"
                                  bar-type="fall" @clickBar="handleClickBar"/>
      </el-tab-pane>
      <el-tab-pane :lazy="true" :label="tabPanelLabel.riseTree" name="riseTreeMap">
        <industry-concept-avg-tree-map ref="riseTreeMap" class="stock-avg-tree-map"
                                       :chart-data="chartsData.riseTreeMap"
                                       tree-map-type="rise" @clickTreeMap="handleClickTreeMap"/>
      </el-tab-pane>
      <el-tab-pane :lazy="true" :label="tabPanelLabel.fallTree" name="fallTreeMap">
        <industry-concept-avg-tree-map ref="fallTreeMap" class="stock-avg-tree-map"
                                       :chart-data="chartsData.fallTreeMap"
                                       tree-map-type="fall" @clickTreeMap="handleClickTreeMap"/>
      </el-tab-pane>
    </el-tabs>

    <industry-concept-table ref="industryConceptTable" class="stock-list-table"
                            :style="{display:industryConceptTableVisible}"
                            :page-param="pageParam.industryConcept"/>

    <stock-list-table ref="stockListTable" class="stock-table stock-list-table"
                      :style="{display:stockListTableVisible}"
                      :page-param="pageParam.stock"/>

    <stock-k-line class="stock-k-line" :chart-data="chartsData.kLine"/>
  </div>
</template>

<script>
import IndustryConceptAvgTreeMap from "~/views/components/IndustryConceptAvgTreeMap";
import IndustryConceptAvgBar from "~/views/components/IndustryConceptAvgBar";
import StockListTable from "~/views/components/StockListTable";
import IndustryConceptTable from "~/views/components/IndustryConceptTable";
import StockKLine from "~/views/components/StockKLine";

export default {
  name: "IndustryConceptAvg",
  components: {StockKLine, IndustryConceptTable, StockListTable, IndustryConceptAvgBar, IndustryConceptAvgTreeMap},
  data() {
    return {
      activeName: 'allBar',
      chartsData: {
        pie: [],
        allBar: [],
        riseBar: [],
        fallBar: [],
        riseTreeMap: [],
        fallTreeMap: [],
        kLine: null
      },
      industryConceptPageList: {
        pageParam: {}
      },
      pageParam: {
        stock: {},
        industryConcept: {},
      },
      defaultPageParam: {
        pageIndex: 1,
        type: 0,
      },
      queryParam: {
        typeName: null,
        asc: false
      },
      tabPanelLabel: {
        riseFall: '涨跌幅分析',
        rise: '涨幅排行',
        fall: '跌幅排行',
        riseTree: '板块涨幅',
        fallTree: '板块跌幅'
      },
      tabPanelIndustryLabel: {
        riseFall: '行业涨跌幅分析',
        rise: '行业涨幅排行',
        fall: '行业跌幅排行',
        riseTree: '行业板块涨幅',
        fallTree: '行业板块跌幅'
      },
      tabPanelConceptLabel: {
        riseFall: '概念涨跌幅分析',
        rise: '概念涨幅排行',
        fall: '概念跌幅排行',
        riseTree: '概念板块涨幅',
        fallTree: '概念板块跌幅'
      },
      firstAllBarData: null,
      firstRiseBarData: null,
      firstFallBarData: null,
      allBarDataMap: {},
      riseBarDataMap: {},
      fallBarDataMap: {},
      industryConceptTableVisible: 'block',
      stockListTableVisible: 'none',
      increaseType: null,
      kLineQueryParam: {
        keyword: '自选指数',
        type: null,
        name: null,
        startDate: null,
        typeName: null,
        itemName: null
      },
    }
  },
  watch: {
    $route(to, from) {
      // 获取query中的参数
      if (to.query.typeName) {
        this.queryParam.typeName = to.query.typeName
        this.industryConceptTableVisible = 'block'
        this.stockListTableVisible = 'none'
        this.changePageData()
      }
    }
  },
  created() {

  },
  mounted() {
    // 获取请求参数，设置查询参数类型
    let typeName = this.$route.query.typeName;
    if (typeName) {
      this.queryParam.typeName = typeName
    }
    this.changePageData()
  },
  methods: {
    changePageData() {
      if ('industry' == this.queryParam.typeName) {
        this.tabPanelLabel = this.tabPanelIndustryLabel
      } else if ('concept' == this.queryParam.typeName) {
        this.tabPanelLabel = this.tabPanelConceptLabel
      }

      this.getIndustryConceptAvg()
      this.getRiseIndustryConceptAvg()
      this.getFallIndustryConceptAvg()
      this.getIndustryConceptPageList()
      this.getBkKLineList()
    },
    handleTabClick(tab, event) {
      this.activeName = tab.name
      let firstData = null
      if (this.activeName == 'allBar') {
        this.increaseType = null
        firstData = this.firstAllBarData
      } else if (this.activeName == 'riseBar' || this.activeName == 'riseTreeMap') {
        this.increaseType = 'rise'
        firstData = this.firstRiseBarData
      } else if (this.activeName == 'fallBar' || this.activeName == 'fallTreeMap') {
        this.increaseType = 'fall'
        firstData = this.firstFallBarData
      }
      // this.refreshStockPageList(firstData)
      this.getIndustryConceptPageList()
    },
    setChartDataMap(dataMap, chartData) {
      chartData.forEach(item => {
        dataMap[item.name] = item
      })
    },
    activeFirstData(firstData, tabName, tabTreeMapName) {
      if (this.activeName == tabName || this.activeName == tabTreeMapName) {
        // this.refreshStockPageList(firstData)
      }
    },
    refreshStockPageList(param) {
      this.industryConceptTableVisible = 'none'
      this.stockListTableVisible = 'block'
      if (!param) {
        return
      }
      let name = param.name
      let avg = param.avg
      let order = null
      if (avg > 0) {
        order = {
          column: 'increase',
          asc: false
        }
      } else {
        order = {
          column: 'increase',
          asc: true
        }
      }
      this.loadStockPageList(name, order)
    },
    getIndustryConceptAvg() {
      this.$http.post('/stock/getIndustryConceptAvg', this.queryParam).then(({data}) => {
        if (data && data.code === 200) {
          this.$set(this.chartsData, 'allBar', data.data)
          this.firstAllBarData = data.data[0]
          this.activeFirstData(this.firstAllBarData, 'allBar')
          this.setChartDataMap(this.allBarDataMap, data.data)
        }
      })
    },
    getRiseIndustryConceptAvg() {
      this.$http.post('/stock/getRiseIndustryConceptAvg', this.queryParam).then(({data}) => {
        if (data && data.code === 200) {
          this.$set(this.chartsData, 'riseTreeMap', data.data)
          this.$set(this.chartsData, 'riseBar', data.data)
          this.firstRiseBarData = data.data[0]
          this.activeFirstData(this.firstRiseBarData, 'riseBar', 'riseTreeMap')
          this.setChartDataMap(this.riseBarDataMap, data.data)
        }
      })
    },
    getFallIndustryConceptAvg() {
      this.$http.post('/stock/getFallIndustryConceptAvg', this.queryParam).then(({data}) => {
        if (data && data.code === 200) {
          this.$set(this.chartsData, 'fallTreeMap', data.data)
          this.$set(this.chartsData, 'fallBar', data.data)
          this.firstFallBarData = data.data[0]
          this.activeFirstData(this.firstFallBarData, 'fallBar', 'fallTreeMap')
          this.setChartDataMap(this.fallBarDataMap, data.data)
        }
      })
    },
    loadStockPageList(name, order) {
      let pageParam = {
        pageIndex: 1,
        type: 0,
        industry: null,
        concept: null
      }
      if (order) {
        pageParam.order = order
      }
      let typeName = this.queryParam.typeName
      if ('industry' == typeName) {
        pageParam.type = 2
        pageParam.industry = name
      } else if ('concept' == typeName) {
        pageParam.type = 3
        pageParam.concept = name
      }
      console.log(pageParam)
      this.$set(this.pageParam, 'stock', pageParam)
    },
    handleClickBar(name) {
      let obj = null
      if (this.activeName == 'allBar') {
        obj = this.allBarDataMap[name]
      } else if (this.activeName == 'riseBar') {
        obj = this.riseBarDataMap[name]
      } else if (this.activeName == 'fallBar') {
        obj = this.fallBarDataMap[name]
      }
      console.log('click bar：' + obj.name + " " + obj.avg)
      console.log('typeName：' + this.queryParam.typeName)
      this.kLineQueryParam.type = 3
      this.kLineQueryParam.typeName = this.queryParam.typeName
      this.kLineQueryParam.bkName = obj.name
      this.refreshStockPageList(obj)
      this.getBkKLineList()
    },
    handleClickTreeMap(param) {
      let value = param.value
      if (this.activeName == 'fallTreeMap') {
        value = -value
      }
      let obj = {
        name: param.name,
        avg: value
      }
      this.refreshStockPageList(obj)
    },
    getIndustryConceptPageList() {
      let pageParam = {
        pageSize: 15,
        filter: true
      }
      if (this.queryParam.typeName == 'industry') {
        pageParam.bkType = 1
      } else if (this.queryParam.typeName == 'concept') {
        pageParam.bkType = 2
      }
      if (this.increaseType == 'rise') {
        pageParam.order = {
          column: 'bk_increase',
          asc: false
        }
      } else if (this.increaseType == 'fall') {
        pageParam.order = {
          column: 'bk_increase',
          asc: true
        }
      }
      this.$set(this.pageParam, 'industryConcept', pageParam)
    },
    getBkKLineList() {
      let kLineStartDate = this.$preferences.getKLineStartDate()
      this.kLineQueryParam.startDate = kLineStartDate
      this.$http.post('/bkKLine/getBkKLineList', this.kLineQueryParam).then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.$set(this.chartsData, 'kLine', data.data)
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
.stock-home {
  /*border: 1px solid red;*/
  /*height: 2000px;*/
  margin-bottom: 50px;
}

.stock-tabs {
  padding: 0px 10px;
  /*border: 1px solid red;*/
  margin-bottom: 9px;
}

.stock-tabs div.stock-avg-bar {
  width: 100%;
  height: 456px;
}

.stock-tabs div.stock-avg-tree-map {
  width: 100%;
  height: 536px;
}

.stock-home .stock-list-table {
  /*border: 1px solid red;*/
}

.stock-table {
  /*border: 1px solid blue;*/
  /*display: none;*/
}

.stock-k-line {
  width: 100%;
  height: 666px;
  /*border: 1px solid red;*/
}

</style>

<style>

.stock-tabs .el-tabs__header {
  margin: 0 0 5px 2px;
}
</style>


