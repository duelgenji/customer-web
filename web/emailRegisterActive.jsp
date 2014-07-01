<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-12-11
  Time: 下午2:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.qubaopen.survey.domain.Customer" %>
<%@ page import="com.qubaopen.survey.sessiondomain.CustomerSession" %>
<html>
<head>
    <title>趣宝盆邮箱验证</title>
    <%@include file="package.jsp"%>
    <script src="js/ajaxRequest.js"></script>
</head>
<body>

<div class="header">
    <div class="wrapper" >
        <div class="row">
            <div  class="col-md-offset-8 col-md-4">
            </div>
        </div>
        <div class="row show-grid">
            <div class="col-md-2 col-md-offset-1 logo">
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
        <div class="col-lg-offset-1 col-lg-10">
            <div class="page-header" style="margin-top: 10px;">
                <h2 class="qbpFont">邮箱验证</h2>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-offset-2 col-xs-8">
            <div class="jumbotron qbpFont txtCenter">
                <h2 class="qbpFont">您的邮箱地址:<span id="myEmail" class="txtColor-primary"></span></h2>
                <p>点击邮件里的验证链接即可登陆趣宝盆</p>
                <p><a class="btn btn-primary btn-lg" onclick="goToMail()" role="button">立即查看邮箱</a></p>

            </div>
            <h5 class="qbpFont">通常情况下，激活邮件2分钟内会发送到您的邮箱，如暂时没有收到请稍后查看；</h5>
            <h5 class="qbpFont">如果长时间没收到邮件，点击<a onclick="resendEmail()" href="javascript:void(0);">重新发送</a>；</h5>
            <h5 class="qbpFont"> 如遇到其他问题请<a href="contact.jsp">联系我们</a>。</h5>
        </div>

    </div>
</div>
<%@include file="dibu.jsp"%>

<script type="text/javascript">
    var sTempMail="";
    <%
    Object obj=request.getSession().getAttribute("TEMPSESSIONCUSTOMEROBJ");
    String name="";
       if(obj!=null)
       name=((CustomerSession)obj).getUsername();
    %>
    sTempMail = '<%=name%>';
    if(sTempMail){
        document.getElementById("myEmail").innerHTML=sTempMail;
    }
    else{
        //没有取到邮箱字段 跳转至注册
        location.href="register.jsp";
    }
    var aMailList = new Array();
    aMailList.push({mail : '0355.net', domain : 'mail.0355.net'});
    aMailList.push({mail : '126.com', domain : 'mail.126.com'});
    aMailList.push({mail : '163.com', domain : 'mail.163.com'});
    aMailList.push({mail : '163.net', domain : 'mail.163.net'});
    aMailList.push({mail : '21cn.com', domain : 'mail.21cn.com'});
    aMailList.push({mail : '263.com', domain : 'mail.263.com'});
    aMailList.push({mail : '263.net', domain : 'mail.263.net'});
    aMailList.push({mail : '56.com', domain : 'www.56.com'});
    aMailList.push({mail : 'aim.com', domain : 'mail.aim.com'});
    aMailList.push({mail : 'aol.com', domain : 'mail.aol.com'});
    aMailList.push({mail : 'ask.com', domain : 'www.ask.com'});
    aMailList.push({mail : 'chinaren.com', domain : 'mail.chinaren.com'});
    aMailList.push({mail : 'citiz.net', domain : 'mail.citiz.net'});
    aMailList.push({mail : 'eyou.com', domain : 'www.eyou.com'});
    aMailList.push({mail : 'gmail.com', domain : 'mail.google.com'});
    aMailList.push({mail : 'googlemail.com', domain : 'mail.google.com'});
    aMailList.push({mail : 'hotmail.com', domain : 'mail.hotmail.com'});
    aMailList.push({mail : 'inbox.com', domain : 'mail.inbox.com'});
    aMailList.push({mail : 'live.com', domain : 'mail.live.com'});
    aMailList.push({mail : 'mail.com', domain : 'www.mail.com'});
    aMailList.push({mail : 'msn.com', domain : 'mail.msn.com'});
    aMailList.push({mail : 'qq.com', domain : 'mail.qq.com'});
    aMailList.push({mail : 'sina.com', domain : 'mail.sina.com'});
    aMailList.push({mail : 'sina.com.cn', domain : 'mail.sina.com.cn'});
    aMailList.push({mail : 'sogou.com', domain : 'mail.sogou.com'});
    aMailList.push({mail : 'sohu.com', domain : 'mail.sohu.com'});
    aMailList.push({mail : 'tom.com', domain : 'mail.tom.com'});
    aMailList.push({mail : 'yahoo.com', domain : 'mail.yahoo.com'});
    aMailList.push({mail : 'yahoo.com.cn', domain : 'mail.yahoo.com.cn'});
    aMailList.push({mail : 'yeah.net', domain : 'mail.yeah.net'});
    aMailList.push({mail : 'chinaemail.com.cn', domain : 'www.chinaemail.com.cn'});
    aMailList.push({mail : 'inbox.com', domain : 'mail.inbox.com'});
    aMailList.push({mail : 'cashq.ac.cn', domain : 'mail.cashq.ac.cn'});
    aMailList.push({mail : 'mytianhui.com', domain : 'mail.mytianhui.com:9000'});
    aMailList.push({mail : 'diaoyanboa.com', domain : 'www.diaoyanboa.com'});

    var oMailResultMap = {};
    $(document).ready(function() {
        if(checkEmailNormal()){
            $('#gotoMailUrl').show();
        }else{
            $('#showMailMsg').html('请登陆您的邮件系统，点击激活链接激活账号。');
        }
    });
    function resendEmail(){
        //重新发送
    }
    function goToMail(){
        window.open('http://' + oMailResultMap[sTempMail]);
    }
    function checkEmailNormal(){
        var bFlag = false;
        if(aMailList != null){
            for(var i=0; i<aMailList.length; i++){
                if(aMailList[i].mail != '' && sTempMail.indexOf('@'+aMailList[i].mail) > 0){
                    bFlag = true;
                    oMailResultMap[sTempMail] = aMailList[i].domain;
                    break;
                }
            }
        }
        return bFlag;
    }
</script>
</body>
</html>
