import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import http from "~/util/http"
import router from '~/router'
import theme from "~/util/theme"
import bossKey from "~/util/boosKey"
import moment from 'moment'
import colorUtil from "~/util/colorUtil"
import preferences from "~/util/preferences"
import taskExecuteTimeUtil from "~/util/taskExecuteTimeUtil";

Vue.use(ElementUI)


Vue.prototype.$http = http
Vue.prototype.$theme = theme
Vue.prototype.$moment = moment
Vue.prototype.$colorUtil = colorUtil
Vue.prototype.$preferences = preferences
Vue.prototype.$taskExecuteTimeUtil = taskExecuteTimeUtil

taskExecuteTimeUtil.initHolidayList()
taskExecuteTimeUtil.isExecute()

// bossKey.init()
// 1:红绿，0：蓝色浅蓝色
theme.initTheme(1)

let echarts = require('echarts')
Vue.prototype.$echarts = echarts

new Vue({
    el: "#app",
    router,
    render: h => h(App)
})
