<template>
    <div class="k-line-info" :class="kLineInfoClass">
        <table class="info-table">
            <tr>
                <th>开盘价</th>
                <td><span class="price">{{stockInfo.openPrice}}</span></td>
                <th>收盘价</th>
                <td><span class="price">{{stockInfo.price}}</span></td>
                <th>振幅</th>
                <td>{{stockInfo.amplitude}}%</td>
                <th>成交额</th>
                <td>{{stockInfo.tradeAmount}}亿</td>
            </tr>
            <tr>
                <th>最高价</th>
                <td><span class="price">{{stockInfo.highPrice}}</span></td>
                <th>最低价</th>
                <td><span class="price">{{stockInfo.lowPrice}}</span></td>
                <th>换手</th>
                <td>{{stockInfo.turnoverRate}}%</td>
                <th>成交量</th>
                <td>{{stockInfo.tradeNumber}}</td>
            </tr>
        </table>

        <table class="increase-table">
            <tr>
                <th>5日</th>
                <th>10日</th>
                <th>20日</th>
                <th>30日</th>
                <th>60日</th>
                <th>90日</th>
                <th>120日</th>
                <th>250日</th>
                <th>300日</th>
            </tr>
            <tr>
                <td>
                    <span v-if="stockInfo.i5>0" class="increase-up">{{ stockInfo.i5 }}</span>
                    <span v-else-if="stockInfo.i5<0" class="increase-down">{{ stockInfo.i5 }}</span>
                    <span v-else class="increase">{{ stockInfo.i5 }}</span>
                </td>
                <td>
                    <span v-if="stockInfo.i10>0" class="increase-up">{{ stockInfo.i10 }}</span>
                    <span v-else-if="stockInfo.i10<0" class="increase-down">{{ stockInfo.i10 }}</span>
                    <span v-else class="increase">{{ stockInfo.i10 }}</span>
                </td>
                <td>
                    <span v-if="stockInfo.i20>0" class="increase-up">{{ stockInfo.i20 }}</span>
                    <span v-else-if="stockInfo.i20<0" class="increase-down">{{ stockInfo.i20 }}</span>
                    <span v-else class="increase">{{ stockInfo.i20 }}</span>
                </td>
                <td>
                    <span v-if="stockInfo.i30>0" class="increase-up">{{ stockInfo.i30 }}</span>
                    <span v-else-if="stockInfo.i30<0" class="increase-down">{{ stockInfo.i30 }}</span>
                    <span v-else class="increase">{{ stockInfo.i30 }}</span>
                </td>
                <td>
                    <span v-if="stockInfo.i60>0" class="increase-up">{{ stockInfo.i60 }}</span>
                    <span v-else-if="stockInfo.i60<0" class="increase-down">{{ stockInfo.i60 }}</span>
                    <span v-else class="increase">{{ stockInfo.i60 }}</span>
                </td>
                <td>
                    <span v-if="stockInfo.i90>0" class="increase-up">{{ stockInfo.i90 }}</span>
                    <span v-else-if="stockInfo.i90<0" class="increase-down">{{ stockInfo.i90 }}</span>
                    <span v-else class="increase">{{ stockInfo.i90 }}</span>
                </td>
                <td>
                    <span v-if="stockInfo.i120>0" class="increase-up">{{ stockInfo.i120 }}</span>
                    <span v-else-if="stockInfo.i120<0" class="increase-down">{{ stockInfo.i120 }}</span>
                    <span v-else class="increase">{{ stockInfo.i120 }}</span>
                </td>
                <td>
                    <span v-if="stockInfo.i250>0" class="increase-up">{{ stockInfo.i250 }}</span>
                    <span v-else-if="stockInfo.i250<0" class="increase-down">{{ stockInfo.i250 }}</span>
                    <span v-else class="increase">{{ stockInfo.i250 }}</span>
                </td>
                <td>
                    <span v-if="stockInfo.i300>0" class="increase-up">{{ stockInfo.i300 }}</span>
                    <span v-else-if="stockInfo.i300<0" class="increase-down">{{ stockInfo.i300 }}</span>
                    <span v-else class="increase">{{ stockInfo.i300 }}</span>
                </td>
            </tr>
        </table>

        <table class="price-table">
            <tr>
                <td class="td-stockName">
                    <span class="span-stockName">{{stockInfo.stockName}}</span>
                </td>
                <td class="td-stockCode">
                    <span class="span-stockCode">{{stockInfo.stockCode}}</span>
                </td>
            </tr>
            <tr>
                <td class="td-price">
                    <span class="span-price">{{stockInfo.price}}</span>
                </td>
                <td class="td-increase">
                    <span class="span-increase">{{stockInfo.increase}}%</span>
                </td>
            </tr>
        </table>
        <table class="industry-table">
            <tr>
                <td class="td-industry">
                    <span>{{stockInfo.industry}}</span>
                </td>
                <td class="td-concept">
                    <span>{{stockInfo.conceptNameInfo}}</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "StockKLineInfo",
        props: {
            stock: {
                type: Object,
                default: () => {
                }
            }
        },
        watch: {
            stock() {
                this.loadStockInfo()
            }
        },
        data() {
            return {
                stockInfo: {},
                colors: [],
                kLineInfoClass: 'rise',
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            setColors() {
                if (window.localStorage.theme == 1) {
                    this.colors = ['#db4a39']
                } else {
                    this.colors = ['#188df0']
                }
            },
            loadStockInfo() {
                this.stockInfo = this.stock
                let kLineInfoClassArray = []
                if (this.stockInfo.increase > 0) {
                    kLineInfoClassArray.push('rise')
                } else if (this.stockInfo.increase < 0) {
                    kLineInfoClassArray.push('fall')
                }
                if (window.localStorage.theme == 0) {
                    kLineInfoClassArray.push('grey')
                }
                this.kLineInfoClass = kLineInfoClassArray
            }

        }
    }
