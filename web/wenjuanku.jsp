<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-11-18
  Time: 上午11:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>趣宝盆</title>
    <%@include file="package.jsp"%>
    <script src="js/qbpjs/surveyList.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            //头部导航变色
            $("#myNav li:eq(2)").toggleClass("active");

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

            //分别获取2个列表
            loadSurveyIndexList();



            $(document).on("click touchend",".list-group-item",function(){
                var iSid=$(this).attr("data-sid");
                if($(this).closest("ul").attr("id")=="surveyList_g"){
                    $().redirect('doSurvey.jsp',{'qid': iSid},"get");
                }
            });

        });

    </script>
    <style>
        /*标题栏的更多*/
        .panel-heading > span > a{
            color: #999;
            text-decoration: none;
        }
        .panel-heading > span > a:hover{
            color: #009dd9;
        }
        /*列表中的问卷标题*/
        .list-group-item >h4:hover{
            color: #009dd9;
            cursor: pointer;
        }

    </style>

</head>
<body>
<%@include file="toubu.jsp"%>


<div class="center" style="width: 95%;margin: 10px auto;">
    <div class="row">
        <div class="col-xs-offset-1 col-xs-10">
            <ol class="breadcrumb">
                <li><a href="shouye.jsp">首页</a></li>
                <li class="active">问卷库</li>
            </ol>
        </div>
    </div>

    <div class="row">

        <div class="col-xs-3 pull-left">
            <%@include file="surveycenterleftmenu.jsp"%>
        </div>
        <div class="col-xs-9">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <span class="panel-title">公开问卷</span>
                    <span style="float: right;"><a href="publicSurvey.jsp">更多</a></span>
                </div>
                <ul class="list-group"  id="surveyList_g">
                    <li class="list-group-item">
                        <h4>大学生消费观调查问卷</h4>
                        <span>分类：学术教育 | 作者：问卷网 | 被引用次数：895</span>
                    </li>
                    <li class="list-group-item">
                        <h4>企业员工满意度调查</h4>
                        <span>分类：人力资源 | 作者：问卷网 | 被引用次数：420</span>
                    </li>
                    <li class="list-group-item">
                        <h4>中学生上网情况问卷调查</h4>
                        <span>分类：学术教育 | 作者：问卷网 | 被引用次数：553</span>
                    </li>
                    <li class="list-group-item">
                        <h4>汽车广告投放效果调查问卷</h4>
                        <span>分类：品牌营销 | 作者：问卷网 | 被引用次数：547</span>
                    </li>
                    <li class="list-group-item">
                        <h4>大学生就业意向调查问卷</h4>
                        <span>分类：学术教育 | 作者：问卷网 | 被引用次数：528</span>
                    </li>
                </ul>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <span class="panel-title">模板问卷</span>
                    <span style="float: right"><a href="officialSurvey.jsp">更多</a></span>
                </div>
                <ul class="list-group" id="surveyList_m">
                    <li class="list-group-item" >
                        <h4>大学生消费观调查问卷</h4>
                        <span>分类：学术教育 | 作者：问卷网 | 被引用次数：895</span>
                    </li>
                    <li class="list-group-item">
                        <h4>企业员工满意度调查</h4>
                        <span>分类：人力资源 | 作者：问卷网 | 被引用次数：420</span>
                    </li>
                    <li class="list-group-item">
                        <h4>中学生上网情况问卷调查</h4>
                        <span>分类：学术教育 | 作者：问卷网 | 被引用次数：553</span>
                    </li>
                    <li class="list-group-item">
                        <h4>汽车广告投放效果调查问卷</h4>
                        <span>分类：品牌营销 | 作者：问卷网 | 被引用次数：547</span>
                    </li>
                    <li class="list-group-item">
                        <h4>大学生就业意向调查问卷</h4>
                        <span>分类：学术教育 | 作者：问卷网 | 被引用次数：528</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<%@include file="dibu.jsp"%>

</body>
</html>