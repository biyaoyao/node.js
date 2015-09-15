var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '203.195.150.220',
    user: 'syjk',
    password: 'syjk2015',
    database: 'byy',
    port: 3306
});

//注册
function register(req, res, user_name, password, tel, cid, province, city) {

    var page = 3;
    var size = 10;
    var sql = "select * from user where  tel=" + tel;
    connection.query(sql, function (err, rows, fields) {
        if (err) {


            var datas = new Object();
            datas.result = false;
            datas.feedback = '数据出错';

            res.write('' + JSON.stringify(datas));
            res.end();

        };


        if (rows.length == 0) {
            var sql1 = "insert into user(user_name,password,tel,cid,province,city) values('" + user_name + "','" + password + "'," + tel + "," + cid + ",'" + province + "','" + city + "') ";
            //console.log(sql1);
            connection.query(sql1, function (err, rows, fields) {
                if (err) throw err;
                console.log(JSON.stringify(rows));
                req.session.user_name = user_name;
                req.session.user_id = rows.insertId;
                var datas = new Object();
                datas.result = true;
                datas.data = '注册成功！';

                res.write('' + JSON.stringify(datas));
                res.end();

            });

        } else {

            var datas = new Object();
            datas.result = false;
            datas.feedback = '该账号已注册';

            res.write('' + JSON.stringify(datas));
            res.end();
        }


    });




}

//登录
function login(req, res, tel, password) {


    var sql = "select * from user where  tel=" + tel;
    connection.query(sql, function (err, rows, fields) {
        if (err) {

            var datas = new Object();
            datas.result = false;
            datas.feedback = '数据出错';

            res.write('' + JSON.stringify(datas));
            res.end();
            return;

        };


        if (rows.length == 0) {
            var datas = new Object();
            datas.result = false;
            datas.feedback = '帐号不存在！';

            res.write('' + JSON.stringify(datas));
            res.end();

        } else {
            var datas = new Object();

            if (password == rows[0].password) {
                //console.log(JSON.stringify(rows[0]));

                req.session.user_name = rows[0].user_name;
                req.session.user_id = rows[0].user_id;

                datas.result = true;
                datas.feedback = '登陆成功！';
                datas.data = rows[0];

                res.write('' + JSON.stringify(datas));
                res.end();


            } else {

                datas.result = false;
                datas.feedback = '密码不正确！';

                res.write('' + JSON.stringify(datas));
                res.end();

            }





        }


    });


}

function commodity(req, res) {

    var page = 3;
    var size = 10;
    var sql = "select * from commodity ";
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;

        res.render('commodity', {
            commodity: rows,
            commodity_json: JSON.stringify(rows),
            user_id: req.session.user_id,
            user_name: req.session.user_name
        });

    });


}

function carts(req, res) {

    var sql = "SELECT commodity_price, commodity_img,commodity_name, commodity_id,COUNT(commodity_id) as count ,SUM(commodity_price) as price from carts WHERE user_id=" + req.session.user_id + " GROUP BY commodity_id";
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;

        res.render('carts', {
            carts: rows,
            carts_json: JSON.stringify(rows),
            user_id: req.session.user_id,
            user_name: req.session.user_name
        });

    });


}

function deleteCarts(req, res, commodity_id) {
    if (req.session.user_id == undefined) {
        var data = new Object();
        data.feedback = "还未登录！";
        data.result = false;
        res.write('' + JSON.stringify(data));
        res.end();
        return;
    }
    if (commodity_id == undefined) {

        var data = new Object();
        data.feedback = "参数错误";
        data.result = false;
        res.write('' + JSON.stringify(data));
        res.end();
        return;

    }

    var sql = 'DELETE FROM carts WHERE user_id=' + req.session.user_id + ' and commodity_id IN(' + commodity_id + ")";

    console.log(sql);
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        var data = new Object();
        if (rows.affectedRows == 0) {
            data.result = false;
            data.feedback = "该商品不存在";


        } else {
            data.result = true;
            data.feedback = "您已成功删除" + rows.affectedRows + "条记录";


        }
        res.write('' + JSON.stringify(data));
        res.end();
    });

}

function addToCarts(req, res, user_id, commodity_id, commodity_name, commodity_price, commodity_img, commodity_status) {


    var sql1 = "insert into carts(user_id,commodity_id,commodity_name,commodity_price,commodity_img,commodity_status) values('" + user_id + "','" + commodity_id + "','" + commodity_name + "'," + commodity_price + ",'" + commodity_img + "','" + commodity_status + "') ";

    connection.query(sql1, function (err, rows, fields) {
        if (err) throw err;
        var datas = new Object();
        datas.result = true;
        datas.data = '添加成功！';

        res.write('' + JSON.stringify(datas));
        res.end();

    });


}

function insertExcel(req, res, list) {
    //console.log(JSON.stringify(list));
    var values = "";
    for (var i = 0; i < 1; i++) {

        var datas = list[i].data;

        for (var j = 0; j < datas.length; j++) {
            var user_id = datas[j][0];
            var user_name = datas[j][14];
            var password = datas[j][16];
            var tel = datas[j][12];
            var cid = (45242719920105331 + i);
            var province = datas[j][9];
            var city = datas[j][7];
            values = values + '("' + user_name + '","' + password + '","' + tel + '",' + cid + ',"' + province + '","' + city + '")' + ',';



        }

    }

    var sql = "insert into user(user_name,password,tel,cid,province,city) values" + values.substring(0, values.length - 1);
    var datas = new Object();
    datas.result = true;
    datas.data = list;

    res.write('' + JSON.stringify(datas));
    res.end();


    console.log('success!');
    //connection.query(sql, function(err, rows, fields) {
    /*     if (err) throw err;
        var datas = new Object();
        datas.result = true;
        datas.data = '添加成功！';

        res.write('' + JSON.stringify(datas));
        res.end();


        console.log('success!');
    });*/

    /* var datas = new Object();
 datas.result = true;
 datas.error_info = '数据出错';
 res.write('' + JSON.stringify(list));
 res.end();*/
    //    /res.end('' + values);

}


exports.deleteCarts = deleteCarts;
exports.addToCarts = addToCarts;
exports.commodity = commodity;
exports.carts = carts;
exports.register = register;
exports.login = login;
exports.insertExcel = insertExcel;