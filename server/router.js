//==================数据库模块

//引入数据库模块
var mysql = require('mysql')

//创建连接
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "tsglxm"
})

//连接数据库
connection.connect()

//执行数据操作
connection.query('select * from `books`', function(error, result, fields) {
	if (error) {
		throw error;
		console.log('the solution is:', result)
	}
});


//===============路由模块
//引入资源
var express = require('express')

//创建并载入路由模块
var router = express.Router()

//===================路由分发

// //配置跨域
// router.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("X-Powered-By", ' 3.2.1')
//     if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
//     else next();
// });

//登录
router.get('/', function(req, res) {
	res.render('login.html')
})
router.post('/', function(req, res) {
	// 1. 获取表单数据
	// 2. 查询数据库用户名密码是否正确
	// 3. 发送响应数据
	var idcard = req.body.idcard
	var password = req.body.password
	var sql = 'select * from users where idcard="' + idcard + '" and password="' + password + '"'
	connection.query(sql, function(err, data, fields) {
		if (data != 0) {
			res.send({
				message: 'success'
			})
			req.session.user = req.body.idcard;
		} else {
			res.send({
				message: 'fail'
			})
		}
		console.log(req.session.user);
	})
})

//退出登录
router.get('/logout', function(req, res) {
	 req.session.destroy();
	res.redirect('/');
});

//注册
router.get('/register', function(req, res) {
	res.render('register.html')
})
router.post('/register', function(req, res) {
	var idcard = req.body.idcard
	var password = req.body.password
	var regsql = 'select * from users where idcard=' + idcard
	connection.query(regsql, function(err, data, fields) {
		if (data != 0) {
			res.send({
				message: 'fail'
			})
		} else {
			// res.send({message:'success'})
			var addsql = 'insert into users set idcard="' + idcard + '",password="' + password + '" '
			connection.query(addsql, function(err, data, fields) {
				if (err) {
					res.send({
						message: 'fail'
					})
				}
				res.send({
					message: 'success'
				})
			})
		}
	})
})

//搜索
router.post('/search', function(req, res) {
	var search = req.body.searchinput;
	// 注意like
	var sql = 'select * from `books` where name like "%' + search + '%"'
	connection.query(sql, function(err, data, fields) {
		if (err) {
			// res.send({
			// 	message: 'fail'
			// })
		}
		// res.send({
		// 	message:'true'
		// })

		res.render('index.html', {
			books: data
		})
	})
})



//首页数据列表查询
router.get('/index', function(req, res) {
	if (req.session) {
		connection.query('select * from `books` order by id desc', function(err, data, fields) {
			res.render('index.html', {
				books: data,
				// username: req.session.user
			})
			// console.log(req.session.user);
		})
	} else {
		res.redirect('/')
	}
	// console.log(req.session);
})

//首页数据添加
router.get('/index/add', function(req, res) {
	//获取类别数据
	connection.query('select * from `catagory`', function(err, data, fields) {
				res.render('add.html', {
					catagory: data,
				})
				// console.log(data);
			})
	// res.render('add.html')
})
router.post('/index/add', function(req, res) {
	var id = Date.parse(new Date())
	sql = 'INSERT INTO `books` set id="' + id + '", name="' + req.body.name + '",author="' + req.body.author +
		'",count="' + req.body.count + '", date="' + req.body.date + '",catagory="' + req.body.catagory + '"'
	connection.query(sql, function(err, data, fields) {
		if (err) {
			console.log("error:" + err)
		}
		//重定向
		res.redirect('/index')
	})
	// console.log(req.body.name,req.body.author,req.body.count,req.body.date,req.body.catagory)
})

//首页数据删除
router.get('/index/del', function(req, res) {
	connection.query('delete from books where id=' + req.query.id, function(err, data, fields) {
		if (err) {
			console.log(err)
		}
		res.redirect('/index')
		console.log(req.query.id)
	})
})

//首页数据更改
router.get("/index/update", function(req, res) {
	var id = req.query.id
	connection.query('select * from `books` where id=' + id, function(err, data, fields) {
		if (err) {
			console.log(err)
		}
		res.render('update.html', {
			book: data
		})
	})
})
router.post('/index/update', function(req, res) {
	var sql = 'update books set name="' + req.body.name + '",author="' + req.body.author + '",count="' + req.body.count +
		'", date="' + req.body.date + '",catagory="' + req.body.catagory + '" where id=' + req.body.id
	connection.query(sql, function(err, data, fields) {
		if (err) {
			console.log(err)
		}
		res.redirect('/index')
	})
})


//类别查询
router.get('/catagory', function(req, res) {
	connection.query('select * from `catagory` order by id asc', function(err, data, fields) {
				res.render('catagory.html', {
					catagory: data,
				})
				console.log(data);
			})
})
router.get('/catagory/catagoryadd',function(req,res){
	res.render('addcatagory.html')
})
//书类别添加
router.post('/catagory/catagoryadd', function(req, res) {
	var id = req.body.id
	var catagory = req.body.catagory
	var sql = 'select * from catagory where id="' + id + '" or catagory="' + catagory + '"'
	connection.query(sql, function(err, data, fields) {
		if (data == 0) {
			var addsql = 'INSERT INTO `catagory` set id="'+req.body.id+'", catagory="' + req.body.catagory + '"'
			connection.query(addsql, function(err, data, fields) {
				if (err) {
					console.log("error:" + err)
				}
				//重定向
				res.redirect('/catagory')
			})
		} else {
			res.redirect('/catagory/catagoryadd')
		}
	})
	
	
	
})

//类别删除
router.get('/catagory/delcatagory', function(req, res) {
	connection.query('delete from catagory where id=' + req.query.id, function(err, data, fields) {
		if (err) {
			console.log(err)
		}
		res.redirect('/catagory')
		
	})
})

//类别更改
router.get("/catagory/updatecatagory", function(req, res) {
	var id = req.query.id
	connection.query('select * from `catagory` where id=' + id, function(err, data, fields) {
		if (err) {
			console.log(err)
		}
		res.render('catagoryupdate.html', {
			catagory: data
		})
	})
})
router.post('/catagory/updatecatagory', function(req, res) {
	var sql = 'update catagory set catagory="' + req.body.catagory + '" where id=' + req.body.id
	connection.query(sql, function(err, data, fields) {
		if (err) {
			console.log(err)
		}
		res.redirect('/catagory')
	})
})

//小程序的查询数据接口
router.get('/xcx/index', function(req, res) {
	if (req.session) {
		connection.query('select * from `books` order by id desc', function(err, data, fields) {
			res.send(data)
		})
	} 
})

//小程序数据书名模糊查询:
router.post('/xcx/search', function(req, res) {
	var search = req.body.searchinput;
	// 注意like
	var sql = 'select * from `books` where name like "%' + search + '%"'
	connection.query(sql, function(err, data, fields) {
		res.send(data)
	})
})

//路由共享到全局
module.exports = router
