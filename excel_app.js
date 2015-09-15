var express = require('express');
var app = express();
var path = require('path');
var ejs = require('ejs');
var mysql = require('./common/mysql');
var excel = require('./common/excel');
var session = require('express-session');
var connect = require('connect');
app.set('view engine', 'ejs');
app.engine('.ejs', ejs.__express);
var port = 8888;
app.use(express.static(path.join(__dirname, 'public')));
app.set('public', path.join(__dirname, 'public'));
//page
app.get('/', function(req, res) {
    res.render('login');

});
app.get('/page/alluser.action', function(req, res) {
    res.render('alluser');
    console.log('/page/alluser.action');
});
app.get('/page/register.action', function(req, res) {
    res.render('register', {});
    console.log('/page/register.action');
});
app.get('/page/login.action', function(req, res) {

    res.cookie('cookiename', 'i am a cookie', {
        maxAge: 200000,
        httpOnly: true,
        path: '/'
    });
    res.render('login', {});


    console.log('/page/login.action');
});
app.get('/page/commodity.action', function(req, res) {
    //console.log('/page/commodity.action');
    /*商品展示*/
    mysql.commodity(res);

});

//api
/*注册*/
app.get('/api/register.action', function(req, res) {
    console.log('/api/register.action');

    var user_name = req.query.user_name,
        province = req.query.province,
        city = req.query.city,
        tel = req.query.phone,
        password = req.query.password,
        cid = req.query.cid;
    mysql.register(res, user_name, password, tel, cid, province, city);
    /* res.write('cdfdeafc');
	 res.end();*/
});
/*登录*/
app.get('/api/login.action', function(req, res) {
    console.log('/api/login.action' + res.send('session:' + req.session.sessname));

    var tel = req.query.phone,
        password = req.query.password;

    mysql.login(res, tel, password);
    /* res.write('cdfdeafc');
	 res.end();*/
});
app.get('/api/getUser.action', function(req, res) {

    mysql.getAllData(res);
});
/*调用webservice*/

app.get('/api/getQuestionList.action', function(req, res) {
    console.log('/api/getQuestionList.action');
    //webService.getQuestionList(res, app);
});

//
/*session*/

//excel

app.get('/api/getExcel.action', function(req, res) {
    console.log('/api/getExcel.action');
    var src = req.query.src;
    excel.getExcel(req, res,src);
});
app.get('/api/setExcel.action', function(req, res) {
    console.log('/api/setExcel.action');
    excel.setExcel(req, res);
});


//10.221.236.64
app.listen(port, '10.221.236.64');

console.log('service starting at ' + port + ' port');