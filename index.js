var express = require('express');
var app = express();
var path = require('path');
var ejs = require('ejs');
var mysql = require('./common/mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.engine('.ejs', ejs.__express);
var port = 8000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('public', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
//page
app.use(cookieParser());
app.use(session({
    secret: '12345',
    name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {
        maxAge: 2000000
    }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));


app.get('/', function(req, res) {

    console.log(11);
    if (req.session.user_id != undefined) {
        mysql.commodity(req, res);

    } else {
        res.render('login');
    }

});
app.get('/page/home.action', function(req, res) {
    res.render('index');
});
app.get('/page/alluser.action', function(req, res) {
    res.render('alluser');

});
app.get('/page/register.action', function(req, res) {
    res.render('register');

});
app.get('/page/login.action', function(req, res) {

    if (req.session.user_id != undefined) {
        mysql.commodity(req, res);

    } else {
        res.render('login');
    }


});
/*商品*/
app.get('/page/commodity.action', function(req, res) {

    console.log(req.session.user_id);
    if (req.session.user_id != undefined) {
        mysql.commodity(req, res);

    } else {
        res.render('login');
    }


});
//购物车
app.get('/page/carts.action', function(req, res) {

    console.log(req.session.user_id);
    if (req.session.user_id != undefined) {
        mysql.carts(req, res);

    } else {
        res.render('login');
    }


});

//api
/*注册*/
app.get('/api/register.action', function(req, res) {


    var user_name = req.query.user_name,
        province = req.query.province,
        city = req.query.city,
        tel = req.query.phone,
        password = req.query.password,
        cid = req.query.cid;
    mysql.register(req, res, user_name, password, tel, cid, province, city);
    /* res.write('cdfdeafc');
	 res.end();*/
});
/*登录*/
app.get('/api/login.action', function(req, res) {


    var tel = req.query.phone,
        password = req.query.password;

    mysql.login(req, res, tel, password);
    /* res.write('cdfdeafc');
	 res.end();*/
});
app.get('/api/addToCarts.action', function(req, res) {
    var user_id = req.query.user_id,
        commodity_id = req.query.commodity_id,
        commodity_name = req.query.commodity_name,
        commodity_price = req.query.commodity_price,
        commodity_img = req.query.commodity_img,
        commodity_status = req.query.commodity_status;
    mysql.addToCarts(req, res, user_id, commodity_id, commodity_name, commodity_price, commodity_img, commodity_status);
});

//deleteCarts
app.get('/api/deleteCarts.action', function(req, res) {
    var commodity_id = req.query.commodity_id;
    mysql.deleteCarts(req, res, commodity_id);

});
/*session*/


//10.221.236.64
app.listen(port, '10.221.236.64');

console.log('service starting at ' + port + ' port');