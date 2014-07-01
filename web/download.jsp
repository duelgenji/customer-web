<html>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
    <title>趣宝盆</title>
    <%--<meta name="viewport" content="width=device-width, initial-scale=1.0">--%>
    <!-- Bootstrap -->
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!-- Include all compiled plugins (below), or include individual files as needed -->

    <!--[endif]-->
    <%@include file="package.jsp"%>

    <script type="text/javascript">
        $(document).ready(function () {



        });

    </script>
</head>
<style>
    .header{
        height:120px;
    }
    .wrapper{
        margin: 0 auto;
        overflow: hidden;
        height: 120px;
        position: relative;
    }
    .mobile-banner {
        display: block;
        position: relative;
        height: 400px;
        background: #89776a url("images/btn/banner.jpg") center top no-repeat;
    }

    .btn-iphone{
        display: inline-block;
        width: 186px;
        height: 57px;
        background-image: url("images/btn/ip.png");
        background-repeat: no-repeat;
    }
    .btn-iphone:hover{
        background-image: url("images/btn/ip hl.png");
        background-repeat: no-repeat;
    }
    .btn-iphone:active{
        background-image: url("images/btn/ip t.png");
        background-repeat: no-repeat;
    }
    .btn-android{
        display: inline-block;
        width: 186px;
        height: 57px;
        background-image: url("images/btn/and.png");
        background-repeat: no-repeat;
    }
    .btn-android:hover{
        background-image: url("images/btn/and hl.png");
        background-repeat: no-repeat;
    }
    .btn-android:active{
        background-image: url("images/btn/and t.png");
        background-repeat: no-repeat;
    }
    #lead_content{
        padding-top: 50px;
    }

    #header{
        height: 50px;
    }
    .light-text{
        font-family: "microsoft yahei";
    }
    .light-text30{
        font-size: 30px;
        color: #428bca;
    }
    .light-text20{
        font-size: 20px;
        color: #009dd9;
    }
    .blue-bg{
        background-color: #00A1E9;
    }
    .white-txt{
        padding-top:80px;
        color:#fff;
    }
    .blue-txt{
        padding-top:80px;
        color:#009dd9;
    }
    .custom-push-left-6{
        left:4%;
    }


    .navbar-blue{
        background-image: -webkit-gradient(linear, left 0%, left 100%, from(#428bca), to(#009dd9));
        background-image: -webkit-linear-gradient(top, #428bca 0%, #009dd9 100%);
        background-image: -moz-linear-gradient(top, #428bca 0%, #009dd9 100%);
        background-image: linear-gradient(to bottom, #428bca 0%, #009dd9 100%);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff428bca', endColorstr='#ff009dd9', GradientType=0);
        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
    }
    .navbar-default .navbar-brand {
        font-family: "microsoft yahei";
        color: #fff;
    }
    .navbar-default .navbar-brand:hover{
        color:#fff;
    }
</style>
<body>
<div class="mobile-banner">

    <div class="container text-center" id="lead_content">
        <a href="/" id="logo_link">
            <img src="images/logo_96.png" alt="趣宝盆" class="downscale-fit" id="logo" >
        </a>
        <h1 class="light-text light-text30">
            <span >趣宝盆</span>
        </h1>
        <h2 class="light-text light-text20">
            开心做测试，幸运赢大奖！
        </h2>
        <a class="btn-iphone" href="https://itunes.apple.com/app/id729136011" ></a>
        <a class="btn-android" href="javascript:void(0)" onclick="window.open('install/latest/qubaopen.apk')" ></a>

    </div>

</div>
<div class="mini-feature blue-bg">
    <div class="container">
        <div class="row mtx mbx">
            <div class="col-md-6 col-md-push-6 white-txt">
                <h2>换奖品，赚现金</h2>
                <h3 class="feature-subtitle dark-text">
                    等车无聊？等位无聊？
                </h3>
                <p class="lead mts">
                    快来趣宝盆吧！这里有好玩的趣味测试，报酬丰厚的调研，让你利用“无聊”时间来赚钱。还有最酷炫的奖品，每天都收获满满。
                    <br>
                </p>
            </div>
            <div class="col-md-6 col-md-pull-6 mtm text-center">
                <img width="225"  height="400" alt="Smart alerts and notifications" class="downscale-fit" src="images/btn/t1.png">
            </div>
        </div>
    </div>
</div>
<div class="mini-feature white-bg">
    <div class="container">
        <div class="row mtx mbx">
            <div class="custom-push-left-6 col-md-6 blue-txt">
                <h2>天天热门话题</h2>
                <h3 class="feature-subtitle dark-text">生活没乐趣？聊天缺话题？</h3>
                <p class="lead mts">
                    这里不仅参与讨论每天最热门的话题，还可以与大家分享自己发布的话题！让你开心乐不停！
                    <br>

                </p>
            </div>
            <div class="col-md-6 mtm text-center">
                <img width="225"  height="400" alt="Smart alerts and notifications" class="downscale-fit" src="images/btn/t2.png">
            </div>
        </div>
    </div>
</div>
<div class="mini-feature blue-bg">
    <div class="container">
        <div class="row mtx mbx">
            <div class="col-md-6 col-md-push-6 white-txt">
                <h2>与好友互动</h2>
                <h3 class="feature-subtitle dark-text">
                    一个人做测试太寂寞？
                </h3>
                <p class="lead mts">
                    在趣宝盆可以叫上您的好友一起玩，邀请好友不仅能看看Ｔａ的另一面，还能让Ｔａ帮你打工，从此当土豪不是梦！还等什么快来下载趣宝盆吧！注册还送百元现金红包哦！<br>
                </p>
            </div>
            <div class="col-md-6 col-md-pull-6 mtm text-center">
                <img width="225"  height="400" alt="Smart alerts and notifications" class="downscale-fit" src="images/btn/t3.png">
            </div>
        </div>
    </div>
</div>
</body>
</html>

</body>

<footer style="background-color: #fff;color: #000">
    <div class="container" style="width: 100%;">
        <br/>


        <div class="row">
            <div style="text-align: center">
                © 2012-2013 All rights reserved 上海众创商务咨询有限公司 沪ICP备10202509号-2
            </div>
        </div>
        <br/>
        <div style="text-align: center;padding-bottom: 20px">
            <a href="http://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&amp;entyId=201309171611156"><img src="images/icon.gif" border="0"></a>

        </div>
    </div>
    <script src="js/footer.js"></script>
</footer>
</html>