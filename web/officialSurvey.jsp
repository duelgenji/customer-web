<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-12-12
  Time: 下午12:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>趣宝盆</title>
    <script src="js/jquery-1.9.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/qbpcss.css" rel="stylesheet">
    <script src="js/qbpjs/utils.js"></script>
    <script src="js/qbpjs/surveyList.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            //头部导航变色
            $("#myNav li:eq(2)").toggleClass("active");


            //默认加载页面
            loadAllOfficialSurvey(1,10,"");

        });

        $(document).on("click","#page li",function(){
            var iPage=$(this).attr("data-page");
            var iEachPageItems=$("#surveyList li").length;
            if(iPage){
                loadAllOfficialSurvey(iPage,iEachPageItems,"");
            }
            return;
        });



    </script>


</head>
<body>
<%@include file="toubu.jsp"%>


<div class="center" style="width: 95%;margin: 10px auto;">
    <div class="row">
        <div class="col-xs-offset-1 col-xs-10">
            <ol class="breadcrumb">
                <li><a href="shouye.jsp">首页</a></li>
                <li><a href="wenjuanku.jsp">问卷库</a></li>
                <li class="active">模板问卷</li>
            </ol>
        </div>
    </div>
    <div class="row">

        <div class="col-xs-3 pull-left">
            <script type="text/javascript">
                $(document).ready(function () {
                    var iType=getParameter("type");
                    if(iType){
                        $(".nav-list li:eq("+(iType)+")").toggleClass("active");
                    }
                    else{
                        $(".nav-list li:eq(0)").toggleClass("active");
                    }

                    //默认加载页面
                    loadAllOfficialSurvey(1,10,iType);
                });

            </script>

            <div id="leftMenu" class="well sidebar-nav">
                <div class="nav-list">模板问卷</div>
                <ul class="nav nav-list">
                    <li><a href="officialSurvey.jsp">所有类型</a></li>
                    <li><a href="officialSurvey.jsp?type=1">电子商务</a></li>
                    <li><a href="officialSurvey.jsp?type=2">市场调查</a></li>
                    <li><a href="officialSurvey.jsp?type=3">客户调查</a></li>
                    <li><a href="officialSurvey.jsp?type=4">人力资源</a></li>
                    <li><a href="officialSurvey.jsp?type=5">校园调查</a></li>
                    <li><a href="officialSurvey.jsp?type=6">其他</a></li>
                </ul>
            </div>
        </div>
        <div class="col-xs-9">

            <div class="panel panel-default">
                <div class="panel-heading">
                    <span class="panel-title">模板问卷</span>
                </div>
                <ul class="list-group" id="surveyList">
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


            <ul id="page" class="pagination pagination-sm">
                <li class="disabled"><span>&laquo;</span></li>
                <li class="active"><span>1</span></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li class="disabled"><span>...</span></li>
                <li><a href="#">10</a></li>
                <li><a href="#">&raquo;</a></li>
            </ul>
        </div>
    </div>
</div>
<%@include file="dibu.jsp"%>

</body>
</html>