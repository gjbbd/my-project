//引入jsonwebtoken模块
const jwt=require('jsonwebtoken')

//封装获取token的函数
function getToken(data){
    //如果有数据传入则将数据作为签发token的数据
    if(data){
        this.data=data
    }
    let payload=this.data
    // 设置加密字符串
    const secret='ganjuebangbangda'
    //签发token
    let token=jwt.sign(payload,secret,{})
    // console.log(token);
    return token
}

// //测试token生成
// getToken({
//     name:'gjbbd'
// })

//封装校验token的函数
function verifyToken(data){
    let status=''
    if(!data){
        // console.log('未传递token值');
        status='404'
        // return {
        //     status:400,
        //     msg:'未传递token值'
        // }
    }else{
        let token=data
        jwt.verify(token,'ganjuebangbangda',(err,decoded)=>{
            if(err){
                // console.log('无效的token值');
                status='404'
                // return {
                //     status:404,
                //     msg:'无效的token值'
                // }
            }else{
                // console.log(decoded);
                curTime = Math.floor((Date.now() / 1000))
                overTime=decoded.iat+60*100
                // 校验token过期否
                if(overTime-curTime>0){
                    // console.log('token有效');
                    status='200'
                    // return {
                    //     status:200,
                    //     msg:'token有效值'
                    // }
                }else{
                    // console.log('token过期了');
                    status='401'
                    // return {
                    //     status:400,
                    //     msg:'过期的token值'
                    // }
                }
            }
        })
    }
    return status
    
}
//测试token校验
// verifyToken(getToken({
//     name:'gjddbbd'
// }))

// module.exports=getToken
// module.exports=verifyToken
module.exports={
    getToken,
    verifyToken 
}

// =====================jwt路由守卫用法:
    // 1.前端通过localstory获取到token
    // 2.将参数传递到路由处理页面进行路由分发,
    //     post方式请求可以将参数token加到表单中,让某项display:none即可;
    //     如果是a标签方式,那么就将该a标签的href值在script中进行更改;this.href='/book/index/add?token='+token
    //     如果是a标签+数据循环渲染格式下的id这种情况,那就将this.href=this.href+"&token="+token
    // 3.分发完进入业务逻辑处理前先验证token的有效性
            //验证token,添加路由守卫
            // console.log(req.query);
                //get方式---url传参
            // let result = jwt.verifyToken(req.query.token)
                //post方式---表单传参
            // let result = jwt.verifyToken(req.body.token)
            // console.log(result);
            // if (result == '200') {}
    