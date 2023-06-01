<template>
  <div class="echarts-box"></div>
</template>

<script>
let riseColors
let fallColors
export default {
  name: 'IndustryConceptAvgTreeMap',
  props: {
    treeMapType: {
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
      riseColors = this.$colorUtil.getColors('#FB3C3C', '#F29D9D', 30)
      fallColors = this.$colorUtil.getColors('#008000', '#50EA04', 30)
    } else {
      riseColors = this.$colorUtil.getColors('#188df0', '#BED8F8', 30)
      fallColors = this.$colorUtil.getColors('#aaaaaa', '#dddddd', 30)
    }
  },
  mounted() {
    this.loadChart()
  },
  methods: {
    loadChart() {
      let renderData = [];
      if (this.chartData && this.chartData.length > 0) {
        let treeMapType = this.treeMapType;
        this.chartData.forEach((value, index) => {
          let color = null;
          let fontSize = 36 - (index * 4);
          if (fontSize <= 12) {
            fontSize = 13;
          }
          if (value.avg >= 0) {
            color = riseColors[index];
          } else {
            color = fallColors[index];
          }
          let valueAvg = Math.abs(value.avg);
          let item = {
            // name: value.name,
            name: value.name + "\n" + value.avg + "%",
            value: valueAvg,
            itemStyle: {
              color: color
            },
            label: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: fontSize
            }
          }
          renderData.push(item)
        })
      }

      this.chart = this.$echarts.init(this.$el)
      const options = {
        tooltip: {
          trigger: 'item',
          formatter: `{b0}: {c0}%`
        },
        color: ['#4484EB'],
        series: [{
          type: 'treemap',
          width: '100%',
          height: '100%',
          roam: false,
          nodeClick: false,
          breadcrumb: {
            show: false
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: '#fff',
          },
          data: renderData
        }]
      }
      this.chart.setOption(options)
      let _this = this
      // fix重复点击
      this.chart.off('click')
      this.chart.on('click', function (param) {
        let obj = {
          name: param.name,
          value: param.value
        }
        console.log('treeMap...')
        console.log(obj)
        _this.$emit('clickTreeMap', obj);
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
