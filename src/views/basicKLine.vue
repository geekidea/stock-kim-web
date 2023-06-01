<template>
    <div id="basicKLineChart" style="width: 98%;height: 700px;margin: 10px auto;border: 0px solid red;">

    </div>
</template>

<script>

    export default {
        name: "kLine",
        data() {
            return {}
        },
        mounted() {
            this.getKLineList();
        },
        methods: {
            getKLineList() {
                let keyword = this.$route.query.k;
                if (!keyword) {
                    keyword = '000001';
                }
                this.$http.post('/stockKLine/getBasicList', {
                    keyword: keyword
                }).then(({data}) => {
                    if (data && data.code === 200) {
                        let chartData = data.data
                        this.kLine(chartData)
                        console.log(chartData)
                        console.log(chartData.xdata)
                        console.log(chartData.sdata)
                    } else {
                        this.$message.error(data.msg)
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            kLine(chartData) {
                var chartDom = document.getElementById('basicKLineChart');
                var chart = this.$echarts.init(chartDom);
                var option = {
                    xAxis: {
                        data: chartData.xdata,
                        min: 'dataMin',
                        max: 'dataMax'
                    },
                    yAxis: {},
                    series: [{
                        type: 'k',
                        data: chartData.sdata
                    }]
                };
                chart.setOption(option);
            }
        }
    }
</script>

<style scoped>

</style>
