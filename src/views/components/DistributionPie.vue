<template>
    <div class="echarts-box"></div>
</template>

<script>
    export default {
        name: 'DistributionPie',
        props: {
            title: {
                type: String
            },
            subTitle: {
                type: String
            },
            seriesName: {
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
        mounted() {
            this.loadChart()
        },
        methods: {
            setColors() {
                if (window.localStorage.theme == 1) {
                    this.colors = ['#F56C6C', 'orange', 'dodgerblue', '#409EFF', 'cornflowerblue', 'deepskyblue', 'royalblue', 'steelblue', 'mediumseagreen', 'lightseagreen']
                } else {
                    this.colors = ['#188df0','rgb(89, 153, 235)','rgb(120, 163, 230)','rgb(146, 174, 224)','rgb(165, 184, 218)','rgb(186, 194, 211)']
                }
            },
            loadChart() {
                this.setColors()
                console.log('colors...')
                console.log(this.colors)
                this.chart = this.$echarts.init(this.$el)
                const options = {
                    title: {
                        text: this.title,
                        subtext: this.subTitle,
                        subtextStyle: {
                            fontSize: 16
                        },
                        left: 'center',
                        top: 0
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'horizontal',
                        left: 'center',
                        // top: 60,
                        bottom: 50,
                        show: false
                    },
                    color: this.colors,
                    series: [
                        {
                            name: this.seriesName,
                            type: 'pie',
                            radius: '66%',
                            data: this.chartData,
                            emphasis: {
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
                let _this = this
                // fix重复点击
                this.chart.off('click')
                this.chart.on('click', function (param) {
                    console.log(param)
                    let name = param.name
                    let seriesName = param.seriesName
                    console.log('click:' + seriesName + ' ' + name)
                    _this.$emit('clickPie', name, seriesName);
                })
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
