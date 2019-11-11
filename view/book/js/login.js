// 登录功能
$(function(){
    message.showSuccess('请登录用户')
    let $username = $('.username');
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
        $.ajax({
            url:'/tx',
            type:'POST',
            data:{
               username:username,
                },
            success(res){
                if(res.image){
                    $('.avtar_img').attr('src',res.image)
                }
            }
        })

    }
	// 指定浏览器显示响应式
    let hd = $(window).width();
	// alert(wd)
    if (hd>=620) {
        $('.login-form').css("width", "30%");
    } else {
        $('.login-form').css("width", "80%");
    }
})
