<template>
  <div class="layout-header" :class="headClass">

    <template v-if="layoutWay==1">
      <el-menu
          :default-active="activeIndex"
          router
          class="layout-menu"
          mode="horizontal"
          :router="true"
          @select="handleSelect">
        <template v-for="(menu,index) in menus">
          <el-submenu :index="String(index)" v-if="menu.children && menu.children.length>0">
            <template slot="title">{{ menu.name }}</template>
            <template v-for="(subMenu,k) in menu.children">
              <el-menu-item v-if="subMenu.blank==true">
                <a :href="subMenu.url" target="_blank">
                  {{ subMenu.name }}
                </a>
              </el-menu-item>
              <el-menu-item :index="subMenu.url" :key="k" v-else>{{ subMenu.name }}
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else-if="menu.id==0">
            <a href="http://stock.kim">
              <img class="stock-kim-logo" src="https://geekidea.oss-cn-chengdu.aliyuncs.com/stock.kim/stock-kim-logo.png" alt="">
            </a>
          </el-menu-item>
          <el-menu-item :index="menu.url" v-else>{{ menu.name }}</el-menu-item>
        </template>
      </el-menu>

      <div class="my-profile">
        <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="syncRealData">刷新实时数据</el-dropdown-item>
            <el-dropdown-item command="theme">切换主题</el-dropdown-item>
            <el-dropdown-item command="preferences">设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
    <template v-else>
      <div class="my-profile">
        <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="syncRealData">刷新实时数据</el-dropdown-item>
            <el-dropdown-item command="theme">切换主题</el-dropdown-item>
            <el-dropdown-item command="preferences">设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </template>


    <preferences ref="preferences"/>

  </div>
</template>

<script>
import Preferences from "~/views/components/layout/Preferences";

export default {
  name: "LayoutHeader",
  components: {Preferences},
  data() {
    return {
      activeIndex: this.$router.path,
      layoutWay: 1,
      headClass: null,
      menus: [{
        id: 0,
        name: 'LOGO'
      },{
        id: 1,
        name: '主页',
        url: '/home'
      }, {
        id: 2,
        name: '市场概况',
        url: '/overview'
      }, {
        id: 3,
        name: '行业概况',
        url: '/avg?typeName=industry'
      }, {
        id: 4,
        name: '概念概况',
        url: '/avg?typeName=concept'
      }, {
        id: 11,
        name: '板块',
        url: '/bk'
      }, {
        id: 5,
        name: '市场趋势',
        url: '/quotation'
      }, {
        id: 6,
        name: 'K线',
        url: '/kLine'
      }, {
        id: 8,
        name: '数据同步',
        url: '/sync',
        // children: [{
        //     id: 801,
        //     name: '刷新实时数据',
        //     url: 'http://127.0.0.1:8888/refreshStockRealData',
        //     blank: true
        // }, {
        //     id: 802,
        //     name: '同步K线数据',
        //     url: ''
        // }, {
        //     id: 803,
        //     name: '计算K线涨幅',
        //     url: ''
        // }, {
        //     id: 804,
        //     name: '计算上涨家数',
        //     url: ''
        // }]
      }, {
        id: 9,
        name: 'SQL Query',
        url: '/sqlQuery'
      }, {
        id: 12,
        name: '持仓账户',
        url: '/hold'
      }
      ]
    };
  },
  created() {
    let clientWidth = document.body.clientWidth
    if (clientWidth < 1000) {
      this.headClass = 'layout-small'
    } else {
      this.headClass = null
    }
  },
  mounted() {
    let clientWidth = document.body.clientWidth
    console.log("clientWidth...")
    console.log(clientWidth)
    if (clientWidth < 1000) {
      this.layoutWay = 0
    } else {
      this.layoutWay = 1
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      if (command == 'syncRealData') {
        this.$message.success('刷新实时数据开始')
        this.$http.get('/refreshStockRealData').then(({data}) => {
          if (data && data.code === 200) {
            this.$message.success('刷新实时数据成功')
          } else {
            this.$message.error(data.msg)
          }
        })
      } else if (command == 'theme') {
        if (window.localStorage.theme == 1) {
          window.localStorage.theme = 0
        } else {
          window.localStorage.theme = 1
        }
        window.location.reload()
      } else if (command == 'preferences') {
        // 打开对话框
        this.$refs.preferences.show()
      }
    }
  }
}
</script>

<style scoped>
.layout-header {
  position: relative;
}

.layout-menu {
  /*border: 1px solid red;*/
  padding-left: 15px;
}

.my-profile {
  position: absolute;
  top: 0px;
  right: 15px;
}

.el-dropdown-link {
  display: block;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown-menu__item {
}

.el-menu {
  height: 50px;
}

.el-menu--horizontal > .el-menu-item {
  color: #333333;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  padding: 0px 12px;
}

.el-menu--horizontal > .el-submenu {
  height: 50px;
  line-height: 50px;
}

.k-kine-zoom-dialog {
}


</style>

<style>
.layout-header .el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 50px;
  line-height: 50px;
}

.layout-header .k-kine-zoom-dialog .el-form .el-form-item__label {
  width: 130px;
  text-align: left;
}


.layout-header .stock-kim-logo{
  width: 200px;
  height: 46px;
}

</style>
