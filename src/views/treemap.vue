<template>
    <div id="treemapChart" style="width: 500px;height: 650px;margin: 0px;border: 0px solid red;padding: 10px;">

    </div>
</template>

<script>

    export default {
        name: "treemap",
        data() {
            return {}
        },
        mounted() {
            this.getKLineList();
        },
        methods: {
            getKLineList() {
                this.treemap()
            },
            treemap(chartData) {
                let data = [{
                    name: null,
                    value: null,
                    itemStyle: {
                        color: 'red'
                    },
                    label: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 50

                    }
                }, {
                    name: null,
                    value: null,
                    itemStyle: {
                        color: 'orange'
                    },
                    label: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 40

                    }
                }, {
                    name: null,
                    value: null,
                    itemStyle: {
                        color: 'yellow'
                    },
                    label: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 30

                    }
                }, {
                    name: null,
                    value: null,
                    itemStyle: {
                        color: '#ccc'
                    },
                    label: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 20

                    }
                }, {
                    name: null,
                    value: null,
                    itemStyle: {
                        color: '#444'
                    },
                    label: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 15

                    }
                }, {
                    name: null,
                    value: null,
                    itemStyle: {
                        color: '#555'
                    },
                    label: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 13

                    }
                }, {
                    name: null,
                    value: null,
                    itemStyle: {
                        color: '#555'
                    },
                    label: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 13

                    }
                }, {
                    name: null,
                    value: null,
                    itemStyle: {
                        color: '#555'
                    },
                    label: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 13

                    }
                }, {
                    name: null,
                    value: null,
                    itemStyle: {
                        color: '#555'
                    },
                    label: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 13

                    }
                }, {
                    name: null,
                    value: null,
                    itemStyle: {
                        color: '#555'
                    },
                    label: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 13

                    }
                }];

                var chartDom = document.getElementById('treemapChart');
                var chart = this.$echarts.init(chartDom);
                var option = {
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
                            // borderWidth: 1,
                            // borderColor: '#fff',
                        },
                        data: data
                    }]
                };
                chart.setOption(option);
            }
        }
    }
</script>

<style scoped>

</style>
