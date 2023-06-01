const preferences = {
    getPreferences: function () {
        let preferences = window.localStorage.preferences
        if (preferences == undefined) {
            this.initPreferences()
        }
        preferences = window.localStorage.preferences
        return JSON.parse(preferences)
    },
    setPreferences: function (preferences) {
        if (preferences) {
            window.localStorage.preferences = JSON.stringify(preferences)
        }
    },
    initPreferences: function () {
        let preferences = {
            kLineZoomLock: true,
            kLineZoomShow: false,
            kLineZoomStart: 0,
            kLineStartDate: '2021-07-10',
            bkShowKLine: true,
            bkShowPie: false,
            bkShowTable: false,
            riseCountLow: 211,
            riseCountHigh: 370,
        }
        window.localStorage.preferences = JSON.stringify(preferences)
        console.log(window.localStorage.kLinePreferences)
    },
    getKLineZoomLock() {
        return this.getPreferences().kLineZoomLock
    },
    getKLineZoomShow() {
        return this.getPreferences().kLineZoomShow
    },
    getKLineZoomStart() {
        return this.getPreferences().kLineZoomStart
    },
    getKLineStartDate() {
        return this.getPreferences().kLineStartDate
    },
    getBkShowKLine() {
        return this.getPreferences().bkShowKLine
    },
    getBkShowPie() {
        return this.getPreferences().bkShowPie
    },
    getBkShowTable() {
        return this.getPreferences().bkShowTable
    },
    getRiseCountLow() {
        return this.getPreferences().riseCountLow
    },
    getRiseCountHigh() {
        return this.getPreferences().riseCountHigh
    }
}

export default preferences
