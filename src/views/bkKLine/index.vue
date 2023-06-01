<template>
  <div class="bk-k-line" :class="bkKLineClass">
    <stock-k-line v-if="kLineVisible" class="stock-k-line" :chart-data="chartsData.kLine" k-line-type="bkKLine"/>
    <el-row :gutter="0" class="pie-container">
      <el-col :span="24">
        <div class="bk-nav-info" :class="toggleShowClass" @click="toggleShow">
          <p class="bk-nav-button-area">
            <el-link type="primary" @click="handleAddBkStock">添加</el-link>
            <el-link type="primary" @click="handleRefreshBkKLine">刷新K线</el-link>
            <!--            <el-link type="primary">显示饼图</el-link>-->
            <!--            <el-link type="primary" @click="handleShowBkStockList">显示个股</el-link>-->
          </p>
        </div>
      </el-col>
      <el-col :span="12">
        <distribution-pie v-if="pieVisible" class="distribution-pie" :title="pieTitle" sub-title="行业分布"
                          series-name="板块行业"
                          :chart-data="chartsData.industryPie" @clickPie="handleClickPie"
        />
      </el-col>
      <el-col :span="12">
        <distribution-pie v-if="pieVisible" class="distribution-pie" :title="pieTitle" sub-title="概念分布"
                          series-name="板块概念"
                          :chart-data="chartsData.conceptPie" @clickPie="handleClickPie"/>
      </el-col>
    </el-row>

    <div class="toggle-tool-bar" @click="toggleShow">
    </div>

    <bk-statistics-info :bk-info="bkInfoData.bkInfo" @toggleShow="toggleShow" :class="toggleShowClass"/>

    <stock-list-table v-if="tableVisible" ref="stockList" class="stock-list-table" :class="toggleShowClass"
                      :page-param="stockPageList.pageParam"
                      @toggleShow="toggleShow"
    />

    <bk-statistics-info :bk-info="bkInfoData.bkInfo" @toggleShow="toggleShow" :class="toggleShowClass"/>

    <stock-operate-dialog ref="stockOperateDialog" @getOperateList="getOperateList"/>

    <div class="bottom-toggle-bar" @click="toggleShow">
    </div>

  </div>
</template>

<script>
import StockKLine from "~/views/components/StockKLine";
import merge from 'webpack-merge';
import DistributionPie from "~/views/components/DistributionPie";
import StockListTable from "~/views/components/StockListTable";
import StockOperateDialog from "~/views/components/StockOperateDialog";
import BkStatisticsInfo from "~/views/components/BkStatisticsInfo";
import BkKLineInfo from "~/views/components/BkKLineInfo";

