
// 注册功能
$(function(){
    message.showSuccess('请注册用户')

    // 1、验证用户名长度
    let $username = $('.username');
    let $password = $('.password');
    let $rpassword = $('.re_password');
    let $submit = $('.submit')
    $username.blur(fnCheckUsername);
    function fnCheckUsername() {
        let username = $('.username').val();
        if (username==='') {
            message.showError('用户名不能为空')
            return;
        }
        if(!(/^\w{5,20}$/).test(username)){
            message.showError('用户名长度为5-20位')
        }else {
            message.showSuccess('用户名可以正常使用')
        }
    }
    $rpassword.blur(fnCheckPassword);
    function fnCheckPassword() {
        let password = $('.password').val();
        let repassword = $('.re_password').val();
        if (password!==repassword) {
            message.showError('密码不一致')
        }else {
            message.showSuccess('密码一致')
        }
    }
    // 用户注册入口
    $submit.click(fnRegiterBtn);
    function fnRegiterBtn(){
        event.preventDefault();
        let susename = $('.username').val();
        let spassword = $('.password').val();
        let srepassword = $('.re_password').val();
        $.ajax({
            url: '/register',
            type: 'POST',
            dataType:'json',
            contentType:'application/json;charset=UTF-8',
            data:{
               username: susename,
               password: spassword,
               repassword: srepassword,
            },
            success(res) {
                if (res.data==1){
                    message.showSuccess('注册成功')
                    message.showSuccess('开始登录')
                    location.href ="/login"
                }
            }
        })


    }



	// 指定浏览器显示响应式
    let wd = $(window).width();
	// alert(wd)
    if (wd>=620) {
        $('.login-form').css("width", "30%");
    } else {
        $('.login-form').css("width", "80%");
    }
})

