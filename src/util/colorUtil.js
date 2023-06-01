const colorUtil = {
    getColors: function (start, end, steps, gamma) {
        let i, j, ms, me, output = [], so = [];
        gamma = gamma || 1;
        let normalize = function (channel) {
            return Math.pow(channel / 255, gamma);
        };
        start = this.parseColor(start).map(normalize);
        end = this.parseColor(end).map(normalize);
        for (i = 0; i < steps; i++) {
            ms = i / (steps - 1);
            me = 1 - ms;
            for (j = 0; j < 3; j++) {
                so[j] = this.pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
            }
            output.push('#' + so.join(''));
        }
        return output;
    },
    parseColor: function (hexStr) {
        return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) {
            return 0x11 * parseInt(s, 16);
        }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
            return parseInt(s, 16);
        })
    },
    pad: function (s) {
        return (s.length === 1) ? '0' + s : s;
    }
}

export default colorUtil
