<template>
  <div class="echarts-box"></div>
</template>

<script>
let riseColor = 'rgb(219, 74, 57)'
let fallColor = 'rgb(0, 142, 0)'
let labelColor = '#3266CF'
// let labelColor = '#255ED0'
// let labelColor = '#07519a'
export default {
  name: 'IndustryConceptAvgBar',
  props: {
    barType: {
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
      chart: null
    }
  },
  created() {
    if (window.localStorage.theme == 1) {
      riseColor = '#db4a39'
      // riseColor = 'rgb(219, 74, 57)'
      fallColor = '#008e00'
    } else {
      riseColor = '#188df0'
      fallColor = '#ddd'
    }
  },
  mounted() {
    this.loadChart()
  },
  methods: {
    loadChart() {
      let xAxisData = []
      let seriesData = []
      let transparentData = []
      let barType = this.barType
      let tipPosition = 'top'
      this.chartData.forEach((item => {
        xAxisData.push(item.name)
        let valueObject
        let avg = item.avg
        if (barType == 'fall') {
          // avg = Math.abs(avg)
          tipPosition = 'bottom'
        }
        if (item.avg >= 0) {
          valueObject = {
            value: avg,
            itemStyle: {
              color: riseColor
            }
          }
        } else {
          valueObject = {
            value: avg,
            itemStyle: {
              color: fallColor
            }
          }
        }
        seriesData.push(valueObject)
        transparentData.push(0)
      }))
      this.chart = this.$echarts.init(this.$el)
      const options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            let tar = params[1];
            let tipColor;
            if (tar.value > 0) {
              tipColor = riseColor
            } else {
              tipColor = fallColor
            }
            return '<div style="padding:3px;">' +
                '<span style="display:block;text-align:center;padding-bottom:6px;font-size: 20px;color: #345;">' + tar.name + '</span>' + '' +
                '<span style="display:block;text-align:center;padding:5px;font-size:26px;color: ' + tipColor + '">' + tar.value + '%' + '</span>'
                + '</div>';
          }
        },
        grid: {
          top: 15,
          left: 25,
          right: 25,
          bottom: 5,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          triggerEvent: true,
          data: xAxisData,
          axisLabel: {
            interval: 0,
            rotate: 46,
            color: labelColor,
            fontSize: 14.5
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Placeholder',
            type: 'bar',
            width: '100%',
            height: '100%',
            stack: 'Total',
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            },
            emphasis: {
              itemStyle: {
                borderColor: 'transparent',
                color: 'transparent'
              }
            },
            data: transparentData
          },
          {
            type: 'bar',
            width: '100%',
            height: '100%',
            data: seriesData,
            barWidth: 22,
            itemStyle: {
              normal: {
                label: {
                  // formatter: function (param) {
                  //   return param.value +'%';
                  // },
                  show: true,
                  position: tipPosition,
                  textStyle: {
                    color: 'black',
                    fontSize: 13
                  }
                }
              }
            }
          }
        ]
      };
      this.chart.setOption(options)
      let _this = this
      // fix重复点击
      this.chart.off('click')
      this.chart.on('click', function (param) {
        let name = null
        if (param.targetType && param.targetType == 'axisLabel') {
          // 点击文字
          name = param.value
        } else {
          // 点击柱状图
          name = param.name
        }
        console.log('param...')
        console.log(param)
        _this.$emit('clickBar', name);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts-box {
  height: 100%;
  width: 100%;
}
</style>
