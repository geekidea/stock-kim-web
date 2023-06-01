<template>
  <div class="stock-k-line-container">
    <div ref="kLineEchartsBox" class="echarts-box"></div>
    <bk-k-line-info :bk="bkInfo" v-if="showBkKLineInfo"/>
    <stock-k-line-info :stock="stockInfo" v-else/>
  </div>
</template>

<script>
import StockKLineInfo from "~/views/components/StockKLineInfo";
import BkKLineInfo from "~/views/components/BkKLineInfo";

export default {
  name: "StockKLine",
  components: {BkKLineInfo, StockKLineInfo},
  props: {
    kLineType: {
      type: String
    },
    chartData: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      chart: null,
      colors: [],
      stockInfo: null,
      bkInfo: null,
      lastData: null,
      showBkKLineInfo: true
    }
  },
  watch: {
    chartData() {
      this.stockInfo = this.chartData.stock
      this.bkInfo = this.chartData.bkInfo
      if (this.chartData) {
        this.lastData = this.chartData.data[this.chartData.data.length - 1]
        this.loadChart()
      }
    }
  },
  created() {
    if (this.kLineType == 'bkKLine') {
      this.showBkKLineInfo = true
    } else {
      this.showBkKLineInfo = false
    }
  },
  methods: {
    setColors() {
      if (window.localStorage.theme == 1) {
        this.colors = ['#db4a39']
      } else {
        this.colors = ['#188df0']
      }
    },
    loadChart() {
      let option;
      this.setColors()
      let chartDom = this.$refs.kLineEchartsBox
      this.chart = this.$echarts.init(chartDom)
      let upColor = '#ec0000';
      let upBorderColor = '#8A0000';
      let downColor = '#00da3c';
      let downBorderColor = '#008F28';
      // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
      let data0 = splitData(this.chartData.data);
      let rowValues = data0.values
      let lastData = rowValues[rowValues.length - 1]
      let lastMinPrice = lastData[2]
      let lastMaxPrice = lastData[3]

      function splitData(rawData) {
        let categoryData = [];
        let values = []
        for (let i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].splice(0, 1)[0]);
          values.push(rawData[i])
        }
        return {
          categoryData: categoryData,
          values: values
        };
      }

      function calculateMA(dayCount) {
        let result = [];
        for (let i = 0, len = data0.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-');
            continue;
          }
          let sum = 0;
          for (let j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1];
          }
          let value = sum / dayCount
          result.push(value.toFixed(2));
        }
        return result;
      }

      let dataZoomConfig = null
      let preferences = this.$preferences.getPreferences()
      let kLineZoomLock = preferences.kLineZoomLock
      let kLineZoomShow = preferences.kLineZoomShow
      let kLineZoomStart = preferences.kLineZoomStart
      dataZoomConfig = [
        {
          zoomLock: kLineZoomLock,
          type: 'inside',
          start: kLineZoomStart,
          end: 100
        },
        {
          show: kLineZoomShow,
          type: 'slider',
          top: '90%',
          start: 100,
          end: 100,

        }
      ]
      console.log('dataZoomConfig...')
      console.log(dataZoomConfig)

      const options = {
        title: {
          text: '',
          subtext: '',
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal',
            // color: 'red'
          },
          subtextStyle: {
            fontSize: 15,
            // color: 'red'
          },
          top: 0,
          right: 50
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          // triggerOn: 'click'
          formatter: function (array) {
            let data = array[0];
            let color = array[0].color;
            let values = array[0].value;
            let date = data.name
            let open = values[1]
            let close = values[2]
            let lowest = values[3]
            let highest = values[4]
            let increase = values[5]
            let tradeNumber = values[7]
            let tradeAmount = values[8]
            let turnoverRate = values[9]
            let blueColor = '#188df0'
            let html = ''
            html += '<span style="display:block;">' + date + '</span>'
            html += '<span style="display:block;">开盘价: ' + '<span style=color:' + color + ';>' + open + '</span>' + '</span>'
            html += '<span style="display:block;">收盘价: ' + '<span style=color:' + color + ';>' + close + '</span>' + '</span>'
            html += '<span style="display:block;">最低价: ' + '<span style=color:' + color + ';>' + lowest + '</span>' + '</span>'
            html += '<span style="display:block;">最高价: ' + '<span style=color:' + color + ';>' + highest + '</span>' + '</span>'
            html += '<span style="display:block;">涨幅: ' + '<span style=color:' + color + ';>' + increase + '%</span>' + '</span>'
            html += '<span style="display:block;">成交量: ' + '<span style=color:' + blueColor + ';>' + tradeNumber + '万</span>' + '</span>'
            html += '<span style="display:block;">成交额: ' + '<span style=color:' + blueColor + ';>' + tradeAmount + '亿</span>' + '</span>'
            // html += '<span style="display:block;">换手率: ' + '<span style=color:' + blueColor + ';>' + turnoverRate + '%</span>' + '</span>'
            return html
          }
        },
        legend: {
          data: ['MA5', 'MA10', 'MA20', 'MA30', 'MA60'],
          top: 56
        },
        grid: {
          top: 50,
          left: 2,
          right: 15,
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data0.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: {onZero: false},
          splitLine: {show: false},
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        },
        yAxis: {
          scale: true,
          splitArea: {
            // 是否显示间隔条纹
            show: false
          },
          position: 'right'
        },
        dataZoom: dataZoomConfig,
        series: [
          {
            name: '日K',
            type: 'candlestick',
            data: data0.values,
            itemStyle: {
              // color: upColor,
              // color0: downColor,
              // borderColor: upBorderColor,
              // borderColor0: downBorderColor
            },
            markPoint: {
              label: {
                normal: {
                  formatter: function (param) {
                    return param != null ? Math.round(param.value) : '';
                  }
                }
              },
              data: [
                {
                  name: 'highest value',
                  type: 'max',
                  valueDim: 'highest'
                },
                {
                  name: 'lowest value',
                  type: 'min',
                  valueDim: 'lowest'
                },
                {
                  name: 'average value on close',
                  type: 'average',
                  valueDim: 'close'
                }
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + '<br>' + (param.data.coord || '');
                }
              }
            },
            markLine: {
              symbol: ['none', 'none'],
              data: [
                [
                  {
                    name: 'from lowest to highest',
                    type: 'min',
                    valueDim: 'lowest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false
                    },
                    emphasis: {
                      label: {
                        show: false
                      }
                    }
                  },
                  {
                    type: 'max',
                    valueDim: 'highest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false
                    },
                    emphasis: {
                      label: {
                        show: false
                      }
                    }
                  }
                ],
                {
                  name: 'min line on close',
                  type: 'min',
                  valueDim: 'close'
                },
                {
                  name: 'max line on close',
                  type: 'max',
                  valueDim: 'close'
                },
                {
                  name: 'average line on close',
                  type: 'average',
                  valueDim: 'close'
                },
                {
                  silent: false,
                  lineStyle: {
                    type: "solid",
                    color: "red",
                    width: 2
                  },
                  yAxis: lastMinPrice
                },
                {
                  silent: false,
                  lineStyle: {
                    type: "solid",
                    color: "red",
                    width: 2
                  },
                  yAxis: lastMaxPrice
                }
              ]
            }
          },
          {
            name: 'MA5',
            type: 'line',
            showSymbol: false,
            data: calculateMA(5),
            smooth: true,
            lineStyle: {
              opacity: 0.81,
              color: 'red',
              width: 3
            }
          },
          {
            name: 'MA10',
            type: 'line',
            showSymbol: false,
            data: calculateMA(10),
            smooth: true,
            lineStyle: {
              opacity: 0.7,
              color: '#F97902',
              width: 1
            }
          },
          {
            name: 'MA20',
            type: 'line',
            showSymbol: false,
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
              opacity: 0.56,
              color: 'blue',
              width: 3
            }
          },
          {
            name: 'MA30',
            type: 'line',
            showSymbol: false,
            data: calculateMA(30),
            smooth: true,
            lineStyle: {
              opacity: 0.76,
              color: '#0279F9',
              width: 1
            }
          },
          {
            name: 'MA60',
            type: 'line',
            showSymbol: false,
            data: calculateMA(60),
            smooth: true,
            lineStyle: {
              opacity: 0.9,
              color: 'red',
              width: 1
            }
          },

        ]
      };
      this.chart.setOption(options);

    }
  }
}
</script>

<style lang="scss" scoped>
.stock-k-line-container {
  position: relative;
}

.echarts-box {
  width: 100%;
  height: 100%;
}
</style>
