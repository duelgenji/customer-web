<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-12-10
  Time: 下午4:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>趣宝盆验证成功</title>
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
                <h2 class="qbpFont"><span class="txtColor-primary">恭喜你，邮箱验证成功！</span></h2>
                <p><a class="btn btn-primary btn-lg" id="redirectBtn" role="button">立即返回</a></p>
                <p><span id="redirectTime">5</span>秒后自动返回首页</p>

            </div>
        </div>

    </div>
</div>


<script>
    window.onload=function(){
        var oTimer=document.getElementById("redirectTime");
        var oBtn=document.getElementById("redirectBtn");
        oBtn.onclick=function(){
            location.href="shouye.jsp";
        }

        var timer=null;
        timer=setInterval(function(){
            var iSecond=parseFloat(oTimer.innerHTML);
            if( isNaN(iSecond) || iSecond<=1){
                clearInterval(timer);
                location.href="shouye.jsp";
            }
            iSecond--;
            oTimer.innerHTML=iSecond;

        },1000);
    }

</script>


<%@include file="dibu.jsp"%>

</body>
</html>
