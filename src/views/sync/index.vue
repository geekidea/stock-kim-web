<template>
  <div class="sync">
    <p class="row">
      <el-button type="primary" plain :icon="syncRealDataIcon" :disabled="syncRealDataIcon!=null"
                 @click="handleSyncRealData">刷新实时数据
      </el-button>
      <el-button type="primary" plain :icon="syncRecentKLineDataIcon" :disabled="syncRecentKLineDataIcon!=null"
                 @click="handleSyncKLineData">同步K线数据
      </el-button>
      <el-button type="primary" plain :icon="syncBkKLineDataIcon" :disabled="syncBkKLineDataIcon!=null"
                 @click="handleSyncBkKLineData">同步当日板块K线数据
      </el-button>
    </p>

    <p class="row">
      <el-button type="primary" plain :icon="calcRiseCountIcon" :disabled="calcRiseCountIcon!=null"
                 @click="handleCalcRiseCount">计算上涨家数
      </el-button>
      <el-button type="primary" plain :icon="riseLimitLineIcon" :disabled="riseLimitLineIcon!=null"
                 @click="handleRiseLimitLine">计算涨停家数
      </el-button>
      <el-button type="primary" plain :icon="calcMarketScoreIcon" :disabled="calcMarketScoreIcon!=null"
                 @click="handleCalcMarketScore">计算市场分数
      </el-button>
      <el-button type="primary" plain :icon="updateKLineIncreaseIcon" :disabled="updateKLineIncreaseIcon!=null"
                 @click="handleUpdateKLineIncrease">计算K线当日涨幅
      </el-button>
      <el-button type="primary" plain :icon="updateTodayKLineDayIncreaseIcon"
                 :disabled="updateTodayKLineDayIncreaseIcon!=null"
                 @click="handleUpdateTodayKLineDayIncrease">计算K线每日涨幅
      </el-button>
    </p>

    <p class="row">
      <el-button type="primary" plain :icon="updateAddStockInfoIcon" :disabled="updateAddStockInfoIcon!=null"
                 @click="handleUpdateAddStockInfoIcon">更新新增个股相关信息
      </el-button>

    </p>

    <p class="progress-info">
      总计：{{ progress.total }} &nbsp;&nbsp;已更新：{{ progress.current }} &nbsp;&nbsp;成功：{{ progress.success }}
      &nbsp;&nbsp;失败：{{ progress.fail }} &nbsp;&nbsp;进度：{{ progress.progress }}%
    </p>
    <el-progress class="progress-bar" :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>

  </div>
</template>

<script>
export default {
  name: "index",
  watch: {
    percentage() {
      if (this.percentage >= 100) {
        window.clearInterval(this.timer)
        this.percentage = 100
        if (this.operationType == this.syncRecentKLineDataType) {
          this.syncRecentKLineDataIcon = null
        }
      }
    }
  },
  data() {
    return {
      percentage: 0,
      syncRealDataIcon: null,
      syncRecentKLineDataIcon: null,
      syncBkKLineDataIcon: null,
      calcRiseCountIcon: null,
      riseLimitLineIcon: null,
      calcMarketScoreIcon: null,
      updateKLineIncreaseIcon: null,
      updateTodayKLineDayIncreaseIcon: null,
      updateAddStockInfoIcon: null,
      loadingIcon: 'el-icon-loading',
      timer: null,
      operationType: null,
      syncRecentKLineDataType: 'syncRecentKLineData',
      progress: {
        total: null,
        current: null,
        progress: null,
        success: null,
        fail: null
      }
    }
  },
  mounted() {
    // this.getProgressInfo(this.syncRecentKLineDataType)
    // this.refreshProgress(this.syncRecentKLineDataType)
  },
  methods: {
    refreshProgress(type) {
      let _this = this
      this.timer = window.setInterval(function () {
        _this.getProgressInfo(type)
      }, 2000)
    },
    getProgressInfo(type) {
      if (type != 'this.syncRecentKLineDataType') {
        return
      }
      this.operationType = type
      console.log(new Date())
      this.$http.get('/progress/info?type=' + type).then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          if (data.data != null) {
            this.progress = data.data
            this.percentage = this.progress.progress
          }
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    handleSyncRealData() {
      this.syncRealDataIcon = this.loadingIcon
      // 调用后台实时数据接口
      this.$http.get('/refreshStockRealData').then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.percentage = 100
          this.syncRealDataIcon = null
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
      // 获取进度情况，每隔3秒获取一次进度
      this.getProgressInfo()
      this.refreshProgress()
    },
    handleSyncKLineData() {
      this.syncRecentKLineDataIcon = this.loadingIcon
      // 调用后台实时数据接口
      this.$http.post('/stockKLine/syncRecentKLineData').then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
      // 获取进度情况，每隔3秒获取一次进度
      this.getProgressInfo(this.syncRecentKLineDataType)
      this.refreshProgress(this.syncRecentKLineDataType)
    },
    handleSyncBkKLineData() {
      this.syncBkKLineDataIcon = this.loadingIcon
      // 调用后台实时数据接口
      this.$http.post('/bkKLine/syncTodayAllBkKLineData').then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.percentage = 100
          this.syncBkKLineDataIcon = null
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
      // 获取进度情况，每隔3秒获取一次进度
      this.getProgressInfo()
      this.refreshProgress()
    },
    handleCalcRiseCount() {
      this.calcRiseCountIcon = this.loadingIcon
      // 调用后台实时数据接口
      this.$http.post('/stockRiseLine/calcRiseCount').then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.percentage = 100
          this.calcRiseCountIcon = null
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    handleRiseLimitLine() {
      this.riseLimitLineIcon = this.loadingIcon
      // 调用后台实时数据接口
      this.$http.post('/riseLimitLine/calcRiseLimitCount').then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.percentage = 100
          this.riseLimitLineIcon = null
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    handleCalcMarketScore() {
      this.calcMarketScoreIcon = this.loadingIcon
      // 调用后台实时数据接口
      this.$http.post('/marketScoreLine/calcMarketScore').then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.percentage = 100
          this.calcMarketScoreIcon = null
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    handleUpdateKLineIncrease() {
      this.updateKLineIncreaseIcon = this.loadingIcon
      // 调用后台实时数据接口
      this.$http.post('/stockKLine/updateKLineIncrease').then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.percentage = 100
          this.updateKLineIncreaseIcon = null
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    handleUpdateTodayKLineDayIncrease() {
      this.updateTodayKLineDayIncreaseIcon = this.loadingIcon
      // 调用后台实时数据接口
      this.$http.post('/stockKLine/updateTodayKLineDayIncrease').then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.percentage = 100
          this.updateTodayKLineDayIncreaseIcon = null
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    handleUpdateAddStockInfoIcon() {
      this.updateAddStockInfoIcon = this.loadingIcon
      // 调用后台实时数据接口
      this.$http.post('/stock/updateAddStockInfo').then(({data}) => {
        if (data && data.code === 200) {
          console.log(data.data)
          this.percentage = 100
          this.updateAddStockInfoIcon = null
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
.sync {
  margin: 0px auto;
  padding: 5px;
  width: 789px;
  /*border: 1px solid red;*/
}

.sync .row {
  /*border: 1px solid red;*/
  margin: 10px 0px;
}


.sync .progress-info {
  margin: 16px 0px 10px 0px;
}

.sync .progress-bar {
  margin: 0px auto;
  width: 100%;
}
</style>
