<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-11-8
  Time: 下午5:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>

    <script src="js/jquery-1.9.1.js" type="text/javascript"></script>
    <script src="js/raphael.js" type="text/javascript"></script>
    <style type="text/css">
            /*深蓝 #192636   rgb 25 38 55*/
            /*天蓝 #3BC0FF   rgb 59 192 255*/
            /*绿   #99CD3E   rgb 153 205 62*/
        body{
            margin: 0;
            background-color: #192636;
        }
        .hdr{
            font: 16px "微软雅黑";
            background: -webkit-gradient(linear, left top, left bottom, from(#E3FFAB), to(#99cd3e) );
            /*background-color: #99cd3e;*/
            width: 500px;
            padding: 10px 10px 10px;
            border-radius: 5px 5px 0px 0px;
        }
        .hdr-blue{
            background: -webkit-gradient(linear, left top, left bottom, from(#5783be), to(#192637) );
            color: #c2c2c2;
            /*background-color: #99cd3e;*/

        }
        .hdr-light{
            background: -webkit-gradient(linear, left top, left bottom, from(#9ee0ff), to(#3bc0ff) );
            color: #4e4e4e;
            /*background-color: #99cd3e;*/

        }
        .con{
            width: 520px;
            font: 16px "微软雅黑";
            background-color: #ddd;
        }
        .row-th{
            background: #fff;
            border: 1px solid #ddd;
            border-bottom-style: dotted;
            vertical-align: middle;
            padding: 11px 0 8px 10px;
            overflow: hidden;
            position: relative;
        }
        .row-td{
            vertical-align: middle;
            padding: 11px 0 8px 10px;
            overflow: hidden;
            position: relative;
            background: #fff;
            border: 1px solid #ddd;
            border-bottom-style: dotted;
            border-top: 0;
        }
        .row-td:last-of-type{
            border-bottom-style: solid;
        }

        .div1
        {
            width: 500px;
            display: inline-block;
        }
        .div2
        {
            margin-top: 10px;
        }
        .hdr-ul
        {
            font: 14px "微软雅黑";
            margin-left: 220px;
        }
        .hdr-li
        {
            cursor: pointer;
            padding-left:10px;
            padding-right:10px;
            display: inline-block;
        }
        .hdr-li:hover
        {
            color: #ffffff;
            font-weight: 900;

        }
        .active{
            color: #ffffff;
            font-weight: 900;
        }

        .header{
            background-color: #192636;
            height: 100px ;
            width: 100%;
            min-width: 990px;
            border-bottom: 1px solid #9AAD9C;
            position: relative;
        }
        .wrapper{
            margin: 0 auto;
            color: #fff;
            width: 990px;
            overflow: hidden;
            position: relative;
        }
        .wrapper a{
            float: left;
            display: block;
        }
        .center{
            min-height: 500px;
            background-color: #fff;
        }
        .footer{
            background-color: #192636;
            height: 80px;
            width: 100%;
            min-width: 990px;
            position: relative;
        }
        .header-hdr{
            display: inline-block;
            margin: 65px 0 0 120px;
            font-size: 20px;
        }
        .entry{
            float: right;
            height: 80px;
            width: 180px;
        }
        .entry-top{
            font-family: "微软雅黑";}
        .entry-bottom{
            font-family: "微软雅黑";
            margin-top: 55px;
        }
        .down {
            width:auto;
            height:auto;
            background-color: #ff0007;
            position:relative;
        }


        .down b {
            margin-top: 6px;
            margin-left: 150px;
            border-color: #ff0007 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
            border-style: solid;
            border-width: 3px;
            position:absolute;
            top:7px;

            cursor: pointer;
        }




    </style>
    <script type="text/javascript">
        $(document).ready(function () {

            $(".hdr-li").click(function(){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
            });
            $(document).on("click","button",function(){
                $("#hdr").attr("class","hdr "+$(this).attr("id"));
            });

        });

    </script>
</head>
<body>
<div class="header">
    <div class="wrapper" >
        <a href="#" style="display: inline-block;">
            <svg width="202px" height="140px" version="1.1"
                 xmlns="http://www.w3.org/2000/svg">

                <defs>
                    <filter id="f1" x="0" y="0" width="200%" height="200%">
                        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0" />
                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                    </filter>
                </defs>
                <image xlink:href="images/logo.png" x="0" y="0" height="140px" width="202px"  onclick="changeurl()"  style="filter:url(#f1)"/>

            </svg>
        </a>
        <div  class="hdr-ul header-hdr">
            <div class="hdr-li active">首页</div>
            <div class="hdr-li">我的问卷</div>
            <div class="hdr-li">问卷库</div>
            <div class="hdr-li">帮助</div>
        </div>
        <div class="entry">
            <div class="entry-top">注册 | 登录</div>
            <div class="entry-bottom">+制作问卷</div>

        </div>


    </div>

</div>

<div class="center" style="">   <br/> <br/> <br/> <br/> <br/>
    <button id="hdr-default">风格1</button>
    <button id="hdr-blue">风格2</button>
    <button id="hdr-light">风格3</button>     <br/> <br/>
    <div style="background-color: orange;margin-left:126px;border-radius:10px;border:1px solid red;font:14px '微软雅黑';text-align:center;height:18px;width: 50px;margin-bottom: 10px">4300</div>
    <div class="down"><b style="margin-top: -18px"></b></div>
    <div style="background-color: orange;border:1px solid red;height:30px;width: 150px;
            display: inline-block;"></div>
    <div style="background-color: #b5b5b5;height:30px;border:1px solid #b5b5b5;width: 300px;margin-left: -8px;
            display: inline-block;"></div>
    <div style="width: 300px;height: 150px;">
    <div style="background-color: #aaaaaa;width: 100%;height: 100%">55555</div>
    </div>
    <div style="width: 300px;height: 150px;">
        <div style="background-color: #aaaaaa;max-width:100%;height: 100%;border: 2px solid red;">55555</div>
    </div>


    <?xml version="1.0" standalone="no"?>
    <svg height="60px">
        <rect x="15" y="15" width="40" height="40" fill="red">
            <set attributeName="fill" to="blue" begin="mouseover"/>
            <set attributeName="fill" to="red" begin="mouseout"/>
        </rect>
    </svg>
    <svg width="100%" height="100%" version="1.1"
         xmlns="http://www.w3.org/2000/svg">

        <defs>
            <filter id="Gaussian_Blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
        </defs>
        <image xlink:href="images/logo.png" x="0" y="0" height="500px" width="500px" style="filter:url(#Gaussian_Blur)"/>
        <rect x="50" y="50" width="300" height="100"
              style="fill:rgb(0,0,255);stroke-width:5;stroke:rgb(0,0,0)"/>
        <rect x="100" y="100" width="100" height="10"
              style="fill:rgb(0,255,255);stroke-width:1;stroke:rgb(0,0,0)"/>

    </svg>


    <script>
        var paper = Raphael(10, 50, 320, 200);
        var c1="M10 10L90 90L10 170";
        var c= paper.path(c1);
        // Creates circle at x = 50, y = 40, with radius 10
        var circle = paper.circle(50, 40, 10);
        // Sets the fill attribute of the circle to red (#f00)
        circle.attr("fill", "#f00");

        // Sets the stroke attribute of the circle to white
        circle.attr("stroke", "#fff");
        var anim = Raphael.animation({cx: 10, cy: 170}, 2e3);
        // run the given animation after 500 ms
        var anim2 = Raphael.animation({cx: 10, cy: 10}, 2e3);
        circle.animate(anim);
        circle.animate(anim2.delay(2e3)); // run the given animation after 500 ms

    </script>
    <%--<object type="application/x-shockwave-flash" width="400" height="220"--%>
            <%--wmode="transparent" data="flv/flvplayer.swf?file=test.flv">--%>
    <%--<param name="movie" value="flv/flvplayer.swf?file=test.flv" />--%>
    <%--<param name="wmode" value="transparent" />--%>
    <%--</object>--%>
    <br/>
    <div class="div1">
        <div id="hdr" class="hdr">
            <div  class="hdr-ul">
                <div class="hdr-li active">首页</div>
                <div class="hdr-li">我的问卷</div>
                <div class="hdr-li">问卷库</div>
                <div class="hdr-li">帮助</div>
            </div>
        </div>
        <div class="con">
            <div class="row-th">123123</div>
            <div class="row-td">123123</div>
        </div>
    </div>
    <div class="div2">
        <div id="hd" class="hdr">
            <div  class="hdr-ul">
                <div class="hdr-li active">首页</div>
                <div class="hdr-li">我的问卷</div>
                <div class="hdr-li">问卷库</div>
                <div class="hdr-li">帮助</div>
            </div></div>
        <div class="con">
            <div class="row-th">123123</div>
            <div class="row-td">123123</div>
        </div>
    </div>
</div>
<div class="footer"></div>
</body>
</html>