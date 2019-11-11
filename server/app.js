//安装模块express,art-template,bootstrap,post请求

//模块引入及配置
var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')
var app = express()
// var cors = require("cors")
var session = require('express-session');
var cookieParser = require('cookie-parser');
//验证码模块


//共享静态资源
app.use('/public/', express.static('./public/'))
app.use('/views/', express.static('./views/'))
app.use('/node_modules/', express.static('./node_modules/'))

//配置模块
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
// //配置跨域
// app.use(cors())
// session服务
app.use(cookieParser());
app.use(session({
resave: true, 
saveUninitialized: false, 
secret: 'tsglxm'
}));

//路由挂载
app.use(router)

//添加监听事件
app.listen(8080, function() {
	console.log("服务器连接成功，8080")
})

//将app接口共享到全局
module.exports = app
