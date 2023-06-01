import moment from "moment";

const taskExecuteTimeUtil = {
    holidayList: [],
    initHolidayList: function () {
        // 一、元旦：2022年1月1日至3日放假，共3天。
        this.holidayList.push('2022-01-01', '2022-01-02', '2022-01-03')
        // 二、春节：1月31日至2月6日放假调休，共7天。1月29日（星期六）、1月30日（星期日）上班。
        this.holidayList.push('2022-01-31', '2022-02-01', '2022-02-02', '2022-02-03', '2022-02-04', '2022-02-05', '2022-02-06', '2022-02-07')
        // 三、清明节：4月3日至5日放假调休，共3天。4月2日（星期六）上班。
        this.holidayList.push('2022-04-03', '2022-04-04', '2022-04-05')
        // 四、劳动节：4月30日至5月4日放假调休，共5天。4月24日（星期日）、5月7日（星期六）上班。
        this.holidayList.push('2022-04-30', '2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04')
        // 五、端午节：6月3日至5日放假，共3天。
        this.holidayList.push('2022-06-03', '2022-06-04', '2022-06-05')
        // 六、中秋节：9月10日至12日放假，共3天。
        this.holidayList.push('2022-09-10', '2022-09-11', '2022-09-12')
        // 七、国庆节：10月1日至7日放假调休，共7天。10月8日（星期六）、10月9日（星期日）上班。
        this.holidayList.push('2022-10-01', '2022-10-02', '2022-10-03', '2022-10-04', '2022-10-05', '2022-10-06', '2022-10-07')
    },
    getHolidayList: function () {
        return this.holidayList
    },
    isNotExecute: function () {
        return !this.isExecute()
    },
    isExecute: function () {
        let today = moment().format("YYYY-MM-DD")
        if (this.holidayList.indexOf(today) != -1) {
            return false
        }
        // 星期六和星期天不执行
        let weekDay = moment().weekday()
        if (weekDay >= 6) {
            return false
        }
        let hour = moment().hour()
        let minute = moment().minute()
        let second = moment().second()
        if (minute < 10) {
            minute = '0' + minute
        }
        if (second < 10) {
            second = '0' + second
        }
        let currentTimeString = hour + '' + minute
        let showCurrentTimeString = currentTimeString + second
        let currentTime = parseInt(currentTimeString)
        if ((currentTime >= 930 && currentTime <= 1131) || (currentTime >= 1300 && currentTime <= 1501)) {
            // console.info("execute: " + showCurrentTimeString)
            return true
        }
        return false
    }
}

export default taskExecuteTimeUtil
