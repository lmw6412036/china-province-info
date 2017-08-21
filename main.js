let path = require("path");
/*更新版本号*/
let autoVersion = require("auto-version");//返回一个generator函数
let co = require('hprose').co;
let thunkify = require('hprose').thunkify;
let fs = require("fs");
let file = path.join(__dirname, "./package.json");
co(autoVersion(file));

let {getGPS} = require("./lib/util");

let provinceArr = ["广东省", "广西省", "云南省", "黑龙江省", "吉林省", "辽宁省", "内蒙古自治区", "新疆维吾尔族自治区", "河北省", "北京市", "天津市", "陕西省", "山西省", "山东省", "河南省", "安徽省", "浙江省", "江苏省", "湖北省", "上海市", "重庆市", "四川省", "湖南省", "江西省", "福建省", "贵州省", "海南省", "西藏自治区", "青海省", "甘肃省", "宁夏回族自治区", "海南省", "台湾省", "香港特别行政区", "澳门特别行政区"];

function getProvincePromise(address) {
    return new Promise(function (resolve, reject) {
        getGPS(address).then((res) => {
            //console.log("2", res);
            resolve(Object.assign({}, res.result.location, {province: address}))
        })
    })
}


co(function* () {
    let ret = [];
    for (let i = 0; i < provinceArr.length; i++) {
        let info = yield getProvincePromise(provinceArr[i]);
        ret.push(info);
    }
    yield thunkify(fs.writeFile)("./lib/data.js", `module.exports=${JSON.stringify(ret, null, 4)}`)
});



