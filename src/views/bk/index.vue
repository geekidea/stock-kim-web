<template>
  <div class="bk-list">

    <el-form :inline="true" :model="bkForm" class="bk-form">
      <el-form-item label="" style="width: 100px;">
        <el-select v-model="bkForm.bkOpportunity" placeholder="板块机会" clearable
                   @change="handleSearch"
                   @clear="handleSearch"
        >
          <el-option label="板块机会" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" style="width: 100px;">
        <el-select v-model="bkForm.bkIAvg" placeholder="范围涨幅" clearable
                   @change="handleSearch"
                   @clear="handleSearch"
        >
          <el-option label="多方势" value="1"></el-option>
          <el-option label="空方势" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" style="width: 100px;">
        <el-select v-model="bkForm.bkStrategy" placeholder="板块策略" clearable
                   @change="handleSearch"
                   @clear="handleSearch"
        >
          <el-option label="多头趋势" value="rise"></el-option>
          <el-option label="空头趋势" value="fall"></el-option>
          <el-option label="震荡趋势" value="flat"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" style="width: 100px;">
        <el-select v-model="bkForm.bkType" placeholder="板块类型" clearable
                   @change="handleSearch"
                   @clear="handleSearch"
        >
          <el-option label="自定义" value="0"></el-option>
          <el-option label="行业" value="1"></el-option>
          <el-option label="概念" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" style="width: 100px;">
        <el-input v-model="bkForm.bkCount" placeholder="板块数量" clearable @clear="handleSearch"
                  @keyup.enter.native="handleSearch"></el-input>
      </el-form-item>
      <!--      <el-form-item label="">-->
      <!--        <el-input v-model="bkForm.keyword" placeholder="请输入板块代码\板块名称" style="width: 360px;" clearable-->
      <!--                  @clear="handleSearch"-->
      <!--                  @keyup.enter.native="handleSearch"></el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item>-->
      <!--        <el-button type="primary" @click="handleSearch">查询</el-button>-->
      <!--      </el-form-item>-->
      <!--      <br/>-->
      <el-form-item>
        <div>
          <el-input placeholder="请输入内容"
                    v-model="bkForm.keyword"
                    class="input-with-select"
                    style="width: 495px;"
                    clearable
                    @clear="handleSearch"
                    @keyup.enter.native="handleSearch">
            <el-select v-model="bkForm.searchType" slot="prepend" placeholder="请选择" style="width: 90px;">
              <el-option label="板块" value="1"></el-option>
              <el-option label="领涨股" value="2"></el-option>
              <el-option label="个股" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
      </el-form-item>
    </el-form>


    <industry-concept-table ref="industryConceptTable"
                            :page-param="pageParam.industryConcept"/>

  </div>
</template>

<script>
import IndustryConceptTable from "~/views/components/IndustryConceptTable";

export default {
  name: "index",
  components: {IndustryConceptTable},
  data() {
    return {
      tableData: [],
      pageParam: {
        industryConcept: {
          pageIndex: 1
        }
      },
      bkForm: {
        bkOpportunity: null,
        bkIAvg: null,
        bkStrategy: null,
        bkType: null,
        bkCount: null,
        searchType: '1',
        keyword: null,
      }
    }
  },
  created() {

  },
  mounted() {
    this.getIndustryConceptPageList()
    document.title = '板块'
  },
  methods: {
    getIndustryConceptPageList() {
      let pageParam = {
        pageIndex: 1,
        filter: false
      }
      this.$set(this.pageParam, 'industryConcept', pageParam)
    },
    handleSearch() {
      let pageParam = {
        pageIndex: 1,
        filter: false,
        bkOpportunity: this.bkForm.bkOpportunity,
        bkIAvg: this.bkForm.bkIAvg,
        bkStrategy: this.bkForm.bkStrategy,
        bkType: this.bkForm.bkType,
        bkCount: this.bkForm.bkCount,
        searchType: this.bkForm.searchType,
        keyword: this.bkForm.keyword,
      }
      if (this.bkForm.bkIAvg == 1) {
        pageParam.order = {
          column: 'i_avg',
          asc: false
        }
      } else if (this.bkForm.bkIAvg == 0) {
        pageParam.order = {
          column: 'i_avg',
          asc: true
        }
      }

      this.$set(this.pageParam, 'industryConcept', pageParam)
    }

  }
}
</script>

<style scoped>
.bk-form {
  /*border: 1px solid red;*/
  /*width: 1000px;*/
  /*margin: 0px auto;*/
  margin-left: 15px;
}

.bk-form .el-form-item {
  margin: 10px 10px 10px 0px;
}

.input-with-select {

}


</style>

