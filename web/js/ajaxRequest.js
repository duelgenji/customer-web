/**
 * Created by duel on 13-12-7.
 * qq:361714571
 */



var regMobile=/^((13[0-9])|(14[0-9])|(15[^4,\D])|(18[0-9]))\d{8}$/;
var regYzm=/^\d{6}$/;
var regPwd=/^(?![^a-zA-Z]+$)([a-zA-Z0-9]){6,30}$/;
var regEmail=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var bGetYzm=true;


function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return decodeURI(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +encodeURI(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}


function regRequest(event){
    var ev = window.event || event;
    var url="http://localhost/cs/user/regist.htm";
    var timer=setTimeout(function(){
        $.ajax({
            url:"user/logon.htm" ,
            type: "POST",
            dataType: "json",
            async:false,
            data: {"json": jsonSent},
            success: function (data) {
                var result = data.success;
                clearTimeout(timer);
                $(ev).empty().append("注册");
                if (result == 1) {
                    location.href="shouye.html";
                }
                if (result == 0) {
                    var msg = data.message;
                    alertify.alert(msg);
                }
            }});
    },1000);

}

//手机登陆
function loginByMobile(){

//    var e = event || window.event;
//    var ev = e.srcElement  || e.target;
    var ev=$("#loginByMobileBtn");
    var sUserName=document.getElementById("txtMobile").value;
    var sMobilePwd=document.getElementById("txtMobilePwd").value;
    var bMobileBox=document.getElementById("logMobileBox").checked;

    if(!sUserName || !regMobile.test(sUserName)){
        alertify.alert("输入手机号格式不正确");
        return;
    }
    if(!sMobilePwd){
        alertify.alert("输入密码不能为空");
    }

    var jsonSent = '{"username":"'+sUserName
        +'","pwd":"'+sMobilePwd
        +'"}';

    $(ev).empty().append("提交中<span class='loading'></span>");

    var url="http://localhost/cs/user/logon.htm";
    var timer=setTimeout(function(){
        $.ajax({
            url:"user/logon.htm" ,
            type: "POST",
            dataType: "json",
            async:false,
            data: {"json": jsonSent},
            success: function (data) {
                var result = data.success;
                clearTimeout(timer);
                $(ev).empty().append("登录");
                if (result == 1) {
                   if(bMobileBox){
                       setCookie("csunm",sUserName,30);
                   }else{
                       setCookie("csunm",sUserName,-1);
                   }
                   location.href="shouye.html";
                }
                if (result == 0) {
                    var msg = data.message;
                    alertify.alert(msg+"");
                }
            }});
    },1000);

}


//邮箱登陆
function loginByEmail(event){
    var ev = window.event || event;
    var sUserName=document.getElementById("txtEmail").value.trim();
    var sEmailPwd=document.getElementById("txtEmailPwd").value;
    var bEmailBox=document.getElementById("logEmailBox").checked;


    if (!sUserName || !regEmail.test(sUserName)) {
        alertify.alert("邮箱格式不正确,正确格式示例：qubaopen@outlook.com");
        return;
    }
    if(!sEmailPwd){
        alertify.alert("输入密码不能为空");
        return;
    }

    var jsonSent = '{"username":"'+sUserName
        +'","pwd":"'+sEmailPwd
        +'"}';

    $(ev).empty().append("提交中<span class='loading'></span>");

    var url="http://localhost/cs/user/logon.htm";
    var timer=setTimeout(function(){
        $.ajax({
            url:"user/logon.htm" ,
            type: "POST",
            dataType: "json",
            async:false,
            data: {"json": jsonSent},
            success: function (data) {
                var result = data.success;
                clearTimeout(timer);
                $(ev).empty().append("登录");
                if (result == 1) {
                    if(bEmailBox){
                        setCookie("csune",sUserName,30);
                    }else{
                        setCookie("csune",sUserName,-1);
                    }
                    location.href="shouye.html";
                }
                if (result == 0) {
                    var msg = data.message;
                    alertify.alert(msg+"");
                }
            }});
    },1000);

}


//手机申请验证码
function getYzm(event){

    if(!bGetYzm) return;
    var ev = window.event || event;
    var sUserName=document.getElementById("txtMobile").value;
    var bMobileBox=document.getElementById("regMobileBox").checked;


    if(!bMobileBox){
        alertify.alert("你没有同意我们的条款");
        return;
    }
    if(!sUserName || !regMobile.test(sUserName)){
        alertify.alert("输入手机号格式不正确");
        return;
    }

    var jsonSent = '{"username":"'+sUserName
        +'"}';

    bGetYzm = false;
    var url="http://localhost/cs/user/regist.htm";
    $.ajax({
        url:"user/regist.htm" ,
        type: "POST",
        dataType: "json",
        async:false,
        data: {"json": jsonSent},
        success: function (data) {
            var result = data.success;
            if (result == 1) {
                var nBtnTime =60;
                $(ev).removeClass("btn-info").addClass("btn-forbidden");
                $(ev).val( nBtnTime +"秒后重新发送");
                var oTimer=setInterval(function(){
                    nBtnTime--;
                    if(nBtnTime<=0){
                        $(ev).val( "获取验证码" );
                        $(ev).removeClass("btn-forbidden").addClass("btn-info");
                        bGetYzm=true;
                        clearInterval(oTimer);
                    }
                    else{
                        $(ev).val( nBtnTime +"秒后重新发送");
                    }
                },1000);

            }
            if (result == 0) {
                var msg = data.message;
                alertify.alert(msg);
            }
        }});
}
//手机注册
function regByMobile(event){

    var ev = window.event || event;
    var sUserName=document.getElementById("txtMobile").value;
    var sMobilePwd=document.getElementById("txtMobilePwd").value;
    var sMobileYzm=document.getElementById("txtMobileYzm").value;
    var bMobileBox=document.getElementById("regMobileBox").checked;


    if(!bMobileBox){
        alertify.alert("你没有同意我们的条款");
        return;
    }
    if(!sMobileYzm || !regYzm.test(sMobileYzm)){
        alertify.alert("输入6位数字验证码");
        return;
    }
    if(!sUserName || !regMobile.test(sUserName)){
        alertify.alert("输入手机号格式不正确");
        return;
    }
    if(!sMobilePwd || !regPwd.test(sMobilePwd)){
        alertify.alert("密码长度在6位至30位,由字母数字组成,且必须包含字母");
        return;
    }

    var jsonSent = '{"username":"'+sUserName
        +'","pwd":"'+sMobilePwd
        +'","yzm":"'+sMobileYzm
        +'"}';
    $(ev).empty().append("提交中<span class='loading'></span>");

    var url="http://localhost/cs/user/confirmtokenbysms.htm";
    var timer=setTimeout(function(){
        $.ajax({
            url:"user/confirmtokenbysms.htm" ,
            type: "POST",
            dataType: "json",
            async:false,
            data: {"json": jsonSent},
            success: function (data) {
                var result = data.success;
                clearTimeout(timer);
                $(ev).empty().append("注册");
                if (result == 1) {
                    location.href="shouye.html";
                }
                if (result == 0) {
                    var msg = data.message;
                    alertify.alert(msg+"");
                }
            }});
    },1000);





}
//邮箱注册
function regByEmail(event){
    var ev = window.event || event;
    var sUserName=document.getElementById("txtEmail").value.trim();
    var sEmailPwd=document.getElementById("txtEmailPwd").value;
    var bEmailBox=document.getElementById("regEmailBox").checked;

    if(!bEmailBox){
        alertify.alert("你没有同意我们的条款");
        return;
    }

    if (!sUserName || !regEmail.test(sUserName)) {
        alertify.alert("邮箱格式不正确,正确格式示例：qubaopen@outlook.com");
        return;
    }

    if(!sEmailPwd || !regPwd.test(sEmailPwd)){
        alertify.alert("密码长度在6位至30位,由字母数字组成,且必须包含字母");
        return;
    }

    var jsonSent = '{"username":"'+sUserName
        +'","pwd":"'+sEmailPwd
        +'"}';

    $(ev).empty().append("提交中<span class='loading'></span>");
    var url="http://localhost/cs/user/regist.htm";
    var timer=setTimeout(function(){
        $.ajax({
            url:"user/regist.htm" ,
            type: "POST",
            dataType: "json",
            async:false,
            data: {"json": jsonSent},
            success: function (data) {
                var result = data.success;
                clearTimeout(timer);
                $(ev).empty().append("注册");
                if (result == 1) {
                    //邮箱注册后跳转至等待激活的页面
                    location.href="emailRegisterActive.html";
                }
                if (result == 0) {
                    var msg = data.message;
                    alertify.alert(msg);
                }
            }});
    },1000);


}
//登出
function userLogout(){
    alertify.set({ labels: {
        ok     : "确认",
        cancel : "取消"
    } });
    alertify.confirm("确定登出趣宝盆？", function (e) {
        if (e) {
            var url="http://localhost/cs/user/logout.htm";
            $.ajax({
                url:"user/logout.htm" ,
                type: "POST",
                dataType: "json",
                async:false,
                success: function (data) {
                    var result = data.success;
                    if (result == 1) {
                        location.href="shouye.html";
                    }
                    if (result == 0) {
                        var msg = data.message;
                        alertify.alert(msg);
                    }
                }});
        } else {
            alertify.set({delay:5000});
            alertify.success("登出操作取消");
            return;
        }
    });

}