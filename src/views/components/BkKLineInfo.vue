<template>
  <div class="k-line-info" :class="kLineInfoClass">

<!--    <table class="increase-table">-->
<!--      <tr>-->
<!--        <th>3日</th>-->
<!--        <th>5日</th>-->
<!--        <th>10日</th>-->
<!--        <th>20日</th>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>-->
<!--          <span v-if="bkInfo.i3>0" class="increase-up">{{ bkInfo.i3 }}</span>-->
<!--          <span v-else-if="bkInfo.i3<0" class="increase-down">{{ bkInfo.i3 }}</span>-->
<!--          <span v-else class="increase">{{ bkInfo.i3 }}</span>-->
<!--        </td>-->
<!--        <td>-->
<!--          <span v-if="bkInfo.i5>0" class="increase-up">{{ bkInfo.i5 }}</span>-->
<!--          <span v-else-if="bkInfo.i5<0" class="increase-down">{{ bkInfo.i5 }}</span>-->
<!--          <span v-else class="increase">{{ bkInfo.i5 }}</span>-->
<!--        </td>-->
<!--        <td>-->
<!--          <span v-if="bkInfo.i10>0" class="increase-up">{{ bkInfo.i10 }}</span>-->
<!--          <span v-else-if="bkInfo.i10<0" class="increase-down">{{ bkInfo.i10 }}</span>-->
<!--          <span v-else class="increase">{{ bkInfo.i10 }}</span>-->
<!--        </td>-->
<!--        <td>-->
<!--          <span v-if="bkInfo.i20>0" class="increase-up">{{ bkInfo.i20 }}</span>-->
<!--          <span v-else-if="bkInfo.i20<0" class="increase-down">{{ bkInfo.i20 }}</span>-->
<!--          <span v-else class="increase">{{ bkInfo.i20 }}</span>-->
<!--        </td>-->
<!--      </tr>-->
<!--    </table>-->

    <table class="price-table">
      <tr>
        <td class="td-stockName">
          <span class="span-bkName">{{ bkInfo.bkName }}</span>
        </td>
        <td class="td-stockCode">
          <span class="span-bkCode">{{ bkInfo.bkCode }}</span>
        </td>
      </tr>
      <tr>
        <td class="td-price">
          <span class="span-price">{{ bkInfo.bkPrice }}</span>
        </td>
        <td class="td-increase">
          <span class="span-increase">{{ bkInfo.bkIncrease }}%</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "BkKLineInfo",
  props: {
    bk: {
      type: Object,
      default: () => {
      }
    }
  },
  watch: {
    bk() {
      this.loadBkInfo()
    }
  },
  data() {
    return {
      bkInfo: {},
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
    loadBkInfo() {
      console.log('load bk info...')
      this.bkInfo = this.bk
      console.log(this.bkInfo)
      let kLineInfoClassArray = []
      if (this.bkInfo.increase > 0) {
        kLineInfoClassArray.push('rise')
      } else if (this.bkInfo.increase < 0) {
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
  width: 200px;
}

.k-line-info table.price-table tr th, .k-line-info table.price-table tr td {
  padding: 0px 2px;
}

.k-line-info table.price-table td {
  //border: 1px solid red;
}

.k-line-info table.price-table td.td-stockName {
  text-align: right;
}

.k-line-info table.price-table .td-stockCode {
  text-align: right;
  width: 65px;
}

.k-line-info table.price-table .td-price {
  text-align: right;
}

.k-line-info table.price-table .td-increase {
}

.k-line-info table.price-table .span-bkName {
  font-size: 20px;
}

.k-line-info table.price-table .span-bkCode {
  font-size: 20px;
}

.k-line-info table.price-table .span-increase {
  font-size: 19px;
}

.k-line-info table.price-table .span-price {
  font-size: 19px;
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
