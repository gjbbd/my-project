// 引入 nodemailer
var nodemailer = require('../node_modules/nodemailer');

//创建一个smtp服务器
const config = {
    // 163邮箱 为smtp.163.com
    host: 'smtp.qq.com', //这是qq邮箱
    //端口
    port: 465,
    auth: {
        // 发件人邮箱账号
        user: '1440185383@qq.com',
        //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一
        pass: 'spzkacahsopkbadf'
    }
}
// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);

//设置变量存储生成的验证码
var code = ''
// =======================================发送验证码=========================
function sendEmail(mail) {
    let code = ''
    for (var i = 0; i < 6; i++) {
        let item = Math.floor(Math.random() * 10)
        code += item

    }
    let emailobj = {
        from: 'gjbbd<1440185383@qq.com>',
        to: mail,
        subject: '系统注册邮箱验证',
        text: '来自gjbbd的邮箱验证码,您的验证码为' + code + ',五点钟内有效😜'
    }

    transporter.sendMail(emailobj, function(error, info) {
        if (error) {
            return error;
        }
        // console.log('mail sent:', info,emailobj);
        let mailText = emailobj.text
        code = mailText.replace(/[^0-9]/ig, "")
        // console.log(code);

    });
    return code
}

//===========================验证验证码====================================
function verifyEmail(mailCode,code) {
    //验证码统一格式
    mailCode=parseInt(mailCode)
    code=parseInt(code)
    // console.log(code,mailCode);
    //验证码判断
    if (mailCode === code) {
        status = '200'
        console.log('true');
    } else {
        status = '400'
        console.log('false');
    }

    return status
}

//发送邮件
module.exports = {
    sendEmail,
    verifyEmail
}

//====================注册路由验证===========================
// router.post('/register', function(req, res) {
//     var idcard = req.body.idcard
//     var password = md5.md5(req.body.password)
//     var mailCod = req.body.mailCode
//     //================验证验证码============================
//     //从验证码数据库中获取验证码
//     var code = 'select mailCode from mailCode where idcard=' + idcard
//     connection.query(code, function(err, data, fields) {
//         dbcode = data[0].mailCode
//         console.log(dbcode);
//         //验证码验证
//         var result = mail.verifyEmail(mailCod, dbcode)
//         console.log(result);
//         //验证码验证通过,执行插入数据语句
//         if (result === '200') {
//             var regsql = 'select * from users where idcard=' + idcard
//             connection.query(regsql, function(err, data, fields) {
//                 if (data != 0) {
//                     res.send({
//                         message: 'fail'
//                     })
//                 } else {
//                     // res.send({message:'success'})
//                     var addsql = 'insert into users set idcard="' + idcard + '",password="' +
//                         password + '" '
//                     connection.query(addsql, function(err, data, fields) {
//                         if (err) {
//                             res.send({
//                                 message: 'fail'
//                             })
//                         } else {
//                             // 获取token并保存到localstory中
//                             let token = jwt.getToken({
//                                 idcard: idcard
//                             })
//                             res.send({
//                                 message: 'success',
//                                 token: token
//                             })
//                         }

//                     })
//                 }
//             })
//         } else {
//             res.send({
//                 message: 'yzm error'
//             })
//         }
//     })
// })