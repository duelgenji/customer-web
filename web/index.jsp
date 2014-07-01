
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link rel="shortcut icon" href="images/icon/favicon.ico" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta property="qc:admins" content="0516772162170566375636" />
    <title>首页-趣宝盆</title>
    <link href="css/kuangjia.css" rel="stylesheet" type="text/css"/>
    <link href="css/button.css" rel="stylesheet" type="text/css"/>
    <link href="css/daohang.css" rel="stylesheet" type="text/css"/>
    <link href="css/gd-style.css" rel="stylesheet" type="text/css"/>
    <link href="css/denglukuang.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="css/ui.common.min.css"/>
    <script src="js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="js/tishiquxiao.js" type="text/javascript"></script>
    <script src="js/menu.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="js/xm.base.min.js"></script>
    <script type="text/javascript">$(function(){Xmeb.App.xmFocus.init($("#xmFocus"),{mwidth:600,autoWidth:true});});</script>

    <link href="css/artDialogCss/twitter.css" rel="stylesheet" />
    <script src="js/artDialog.min.js"></script>
    <script src="js/artDialog.plugins.min.js"></script>
    <script type="text/javascript" src="js/globalVariable.js"></script>


    <script type="text/javascript">



        $(document).ready(function () {

            var tempCookie=getCookie("cookie1") ;


            if(tempCookie!="" && tempCookie!=null){

                var name=eval("("+tempCookie+")").nickname==""?"手机用户":eval("("+tempCookie+")").nickname;
                var onlineHtml=name+'，您好！ 　　<a href="javascript:void(0)" onclick="logout()">[退出]</a>';

                $("#zhuangtailan").empty().append(onlineHtml);
//                var bodyContent="";
//                $.ajax({
//                            url: "dengluhou.html",
//                            global: false,
//                            type: "POST",
//                            dataType: "html",
//                            async:false,
//                            success: function(data){
//                                bodyContent=data;
//                            }
//                        }
//                );
//                if(bodyContent!=""){
//                    $("#zhuyeyoubu").empty().append(bodyContent);
//                }
                $("#zhuyeyoubu").empty();
                $.ajax({
                    url: ContextUrl+"/questionnaire/gundonginfo.htm",
                    type: "POST",
                    dataType: "json",
                    success: function (data) {

                        var result = data.success;
                        if (result == 1) {
                            var gdlist=data.information;
                            var appendContent="<div class='box'>"+
                                    "<div class='box_content r_comments'>"+
                                    "<ul style='margin-top: 0px;' id='rcslider'>";

                            for(var i =0;i<gdlist.length;i++){
                                appendContent+='<li style="opacity: 0.6;">' +
                                        '<img alt="" src="images/gd/0.png" class="avatar avatar-32 photo">' +
                                        ' <a href="#" title="">'+gdlist[i].nr+'</a>' +
                                        '<br></li>';
                            }
                            appendContent+="</ul></div></div>";

                            $("#zhuyeyoubu").empty().append(appendContent);

                        }
                        if (result == 0) {
                            var msg = data.message;
                            alert(msg);
                        }
                        ////console.log(result);

                    }
                });





            }

            $("#denglu").click(function () {
                //判断手机号码                     ""
                var phone = $("#text-mobile").val();
                if (!/^((13[0-9])|(15[^4,\D])|(18[0,5-9]))\d{8}$/.test(phone)) {
                    $("#text-mobile").focus();
                    return;
                }

                var jsonSent;
                jsonSent = '{"phone":"' + $("input#text-mobile").val()
                        + '",' + '"pwd":"' + $("input#text-pwd").val()
                        + '"}';

                ////console.log(jsonSent);
                $.ajax({
                    url: ContextUrl+"/user/logon.htm",
                    type: "POST",
                    crossDomain:true,
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    data: {"json": jsonSent},
                    success: function (data, textStatus, jqXHR) {

                        var result = data.success;
                        if (result == 1) {
                            //////console.log(data);

                            setCookie("cookie1",JSON.stringify(data),new Date() );
                            //////console.log("cookie:"+ eval("("+getCookie("cookie1")+")"));
                            self.location = "index.html";
                        }
                        if (result == 0) {
                            var msg = data.message;
                            alert(msg);
                        }
                        ////console.log(result);

                    }
                });

            });
        });
    </script>

