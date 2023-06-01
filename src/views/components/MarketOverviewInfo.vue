<template>
    <div class="rise-fall-container">
        <div class="rise-fall-area">

            <h3><i class="el-icon-s-data" style="vertical-align: text-top"></i>个股涨跌</h3>
            <span :class="riseClass">上涨：{{infoData.stockRiseCount}} ({{infoData.stockRisePercentage}}%)</span>
            <span :class="fallClass">下跌：{{infoData.stockFallCount}} ({{infoData.stockFallPercentage}}%)</span>
        </div>
        <div class="rise-fall-area">
            <h3><i class="el-icon-s-marketing"></i>行业涨跌</h3>
            <span :class="riseClass">上涨：{{infoData.industryRiseCount}} ({{infoData.industryRisePercentage}}%)</span>
            <span :class="fallClass">下跌：{{infoData.industryFallCount}} ({{infoData.industryFallPercentage}}%)</span>
        </div>
        <div class="rise-fall-area">
            <h3><i class="el-icon-c-scale-to-original"></i>概念涨跌</h3>
            <span :class="riseClass">上涨：{{infoData.conceptRiseCount}} ({{infoData.conceptRisePercentage}}%)</span>
            <span :class="fallClass">下跌：{{infoData.conceptFallCount}} ({{infoData.conceptFallPercentage}}%)</span>
        </div>
        <div class="rise-fall-area">
            <h3><i class="el-icon-s-promotion"></i> 涨跌停</h3>
            <span :class="riseClass">涨停：{{infoData.riseLimitCount}}</span>
            <span :class="fallClass">跌停：{{infoData.fallLimitCount}}</span>
        </div>
    </div>
</template>

<script>
    import MarketOverviewMiniPie from "~/views/components/MarketOverviewMiniPie";

    export default {
        name: 'MarketOverviewInfo',
        components: {MarketOverviewMiniPie},
        props: {
            infoData: {
                stockRiseCount: null,
                stockFallCount: null,
                stockRisePercentage: null,
                stockFallPercentage: null,
                industryRiseCount: null,
                industryFallCount: null,
                industryRisePercentage: null,
                industryFallPercentage: null,
                conceptRiseCount: null,
                conceptFallCount: null,
                conceptRisePercentage: null,
                conceptFallPercentage: null,
                riseLimitCount: null,
                fallLimitCount: null,
                riseLimitPercentage: null,
                fallLimitPercentage: null,
                bigRiseCount: null,
                bigFallCount: null,
                bigRisePercentage: null,
                bigFallPercentage: null
            }
        },
        watch: {
            infoData() {
                this.loadInfo()
            }
        },
        data() {
            return {
                chart: null,
                riseColor: null,
                fallColor: null,
                chartsData: {
                    stockPie: [],
                    industryPie: [],
                    conceptPie: [],
                },
                queryParam: {
                    typeName: 'industry'
                },
                riseClass: '',
                fallClass: ''
            }
        },
        created() {

        },
        methods: {
            setColors() {
                if (window.localStorage.theme == 1) {
                    this.riseColor = '#db4a39'
                    this.fallColor = '#008e00'
                    this.riseClass = 'rise'
                    this.fallClass = 'fall'
                } else {
                    this.riseColor = '#188df0'
                    this.fallColor = '#ddd'
                    this.riseClass = 'rise-gray'
                    this.fallClass = 'fall-gray'
                }
            },
            loadInfo() {
                this.setColors()
            }
        }
    }
</script>

<style lang="scss" scoped>

    .rise-fall-container {
        /*border: 1px solid red;*/
    }

    .rise-fall-container .rise-fall-area {
        border-bottom: 1px solid #eeeeee;
        height: 98px;
        padding: 0px 20px;
    }

    .rise-fall-container .rise-fall-area:last-child {
        border-bottom: none;
    }

    .rise-fall-container .rise-fall-area h3 {
        text-align: center;
        font-size: 16px;
        font-weight: 400;
    }

    .rise-fall-container .rise-fall-area h3 i {
        color: #528fcc;
        font-size: 24px;
        margin-right: 3px;
        /*border: 1px solid red;*/
        /*vertical-align: bottom;*/
        vertical-align: middle;
    }

    .rise-fall-container .rise-fall-area span {
        display: block;
        width: 49%;
        float: left;
        /*text-align: center;*/
        padding-left: 1%;
        font-size: 14px;
        /*border: 1px solid red;*/
    }

    .rise-fall-container .rise-fall-area span.rise {
        color: #db4a39;
    }

    .rise-fall-container .rise-fall-area span.fall {
        color: #008e00;
    }

    .rise-fall-container .rise-fall-area span.rise-gray {
        color: #1657d9;
    }

    .rise-fall-container .rise-fall-area span.fall-gray {
        color: #ddd;
    }

</style>
