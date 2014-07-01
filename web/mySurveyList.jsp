<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-11-18
  Time: 下午5:03
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>趣宝盆</title>
    <%@include file="package.jsp"%>
    <link href="css/boot.css" rel="stylesheet">
    <script src="js/qbpjs/mySurveyList.js"></script>
    <script src="js/zclip/jquery.zclip.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            //头部导航变色
            $("#myNav li:eq(1)").toggleClass("active");

            $("div.nav-list").click(function(){
                var _this=this;
                $(_this).next().slideToggle();
                $(_this).children("span").toggleClass("glyphicon-plus glyphicon-minus");
            });
            $(".nav-list li").click(function(){
                var _this=this;
                $("#leftMenu li.active").toggleClass("active");
                $(_this).toggleClass("active");
            });
            loadUserSurveyList();


        });

    </script>
    <style>
        .table tr{
            font: 14px "microsoft yahei";
        }
        .table td{
            cursor: default;
        }
        .table .glyphicon,.table td:first-child{
            cursor: pointer;
        }
        .table .glyphicon:hover{
            cursor: pointer;
            color: #009dd9;
        }
        .table .glyphicons:hover{
            cursor: pointer;
            color: #009dd9;
        }
    </style>


</head>
<body>
<%@include file="toubu.jsp"%>


<div id="loadingDiv" style="position:fixed;top:45%;left:50%;z-index:999;"></div>

<div class="center" style="min-height:450px;width: 80%;margin: 10px auto;">

                <ol class="breadcrumb">
                <li><a href="#">首页</a></li>
                <li  class="active">我的问卷</li>

                </ol>

                <a href="createsurvey.jsp" role="button" class="btn btn-primary btn-md">
                    <span style="top:2px;" class="glyphicon glyphicon-plus-sign"></span> 新建问卷
                </a>
    <table class="table table-striped">
        <thead>
        <tr>
            <th style="width: 30%">问卷标题</th>
            <th style="width: 15%">创建时间
                <div style="font-size:12px;display: inline-block;">
                    <span title="排序" class="glyphicon glyphicon-chevron-up"></span>
                    <span title="排序" class="glyphicon glyphicon-chevron-down"></span>

                </div>
            </th>
            <th style="width: 15%">最后编辑时间</th>
            <th style="width: 10%">问卷状态</th>
            <th style="width: 10%">答卷数量</th>
            <th>动作</th>
        </tr>
        </thead>
        <tbody id="surveyList">

        <tr><td>　</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>　</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>　</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>　</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>　</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>　</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>　</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>　</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>　</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>　</td><td></td><td></td><td></td><td></td><td></td></tr>
        <%--<tr>--%>
        <%--<td>广告效果测试问卷调查</td>--%>
        <%--<td>2013-10-10</td>--%>
        <%--<td>1月前</td>--%>
        <%--<td>50</td>--%>
        <%--<td><span title="编辑" class="glyphicon glyphicon-edit"></span>--%>
        <%--&nbsp;<span title="预览" class="glyphicon glyphicon-eye-open "></span>--%>
        <%--&nbsp;<span title="统计" class="glyphicon glyphicon-stats"></span>--%>
        <%--&nbsp;<span title="删除" class="glyphicon glyphicon-trash"></span>--%>
        <%--</td>--%>
        <%--</tr>--%>
        <%--<tr>--%>
            <%--<td>大学生就业问卷调查</td>--%>
            <%--<td>2013-11-14</td>--%>
            <%--<td>5天前</td>--%>
            <%--<td>135</td>--%>
            <%--<td><span title="编辑" class="glyphicon glyphicon-edit"></span>--%>
                <%--&nbsp;<span title="预览" class="glyphicon glyphicon-eye-open "></span>--%>
                <%--&nbsp;<span title="复制" class="glyphicons more_items"></span>--%>
                <%--&nbsp;<span title="统计" class="glyphicon glyphicon-stats"></span>--%>
                <%--&nbsp;<span title="删除" class="glyphicon glyphicon-trash"></span>--%>
            <%--</td>--%>
        <%--</tr>--%>
        <%--<tr>--%>
            <%--<td>企业员工满意度调查</td>--%>
            <%--<td>2013-11-19</td>--%>
            <%--<td>刚刚</td>--%>
            <%--<td>12</td>--%>
            <%--<td><span title="编辑" class="glyphicon glyphicon-edit"></span>--%>
                <%--&nbsp;<span title="预览" class="glyphicon glyphicon-eye-open "></span>--%>
                <%--&nbsp;<span title="复制" class="glyphicons more_items"></span>--%>
                <%--&nbsp;<span title="统计" class="glyphicon glyphicon-stats"></span>--%>
                <%--&nbsp;<span title="删除" class="glyphicon glyphicon-trash"></span>--%>
            <%--</td>--%>
        <%--</tr>--%>
        </tbody>
    </table>
    <ul id="page" class="pagination pagination-sm">

    </ul>


</div>
<%@include file="dibu.jsp"%>

</body>
</html>