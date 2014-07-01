<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-11-16
  Time: 下午4:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
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

            $(".hdr-li").click(function(){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
            });
            $(document).on("click","button",function(){
                $("#hdr").attr("class","hdr "+$(this).attr("id"));
            });
            //头部导航变色
            $("#myNav li:eq(0)").toggleClass("active");

            //首页幻灯片用
            $("#myCarousel").carousel();


        });

    </script>
</head>
<body>

<jsp:include page="toubu.jsp" flush="true" />

<div id="myCarousel" class="carousel slide">
    <ol class="carousel-indicators" data-interval="5000" >
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
        <li data-target="#myCarousel" data-slide-to="3"></li>
    </ol>
    <!-- Carousel items -->
    <style>
        .odd{
            background-color: #eff0f3;
        }
        .even{
            background-color: #25374e;
        }
    </style>
    <div class="carousel-inner odd">
        <div class="active item odd">
            <img style="margin:0 auto;" width="601px" height="401px" src="images/khxt_index1.jpg"/>
        </div>
        <div class="item even">
            <img style="margin:0 auto;" width="601px" height="401px"  src="images/khxt_index2.jpg"/>
        </div>
        <div class="item odd">
            <img style="margin:0 auto;" width="601px" height="401px"  src="images/khxt_index3.jpg"/>
        </div>
        <div class="item even">
            <img style="margin:0 auto;" width="601px" height="401px"  src="images/khxt_index4.jpg"/>
        </div>
    </div>
    <!-- Carousel nav -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
</div>

<div class="container">
    <!-- Example row of columns -->
    <div class="row">
        <div style="margin-left: 4%" class="col-xs-3 upcon">
            <h3>趣测试</h3>
            <p>用户通过做各种兴趣测试来获取积分，积累一定的积分值可以进行抽奖。 </p>
            <p><a class="btn btn-primary" href="#" role="button">立即去测试 »</a></p>
        </div>
        <div class="col-xs-offset-1 col-xs-3 upcon">
            <h3>趣调研</h3>
            <p>用户通过做各种调研问卷来获取金币，积累一定的金币可以进行<b>兑奖</b>。 </p>
            <p><a class="btn btn-primary" href="#" role="button">立即去调研 »</a></p>
        </div>
        <div class="col-xs-offset-1 col-xs-3 upcon">
            <h3>趣兑奖</h3>
            <p>用户通过在趣宝盆玩耍获得积分或者金币之后，可以用其抽奖或者直接进行兑奖。</p>
            <p><a class="btn btn-primary" href="#" role="button">立即去兑奖 »</a></p>
        </div>
    </div>
</div>


              <br/>
<%@include file="dibu.jsp"%>
</body>
</html>

</body>
</html>