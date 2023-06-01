<template>
    <div class="stock-dynamic-table">
        <el-table
                :data="tableData"
                style="width: 100%"
                class="stock-table"
                size="mini"
                border
                @sort-change="handleSortChange"
        >
            <el-table-column
                    label=""
                    width="60"
                    align="center"
                    fixed
            >
                <template slot-scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>

            <template v-for="(column,index) in tableColumns">
                <el-table-column
                        v-if="column == 'stock_code'||column == 'line_code'"
                        :prop="column"
                        :label="column"
                        align="center"
                        sortable
                        fixed
                        width="120"
                        :class-name="stockCodeNameClass"
                >
                    <template slot-scope="scope">
                        <el-link type="primary" class="stock-link"
                                 :href="'https://www.iwencai.com/unifiedwap/result?w='+scope.row[column]"
                                 target="_blank">{{scope.row[column]}}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        v-else-if="column == 'stock_name'||column == 'line_name'"
                        :prop="column"
                        :label="column"
                        align="center"
                        fixed
                        sortable
                        width="120"
                        :class-name="stockCodeNameClass"
                >
                    <template slot-scope="scope">
                        <el-popover
                                popper-class="stock-name-popover"
                                placement="right"
                                @show="handleShowImage(scope.row.line_code||scope.row.stock_code)"
                                trigger="hover">

                            <el-tabs class="image-tab" v-model="imageTabActiveName" @tab-click="handleImageTabClick"
                                     :id="scope.row.line_code||scope.row.stock_code">
                                <el-tab-pane label="分时" name="min"
                                             :data-id="scope.row.line_code||scope.row.stock_code"></el-tab-pane>
                                <el-tab-pane label="日K" name="daily"
                                             :data-id="scope.row.line_code||scope.row.stock_code"></el-tab-pane>
                                <el-tab-pane label="周K" name="weekly"
                                             :data-id="scope.row.line_code||scope.row.stock_code"></el-tab-pane>
                                <el-tab-pane label="月K" name="monthly"
                                             :data-id="scope.row.line_code||scope.row.stock_code"></el-tab-pane>
                            </el-tabs>

                            <img class="popover-image" :src="stockCodeImage" :alt="scope.row[column]">
                            <el-link type="primary" class="stock-link" slot="reference"
                                     :href="'http://stockpage.10jqka.com.cn/'+scope.row.line_code||scope.row.stock_code"
                                     target="_blank">{{scope.row[column]}}
                            </el-link>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                        v-else-if="column == 'increase'"
                        prop="increase"
                        label="increase"
                        align="center"
                        sortable
                        width="100"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.increase>0" :class="increaseUpClass">{{ scope.row.increase }}%</span>
                        <span v-else-if="scope.row.increase<0"
                              :class="increaseDownClass">{{ scope.row.increase }}%</span>
                        <span v-else-if="scope.row.suspensionYn==1" class="increase">停牌</span>
                        <span v-else class="increase">{{ scope.row.increase }}%</span>

                    </template>
                </el-table-column>
                <el-table-column
                        v-else-if="column == 'industry'"
                        prop="industry"
                        label="industry"
                        align="center"
                        sortable
                        width="100"
                >
                    <template slot-scope="scope">
                        <el-link type="primary" class="stock-link"
                                 :href="'https://www.iwencai.com/unifiedwap/result?w='+scope.row.industry+'，非ST，非科创'"
                                 target="_blank">{{scope.row.industry}}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        v-else-if="column == 'batch_no'||column == 'real_batch_no'"
                        :prop="column"
                        :label="column"
                        align="center"
                        sortable
                        width="130"
                >
                    <template slot-scope="scope">
                        {{scope.row[column]}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-else-if="column == 'auto_sort'"
                        :prop="column"
                        :label="column"
                        align="center"
                        sortable
                        width="170"
                >
                    <template slot-scope="scope">
                        {{scope.row[column]}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-else
                        :prop="column"
                        :label="column"
                        align="center"
                        sortable
                >
                    <template slot-scope="scope">
                        {{scope.row[column]}}
                    </template>
                </el-table-column>
            </template>
        </el-table>

    </div>
</template>

<script>
    import stock from "~/views/stock";

    export default {
        name: "StockDynamicTable",
        props: {
            queryParam: {}
        },
        watch: {
            queryParam() {
                console.log("watch")
                console.log(this.queryParam)
                this.getStockList()
            }
        },
        data() {
            return {
                tableColumns: [],
                tableData: [],
                stockCodeNameClass: 'stock-code-name',
                increaseUpClass: 'increase-up',
                increaseDownClass: 'increase-down',
                total: 0,
                stockCodeImage: null,
                imageTabActiveName: 'daily',
            }
        },
        created() {
            if (window.localStorage.theme == 1) {
                this.increaseUpClass = 'increase-up'
                this.increaseDownClass = 'increase-down'
                this.stockCodeNameClass = 'stock-code-name'
            } else {
                this.increaseUpClass = 'increase-up-gray'
                this.increaseDownClass = 'increase-down-gray'
                this.stockCodeNameClass = 'stock-code-name-gray'
            }
        }, methods: {
            getStockList() {
                this.$http.post('/stock/getStockDynamicList', this.queryParam).then(({data}) => {
                    console.log('data...')
                    console.log(data)
                    if (data && data.code === 200) {
                        this.tableColumns = data.data.columns
                        this.tableData = data.data.data
                        this.total = Number(data.data.total)
                    } else {
                        this.$message.error(data.msg)
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            dateFormat(row, column) {
                let date = row[column.property];
                if (date == undefined) {
                    return ''
                }
                return this.$moment(date).format("YYYY-MM-DD")
            },
            handleSortChange(column) {
                console.log("handleSortChange")
                console.log(column)
                console.log(column.prop)
                console.log(column.order)
                // ascending
                // descending
                let asc = column.order == 'ascending'
                this.pageParam.order = {
                    column: column.prop,
                    asc: asc
                }
                console.log(this.pageParam)
                this.getStockList(this.pageParam)
            },
            handleShowImage(stockCode, type) {
                this.imageTabActiveName = 'daily'
                if (!type) {
                    type = 'daily'
                }
                let market
                if (stockCode.indexOf('6') == 0) {
                    market = 'sh'
                } else {
                    market = 'sz'
                }
                let src = 'http://image.sinajs.cn/newchart/' + type + '/n/' + market + stockCode + '.gif'
                this.stockCodeImage = src
            },
            handleImageTabClick(tab) {
                let name = tab.name
                let stockCode = tab.$el.dataset.id
                console.log(stockCode)
                this.handleShowImage(stockCode, name)
            }
        }
    }
</script>

<style>
    .stock-dynamic-table {
        clear: both;
        width: 100%;
        margin: 0px auto;
        /*border: 1px solid red;*/
    }

    .stock-dynamic-table .stock-table {
        /*border: 1px solid red;*/
    }

    .stock-dynamic-table .stock-table .cell {
        color: #333;

    }

    .stock-dynamic-table .stock-table th {
        padding: 0.5px 0px;
    }

    .stock-dynamic-table .stock-table th .cell {
        font-size: 13.5px;
        font-weight: normal;
    }

    .stock-dynamic-table .stock-table td .cell {
        font-size: 14px;
        padding: 3.6px 0px;
    }

    .stock-dynamic-table .stock-table .increase-up {
        color: #eb4436;
    }

    .stock-dynamic-table .stock-table .increase-down {
        color: #0e9d58;
    }

    .stock-dynamic-table .stock-table td.stock-code-name .cell {
        color: #1B7BDE;
    }

    .stock-dynamic-table .stock-table td.stock-code-name-gray .cell {
        color: #333;
    }

    .stock-dynamic-table .stock-table .increase-up-gray {
        color: #333;
    }

    .stock-dynamic-table .stock-table .increase-down-gray {
        color: #ccc;
    }

    .stock-dynamic-table .stock-page {
        /*border: 1px solid red;*/
        text-align: center;
        margin-top: 12px;
        font-size: 13px;
    }

    .stock-name-popover {
        /*border: 1px solid red;*/
    }

    .stock-name-popover .popover-image {
        width: 545px;
        height: 300px;
        /*width: 654px;*/
        /*height: 320px;*/
        /*border: 1px solid red;*/
    }

    .stock-dynamic-table .stock-table .stock-link {
        font-weight: normal;
    }

    .image-tab .el-tabs__item {
        font-weight: normal;
        text-align: center;
    }

</style>
