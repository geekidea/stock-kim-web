<template>
    <div class="stock-custom-dynamic-table">
        <table id="customTable" class="stock-custom-dynamic-table">

        </table>

        <div id="customTablePopover">
            <img src="http://image.sinajs.cn/newchart/daily/n/sh600011.gif" alt="">

        </div>

        <p class="load" v-if="showLoad">
            <i class="el-icon-loading"></i>
        </p>

    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        name: "StockCustomDynamicTable",
        props: {
            queryParam: {}
        },
        watch: {
            queryParam() {
                console.log("SQL:")
                console.log(this.queryParam.sql)
                // console.log(this.queryParam)
                this.sql = this.queryParam.sql
                this.getStockList()
            }
        },
        mounted() {
            // this.sql = 'select *\n' +
            //     'from custom_k_line\n' +
            //     'where type = 9 limit 100'
            // this.getStockList()
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
                sql: null,
                showLoad: false
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
                this.showLoad = true
                let _this = this
                let param = {
                    sql: this.sql
                }
                this.$http.post('/stock/getStockDynamicList', param).then(({data}) => {
                    console.log(data)
                    if (data && data.code === 200) {
                        if (!data.data) {
                            return
                        }
                        this.tableColumns = data.data.columns
                        let tableTypes = data.data.types
                        this.tableData = data.data.data
                        this.total = Number(data.data.total)
                        let tableColumns = this.tableColumns
                        let thead = '<tr>';
                        thead += '<th class="serial-number"></th>';
                        this.tableColumns.forEach((item, i) => {
                            thead += '<th>' + item + '</th>';
                        })
                        thead += '</tr>';
                        $('#customTable').empty()
                        $('#customTable').append(thead)
                        this.tableData.forEach((item, i) => {
                            let tr = '<tr>';
                            tr += '<td class="serial-number">' + (i + 1) + '</td>';
                            let index = 0
                            for (let key in item) {
                                let column = tableColumns[index]
                                let data = item[column]
                                let type = tableTypes[index]
                                data = _this.cellDataFormat(data)
                                let align = _this.cellAlign(type)
                                let className = null
                                let dataEle = null
                                if (column == 'stock_name' || column == 'line_name') {
                                    className = 'class="stock-name"'
                                    dataEle = 'data="' + (item.stock_code || item.line_Code) + '"'
                                }
                                tr += '<td align="' + align + '" ' + className + ' ' + dataEle + '>' + data + '</td>';
                                index++
                            }
                            tr += '</tr>';
                            $('#customTable').append(tr)
                        })

                        // 注册事件
                        $("#customTable .stock-name").mouseover(function (e) {
                            $("#customTablePopover").show()
                            let ele = e.target
                            // ele.offsetHeight=35
                            // ele.offsetWidth=97
                            // ele.offsetLeft= 329
                            // ele.offsetTop= 39
                            // pageX: 392
                            // pageY: 451
                            let width = $(this).width()
                            let offsetLeft = ele.offsetLeft + ele.offsetWidth
                            let offsetTop
                            if (ele.offsetTop < 50) {
                                offsetTop = ele.offsetTop - 36
                            } else {
                                offsetTop = ele.offsetTop - 56
                            }
                            $("#customTablePopover").css('top', offsetTop).css('left', offsetLeft)
                            let stockCode = $(this).attr('data')
                            let market = null
                            if (stockCode) {
                                if (stockCode.substring(0, 1) == '6') {
                                    market = 'sh'
                                } else {
                                    market = 'sz'
                                }
                            }
                            let url = 'http://image.sinajs.cn/newchart/daily/n/' + market + stockCode + '.gif?_=' + new Date().getTime()
                            $("#customTablePopover img").attr('src', url)

                        })

                        $("#customTable .stock-name").mouseout(function (e) {
                            $("#customTablePopover").hide()
                        })

                        this.showLoad = false
                    } else {
                        this.$message.error(data.msg)
                        this.showLoad = false
                    }
                }).catch((error) => {
                    console.log(error);
                    this.showLoad = false
                })
            },
            cellAlign(type) {
                if (type == 'BIGINT' || type == 'INT' || type == 'DECIMAL') {
                    return 'right'
                } else if (type == 'VARCHAR' || type == 'DATETIME') {
                    return 'center'
                } else {
                    return 'left'
                }
            },
            cellDataFormat(data) {
                if (data == undefined || data == null || data == 'null') {
                    return ''
                } else {
                    return data
                }
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

<style lang="scss">
    .stock-custom-dynamic-table {
        padding-top: 5px;
        overflow: auto;
        position: relative;
    }

    .stock-custom-dynamic-table table {
        border-collapse: collapse;
    }

    .stock-custom-dynamic-table table, .stock-custom-dynamic-table th, .stock-custom-dynamic-table td {
        border: 1px solid #dddddd;
        /*color: red;*/
        font-family: Microsoft YaHei;
        font-size: 13px;
        /*color: #1e2024;*/
        color: #000000;
    }

    .stock-custom-dynamic-table table tr th, .stock-custom-dynamic-table table tr td {
        padding: 8px 12px
    }

    .stock-custom-dynamic-table table tr th {
        font-weight: normal;
        background-color: rgb(235, 235, 235);
        padding: 10px 12px
    }

    .stock-custom-dynamic-table tr td {
        white-space: nowrap;
    }

    .stock-custom-dynamic-table tr .serial-number {
        background-color: rgb(235, 235, 235);
    }

    #customTablePopover {
        position: absolute;
        z-index: 999;
        top: 0px;
        left: 426px;
        /*border: 1px solid red;*/
        width: 560px;
        height: 330px;
        background-color: #fff;
        display: none;
        padding: 15px 0px;
        border: 1px solid #eeeeee;
    }

    .stock-custom-dynamic-table p.load {
        position: absolute;
        top: 100px;
        z-index: 999;
        width: 100%;
        font-size: 36px;
        font-weight: bold;
        color: #cccccc;

    }
</style>
