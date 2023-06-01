const theme = {
    HIGHLIGHT: 'highlight',
    getTheme: function () {
        return window.localStorage.theme
    },
    setTheme: function (theme) {
        console.log('setTheme...')
        console.log(theme)
        window.localStorage.theme = theme
        console.log("theme:" + window.localStorage.theme)
    },
    initTheme: function (theme) {
        console.log(theme)
        if (window.localStorage.theme === undefined) {
            window.localStorage.theme = theme
        }
        console.log("theme:" + window.localStorage.theme)
    },
    getQueryVariable: function (variable) {
        let query = window.location.hash;
        let index = query.indexOf('?');
        query = query.substring(index + 1)
        let params = query.split("&");
        for (let i = 0; i < params.length; i++) {
            let pair = params[i].split('=');
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }
}

export default theme
