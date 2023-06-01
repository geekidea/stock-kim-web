<template>
    <div class="echarts-box"></div>
</template>

<script>
    export default {
        name: 'MarketOverviewMiniPie',
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
            setColors() {
                if (window.localStorage.theme == 1) {
                    this.colors = ['green', 'red']
                } else {
                    this.colors = ['#ddd', '#188df0']
                }
            },
            loadChart() {
                this.setColors()
                console.log(this.$refs.chartDom)
                this.chart = this.$echarts.init(this.$el)

                // 处理数据
                let miniChartData = []
                let riseData = null
                let fallData = null
                this.chartData.forEach(item => {
                    if (item.name == 1) {
                        riseData = item
                    } else if (item.name == -1) {
                        fallData = item
                    }
                })
                console.log("riseData")
                console.log(riseData)
                console.log("fallData")
                console.log(fallData)
                if (riseData.percentage > fallData.percentage) {
                    miniChartData.push({
                        name: riseData.name,
                        value: riseData.percentage,
                        itemStyle: {
                            color: 'red'
                        }
                    })
                    miniChartData.push({
                        name: fallData.name,
                        value: fallData.percentage,
                        itemStyle: {
                            color: '#ddd'
                        }
                    })
                } else if (riseData.percentage == fallData.percentage) {
                    miniChartData.push({
                        name: riseData.name,
                        value: riseData.percentage,
                        itemStyle: {
                            color: 'red'
                        }
                    })
                    miniChartData.push({
                        name: fallData.name,
                        value: fallData.percentage,
                        itemStyle: {
                            color: 'green'
                        }
                    })
                } else {
                    miniChartData.push({
                        name: riseData.name,
                        value: riseData.percentage,
                        itemStyle: {
                            color: '#ddd'
                        }
                    })
                    miniChartData.push({
                        name: fallData.name,
                        value: fallData.percentage,
                        itemStyle: {
                            color: 'green'
                        }
                    })
                }

                console.log("miniChartData")
                console.log(miniChartData)

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
                    // color: this.colors,
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            startAngle: 310,
                            radius: ['53%', '35%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center',
                                fontSize: '12',
                                color: this.colors[0],
                                formatter: function (params) {
                                    if (params.name == 1) {
                                        return params.percentage + '';
                                    }
                                    return '';
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: miniChartData
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
