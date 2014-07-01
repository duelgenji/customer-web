<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-12-10
  Time: 上午10:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>趣宝盆-关于我们</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <%@include file="package.jsp" %>
    <script type="text/javascript">
        $(document).ready(function () {
            //头部导航变色
            $("#footerLeftMenu .nav-list:eq(0) a").addClass("active");
        });

    </script>
</head>
<body>

<%@include file="toubu.jsp" %>


<div class="center footerCenter">
    <div class="row">

        <div class="col-xs-offset-1 col-xs-2">
            <%@include file="footerLeftMenu.jsp"%>
        </div>
        <div class="col-xs-8">
            <div class="panel panel-frozen">
                <div class="panel-heading">
                    <span class="panel-title">关于我们</span>
                </div>
                <div class="youwenben">

                    <br>
                    <br>
                    <p>　　趣宝盆介绍：趣宝盆，国内极具有人气和影响力的测试类网站。公司创立于2013年7月。</p>


                    <p>　　趣宝盆文化：合力创造有趣的互联网应用 </p>

                    <p>　　趣宝盆团队：刘董等等  </p>

                    <p>　　趣宝盆之路：趣宝盆大事记1  2013年9月 趣宝盆正式上线   </p>

                    <div style="height: 30px"></div>

                </div>
            </div>
        </div>
    </div>
</div>

<%@include file="dibu.jsp" %>
</body>
</html>
