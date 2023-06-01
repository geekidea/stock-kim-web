<template>
  <div class="home">
    <el-carousel :interval="3000" type="card" height="350px">
      <el-carousel-item>
          <img class="stock-kim-logo-home" src="https://geekidea.oss-cn-chengdu.aliyuncs.com/stock.kim/stock_kim-white.png"
               alt="stock.kim">
      </el-carousel-item>
      <el-carousel-item>
          <img class="stock-kim-logo-home" src="https://geekidea.oss-cn-chengdu.aliyuncs.com/stock.kim/stock_kim-blue.png"
               alt="stock.kim">
      </el-carousel-item>
      <el-carousel-item>
          <img class="stock-kim-logo-home" src="https://geekidea.oss-cn-chengdu.aliyuncs.com/stock.kim/stock_kim.jpeg"
               alt="stock.kim">
      </el-carousel-item>
    </el-carousel>

    <h1>
      <a href="http://stock.kim">STOCK.KIM</a>
    </h1>
    <h5>
      <a href="http://stock.kim">KEEP IN MONEY</a>
    </h5>
    <h5 class="risk-warning">
      风险提示：本网站不推荐任何股票，仅供学习交流，买卖还需自主决策
    </h5>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.home {
  width: 1000px;
  margin: 0px auto;
  padding-top: 50px;
  text-align: center;
}

.home h1{
  padding-top: 70px;
}

.home .stock-kim-logo-home {
  width: 500px;
}

.home .risk-warning {
  color: red;
}

</style>