</script>

<style lang="scss" scoped>
    .k-line-info {
        width: 100%;
        height: 50px;
        position: absolute;
        top: -5px;
        left: 0px;
    }

    .k-line-info table {
        border-collapse: collapse;
        height: 50px;
    }

    .k-line-info table, th, td {
        font-size: 14px;
    }

    .k-line-info table tr th, .k-line-info table tr td {
        padding: 2px 2px;
        text-align: right;
    }

    .k-line-info table tr th {
        font-weight: normal;
    }

    .k-line-info tr td {
        /*white-space: nowrap;*/
    }

    .k-line-info table.info-table {
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .k-line-info table.increase-table {
        position: absolute;
        top: 0px;
        left: 445px;
    }

    .k-line-info table.price-table {
        position: absolute;
        top: 0px;
        right: 35px;
    }

    .k-line-info table.increase-table tr th {
        text-align: right;
        width: 40px;
    }

    .k-line-info table.increase-table tr td {
        text-align: right;
    }

    .k-line-info table.increase-table tr th, .k-line-info table.increase-table tr td {
        width: 56px;
    }

    .k-line-info table.info-table {
        /*width: 456px;*/
    }

    .k-line-info table.info-table th {
        width: 45px;
    }

    .k-line-info table.info-table td {
        width: 51px;
    }

    .k-line-info table.price-table {
        width: 166px;
    }

    .k-line-info table.price-table tr th, .k-line-info table.price-table tr td {
        padding: 0px 2px;
    }

    .k-line-info table.price-table td {
    }

    .k-line-info table.price-table td.td-stockName {
        text-align: right;
    }

    .k-line-info table.price-table .td-stockCode {
        text-align: right;
    }

    .k-line-info table.price-table .td-price {
        text-align: center;
    }

    .k-line-info table.price-table .td-increase {
    }

    .k-line-info table.price-table .span-stockName {
        font-size: 20px;
    }

    .k-line-info table.price-table .span-stockCode {
        font-size: 20px;
    }

    .k-line-info table.price-table .span-increase {
        font-size: 19px;
    }

    .k-line-info table.price-table .span-price {
        font-size: 19px;
    }

    .k-line-info table.industry-table {
        position: absolute;
        top: 55px;
        right: 32px;
        height: 36px;
    }

    .k-line-info table.industry-table .td-industry {
        width: 60px;
        text-align: left;
        padding: 3px 5px 3px 3px;
    }

    .k-line-info table.industry-table .td-concept {
    }

    // 涨跌
    .k-line-info.rise .info-table span.price {
        color: #eb4436;
    }

    .k-line-info.fall .info-table span.price {
        color: #0e9d58;
    }

    .k-line-info .increase-table span.increase-up {
        color: #eb4436;
    }

    .k-line-info .increase-table span.increase-down {
        color: #0e9d58;
    }

    .k-line-info.grey .increase-table span.increase-up {
        color: #333333;
    }

    .k-line-info.grey .increase-table span.increase-down {
        color: #cccccc;
    }

    .k-line-info.rise .price-table .span-price, .k-line-info.rise .price-table .span-increase {
        color: #eb4436;

    }

    .k-line-info.fall .price-table .span-price, .k-line-info.fall .price-table .span-increase {
        color: #0e9d58;
    }

    // 灰色主题

    .k-line-info.rise.grey .info-table span.price {
        color: #333;
    }

    .k-line-info.fall.grey .info-table span.price {
        color: #ccc;
    }

    .k-line-info.rise.grey .increase-table span.increase-up {
        color: #333;
    }

    .k-line-info.fall.grey .increase-table span.increase-down {
        color: #ccc;
    }

    .k-line-info.rise.grey .price-table .span-price, .k-line-info.rise.grey .price-table .span-increase {
        color: #333;
    }

    .k-line-info.fall.grey .price-table .span-price, .k-line-info.fall.grey .price-table .span-increase {
        color: #ccc;
    }


</style>
