<template>
    <div class="echarts-box"></div>
</template>

<script>
    export default {
        name: 'MarketOverviewScorePie',
        props: {
            title: {
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
            setColors(labelValue) {
                if (window.localStorage.theme == 1) {
                  if (labelValue>=50){
                    this.colors = ['#db4a39', '#ddd']
                  }else{
                    this.colors = ['#008e00', '#ddd']
                  }
                } else {
                    this.colors = ['#188df0', '#ddd']
                }
            },
            loadChart() {
                console.log('this.chartData...')
                console.log(this.chartData)
                let labelValue
                this.chartData.forEach(item => {
                    if (item.name == 1) {
                        labelValue = item.value
                    }
                })
                this.setColors(labelValue)
                this.chart = this.$echarts.init(this.$el)
                const options = {
                    title: {
                        text: this.title,
                        subtext: '',
                        left: 'center',
                        padding: [66, 20, 20, 20],
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 19

                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        show: false
                    },
                    legend: {
                        show: false
                    },
                    color: this.colors,
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            startAngle: 310,
                            radius: ['65%', '55%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: true,
                                position: 'center',
                                fontSize: '40',
                                fontWeight: 'bold',
                                color: this.colors[0],
                                formatter: function () {
                                    return labelValue;
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: this.chartData
                        }
                    ]
                };
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