</head>
<body>
<div class="dingbu">
    <div class="shangzhongbu">
        <div class="logo"><a href="index.html"><img src="images/logo.png" width="202" height="140"/>
        </div>
        <div class="daohang">

            <div class="zhuangtailan"><div id="zhuangtailan"><a href="javascript:void(0)" onclick="self.location='register.jsp';">注册</a>&nbsp|&nbsp<a href="javascript:void(0)" onclick="logon('1')">登录</a></div></div>
            <ul class="nav">
                <li><a class="select" href="index.html">首 页</a></li>
                <li><a href="quceshi.html">趣测试</a></li>
                <li><a href="qudiaoyan.html">趣调研</a></li>
                <li><a href="quduijiang.html">趣兑奖</a></li>
                <li><a href="quzhijia.html">趣之家</a></li>
            </ul>
        </div>
    </div>
</div>
<div class="zhongbu">
    <div class="shouyeimg">
        <div id="xmFocus" class="xmFocus cfl">
            <div> <a index="1" style="z-index:2;" href="jifenguize.html" target="_blank"  onClick="_gaq.push(['_trackEvent', '首页广告点击', 'A1']);"> <img src="images/index1.jpg" alt="" width="600" height="400" /> </a> <a index="2" style="z-index:1;" href="register.html" target="_blank"  onClick="_gaq.push(['_trackEvent', '首页广告点击', 'A2']);"> <img src="images/index2.jpg" alt="" width="600" height="400" /> </a> <a index="3" style="z-index:1;" href="javascript:void(0)" onclick="window.open('http://weibo.com/u/3578471374');" target="_blank"  onClick="_gaq.push(['_trackEvent', '首页广告点击', 'A3']);"> <img src="images/index3.png" alt="" width="600" height="400" /> </a> </div>
            <ul>
            </ul>
        </div></div>

    <img src="images/fengexian.png" width="5" height="480"/>

    <div id="zhuyeyoubu">
        <div class="denglukuang">
            <form class="border_radius" id="focus">
                <label><span>请输入用户名/手机号</span>
                    <input type="text" id="text-mobile" class="input_txt border_radius">
                </label>
                <label><span>请输入密码</span>
                    <input type="password" id="text-pwd" class="input_txt border_radius">
                </label>
            </form>

            <div class="zhucelianjie">
                <label><input type="checkbox"/>
                    记住密码 　　　<a href='wangjimima.html'>忘了密码？</a></label>
            </div>

            <div style="margin:20px 0 20px 0" class="button button-blue pointer" id="denglu">登　 录</div>
            <div class="zhucelianjie">
                <div class="haimeizhanghao">还没账号？</div>
                <div class="lijizhuce"> <a href="javascript:void(0)" onclick="self.location='register.html';">立即注册!</a></div>
            </div>
        </div>
    </div>
</div>


<div class="dibu">
    <div class="dizhongbu" >
        <div class="dibuwenzi" >
            <a href="aboutus.html">关于我们</a> ｜ <a href="rule.html">积分规则</a> ｜ <a href="lianxi.html">联系我们</a> ｜ <a href="yinsi.html">隐私说明</a> ｜ <a href="rencai.html">人才招聘</a>　　有更多好玩，快来下载！</div>
        <img class="dibuicon" src="images/apple.png" width="35" height="35" />
        <img class="dibuicon pointer" src="images/android.png" onclick="window.open('install/latest/qubaopen.apk')" width="35" height="35" />
        <div class="dibuwenzi">
            　　　　  　　　　请关注我</div>

        <img style="cursor: pointer;" onclick="window.open('http://weibo.com/u/3578471374');" class="dibuicon" src="images/sina.png" width="35" height="35" />
        <img  style="cursor: pointer;" onclick="window.open('http://t.qq.com/qubaopen001')" class="dibuicon" src="images/tencent.png" width="35" height="35" />
        <div class="dibuwenzi">　　　　　　　　　　　　　　　　2012-2013 All rights reserved 上海众创商务咨询有限公司 沪ICP备10202509号-2</div>
        <div class="gongshang"><SCRIPT LANGUAGE="JavaScript" >
            document.writeln("<a href='http://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&entyId=201309171611156'><img src='images/icon.gif' border=0></a>")</SCRIPT></div></div>
</div>
</body>
</html>
