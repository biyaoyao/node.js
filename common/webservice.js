function getQuestionList() {
    console.error(111);
    var nodegrass = require('nodegrass');
    nodegrass.get("http://203.195.150.220/", function(data, status, headers) {
        console.log(status);
        console.log(headers);
        console.log(data);
    }, 'gbk').on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

exports.getQuestionList = getQuestionList;