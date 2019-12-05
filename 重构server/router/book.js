// 调出路由接口
let express = require('express')
let router = express.Router()

// 引入数据库配置模块
let connection = require('../db/mysql')

// 引入jwt模块
let jwt = require('../components/jwt')

// 路由匹配

//搜索
router.post('/search', function(req, res) {
    // console.log(req.body);
    var search = req.body.searchinput;
    // 注意like
    var sql = 'select * from `books` where name like "%' + search + '%"'
    connection.query(sql, function(err, data, fields) {
        res.render('index.html', {
            books: data,
            message: 'success'
        })
    })
})



//首页数据列表查询
router.get('/index', function(req, res) {
    //验证token,添加路由守卫
    // console.log(req.query);
    let result = jwt.verifyToken(req.query.token)
    // console.log(result);
    if (result == '200') {
        connection.query('select * from `books` order by id desc', function(err, data, fields) {
            res.render('index.html', {
                books: data
            })

        })
    } else {
        // console.log(req.query);
        res.redirect('/user/login')
    }

})

//首页数据添加
router.get('/index/add', function(req, res) {
    //验证token,添加路由守卫
    let result = jwt.verifyToken(req.query.token)
    if (result == '200') {
        //获取类别数据
        connection.query('select * from `catagory`', function(err, data, fields) {
            res.render('add.html', {
                catagory: data,
            })
            // console.log(data);
        })
        // res.render('add.html')
    } else {
        res.redirect('/user/login')
    }


})
router.post('/index/add', function(req, res) {
    //验证token,添加路由守卫
    let result = jwt.verifyToken(req.query.token)
    console.log(result);
    if (result == '200') {
        var id = Date.parse(new Date())
        sql = 'INSERT INTO `books` set id="' + id + '", name="' + req.body.name + '",author="' + req.body.author +
            '",count="' + req.body.count + '", date="' + req.body.date + '",catagory="' + req.body.catagory +
            '"'
        connection.query(sql, function(err, data, fields) {
            if (err) {
                console.log("error:" + err)
            }
            //重定向
            res.redirect('/book/index?token=' + req.query.token)
        })
        // console.log(req.body.name,req.body.author,req.body.count,req.body.date,req.body.catagory)
    } else {
        res.redirect('/user/login')
    }


})

//首页数据删除
router.get('/index/del', function(req, res) {
    //验证token,添加路由守卫
    let result = jwt.verifyToken(req.query.token)
    console.log(result);
    if (result == '200') {
        console.log(req.query);
        connection.query('delete from books where id=' + req.query.id, function(err, data, fields) {
            if (err) {
                console.log(err)
            }
            res.redirect('/book/index?token=' + req.query.token)
            console.log(req.query.token)
        })
    } else {
        res.redirect('/user/login')
    }
})

//首页数据更改
router.get("/index/update", function(req, res) {
    //验证token,添加路由守卫
    let result = jwt.verifyToken(req.query.token)
    console.log(result);
    if (result == '200') {
        var id = req.query.id
        connection.query('select * from `books` where id=' + id, function(err, data, fields) {
            if (err) {
                console.log(err)
            }
            res.render('update.html', {
                book: data
            })
        })
    } else {
        res.redirect('/user/login')
    }
})
router.post('/index/update', function(req, res) {
    //验证token,添加路由守卫
    let result = jwt.verifyToken(req.query.token)
    console.log(result);
    if (result == '200') {
        // console.log(req.body);
        // console.log(req.query);
        var sql = 'update books set name="' + req.body.name + '",author="' + req.body.author + '",count="' +
            req.body
            .count +
            '", date="' + req.body.date + '",catagory="' + req.body.catagory + '" where id=' + req.body.id
        connection.query(sql, function(err, data, fields) {
            if (err) {
                console.log(err)
            }
            res.redirect('/book/index?token=' + req.body.token)
        })
    } else {
        res.redirect('/user/login')
    }
})


//类别查询
router.get('/catagory', function(req, res) {
    connection.query('select * from `catagory` order by id asc', function(err, data, fields) {
        res.render('catagory.html', {
            catagory: data,
        })
        // console.log(data);
    })
})
router.get('/catagory/catagoryadd', function(req, res) {
    res.render('addcatagory.html')
})
//书类别添加
router.post('/catagory/catagoryadd', function(req, res) {
    var id = req.body.id
    var catagory = req.body.catagory
    var sql = 'select * from catagory where id="' + id + '" or catagory="' + catagory + '"'
    connection.query(sql, function(err, data, fields) {
        if (data == 0) {
            var addsql = 'INSERT INTO `catagory` set id="' + req.body.id + '", catagory="' + req.body.catagory +
                '"'
            connection.query(addsql, function(err, data, fields) {
                if (err) {
                    console.log("error:" + err)
                }
                //重定向
                res.redirect('/book/catagory')
            })
        } else {
            res.redirect('/book/catagory/catagoryadd')
        }
    })



})

//类别删除
router.get('/catagory/delcatagory', function(req, res) {
    connection.query('delete from catagory where id=' + req.query.id, function(err, data, fields) {
        if (err) {
            console.log(err)
        }
        res.redirect('/book/catagory')

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
        res.redirect('/book/catagory')
    })
})

//将路由接口共享--在app.js中挂载
module.exports = router