export default {
  name: "index",
  components: {BkKLineInfo, BkStatisticsInfo, StockOperateDialog, StockListTable, DistributionPie, StockKLine},
  data() {
    return {
      chartsData: {
        kLine: null,
        industryPie: null,
        conceptPie: null
      },
      bkInfoData: {
        bkInfo: null
      },
      bkCode: null,
      bkName: null,
      bkIncreaseType: null,
      pieTitle: null,
      queryParam: {
        keyword: null,
        type: null,
        name: null,
        startDate: null
      },
      stockPageList: {
        pageParam: {}
      },
      kLineVisible: true,
      pieVisible: true,
      tableVisible: true,
      bkKLineClass: null,
      toggleShowClass: null,
      layoutSmall: false
    }
  }, created() {
    let clientWidth = document.body.clientWidth
    if (clientWidth < 1000) {
      this.bkKLineClass = 'layout-small'
      this.layoutSmall = true
    } else {
      this.bkKLineClass = null
      this.layoutSmall = false
    }
  }, mounted() {
    this.bkCode = this.$route.query.bkCode
    this.bkName = this.$route.query.bkName
    this.bkIncreaseType = this.$route.query.bkIncreaseType
    document.title = this.bkName
    this.pieTitle = this.bkCode + ' ' + this.bkName
    this.queryParam.keyword = this.bkCode
    this.getBkKLineList()
    this.getBkIndustryCount()
    this.getBkConceptCount()
    this.loadStockPageList(this.bkCode)

    let windowBkCodes = window.sessionStorage.bkCodes
    let windowBkNames = window.sessionStorage.bkNames
    let bkCodes
    let bkNames
    if (windowBkCodes) {
      bkCodes = JSON.parse(windowBkCodes)
    }
    if (windowBkNames) {
      bkNames = JSON.parse(windowBkNames)
    }

    let _this = this
    let currentIndex = 0
    if (bkCodes) {
      let index = bkCodes.indexOf(this.bkCode)
      currentIndex = index
    }
    document.onkeyup = function (e) {
      let keyCode = e.keyCode
      if (keyCode != 38 && keyCode != 40) {
        return
      }
      if (window.location.hash.indexOf('#/bkKLine') == -1) {
        return
      }
      let tableSize = bkCodes.length
      if (keyCode == 38) {
        // 上
        if (currentIndex > 0) {
          currentIndex--
        } else {
          currentIndex = tableSize - 1
        }
      } else if (keyCode == 40) {
        // 下
        if (currentIndex < (tableSize - 1)) {
          currentIndex++
        } else {
          currentIndex = 0
        }
      }
      let currentBkCode = bkCodes[currentIndex]
      let currentBkName = bkNames[currentIndex]
      _this.bkCode = currentBkCode
      _this.bkName = currentBkName
      document.title = _this.bkName
      // 刷新K线
      _this.pieTitle = currentBkCode + ' ' + currentBkName
      _this.queryParam = {
        keyword: currentBkCode,
        type: null,
        name: null
      }
      _this.$router.push({
        query: merge(_this.$route.query, {'bkCode': currentBkCode, 'bkName': currentBkName})
      });
      _this.getBkKLineList()
      _this.getBkIndustryCount()
      _this.getBkConceptCount()
      _this.loadStockPageList(currentBkCode)
    }

    //监听滚动事件
    // window.addEventListener("scroll", this.handleScroll, true);

    // 定时任务执行查询，3秒查询一次
    if (this.bkCode == 'CC001' && this.$taskExecuteTimeUtil.isExecute()) {
      window.setInterval(function () {
        if (_this.$taskExecuteTimeUtil.isExecute()) {
          _this.refreshBkInfo()
        }
      }, 3000)
    }

    this.scroll()
  }, methods: {
    handleScroll(e) {
    },
    getBkKLineList() {
      if (this.$preferences.getBkShowKLine() == false) {
        this.kLineVisible = false
        return
      } else {
        this.kLineVisible = true
      }
      // 获取上一次滚动的位置
      // let dd = document.documentElement.scrollTop
      // document.documentElement.scrollTop = 0
      let kLineStartDate = this.$preferences.getKLineStartDate()
      this.queryParam.startDate = kLineStartDate
      this.$http.post('/bkKLine/getBkKLineList', this.queryParam).then(({data}) => {
        if (data && data.code === 200) {
          this.$set(this.chartsData, 'kLine', data.data)
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    getBkIndustryCount() {
      if (this.$preferences.getBkShowPie() == false) {
        this.pieVisible = false
        return
      } else {
        this.pieVisible = true
      }
      this.$http.get('/bkStock/getBkIndustryCount?bkCode=' + this.queryParam.keyword).then(({data}) => {
        if (data && data.code === 200) {
          this.$set(this.chartsData, 'industryPie', data.data)
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    getBkConceptCount() {
      if (this.$preferences.getBkShowPie() == false) {
        this.pieVisible = false
        return
      } else {
        this.pieVisible = true
      }
      this.$http.get('/bkStock/getBkConceptCount?bkCode=' + this.bkCode).then(({data}) => {
        if (data && data.code === 200) {
          this.$set(this.chartsData, 'conceptPie', data.data)
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    loadStockPageList(bkCode, seriesName, name) {
      if (this.$preferences.getBkShowTable() == false) {
        this.tableVisible = false
        return
      } else {
        this.tableVisible = true
      }
      let pageParam = {
        pageIndex: 1,
        pageSize: 30,
        type: 5,
        keyword: bkCode
      }
      if (this.bkIncreaseType == -1) {
        pageParam.order = {
          column: 'increase',
          asc: true
        }
      } else {
        pageParam.order = {
          column: 'increase',
          asc: false
        }
      }
      if (seriesName == '板块行业') {
        pageParam.industry = name
      } else if (seriesName == '板块概念') {
        pageParam.concept = name
      }
      this.$set(this.stockPageList, 'pageParam', pageParam)
      this.getBkInfo()
    },
    handleClickPie(name, seriesName) {
      this.loadStockPageList(this.bkCode, seriesName, name)
      if (seriesName == '板块行业') {
        this.queryParam.type = 1
      } else if (seriesName == '板块概念') {
        this.queryParam.type = 2
      }
      this.queryParam.name = name
      this.getBkKLineList()
    },
    handleShowBkStockList() {
    },
    handleAddBkStock() {
      this.$refs.stockOperateDialog.show(this.bkCode)
    },
    handleRefreshBkKLine() {
      this.$http.post('/bkKLine/syncBkKLineData', {
        bkCode: this.bkCode
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.$message.success('刷新K线成功')
          window.location.reload()
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    getOperateList() {
      // 重新加载页面数据
      this.getBkKLineList()
      this.getBkIndustryCount()
      this.getBkConceptCount()
      this.loadStockPageList(this.bkCode)
    },
    getBkInfo() {
      this.$http.get('/bkInfo/getBkInfo?bkCode=' + this.queryParam.keyword).then(({data}) => {
        if (data && data.code === 200) {
          data.data.updateTime = this.$moment(data.data.updateTime).format("HH:mm:ss")
          this.$set(this.bkInfoData, 'bkInfo', data.data)
          console.log(data.data.updateTime + ' ' + data.data.bkIncrease + '%')
          document.title = this.bkName + ' ' + data.data.bkIncrease + '%'
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    refreshBkInfo() {
      this.$http.post('/bkInfo/refreshBkInfo?bkCode=' + this.bkCode).then(({data}) => {
        if (data && data.code === 200) {
          this.loadStockPageList(this.bkCode)
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })


    },
    toggleShow() {
      if (this.toggleShowClass == null) {
        this.toggleShowClass = 'toggle-hide'
      } else {
        this.toggleShowClass = null
        this.scroll()
      }
    },
    scroll() {
      if (this.layoutSmall) {
        window.scrollTo({
          left: 0,
          top: 100,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style scoped>
.bk-k-line {
  /*border: 1px solid red;*/
  margin: 10px 5px 10px 5px;
  position: relative;
  height: 100%;
}

.bk-k-line .stock-k-line {
  width: 100%;
  height: 666px;
  /*border: 1px solid red;*/
}

.bk-k-line .pie-container {
  margin: 20px 0px 0px 0px;
}

.bk-k-line .distribution-pie {
  width: 100%;
  height: 456px;
}

.bk-nav-info {
  /*border: 1px solid red;*/
  padding: 5px;
  margin-bottom: 20px;
}

.bk-nav-button-area {
  margin: 0px;
  text-align: right;
}

.bk-nav-button-area .el-link {
  /*border: 1px solid red;*/
  margin-right: 6px;
  color: #1657d9;
}

.bk-k-line.layout-small .toggle-hide {
  display: none;
}

.bk-k-line.layout-small .toggle-tool-bar {
  width: 85%;
  height: 55px;
  position: fixed;
  top: 0px;
}

.bk-k-line.layout-small .bottom-toggle-bar {
  width: 100%;
  height: 1000px;
}


</style>

<style>
/** 小屏幕布局 **/
.bk-k-line.layout-small {
  margin: 0px 5px 0px 5px;
}

.bk-k-line.layout-small .pie-container {
  margin: 0px 0px 0px 0px;
}

.bk-k-line.layout-small .bk-nav-info {
  margin-bottom: 20px;
}

.bk-k-line.layout-small .el-link {
  color: #cccccc;
}

</style>
