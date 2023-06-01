<template>
    <div class="quotation">
        <el-row :gutter="0">
            <el-col :span="8">
                <market-overview-pie ref="stockPie" class="stock-charts" :chart-data="chartsData.stockPie" title="个股涨跌"
                                     @clickBar="handleClickPie"/>
            </el-col>
            <el-col :span="8">
                <market-overview-pie ref="industryPie" class="stock-charts" :chart-data="chartsData.industryPie"
                                     title="行业涨跌"
                                     @clickBar="handleClickPie"/>
            </el-col>
            <el-col :span="8">
                <market-overview-pie ref="conceptPie" class="stock-charts" :chart-data="chartsData.conceptPie"
                                     title="概念涨跌"
                                     @clickBar="handleClickPie"/>
            </el-col>
        </el-row>
        <el-row :gutter="0" class="bar">
            <el-col :span="8">
                <market-overview-bar ref="stockBar" class="stock-charts" :chart-data="chartsData.stockBar"
                                     @clickBar="handleClickBar"/>
            </el-col>
            <el-col :span="8">
                <market-overview-bar ref="industryBar" class="stock-charts" :chart-data="chartsData.industryBar"
                                     @clickBar="handleClickBar"/>
            </el-col>
            <el-col :span="8">
                <market-overview-bar ref="conceptBar" class="stock-charts" :chart-data="chartsData.conceptBar"
                                     @clickBar="handleClickBar"/>
            </el-col>
        </el-row>
        <stock-list-table ref="stockList" :page-param="stockPageList.pageParam" style="padding-top: 30px;"/>

    </div>
</template>

<script>
    import MarketOverviewPie from "~/views/components/MarketOverviewPie";
    import MarketOverviewBar from "~/views/components/MarketOverviewBar";
    import MarketOverviewDistributionBar from "~/views/components/MarketOverviewDistributionBar";
    import MarketOverviewScorePie from "~/views/components/MarketOverviewScorePie";
    import MarketOverviewInfo from "~/views/components/MarketOverviewInfo";
    import StockListTable from "~/views/components/StockListTable";

    export default {
        name: "index",
        components: {
            StockListTable,
            MarketOverviewInfo,
            MarketOverviewScorePie, MarketOverviewDistributionBar, MarketOverviewBar, MarketOverviewPie
        },
        data() {
            return {
                chartsData: {
                    stockPie: [],
                    industryPie: [],
                    conceptPie: [],
                    stockBar: [],
                    industryBar: [],
                    conceptBar: [],
                },
                stockPageList: {
                    pageParam: {}
                },
                defaultPageListParam: {
                    pageIndex: 1,
                    type: 0,
                },
                queryParam: {
                    typeName: 'industry'
                },
                componentData: {
                    infoData: {}
                }
            }
        },
        created() {
            this.getStockQuotationPie()
            this.getIndustryQuotationPie()
            this.getConceptQuotationPie()
        },
        mounted() {
            this.loadStockPageList()
        },
        methods: {
            getStockQuotationPie() {
                this.queryParam.typeName = 'stock'
                this.$http.post('/stock/getMarketOverview', this.queryParam).then(({data}) => {
                    if (data && data.code === 200) {
                        this.$set(this.chartsData, 'stockPie', data.data)
                        this.$set(this.chartsData, 'stockBar', data.data)
                        this.$refs.marketOverviewInfo.loadStockPie(data.data)
                    }
                })
            },
            getIndustryQuotationPie() {
                this.queryParam.typeName = 'industry'
                this.$http.post('/stock/getMarketOverview', this.queryParam).then(({data}) => {
                    if (data && data.code === 200) {
                        this.$set(this.chartsData, 'industryPie', data.data)
                        this.$set(this.chartsData, 'industryBar', data.data)
                        this.$refs.marketOverviewInfo.loadIndustryPie(data.data)
                    }
                })
            },
            getConceptQuotationPie() {
                this.queryParam.typeName = 'concept'
                this.$http.post('/stock/getMarketOverview', this.queryParam).then(({data}) => {
                    if (data && data.code === 200) {
                        this.$set(this.chartsData, 'conceptPie', data.data)
                        this.$set(this.chartsData, 'conceptBar', data.data)
                        this.$refs.marketOverviewInfo.loadConceptPie(data.data)
                    }
                })
            },
            loadStockPageList(param) {
                if (!param) {
                    param = this.defaultPageListParam
                }
                this.$set(this.stockPageList, 'pageParam', param)
            },
            handleClickPie(name) {
                console.log(name)
                let pageParam = {
                    pageIndex: 1,
                    type: 0,
                    industry: null,
                    concept: null
                }
                let typeName = this.queryParam.typeName
                if ('industry' == typeName) {
                    pageParam.type = 2
                    pageParam.industry = name
                } else if ('concept' == typeName) {
                    pageParam.type = 3
                    pageParam.concept = name
                }
                this.loadStockPageList(pageParam)
            },
            handleClickBar(name) {
                console.log(name)
                let pageParam = {
                    pageIndex: 1,
                    type: 0,
                    industry: null,
                    concept: null
                }
                let typeName = this.queryParam.typeName
                if ('industry' == typeName) {
                    pageParam.type = 2
                    pageParam.industry = name
                } else if ('concept' == typeName) {
                    pageParam.type = 3
                    pageParam.concept = name
                }
                this.loadStockPageList(pageParam)
            }
        }
    }
</script>

<style>
    .quotation {
        /*border: 1px solid red;*/
        height: 2000px;
        padding: 20px 50px;
    }

    .quotation .el-row {
        height: 300px;
        /*border: 1px solid blue;*/
    }

    .quotation .el-row .el-col {
        height: 330px;
        /*border: 1px solid #ccc;*/
    }

    .quotation .el-row.bar {
        height: 358px;
        /*border: 1px solid blue;*/
    }

    .quotation .el-row.bar .el-col {
        height: 350px;
        /*border: 1px solid #ccc;*/
        padding: 0px 20px 0px 20px;
    }

    .quotation .el-row.distribution-bar .el-col {
        height: 460px;
        border: 1px solid #eeeeee;
        border-right: none;
    }

    .quotation .el-row.distribution-bar .el-col:first-child {
        padding: 0px;
    }

    .quotation .el-row.distribution-bar .el-col:last-child {
        border-right: 1px solid #eeeeee;
    }

</style>
