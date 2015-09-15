module.exports = function ( app ) {
  app.get('/page/register.action', function(req, res) {
      res.render('register');
  });
  app.post('/api/register', function (req, res) {
     var User = global.dbHelper.getModel('user'),
     user_name = req.body.user_name,
	   phone = req.body.phone,
	   password=req.body.password,
	   province=req.body.province,
	   city=req.body.city,
	   cid=req.body.cid,
	 
	 ;
     phone.findOne({phone: phone}, function (error, doc) {
       if (doc) {
            req.session.error = '该手机号已被注册';
            res.send(500);
        } else {
            User.create({
                user_name: user_name,
               
				 phone : phone,
	             password:password,
	             province:province,
	             city:city,
	             cid:cid,
            }, function (error, doc) {
                if (error) {
                    res.send(500);
					 req.session.error = '数据库连接失败！';
                } else {
                    req.session.error = '用户名创建成功！';
                    res.send(200);
                }
            });
        }
    });
  });
}
 