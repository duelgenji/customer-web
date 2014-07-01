<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-12-3
  Time: 下午3:07
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>趣宝盆</title>

    <link rel="stylesheet" href="css/jquery-ui.css"/>

    <%@include file="package.jsp"%>

    <script src="js/highcharts.src.js"></script>
    <script src="js/highcharts-more.src.js"></script>
    <script src="js/exporting.src.js"></script>
    <script src="js/qbpjs/analyzeSurvey.js"></script>
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
<%@include file="toubu.jsp"%>



<div class="center" style="font-family:'microsoft yahei';display:block;min-height:450px;width: 80%;margin: 10px auto;">

    <ol class="breadcrumb">
        <li><a href="shouye.jsp">首页</a></li>
        <li><a href="mySurveyList.jsp">我的问卷</a></li>
        <li  class="active">问卷分析</li>
    </ol>
    <ul class="nav nav-tabs">
        <li class="active"><a href="analyzeSurvey.jsp" class="movies"><div id="id13"></div>问卷分析</a></li>
    </ul>
    <div class="jumbotron createcontent">
        <div id="createTab" style="min-height: 200px;">

            <div class="row">
                <div class="col-xs-12">
                    <!--chose chart type start-->
                    <style>
                        .chartOption{
                            font:12px "microsoft yahei";
                        }
                    </style>
                    <div class="row">
                        <div class="col-xs-3 chartOption">
                            题目：
                            <select id="questionId" class="form-control">
                                <option value="1">第一题</option>
                                <option value="2">第二题</option>
                            </select>
                        </div>
                        <div class="col-xs-offset-3 col-xs-2 chartOption">
                            图标类型
                            <select id="myChartType" class="form-control">
                                <option value="1">柱状图</option>
                                <option value="2">饼图</option>
                                <option value="3">线图</option>
                                <option value="4">区域图</option>
                                <%--<option value="5">气泡图</option>--%>
                            </select>
                        </div>
                        <div class="col-xs-2 chartOption">
                            排序方式
                            <select id="sortType" class="form-control">
                                <option value="1">原选项排序</option>
                                <option value="2">从高到底</option>
                                <option value="3">从低到高</option>
                            </select>
                        </div>
                        <div class="col-xs-2 chartOption">
                            数据类型
                            <select id="dataType" class="form-control">
                                <option value="1">数值</option>
                                <option value="2">百分比</option>
                            </select>
                        </div>

                    </div>
                    <!--chose chart type end-->
                    <br/>
                    <div id="container" style="display:none;background-color:#fff;min-height:400px;max-width:98.5%;"></div>

                    <div id="answerContainer" style="background-color:#fff;">
                        <table class="table table-hover">
                            <thead><tr><th style="width: 70%">答案</th><th>提交时间</th></tr></thead>
                            <tbody id="answerList">
                            <tr><td>　</td><td> </td></tr>
                            <tr><td>　</td><td> </td></tr>
                            <tr><td>　</td><td> </td></tr>
                            <tr><td>　</td><td> </td></tr>
                            <tr><td>　</td><td> </td></tr>
                            <tr><td>　</td><td> </td></tr>
                            <tr><td>　</td><td> </td></tr>
                            <tr><td>　</td><td> </td></tr>
                            <tr><td>　</td><td> </td></tr>
                            <tr><td>　</td><td> </td></tr>
                            </tbody>
                        </table>
                        <ul id="page" class="pagination pagination-sm">

                        </ul>
                    </div>
                </div>
            </div>

        </div>



    </div>

</div>
<%@include file="dibu.jsp"%>

</body>
</html>



