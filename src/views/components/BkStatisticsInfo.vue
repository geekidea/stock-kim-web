<template>
  <div>
    <template v-if="layoutWay==1">
      <div class="bk-statistics-info" :class="bkStatisticsInfoClass">
        <span class="bk-code-name" :class="riseFallClass">{{ bkDetail.bkCode }}</span>
        <span class="bk-code-name" :class="riseFallClass">{{ bkDetail.bkName }}</span>
        <span class="bk-increase" :class="riseFallClass">{{ bkDetail.bkIncrease }}%</span>
        <span class="bk-rise-fall-count"> {{ bkDetail.riseCount }}/<template
            v-if="bkDetail.flatCount>0">{{ bkDetail.flatCount }}/</template>{{ bkDetail.fallCount }}</span>
        <span> {{ (bkDetail.riseCount / bkDetail.bkCount * 100).toFixed(0) }}%</span>
        <!--    <span>涨幅排名 1/216</span>-->
        <span> {{ bkDetail.updateTime }}</span>
      </div>
    </template>
    <template v-else>
      <div class="bk-statistics-info layout-small" :class="bkStatisticsInfoClass" @click="toggleShow">
        <span class="bk-update-time"> {{ bkDetail.updateTime }}</span>
        <span class="bk-rise-fall-count"> {{ bkDetail.riseCount }}/<template
            v-if="bkDetail.flatCount>0">{{ bkDetail.flatCount }}/</template>{{ bkDetail.fallCount }}</span>
        <span class="bk-rise-fall-percentage"> {{ (bkDetail.riseCount / bkDetail.bkCount * 100).toFixed(0) }}%</span>
        <span class="bk-increase" :class="riseFallClass">{{ bkDetail.bkIncrease }}%</span>
      </div>
    </template>
  </div>

</template>

<script>
export default {
  name: "BkStatisticsInfo",
  props: {
    bkInfo: {
      bkIncrease: {
        type: Object,
        default: () => {
        }
      }
    }
  },
  watch: {
    bkInfo() {
      this.bkDetail = this.bkInfo
      this.handleRiseFallClass()
      this.loadBkInfo()
    }
  },
  data() {
    return {
      bkStatisticsInfoClass: null,
      riseFallClass: null,
      bkDetail: {},
      layoutWay: 1
    }
  },
  created() {
    let clientWidth = document.body.clientWidth
    console.log("clientWidth...")
    console.log(clientWidth)
    if (clientWidth < 1000) {
      this.layoutWay = 0
    } else {
      this.layoutWay = 1
    }
  },
  mounted() {
    this.setColors()
    this.handleRiseFallClass()
    this.loadBkInfo()
  },
  methods: {
    setColors() {
      if (window.localStorage.theme == 1) {
        this.bkStatisticsInfoClass = 'highlight'
      } else {
        this.bkStatisticsInfoClass = null
      }
    },
    handleRiseFallClass() {
      let bkIncrease = this.bkDetail.bkIncrease
      if (bkIncrease > 0) {
        this.riseFallClass = 'rise'
      } else if (bkIncrease < 0) {
        this.riseFallClass = 'fall'
      } else {
        this.riseFallClass = null
      }
    },
    loadBkInfo() {

    },
    toggleShow() {
      this.$emit("toggleShow")
    }
  }
}
</script>

<style scoped>
.bk-statistics-info {
  padding: 10px 5px 5px 10px;
  /*border-top: 1px solid #eeeeee;*/
  border-bottom: 1px solid #eeeeee;
  text-align: center;
}

.bk-statistics-info span {
  margin-right: 16px;
  font-size: 16px;
  color: #333333;
}

.bk-statistics-info span.bk-code-name {
  /*color: #1657d9;*/
  color: #333333;
}

.bk-statistics-info span.bk-increase.fall {
  color: #cccccc;
}

.bk-statistics-info.highlight span.rise {
  color: #eb4436;
}

.bk-statistics-info.highlight span.fall {
  color: #0e9d58;
}

.bk-statistics-info.highlight span.bk-increase {
  color: #eb4436;
}

.bk-statistics-info.highlight span.rise {
  color: #eb4436;
}

.bk-statistics-info.highlight span.fall {
  color: #0e9d58;
}


.bk-statistics-info.layout-small {
  padding: 5px 1px 0px 1px;
  height: 24px;
  /*border: 1px solid red;*/
  min-width: 220px;
}

.bk-statistics-info.layout-small:after {
  clear: both;
}

.bk-statistics-info.layout-small span {
  display: block;
  float: left;
  margin-right: 0px;
  font-size: 14px;
  /*border: 1px solid red;*/
  height: 20px;
  line-height: 20px;
}

.bk-statistics-info.layout-small span.bk-update-time {
  width: 60px;
}

.bk-statistics-info.layout-small span.bk-rise-fall-count {
  width: 60px;
}

.bk-statistics-info.layout-small span.bk-rise-fall-percentage {
  width: 42px;
  text-align: right;
}

.bk-statistics-info.layout-small span.bk-increase {
  width: 59px;
  text-align: right;
}

.bk-statistics-info.layout-small span {
  color: #cccccc;
}

.bk-statistics-info.layout-small span.bk-increase.fall {
  color: #666666;
}
</style>
