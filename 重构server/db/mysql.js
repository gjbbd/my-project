// 引入数据库模块
let mysql=require('mysql')

// 配置数据库参数
let connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tsglxm'
})

// 连接数据库
connection.connect();

//数据库接口共享---在需要调用数据库的地方调用接口
module.exports=connection;