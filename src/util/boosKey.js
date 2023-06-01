const bossKey = {
    init: function () {
        console.log("enable boss key")
        document.body.onkeyup = function (e) {
            let keyCode = e.keyCode
            if (keyCode == 32) {
                window.localStorage.theme = 0
                console.log("theme:" + window.localStorage.theme)
                let address = window.location.href
                let index = address.indexOf('theme=1')
                if (index != -1) {
                    address = address.replaceAll('theme=1', 'theme=0')
                }
                console.log(address)
                window.location.replace(address)
                window.location.reload()
            } else if (keyCode == 72) {
                window.localStorage.theme = 1
                console.log("theme:" + window.localStorage.theme)
                let address = window.location.href
                let index = address.indexOf('theme=0')
                if (index != -1) {
                    address = address.replaceAll('theme=0', 'theme=1')
                }
                console.log(address)
                console.log("bossKey theme")
                console.log(window.localStorage.theme)
                window.location.replace(address)
                window.location.reload()
            }
        }
    }
}

export default bossKey
