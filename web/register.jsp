<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-12-6
  Time: 上午10:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>趣宝盆用户注册</title>
    <%@include file="package.jsp"%>
</head>
<body>

<div class="header">
    <div class="wrapper" >
        <div class="row">
            <div  class="col-xs-offset-8 col-xs-4">
            </div>
        </div>
        <div class="row show-grid">
            <div class="col-xs-2 col-xs-offset-1 logo">
                <a href="shouye.jsp">
                    <img src="images/logot.png" width="180px" />
                </a>
            </div>
            <div class="col-xs-offset-6 col-xs-2">
                <div class="backToHome" onclick="self.location='shouye.jsp'">
                    <span class="glyphicon glyphicon-circle-arrow-left"></span> 返回首页
                </div>
            </div>
        </div>
    </div>
</div>

<div class="center" style="height:500px;min-width: 1000px">
    <div class="row">
        <div class="col-xs-offset-1 col-xs-10">
            <div class="page-header" style="margin-top: 10px;">
                <h4>注册您的账号</h4>
            </div>
        </div>
    </div>
    <div class="row regContent">
        <div class="col-xs-offset-1 col-xs-6 thumbnail">
            <div class="row">
                <div class="col-xs-offset-1 col-xs-10">

                    <br/>
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#mobile" data-toggle="tab">手机注册</a></li>
                        <li><a href="#email" data-toggle="tab">邮箱注册</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="mobile">
                            <br/>
                            <form role="form" style="font: 13px '微软雅黑'">
                                <div class="form-group">
                                    <label for="txtMobile">输入您的手机号码</label>
                                    <input type="text" class="form-control" id="txtMobile" placeholder="Enter Phone Number">
                                </div>
                                <div class="form-group">
                                    <label for="txtMobilePwd">输入密码</label>
                                    <input type="password" class="form-control" id="txtMobilePwd" placeholder="Password">
                                </div>
                                <div class="form-group">
                                    <label for="txtMobileYzm">输入验证码</label>
                                    <div style="display: flex;">
                                    <input type="text" class="form-control" id="txtMobileYzm" placeholder=""/>
                                    <input type="button" onclick="getYzm()"  style="margin-left:10px;width:30%;" class="btn-info form-control" id="btnMobileYzm" value="获取验证码"/>
                                    </div>
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="regMobileBox" checked /> 同意<a href="privacy.jsp" target="_blank">《趣宝盆隐私条款》</a>
                                    </label>
                                </div>
                                <button onclick="regByMobile()" type="button" class="btn btn-primary">注册</button>
                                <a href="login.jsp">已经有账号？点此登录</a>
                            </form>
                        </div>

                        <div class="tab-pane" id="email">
                            <br/>
                            <form role="form" style="font: 13px '微软雅黑'">
                                <div class="form-group">
                                    <label for="txtEmail">输入您的电子邮箱</label>
                                    <input type="email" class="form-control" id="txtEmail" placeholder="Enter email">
                                </div>
                                <div class="form-group">
                                    <label for="txtEmailPwd">输入密码</label>
                                    <input type="password" class="form-control" id="txtEmailPwd" placeholder="Password">
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="regEmailBox" checked > 同意<a href="privacy.jsp" target="_blank">《趣宝盆隐私条款》</a>
                                    </label>
                                </div>
                                <button onclick="regByEmail()" type="button" class="btn btn-primary">注册</button>
                                <a href="login.jsp">已经有账号？点此登录</a>
                            </form>
                        </div>

                    </div>



                </div>
            </div>

        </div>
        <div class="col-xs-1" style="width:10px;text-align: center;">
            <div class="regDivider">
            <div></div>
            <div></div>
            </div>
        </div>
        <%--<div class="col-xs-4 thumbnail">--%>
            <%--<div class="row">--%>
                <%--<div class="col-xs-offset-1 col-xs-11">--%>
                    <%--<br/>--%>
                    <%--<div class="divTitle">使用合作者账号登陆趣宝盆</div>--%>
                    <%--<ul class="ulCorp">--%>
                        <%--<li><a href="https://api.weibo.com/oauth2/authorize?response_type=code&amp;client_id=531021288&amp;redirect_uri=http%3A%2F%2Fwww.diaoyanbao.com%2Fsignup%2Fsina"><img src="images/l-sina.png" alt="新浪微博登录" width="120" height="24"></a></li>--%>
                        <%--<li><a href="http://openapi.qzone.qq.com/oauth/show?which=ConfirmPage&amp;response_type=code&amp;client_id=100277792&amp;redirect_uri=http%3A%2F%2Fwww.diaoyanbao.com%2Fsignup%2Fqq&amp;scope=get_user_info,get_info,add_t,add_pic_t,add_share"><img src="images/l-qq.png" alt="QQ账号登录" width="120" height="24"></a></li>--%>
                        <%--<li><a href="https://mapi.alipay.com/gateway.do?_input_charset=utf-8&amp;target_service=user.auth.quick.login&amp;sign_type=MD5&amp;service=alipay.auth.authorize&amp;partner=2088701559561780&amp;return_url=http%3A%2F%2Fwww.diaoyanbao.com%2Fsignup%2Falipay&amp;sign=439baa24658e83a1e274b8d2e5a10083"><img src="images/l-alipay.png" alt="支付宝快捷登录" width="120" height="27"></a></li>--%>
                        <%--<li><a href="http://app.hichina.com/toapp/100050"><img src="images/l-wanw.png" alt="万网登录" width="120" height="27"></a></li>--%>
                        <%--<li><a href="null?response_type=code&amp;client_id=null&amp;redirect_uri=null"><img src="images/l-jd.gif" alt="京东登录" width="120" height="24"></a></li>--%>
                        <%--<li><a href="login/taobao"><img width="120" height="24" alt="淘宝卖家登录" src="images/l-taobao.gif"></a></li>--%>
                    <%--</ul>--%>

                    <%--<br/>--%>
                    <%--<div class="divTitle">使用合作账户授权登录即表示您同意我们的使用条款和隐私权政策</div>--%>
                <%--</div>--%>
            <%--</div>--%>

        <%--</div>--%>
    </div>
</div>


<%@include file="dibu.jsp"%>

</body>
</html>
