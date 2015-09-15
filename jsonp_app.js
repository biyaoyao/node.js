var express = require('express');
var chinese = require('./common/utf8');

var app = express();

var port = 3000;


app.get('/api/jsonp.action', function(req, res) {

    console.log('i comming');
    var data = new Object();
    data.A = 0;
    data.B = 1;
    data.C = 2;
    data.D = 3;
    res.write("var data=" + JSON.stringify(data));
    res.end();
});


app.listen(port);
console.log(chinese.toChinese("service running at " + port + " port"));