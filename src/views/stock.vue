<template>
    <div id="app">
        <el-table
                :data="tableData"
                border
                style="width: 100%"
                height="720"
                class="stock-list"
                size="mini"
        >
            <el-table-column
                    fixed
                    prop="serialNumber"
                    label="序号"
                    width="80"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    fixed
                    prop="stockCode"
                    label="代码"
                    align="center"
                    sortable
            >

            </el-table-column>
            <el-table-column
                    fixed
                    label="名称"
                    align="center"
                    sortable
            >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="right">
                        <p> {{ scope.row.stockName }}</p>
                        <div slot="reference" class="name-wrapper">
                            <span class="stock-name">{{ scope.row.stockName }}</span>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="最新"
                    align="center"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    label="涨幅%"
                    prop="increase"
                    align="center"
                    width="85"
                    sortable
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.increase>0" class="increase-up">{{ scope.row.increase }}</span>
                    <span v-else-if="scope.row.increase==0" class="increase">{{ scope.row.increase }}</span>
                    <span v-else class="increase-down">{{ scope.row.increase }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="industry"
                    label="所属行业"
                    align="center"
                    width="100"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="yesterdayClosingPrice"
                    label="昨收"
                    align="center"
                    width="80"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="totalMarketValue"
                    label="总市值"
                    align="center"
                    width="90"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="circulationMarketValue"
                    label="流通市值"
                    align="center"
                    width="100"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="tradeAmount"
                    label="交易金额"
                    align="center"
                    width="100"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="turnoverRate"
                    label="换手%"
                    align="center"
                    width="85"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="volumeRatio"
                    label="量比"
                    align="center"
                    width="85"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="amplitude"
                    label="振幅%"
                    align="center"
                    width="85"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="fiveDayIncrease"
                    label="5日涨幅%"
                    width="105"
                    align="center"
                    sortable
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.fiveDayIncrease>0" class="increase-up">{{ scope.row.fiveDayIncrease }}</span>
                    <span v-else-if="scope.row.fiveDayIncrease==0" class="increase">{{ scope.row.fiveDayIncrease }}</span>
                    <span v-else class="increase-down">{{ scope.row.fiveDayIncrease }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="tenDayIncrease"
                    label="10日涨幅%"
                    width="110"
                    align="center"
                    sortable
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.tenDayIncrease>0" class="increase-up">{{ scope.row.tenDayIncrease }}</span>
                    <span v-else-if="scope.row.tenDayIncrease==0" class="increase">{{ scope.row.tenDayIncrease }}</span>
                    <span v-else class="increase-down">{{ scope.row.tenDayIncrease }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="twentyDayIncrease"
                    label="20日涨幅%"
                    width="115"
                    align="center"
                    sortable
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.twentyDayIncrease>0" class="increase-up">{{ scope.row.twentyDayIncrease }}</span>
                    <span v-else-if="scope.row.twentyDayIncrease==0" class="increase">{{ scope.row.twentyDayIncrease }}</span>
                    <span v-else class="increase-down">{{ scope.row.twentyDayIncrease }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="currentMonthIncrease"
                    label="本月涨幅%"
                    width="115"
                    align="center"
                    sortable
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.currentMonthIncrease>0" class="increase-up">{{ scope.row.currentMonthIncrease }}</span>
                    <span v-else-if="scope.row.currentMonthIncrease==0" class="increase">{{ scope.row.currentMonthIncrease }}</span>
                    <span v-else class="increase-down">{{ scope.row.currentMonthIncrease }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="latelyMonthIncrease"
                    label="近一月涨幅%"
                    width="125"
                    align="center"
                    sortable
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.latelyMonthIncrease>0" class="increase-up">{{ scope.row.latelyMonthIncrease }}</span>
                    <span v-else-if="scope.row.latelyMonthIncrease==0" class="increase">{{ scope.row.latelyMonthIncrease }}</span>
                    <span v-else class="increase-down">{{ scope.row.latelyMonthIncrease }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="currentYearIncrease"
                    label="今年涨幅%"
                    width="115"
                    align="center"
                    sortable
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.currentYearIncrease>0" class="increase-up">{{ scope.row.currentYearIncrease }}</span>
                    <span v-else-if="scope.row.currentYearIncrease==0" class="increase">{{ scope.row.currentYearIncrease }}</span>
                    <span v-else class="increase-down">{{ scope.row.currentYearIncrease }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="latelyYearIncrease"
                    label="近一年涨幅%"
                    width="125"
                    align="center"
                    sortable
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.latelyYearIncrease>0"
                          class="increase-up">{{ scope.row.latelyYearIncrease }}</span>
                    <span v-else-if="scope.row.latelyYearIncrease==0" class="increase">{{ scope.row.latelyYearIncrease }}</span>
                    <span v-else class="increase-down">{{ scope.row.latelyYearIncrease }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="continuousRisingDays"
                    label="连涨天数"
                    align="center"
                    width="100"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="batchNo"
                    label="批次号"
                    align="center"
                    width="150"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center"
                    width="150"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="updateTime"
                    label="修改时间"
                    align="center"
                    width="150"
                    sortable
            >
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        created() {
            this.getStockList()
        }, methods: {
            getStockList() {
                this.$http.post('/stock/getPageList', {
                    pageIndex: 1,
                     pageSize: 12
                }).then(({data}) => {
                    if (data && data.code === 200) {
                        this.tableData = data.data.records
                    } else {
                        this.$message.error(data.msg)
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }

        }
    }
</script>

<style>
    #app {
        /*font-family: Helvetica, sans-serif;*/
        color: #1e2024;
        text-align: center;
        width: 99%;
        margin: 10px auto;
    }

    .el-table th {
        padding: 0.5px 0px;
    }

    .el-table th > .cell {
        font-weight: normal;
    }

    .el-table .cell {
        color: #1e2021;
        font-size: 13px;
    }

    .increase-up {
        color: #eb4436;
    }

    .increase-down {
        color: #0e9d58;
    }



</style>
