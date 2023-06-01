<template>
  <div class="layout-app">
    <el-container>
      <el-header class="layout-header">
        <layout-header/>
      </el-header>
      <el-main class="layout-main" :class="layoutMainClass">
        <keep-alive>
          <router-view v-if="this.$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!this.$route.meta.keepAlive"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import LayoutHeader from "~/views/components/layout/LayoutHeader";

export default {
  name: "index",
  components: {LayoutHeader},
  data() {
    return {
      layoutSmall: false,
      layoutMainClass: null
    }
  },
  created() {
    let clientWidth = document.body.clientWidth
    console.log("yyyyclientWidth...")
    console.log(clientWidth)
    if (clientWidth < 1000) {
      this.layoutMainClass = 'layout-small'
      this.layoutSmall = true
    } else {
      this.layoutMainClass = null
      this.layoutSmall = false
    }
  }
}
</script>

<style scoped>
.layout-app {
  /*border: 1px solid red;*/
}

.el-header {
  height: 50px !important;
  padding: 0px;
}

.layout-main {
  padding: 5px 25px;
  /*border: 1px solid red;*/
}

.layout-main.layout-small {
  padding: 5px 0px;
}
</style>

<style>
.el-tabs__item {
  font-weight: normal;
  font-size: 15px;
}
</style>
