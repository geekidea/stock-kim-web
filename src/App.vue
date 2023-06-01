<template>
  <div id="app" :class="appClass">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {},
  data() {
    return {
      appClass: null
    }
  },
  created() {
    let clientWidth = document.body.clientWidth
    if (clientWidth < 1000) {
      this.appClass = 'layout-small'
    } else {
      this.appClass = null
    }
  },
  mounted() {
    this.$http.post('/login', {
      username: "admin",
      password: "12345678"
    }).then(({data}) => {
      if (data && data.code === 200) {
        console.log(data)
      } else {
        this.$message.error(data.msg)
      }
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {


  }
}
</script>

<style>
body {
  margin: 0px;
}

#app {
  font-family: Arial, PingFangSC-Regular, Microsoft YaHei, Helvetica, Simsun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1e2024;
}

#app .el-tabs__item.is-top.is-active {
  /*color: #1657d9;*/
}

/** table默认样式 **/
#app .stock-table td .cell .el-link--inner {
  color: #333333;
}

/** table高亮样式 **/
#app .stock-table.highlight td .cell .el-link--inner {
  color: #1657d9;
}

#app .input-with-select .el-input-group__append, .el-input-group__prepend {
  background-color: #fff;
}

#app .input-with-select .el-input-group__append .el-button {
  width: 66px;
}

#app .input-with-select .el-input-group__append .el-icon-search {
  font-size: 16px;
}

#app .el-form-item__content .el-input__inner {
  padding-left: 10px;
  padding-right: 25px;
}


/** 黑色主题 **/
#app.layout-small {
  /*background-color: #1e2024;*/
  background-color: #202124;
}

#app.layout-small .layout-header div,
#app.layout-small .layout-header div,
#app.layout-small .layout-header.layout-small ul,
#app.layout-small .bk-k-line,
#app.layout-small .stock-list,
#app.layout-small .stock-table,
#app.layout-small th,
#app.layout-small td
{
  /*background-color: #1e2024 !important;*/
  background-color: #202124 !important;
}


#app.layout-small th,
#app.layout-small td {
  /*border-bottom: 1px solid #1e2024;*/
  border-bottom: 1px solid #3A3A3A;
}

#app.layout-small .bk-statistics-info {
  /*border-bottom: 1px solid #1e2024;*/
  border-bottom: 1px solid #3A3A3A;
}

#app.layout-small th .cell,
#app.layout-small td .cell {
  color: #cccccc;
  font-size: 12px;
}

</style>


