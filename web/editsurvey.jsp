<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-11-20
  Time: 下午2:52
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
    <script src="js/qbpjs/editsurvey.js"></script>
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
            }else if(sid){
                loadSurvey(sid);
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
    <li class="active" style="width: 126.275px;"><a href="editsurvey.jsp" class="tv"><div id="id16"></div>设计问卷</a></li>
    <li style="width: 126.275px;"><a href="javascript:void(0)" onclick="editLogic()" class="books"><div id="id15"></div>逻辑设置</a></li>
    <li style="width: 126.275px;"><a href="javascript:void(0)" onclick="doSpin()" class="music"><div id="id11"></div>预览问卷</a></li>
    <li style="width: 126.275px;"><a href="javascript:void(0)"  onclick="saveSurvey()"  class="video"><div id="id12"></div>发布问卷</a></li>
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
                <select class="form-control" id="sType">
                    <option value="1">电子商务</option>
                    <option value="2">市场调查</option>
                    <option value="3">客户调查</option>
                    <option value="4">人力资源</option>
                    <option value="5">校园调查</option>
                    <option value="6">其他</option>
                </select>
            </div>

            <div class="col-xs-offset-1 col-xs-3" style="font-size: 12px;">
                <p >
                    <label title="限制获取多少问卷样本。（输入0至1000的整数）" for="sLimit">答卷份数:</label>
                    <input type="text" id="sLimit" size="10" value="100" maxlength="4" style="color:#f6931f;">
                </p>
            </div>
            <div class="col-xs-3" style="font-size: 12px;">
                <p >
                    <label title="用户答题以后获得的金币数量，会从您的账户中扣除。（输入≥0的整数）" for="sCoin">每份问卷金币:</label>
                    <input type="text" id="sCoin" size="6" maxlength="4" value="0"  style="color:#f6931f;">
                </p>
            </div>

            <script>
//                $(function() {
//                    $( "#slider-range-max" ).slider({
//                        range: "min",
//                        value: 100,
//                        min: 10,
//                        max: 1000,
//                        slide: function( event, ui ) {
//                            $( "#amount" ).val( ui.value );
//                        }
//                    });
//                    $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
//                });
            </script>
        </div>
        <br/>
        <div class="row">
            <div id="leftMenu" class="well sidebar-nav col-xs-160">

                <div class="btn btn-xs btn-default" id="btnInsertSingle"  qtype="1">单选题</div>
                <div class="btn btn-xs btn-default" id="btnInsertMulti"  qtype="2">多选题</div>
                <div class="btn btn-xs btn-default" id="btnInsertQA"  qtype="3">问答题</div>
                <div class="btn btn-xs btn-default" id="btnInsertSort"  qtype="4">排序题</div>
                <div class="btn btn-xs btn-default" id="btnInsertGrade"  qtype="5">打分题</div>

            </div>
            <div id="rightRow" class="col-xs-10">
                <ul class="well" id="mainFrame" style="list-style-type:none;">
                    <li class="panel panel-default">
                        <div class="panel-body" >
                            <div class="qTitleBar" data-qt="1"><span>1</span>.&nbsp;<div class="editable">单选题</div></div>
                            <div>
                                <div class="choices">
                                    <div class="choicediv">
                                        <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"/>
                                        <div class="singleChoice choice"><div class="cText editable">选项1</div></div>
                                    </div>
                                    <div class="choicediv">
                                        <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                                        <div class="singleChoice choice"><div class="cText editable">选项2</div></div>
                                    </div>
                                </div>
                                <div class="qToolbar">
                                    &nbsp;<span class="glyphicon glyphicon-plus choice-add" title="添加"></span>
                                    &nbsp;<span class="glyphicon glyphicon-plus-sign choices-add" title="批量添加"></span>
                                    &nbsp;<span class="glyphicon glyphicon-cog choice-set" title="选项设置"></span>
                                    &nbsp;<span class="glyphicon glyphicon-remove question-remove" title="删除本题"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="panel panel-default">
                        <div class="panel-body">
                            <div class="qTitleBar" data-qt="2"><span>2</span>.&nbsp;<div class="editable">多选题</div></div>
                            <div>
                                <div class="choices">
                                    <div class="choicediv">
                                        <input type="checkbox" name="optionsChecks" value="option1" />
                                        <div class="multiChoice choice"><div class="cText editable">选项1</div></div>
                                    </div>
                                    <div class="choicediv">
                                        <input type="checkbox" name="optionsChecks" value="option2"/>
                                        <div class="multiChoice choice"><div class="cText editable">选项2</div></div>
                                    </div>
                                </div>
                                <div class="qToolbar">
                                    &nbsp;<span class="glyphicon glyphicon-plus choice-add" title="添加"></span>
                                    &nbsp;<span class="glyphicon glyphicon-plus-sign choices-add" title="批量添加"></span>
                                    &nbsp;<span class="glyphicon glyphicon-cog choice-set" title="选项设置"></span>
                                    &nbsp;<span class="glyphicon glyphicon-remove question-remove" title="删除本题"></span>
                                </div>
                            </div>
                        </div>
                    </li>


                    <li class="panel panel-default">
                        <div class="panel-body">
                            <div class="qTitleBar" data-qt="3"><span>3</span>.&nbsp;<div class="editable">问答题</div></div>
                            <div>
                                <div class="choices">
                                    <div class="choicediv">
                                        <div class="qaChoice choice"><div class="cText editable">选项1</div><input disabled class="qaInput" type="text"/></div>
                                    </div>
                                    <div class="choicediv">
                                        <div class="qaChoice choice"><div class="cText editable">选项2</div><input disabled class="qaInput" type="text"/></div>
                                    </div>
                                </div>
                                <div class="qToolbar">
                                    &nbsp;<span class="glyphicon glyphicon-plus choice-add" title="添加"></span>
                                    &nbsp;<span class="glyphicon glyphicon-plus-sign choices-add" title="批量添加"></span>
                                    &nbsp;<span class="glyphicon glyphicon-cog choice-set" title="选项设置"></span>
                                    &nbsp;<span class="glyphicon glyphicon-remove question-remove" title="删除本题"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="panel panel-default">
                        <div class="panel-body">
                            <div class="qTitleBar" data-qt="4"><span>4</span>.&nbsp;<div class="editable">排序题</div></div>

                            <ul class="list-group sortChoice choices">
                                <li class="list-group-item choicediv">
                                    <div class="cText editable">选项1</div>
                                </li>
                                <li class="list-group-item choicediv">
                                    <div class="cText editable">选项2</div>
                                </li>

                            </ul>
                            <div class="qToolbar">
                                &nbsp;<span class="glyphicon glyphicon-plus choice-add" title="添加"></span>
                                &nbsp;<span class="glyphicon glyphicon-plus-sign choices-add" title="批量添加"></span>
                                &nbsp;<span class="glyphicon glyphicon-cog choice-set" title="选项设置"></span>
                                &nbsp;<span class="glyphicon glyphicon-remove question-remove" title="删除本题"></span>
                            </div>
                        </div>
                    </li>

                    <li class="panel panel-default">
                        <div class="panel-body">
                            <div class="qTitleBar" data-qt="5"><span>5</span>.&nbsp;<div class="editable">打分题</div></div>
                            <div>
                                <div class="choices">
                                    <div class="choicediv">
                                        <div class="gradeChoice choice">
                                            <div class="cText editable">选项1</div>
                                            <div class="qPoints">
                                                &nbsp;<span class="glyphicon glyphicon-star-empty"></span>
                                                &nbsp;<span class="glyphicon glyphicon-star-empty"></span>
                                                &nbsp;<span class="glyphicon glyphicon-star-empty"></span>
                                                &nbsp;<span class="glyphicon glyphicon-star-empty"></span>
                                                &nbsp;<span class="glyphicon glyphicon-star-empty"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="choicediv">
                                        <div class="gradeChoice choice">
                                            <div class="cText editable">选项2</div>
                                            <div class="qPoints">
                                                &nbsp;<span class="glyphicon glyphicon-star-empty"></span>
                                                &nbsp;<span class="glyphicon glyphicon-star-empty"></span>
                                                &nbsp;<span class="glyphicon glyphicon-star-empty"></span>
                                                &nbsp;<span class="glyphicon glyphicon-star-empty"></span>
                                                &nbsp;<span class="glyphicon glyphicon-star-empty"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="qToolbar">
                                    &nbsp;<span class="glyphicon glyphicon-plus choice-add" title="添加"></span>
                                    &nbsp;<span class="glyphicon glyphicon-plus-sign choices-add" title="批量添加"></span>
                                    &nbsp;<span class="glyphicon glyphicon-cog choice-set" title="选项设置"></span>
                                    &nbsp;<span class="glyphicon glyphicon-remove question-remove" title="删除本题"></span>
                                </div>
                            </div>
                        </div>
                    </li>
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



