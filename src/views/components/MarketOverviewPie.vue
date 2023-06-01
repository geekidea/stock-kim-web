<template>
    <div class="echarts-box"></div>
</template>

<script>
    export default {
        name: 'MarketOverviewPie',
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
                    if (this.chartData && this.chartData.length == 3) {
                        this.colors = ['mediumseagreen', '#ddd', 'orangered']
                    } else if (this.chartData && this.chartData.length == 2) {
                        this.colors = ['mediumseagreen', 'orangered']
                    }
                } else {
                    if (this.chartData && this.chartData.length == 3) {
                        this.colors = ['#ddd', '#eee', '#188df0']
                    } else if (this.chartData && this.chartData.length == 2) {
                        this.colors = ['#ddd', '#188df0']
                    }
                }
            },
            loadChart() {
                this.setColors()
                let total = 0
                if (this.chartData) {
                    this.chartData.forEach(item => {
                        total += parseInt(item.value)
                    })
                }
                this.chart = this.$echarts.init(this.$el)
                const options = {
                    title: {
                        text: this.title,
                        subtext: '',
                        left: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 19
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        // formatter: '{a} <br/> {b} : {c} ({d}%)'
                        formatter: function (params) {
                            console.log(params)
                            let name = params.name
                            if (name == 1) {
                                name = '上涨'
                            } else if (name == 0) {
                                name = '平'
                            } else {
                                name = '下跌'
                            }
                            let value = params.value
                            let percent = params.percent
                            return '总计: ' + total + '<br/>' + name + ': ' + value + ' (' + percent + '%)';
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        show: false
                    },
                    color: this.colors,
                    series: [
                        {
                            name: '涨跌家数',
                            type: 'pie',
                            radius: '65%',
                            label: {            //饼图图形上的文本标签
                                normal: {
                                    show: true,
                                    position: 'inner', //标签的位置
                                    textStyle: {
                                        color: 'white',
                                        fontWeight: 400,
                                        fontSize: 16
                                    },
                                    formatter: '{c} ({d}%)'
                                }
                            },

                            data: this.chartData,
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '21'
                                },
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
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
        color: orangered;
    }
</style>
