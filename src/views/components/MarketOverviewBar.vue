<template>
    <div class="echarts-box"></div>
</template>

<script>
    let riseColor = 'rgb(219, 74, 57)'
    let fallColor = 'rgb(0, 142, 0)'
    let labelColor = '#07519a'
    let padding = [0, 0, 0, 30]
    export default {
        name: 'MarketOverviewBar',
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
                chart: null
            }
        },
        created() {
            if (window.localStorage.theme == 1) {
                riseColor = '#db4a39'
                fallColor = '#008e00'
            } else {
                riseColor = '#188df0'
                fallColor = '#ddd'
            }
        },
        methods: {
            loadChart() {
                let xAxisData = []
                let seriesData = []
                let transparentData = []

                if (this.chartData.length == 3) {
                    padding = [0, 0, 0, 30]
                } else if (this.chartData.length == 2) {
                    padding = [0, 0, 0, 85]
                }
                let sortChartData = []
                this.chartData.forEach((item=>{
                    sortChartData.push(item)
                }))
                // 数组按照name排序
                sortChartData.sort(function (a, b) {
                    return b.name - a.name
                })
                sortChartData.forEach((item => {
                    let name = item.name
                    if (name == 1) {
                        name = '上涨'
                    } else if (name == 0) {
                        name = '平'
                    } else {
                        name = '下跌'
                    }
                    xAxisData.push(name)
                    let valueObject
                    if (item.name >= 0) {
                        valueObject = {
                            value: item.value,
                            itemStyle: {
                                color: riseColor
                            }
                        }
                    } else if (item.name == 0) {
                        valueObject = {
                            value: item.value,
                            itemStyle: {
                                color: '#ddd'
                            }
                        }
                    } else {
                        valueObject = {
                            value: item.value,
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
                            } else if (tar.value == 0) {
                                tipColor = '#ddd'
                            } else {
                                tipColor = fallColor
                            }
                            return '<div style="padding:3px;">' +
                                '<span style="display:block;text-align:center;padding-bottom:6px;font-size: 20px;color: #345;">' + tar.name + '</span>' + '' +
                                '<span style="display:block;text-align:center;padding:5px;font-size:26px;">' + tar.value + '</span>'
                                + '</div>';
                        }
                    },
                    grid: {
                        left: 50,
                        right: 60,
                        bottom: 50,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        triggerEvent: true,
                        data: xAxisData,
                        axisLabel: {
                            padding: padding,
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
                                        show: true,
                                        position: 'top',
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
                    let name = param.name || param.value
                    _this.$emit('clickBar', name);
                })
            },
            resize() {
                this.chart.resize()
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
