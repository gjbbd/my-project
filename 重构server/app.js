// ==================安装所需模块

// ==================引入所需模块
//express模块
let express = require('express')
// post请求模块body-parser   
let bodyParser = require('body-parser')
// express-art-template模块

// ==================配置路径模块path
let path = require('path')

//====================开启服务器
let app = express()

// ===================配置body-parser模块
app.use(bodyParser.urlencoded({
    extended: false
}));

//=================== 配置模板引擎express-art-template
app.engine('html', require('express-art-template'))

// ====================共享静态资源-将静态资源目录设为项目根目录
app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))
app.use('/views/', express.static('./views/'))

//=====================路由挂载
// 引入路由模块文件
let routerUser = require('./router/user.js')
let routerBook = require('./router/book.js')
// 使用路由
app.use('/user', routerUser)
app.use('/book', routerBook)

// app.use('/', (req, res,next) => {
//     if (req.query.token||req.body.token) {
//         next()
//     } else {
//         res.redirect('/user/login')
//     }
// })


//====================配置跨域：
app.all("*", function(req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})

// ===================服务器开启监听事件
app.listen(8888, function() {
    console.log('恭喜你成功启用服务器，端口号8888');
})

// ===================app共享到全局
module.express = app
