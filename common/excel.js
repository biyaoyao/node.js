var xlsx = require("node-xlsx");
var BufferHelper = require('bufferhelper');
var mysql = require('./mysql');
var fs = require('fs');

function getExcel(req, res,src) {
    var list = xlsx.parse('./public/excel/excel.xls');
    var buffer = new BufferHelper();
    buffer.concat(list);
    var buf = buffer.toBuffer();

    mysql.insertExcel(req, res, buf)


}

function setExcel(req, res) {
    console.log("comming!");

    var data = [{
        name: "user1",
        data: [
            [1, 2, 3, 4],
            ['姓名', '性别', '年龄', '出生日期'],
            ['闭耀尧1', '男', 22, '1992-01-05'],
            ['闭耀尧1', '男', 22, '1992-01-05']
        ]
    }, {
        name: "user2",
        data: [
            [1, 2, 3, 4],
            ['姓名', '性别', '年龄', '出生日期'],
            ['闭耀尧2', '男', 22, '1992-01-05'],
            ['闭耀尧2', '男', 22, '1992-01-05']
        ]
    }];
    var buffer = xlsx.build(data);

    //var file = xlsx.build(obj);
    //console.log(buffer);
    fs.writeFileSync('./public/excel/user.xls', buffer, 'binary');
    res.end('success!');

}
exports.getExcel = getExcel;
exports.setExcel = setExcel;
//console.log();