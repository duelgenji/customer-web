
<%@ page contentType="text/html;charset=UTF-8" language="java" %>


<div class="header">
    <div class="wrapper" >
        <div class="row">
            <div  class="col-xs-offset-8 col-xs-4">
            </div>
        </div>
        <div class="row show-grid">
            <div class="col-xs-2 col-xs-offset-1 logo">
                <a href="shouye.jsp" style="">
                    <img src="images/logot.png" width="180px" />

                </a>
            </div>
            <div class="col-xs-5">
                <div class="hdr-ul header-hdr">
                    <ul class="nav nav-pills" id="myNav">
                        <li><a href="shouye.jsp">首页</a></li>
                        <li><a href="mySurveyList.jsp">我的问卷</a></li>
                        <li><a href="wenjuanku.jsp">问卷库</a></li>
                        <li><a href="contact.jsp">帮助</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-offset-1 col-xs-3 easyLog">

                <a href="login.jsp" class="navbar-link">登录</a>
                <a class="devider"></a>
                <a href="register.jsp" class="navbar-link">注册</a>


                <a href="javascript:void(0);" class="navbar-link">
                 </a>
                <a class="devider"></a>
                <a href="javascript:void(0);" onclick="userLogout()" class="navbar-link">退出</a>



            </div>
        </div>
    </div>
</div>