// 调出路由接口
let express = require('express')
let router = express.Router()

// 引入数据库配置模块
let connection = require('../db/mysql')

// 引入jwt模块
let jwt = require('../components/jwt')

//引入md5加密模块
let md5 = require('../node_modules/md5js/dist/md5.js')

//邮箱验证码模块
let mail = require('../components/email_yzm')

// 路由匹配
//1.1:用户已进入自动页面重定向进入登录页面
router.get('/', (req, res) => {
    res.redirect('/user/login')
})

//1.2.1:用户登录
router.get('/login', (req, res) => {
    res.render('login.html')
    // res.send('test ok')
})
//1.2.2:用户登录
router.post('/login', (req, res) => {
    //获取表单数据
    //查询数据库数据的正确性
    //发送响应
    var idcard = req.body.idcard
    var password = md5.md5(req.body.password)
    var sql = 'select * from users where idcard="' + idcard + '" and password="' + password + '"'
    connection.query(sql, function(err, data, fields) {
        if (data != 0) {
            // 获取token并保存到localstory中
            let token = jwt.getToken({
                idcard: idcard
            })
            res.send({
                message: 'success',
                token: token
            })


        } else {
            res.send({
                message: 'fail'
            })
        }

    })
})

//1.3退出登录
router.get('/logout', function(req, res) {
    res.redirect('/user/login');
});

//注册
router.get('/register', function(req, res) {
    res.render('register.html')
})

//注册验证码:
router.post('/email', function(req, res) {
    let email = req.body.email
    let idcard = req.body.idcard
    if (!email) {
        res.send({
            message: 'no use'
        })
    } else {
        let code = mail.sendEmail(email)
        // console.log(mail.sendEmail(email));
        console.log(code);
        // //将验证码返回并让前端自动填写到表单中----自欺欺人的做法,没意义
        // res.send({
        //     code:code,
        //     message: 'success'
        // })
        // 将生成的验证码存储到验证码数据库
        var addsql = 'insert into mailCode set idcard="' + idcard + '",mailCode="' + code + '" '
        connection.query(addsql, function(err, data, fields) {
            if (err) {
                res.send({
                    message: 'fail'
                })
            } else {
                res.send({
                    message: 'success'
                })
            }

        })
    }
})

router.post('/register', function(req, res) {
    var idcard = req.body.idcard
    var password = md5.md5(req.body.password)
    var mailCod = req.body.mailCode
    //================验证验证码============================
    //从验证码数据库中获取验证码
    var code = 'select mailCode from mailCode where idcard=' + idcard
    connection.query(code, function(err, data, fields) {
        dbcode = data[0].mailCode
        console.log(dbcode);
        //验证码验证
        var result = mail.verifyEmail(mailCod, dbcode)
        console.log(result);
        //验证码验证通过,执行插入数据语句
        if (result === '200') {
            var regsql = 'select * from users where idcard=' + idcard
            connection.query(regsql, function(err, data, fields) {
                if (data != 0) {
                    res.send({
                        message: 'fail'
                    })
                } else {
                    // res.send({message:'success'})
                    var addsql = 'insert into users set idcard="' + idcard + '",password="' +
                        password + '" '
                    connection.query(addsql, function(err, data, fields) {
                        if (err) {
                            res.send({
                                message: 'fail'
                            })
                        } else {
                            // 获取token并保存到localstory中
                            let token = jwt.getToken({
                                idcard: idcard
                            })
                            res.send({
                                message: 'success',
                                token: token
                            })
                        }

                    })
                }
            })
        } else {
            res.send({
                message: 'yzm error'
            })
        }
    })
})
//将路由接口共享--在app.js中挂载
module.exports = router
