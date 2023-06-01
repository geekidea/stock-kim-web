<template>
    <div class="echarts-box"></div>
</template>

<script>
    export default {
        name: 'MarketQuotationRiseLine',
        props: {
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
                    this.colors = ['#db4a39']
                } else {
                    this.colors = ['#188df0']
                }
            },
            loadChart() {
                let xAxisData = []
                let seriesData = []
                if (this.chartData) {
                    this.chartData.forEach(item => {
                        xAxisData.push(item.lineDate)
                        seriesData.push(item.riseCount)
                    })
                }
                this.setColors()
                this.chart = this.$echarts.init(this.$el)
                const options = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    color: this.colors,
                    grid: {
                        left: '4%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxisData,
                        axisLabel: {
                            interval: 5,
                            rotate: 36,
                            fontSize: 12
                        }
                    },
                    yAxis: {
                        type: 'value',
                        position: 'right'
                    },
                    series: [
                        {
                            data: seriesData,
                            type: 'line',
                            markPoint: {
                                data: [{ name: '最低', value: 397, xAxis: 1, yAxis: -1.5 }]
                            },
                            markLine: {
                                data: [
                                    { type: 'average', name: 'Avg' },
                                    { type: 'max', name: 'Max' },
                                    { type: 'min', name: 'Min' },
                                    // [
                                    //     {
                                    //         symbol: 'none',
                                    //         x: '100%',
                                    //         yAxis: 'max'
                                    //     },
                                    //     {
                                    //         symbol: 'circle',
                                    //         type: 'max',
                                    //         name: '最高'
                                    //     }
                                    // ],
                                    // [
                                    //     {
                                    //         symbol: 'none',
                                    //         x: '100%',
                                    //         yAxis: 'min'
                                    //     },
                                    //     {
                                    //         symbol: 'circle',
                                    //         type: 'min',
                                    //         name: '最高'
                                    //     }
                                    // ]
                                ]
                            }
                        }
                    ]
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
