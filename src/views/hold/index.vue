<template>
  <div class="hold-stock">
    <table class="summary-table">
      <tr>
        <td>总资产</td>
        <td>497140.34</td>
        <td>总市值</td>
        <td>497047.00</td>
        <td>可用金额</td>
        <td>0.00</td>
      </tr>
      <tr>
        <td>当日涨幅</td>
        <td>-1.0%</td>
        <td>当日盈亏</td>
        <td>4579.58</td>
        <td>持仓盈亏</td>
        <td>-56143.80</td>
      </tr>
    </table>

    <hold-stock-list ref="holdStockList" :user-id="holdStockList.userId"/>
  </div>
</template>

<script>
import HoldStockList from "~/views/components/HoldStockList";

export default {
  name: "index",
  components: {HoldStockList},
  data() {
    return {
      holdStockList: {
        userId: null
      },
      userId: null,
    }
  },
  created() {

  }, mounted() {
    this.userId = this.$route.query.userId
    this.loadUserStockPageList()
  }, methods: {
    loadUserStockPageList() {
      this.$set(this.holdStockList, 'userId', this.userId)
    },
  }

}
</script>

<style scoped>
.hold-stock {
width: 1125px;
  /*border: 1px solid red;*/
  margin: 10px auto;
}

.summary-table {
  border: 1px solid #dddeee;
  border-collapse: collapse;
  margin-bottom: 10px;
}
.summary-table td{
  border: 1px solid #dddeee;
  padding: 16px 16px;
  /*padding: 17px 17px;*/
  /*padding: 20px 20px;*/
  width: 120px;
}

.summary-table td:nth-child(2n+1){
}
.summary-table td:nth-child(2n){
  text-align: right;
}
</style>
