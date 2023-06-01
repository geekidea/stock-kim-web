<template>
  <el-dialog class="k-kine-zoom-dialog" title="系统设置" :visible.sync="dialogFormVisible"
             width="50%">

    <el-tabs tab-position="left" style="height: 260px;" v-model="preferencesTabActiveName"
             @tab-click="handlePreferencesTabClick">
      <el-tab-pane label="K线设置" name="kLine">
        <el-form>
          <el-form-item label="KLine Zoom Lock">
            <el-switch
                v-model="preferences.kLineZoomLock">
            </el-switch>
          </el-form-item>
          <el-form-item label="KLine Zoom Show">
            <el-switch
                v-model="preferences.kLineZoomShow">
            </el-switch>
          </el-form-item>
          <el-form-item label="KLine Zoom Start">
            <el-input-number v-model="preferences.kLineZoomStart" :min="0" :max="100"
                             autocomplete="off"></el-input-number>
          </el-form-item>
          <el-form-item label="KLine StartDate">
            <el-date-picker
                v-model="preferences.kLineStartDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="板块设置" name="bk">
        <el-form>
          <el-form-item label="Show KLine">
            <el-switch
                v-model="preferences.bkShowKLine">
            </el-switch>
          </el-form-item>
          <el-form-item label="Show Pie">
            <el-switch
                v-model="preferences.bkShowPie">
            </el-switch>
          </el-form-item>
          <el-form-item label="Show Table">
            <el-switch
                v-model="preferences.bkShowTable">
            </el-switch>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="市场趋势设置" name="market">
        <el-form :inline="true">
          <el-form-item label="Rise Count">
            <el-input-number size="small" v-model="preferences.riseCountLow" controls-position="right" :min="1"
                             :max="3000"
                             style="width: 150px"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-input-number size="small" v-model="preferences.riseCountHigh" controls-position="right" :min="1"
                             :max="3000"
                             style="width: 150px"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="Market Score">

          </el-form-item>
          <el-form-item label="Rise Limit">

          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handlePreferences">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: "Preferences",
  props: {},
  watch: {},
  data() {
    return {
      dialogFormVisible: false,
      preferencesTabActiveName: 'kLine',
      preferences: {
        kLineZoomLock: null,
        kLineZoomShow: null,
        kLineZoomStart: null,
        kLineStartDate: null,
        bkShowKLine: null,
        bkShowPie: null,
        bkShowTable: null,
        riseCountLow: null,
        riseCountHigh: null,
      }
    }
  },
  created() {
    this.preferences = this.$preferences.getPreferences()
    console.log('preferences...')
    console.log(this.preferences)
  },
  mounted() {
    let activeName = window.localStorage.preferencesTabActiveName
    if (activeName) {
      this.preferencesTabActiveName = activeName
    }
  },
  methods: {
    show() {
      this.dialogFormVisible = true
    },
    handlePreferencesTabClick(tab) {
      let name = tab.name
      // 记录当前选项卡，下次默认打开上次的选项卡
      window.localStorage.preferencesTabActiveName = name
    },
    handlePreferences() {
      console.log(this.preferences)
      this.$preferences.setPreferences(this.preferences)
      this.dialogFormVisible = false
      window.location.reload()
    }
  }
}
</script>

<style scoped>

.k-kine-zoom-dialog {
}

</style>

<style>
.k-kine-zoom-dialog .el-form .el-form-item__label {
  width: 130px;
  text-align: left;
}
</style>
