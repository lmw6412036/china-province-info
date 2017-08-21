const AK = "jMfSNIGPYol5THznNtajPjFQ4tszZlao";
let axios = require("axios");
exports.getGPS = function (address) {
    let URL = `http://api.map.baidu.com/geocoder/v2/?callback=renderOption&output=json&address=${encodeURIComponent(address)}&ak=${AK}`;
    return axios.get(URL).then((res) => {
        let data = res.data;
        data = data.replace("renderOption&&renderOption(", "");
        data = data.replace(")", "")
        return JSON.parse(data);
    });
}