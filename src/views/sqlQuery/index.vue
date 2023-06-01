<template>
    <div class="sql-query">
        <ace-editor ref="aceEditor" @search="search"/>
        <div class="search-container">
            <el-button class="search-button" type="primary" size="small" @click="getValue">查 询</el-button>
        </div>
        <!--        <stock-dynamic-table :queryParam="componentData.queryParam"/>-->
        <stock-custom-dynamic-table :queryParam="componentData.queryParam"/>
    </div>
</template>

<script>
    import AceEditor from "~/views/components/AceEditor";
    import StockDynamicTable from "~/views/components/StockDynamicTable";
    import StockCustomDynamicTable from "~/views/components/StockCustomDynamicTable";

    export default {
        name: 'index',
        components: {StockCustomDynamicTable, StockDynamicTable, AceEditor},
        data() {
            return {
                componentData: {
                    queryParam: {}
                }
            };
        },
        methods: {
            //获取编辑器中的值
            getValue() {
                let value = this.$refs.aceEditor.getValue()
                let param = {
                    sql: value
                }
                this.$set(this.componentData, 'queryParam', param)
            },
            search() {
                this.getValue()
            }
        },
        mounted() {
            this.getValue()
        }
    };
</script>

<style scoped>
    .sql-query {
        width: 100%;
    }

    .search-container {
        padding: 10px 0px;
        width: 100%;
        margin: 0px auto;
    }

    .search-container .search-button {
        width: 100%;
        font-size: 13px;
    }

</style>
