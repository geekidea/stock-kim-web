<template>
    <div class="quotation">
        <div class="line-visual">
            <market-quotation-line-visual type="rise" :chart-data="chartsData.riseLine"/>
        </div>
<!--        <div class="line-visual">-->
<!--            <market-quotation-line-visual type="score" :chart-data="chartsData.scoreLine"/>-->
<!--        </div>-->
<!--        <div class="line-visual">-->
<!--            <market-quotation-line-visual type="limit" :chart-data="chartsData.riseLimitLine"/>-->
<!--        </div>-->
    </div>
</template>

<script>
    import MarketQuotationRiseLine from "~/views/components/MarketQuotationRiseLine";
    import MarketQuotationLineVisual from "~/views/components/MarketQuotationLineVisual";

    export default {
        name: "index",
        components: {MarketQuotationLineVisual},
        data() {
            return {
                chartsData: {
                    riseLine: [],
                    scoreLine: [],
                    riseLimitLine: []
                }
            }
        },
        created() {

        },
        mounted() {
            this.loadRiseLineList()
            // this.loadScoreLineList()
            // this.loadRiseLimitLineList()
        },
        methods: {
            loadRiseLineList() {
                this.$http.post('/stockRiseLine/getRiseLineList').then(({data}) => {
                    if (data && data.code === 200) {
                        this.$set(this.chartsData, 'riseLine', data.data)
                    }
                })
            },
            loadScoreLineList() {
                this.$http.post('/marketScoreLine/getMarketScoreLineList').then(({data}) => {
                    if (data && data.code === 200) {
                        this.$set(this.chartsData, 'scoreLine', data.data)
                    }
                })
            },
            loadRiseLimitLineList() {
                this.$http.post('/riseLimitLine/getRiseLimitLineList').then(({data}) => {
                    if (data && data.code === 200) {
                        this.$set(this.chartsData, 'riseLimitLine', data.data)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .quotation {
        width: 100%;
        height: 1500px;
        /*border: 1px solid red;*/
    }

    .quotation .line-visual {
        width: 100%;
        height: 500px;
        margin-bottom: 110px;
        /*border: 1px solid blue;*/
    }
</style>
