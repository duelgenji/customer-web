<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 14-2-28
  Time: 下午2:43
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>趣宝盆</title>

    <%@include file="package.jsp"%>
    <link rel="stylesheet" href="css/jquery-ui.css"/>
    <link href="css/boot.css" rel="stylesheet">
    <link href="css/editsurvey.css" rel="stylesheet">
    <script src="js/jquery-ui.js" type="text/javascript"></script>
    <script src="js/qbpjs/editLogic.js"></script>
    <script src="js/qbpjs/utils.js"></script>
    <script type="text/javascript">

        window.onload=function(){
            var sTitle="";
            var sType="";
            var sid="";
            sTitle='<%=request.getParameter("title")!=null?request.getParameter("title"):""%>';
            sType='<%=request.getParameter("type")!=null?request.getParameter("type"):""%>';
            sid='<%=request.getParameter("iWjId")!=null?request.getParameter("iWjId"):""%>';


            if(getParameter("qid")){
                loadSurvey();
            }else{
                alertify.alert("请先指定问卷");
            };

            if(sTitle!=""){
                if(sTitle.length>=10){
                    $("#sTitle").empty().append(sTitle.substring(0,10)+"...");
                }
                else{
                    $("#sTitle").empty().append(sTitle);
                }
                $("#sTitle").attr("title",sTitle);

            }
            if(sType!=""){
                $("#sType").val(sType);
            }

        }

    </script>
    <style>
        .choicediv input[type=radio],.choicediv input[type=checkbox]{
            vertical-align: -2px;
        }
        .choicediv .singleChoice,.choicediv .multiChoice{
            margin-left: 10px;
        }
    </style>

</head>
<body>
<%@include file="toubu.jsp"%>



<div class="center" style="font-family:'microsoft yahei';display:block;min-height:450px;width: 80%;margin: 10px auto;">

<div id="loadingDiv" style="position:fixed;top:45%;left:50%;z-index:999;"></div>
<ol class="breadcrumb">
    <li><a href="shouye.jsp">首页</a></li>
    <li><a href="mySurveyList.jsp">我的问卷</a></li>
    <li  class="active">创建</li>
</ol>
<ul class="nav nav-tabs">
    <li style="width: 126.275px;"><a href="editsurvey.jsp" class="tv"><div id="id16"></div>设计问卷</a></li>
    <li class="active" style="width: 126.275px;"><a href="javascript:void(0)"  class="books"><div id="id15"></div>逻辑设置</a></li>
    <li style="width: 126.275px;"><a href="javascript:void(0)" onclick="doSpin()" class="music"><div id="id11"></div>预览问卷</a></li>
    <li style="width: 126.275px;"><a href="#video" class="video"><div id="id12"></div>发布问卷</a></li>
    <li style="width: 126.275px;"><a href="analyzeSurvey.jsp" class="movies"><div id="id13"></div>问卷分析</a></li>
</ul>
<div class="jumbotron createcontent">
    <div id="createTab" style="min-height: 200px;">

        <div class="createTabs">
            <div id="surveyOption" class="row">
                <div class="col-xs-3">
                    <div class="surveyTitle" id="sTitle" title="ad">无标题</div>
                </div>
                <div class="col-xs-2">
                    <select class="form-control" id="sQuestion">
                        <option value="1">电子商务</option>
                        <option value="2">市场调查</option>
                        <option value="3">客户调查</option>
                        <option value="4">人力资源</option>
                        <option value="5">校园调查</option>
                        <option value="6">其他</option>
                    </select>
                </div>

                <div class="col-xs-offset-1 col-xs-3" style="font-size: 12px;">
                    <a href="javascript:void(0)" id="btnAddLogic" role="button" class="btn btn-primary btn-md">
                        <span style="top:2px;" class="glyphicon glyphicon-plus-sign"></span> 创建逻辑
                    </a>
                </div>


            </div>

        </div>


    </div>

</div>

</div>
<%@include file="dibu.jsp"%>

</body>
</html>




