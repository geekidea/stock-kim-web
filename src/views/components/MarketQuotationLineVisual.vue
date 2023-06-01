<template>
  <div class="echarts-box"></div>
</template>

<script>
export default {
  name: 'MarketQuotationLineVisual',
  props: {
    type: {
      type: String
    },
    chartData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    chartData() {
      this.loadChart()
    }
  },
  data() {
    return {
      chart: null,
      colors: []
    }
  },
  created() {

  },
  methods: {
    loadChart() {
      console.log("this.chartData...")
      console.log(this.type)
      console.log(this.chartData)
      let seriesName = null
      let upColor = null
      let middleColor = null
      let downColor = null
      if (window.localStorage.theme == 1) {
        upColor = '#FD0100'
        middleColor = '#FC7D02'
        downColor = '#67C23A'
      } else {
        upColor = '#188df0'
        middleColor = 'rgb(160, 207, 255)'
        downColor = '#ccc'
      }

      let low = this.$preferences.getRiseCountLow()
      let high = this.$preferences.getRiseCountHigh()
      if (this.type == 'rise') {
        seriesName = '上涨家数'
        this.colors = [
          {
            gt: 0,
            lte: low,
            color: downColor
          },
          {
            gt: low,
            lte: high,
            color: middleColor
          },
          {
            gt: high,
            color: upColor
          }
        ]
      } else if (this.type == 'score') {
        seriesName = '分数'
        this.colors = [
          {
            gt: 0,
            lte: 35,
            color: downColor
          },
          {
            gt: 35,
            lte: 70,
            color: middleColor
          },
          {
            gt: 70,
            color: upColor
          }
        ]
      } else if (this.type == 'limit') {
        seriesName = '涨停家数'
        this.colors = [
          {
            gt: 0,
            lte: 55,
            color: downColor
          },
          {
            gt: 55,
            lte: 80,
            color: middleColor
          },
          {
            gt: 80,
            color: upColor
          }
        ]
      }
      let xAxisData = []
      let seriesData = []
      if (this.chartData) {
        this.chartData.forEach(item => {
          xAxisData.push(item.name)
          seriesData.push(item.value)
        })
      }
      let lastValue = seriesData[seriesData.length - 1]
      let lastRiseMarkColor = ''
      if (this.type == 'rise') {
        if (lastValue <= low) {
          lastRiseMarkColor = downColor
        } else if (lastValue <= high) {
          lastRiseMarkColor = middleColor
        } else {
          lastRiseMarkColor = upColor
        }
      } else if (this.type == 'score') {
        if (lastValue <= 35) {
          lastRiseMarkColor = downColor
        } else if (lastValue <= 70) {
          lastRiseMarkColor = middleColor
        } else {
          lastRiseMarkColor = upColor
        }
      } else if (this.type == 'limit') {
        if (lastValue <= 55) {
          lastRiseMarkColor = downColor
        } else if (lastValue <= 80) {
          lastRiseMarkColor = middleColor
        } else {
          lastRiseMarkColor = upColor
        }
      }
      this.chart = this.$echarts.init(this.$el)
      const options = {
        title: {
          text: '',
          left: '1%'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '4%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: xAxisData,
          axisLabel: {
            interval: 5,
            rotate: 36,
            fontSize: 12
          }
        },
        yAxis: {
          position: 'right'
        },
        visualMap: {
          // top: 50,
          // left: 10,
          show: false,
          pieces: this.colors,
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: seriesName,
          type: 'line',
          data: seriesData,
          lineStyle: {
            width: 4
          },
          markLine: {
            silent: true,
            label: {
              color: lastRiseMarkColor,
              fontSize: 24
            },
            lineStyle: {
              color: lastRiseMarkColor,
              width: 4
            },
            data: [
              {
                yAxis: lastValue
              }
            ]
          }
        }
      }
      this.chart.setOption(options)
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts-box {
  width: 100%;
  height: 100%;
}
</style>
