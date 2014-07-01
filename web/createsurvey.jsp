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

    <script src="js/area.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/qbpcss.css" rel="stylesheet">
    <link href="css/boot.css" rel="stylesheet">
    <script type="text/javascript">
        $(document).ready(function () {
            //头部导航变色
            $("#myNav li:eq(1)").toggleClass("active");

            $("div.nav-list").click(function(){
                var _this=this;
                $(_this).next().slideToggle();
                $(_this).children("span").toggleClass("glyphicon-plus glyphicon-minus");
            });



            //模板问卷 类别 选中换色
            $(".nav-list li").click(function(){
                var _this=this;
                $("#leftMenu li.active").toggleClass("active");
                $("#leftMenu li span.label-primary").toggleClass("label-primary");

                $(_this).toggleClass("active");
                $(this).find("span.badge").toggleClass("label-primary");
            });


            //复制现有问卷 下拉框选中时会给右边赋值
            $(document).on("change","#mySurveyList",function(){
                var sTitle=$("#mySurveyList option:selected").text();
                var sType=$("#mySurveyList option:selected").attr("data-st");
                $("#mySurveyTitle").val(sTitle+"-副本");
                $("#mySurveyType").val(sType);
            });

            //复制现有问卷 的 创建按钮
            $(document).on("click","#copyAndNewSurvey",function(){
                //  dosomething

                var iWjid=$("#mySurveyList option:selected").val();
                var sTitle=$("#mySurveyTitle").val();
                var sType=$("#mySurveyType").val();
                if(sTitle!=""){
                    $().redirect('editsurvey.jsp',{'iWjId':iWjid,'title': sTitle,'type':sType});
                }
                else{
                    alertify.alert("问卷标题不能为空");
                }
            });


            //复制模板 的 创建按钮
            $(document).on("click","#copyOfficialSurvey",function(){
                //dosomething
            });


            //大按钮点击之后切换tab
            $("#createType > div").click(function(){
                var type=$(this).index();
                $(".createTabs").hide();
                $(".createTabs:eq("+type+")").show();
                if(type==1){
                    //复制现有问卷
                    //调用获取用户全部问卷标题和id接口
                    $.ajax({
                        url:"dywj/khwjlist.htm" ,
                        type: "POST",
                        dataType: "json",
                        async:false,
                        success: function (oJson) {
                            var result = oJson.success;
                            //console.log(oJson);
                            if (result == 1) {
                                $("#mySurveyList").empty();
                                var sHTML='';
                                for(var i=0;i<oJson.aWj.length;i++){
                                    sHTML ='<option data-st="'+oJson.aWj[i].iTypeId
                                            +'" value="'+oJson.aWj[i].iWjId+'">'
                                            +oJson.aWj[i].sTitle+'</option>';
                                    $("#mySurveyList").append(sHTML);
                                }
                            }
                            if (result == 0) {
                                var msg = oJson.message;
                                alertify.alert(msg);
                            }
                        }});

                }
                else if(type==2){
                    //调用获取全部模板问卷标题和id接口

                }

            });


            $(".row .jumbotron").click(function(){
                var _this=this;
                $(".row .jumbotron.tcenteractive").toggleClass("tcenteractive");
                $(_this).toggleClass("tcenteractive");
                var classString=this.className;
//                if(classString.match("green"))   {
//                    $(_this).toggleClass("tcenteractive-green");
//                    $(".createcontent").toggleClass("content-border-green");
//                }
//                if(classString.match("purple"))  {
//                    $(_this).toggleClass("tcenteractive-purple");
//                    $(".createcontent").toggleClass("content-border-purple");
//                }
            });


            $("#createNewSurvey").click(function(){

                var sTitle=$("#newSurveyTitle").val();
                var sType=$("#newSurveyType").val();
                if(sTitle!=""){
                    $().redirect('editsurvey.jsp',{'title': sTitle,'type':sType});
                }
                else{
                    $().redirect('editsurvey.jsp');
                }
            });
        });

    </script>

    <style>
        .ultra{
            font-size: 2em;
            margin-top: 30px;
        }
        .tcenter{
            padding: 10px;
            text-align: center;
            font-family: "microsoft yahei";
            transition: background 2s, padding 2s;
            -moz-transition: background 2s, padding 2s;
            -o-transition: background 2s, padding 2s;
            -webkit-transition: background 2s, padding 2s;
        }

        .tcenteractive{
            color: #009dd9;
            background-color: #e5f4fd;
            padding-bottom: 40px;
        }
        .tcenteractive-green{
            border-left: 1px solid #99ca3c;
            border-right: 1px solid #99ca3c;
            border-bottom: 1px solid #e5f4fd;
        }
        .tcenteractive-purple{
            border-left: 1px solid #904199;
            border-right: 1px solid #904199;
            border-bottom: 1px solid #e5f4fd;
        }
        .tcenter:hover{

            color: #009dd9;
            background-color: #e5f4fd;

        }
        .text-purple{
            color: #904199;
        }
        .text-green{
            color: #99ca3c;
        }
        .text-orange{
            color: #f58320;
        }
        .text-red{
            color: #d81e3a;
        }

        .top-border-purple{
            border-top: 7px solid #904199;
        }
        .top-border-green{
            border-top: 7px solid #99ca3c;
        }
        .top-border-orange{
            border-top: 7px solid #f58320;
        }
        .top-border-red{
            border-top: 7px solid #d81e3a;
        }
        .createcontent{
            background-color: #e5f4fd;
            transition:border 0s ease 2s;
            -moz-transition: border 0s ease 1s;
            -o-transition: border 0s ease 1s;
            -webkit-transition:border 0s ease 2s;
        }
        .content-border-green{
            border: 1px solid #99ca3c;
        }
        .content-border-purple{
            border: 1px solid #904199;
        }
        .content-puple{
            border-left:5px solid #904199;color: #904199
        }



    </style>

</head>
<body>
<%@include file="toubu.jsp"%>



<div class="center" style="font-family:'microsoft yahei';display:block;min-height:450px;width: 80%;margin: 10px auto;">

    <ol class="breadcrumb">
        <li><a href="shouye.jsp">首页</a></li>
        <li><a href="mySurveyList.jsp">我的问卷</a></li>
        <li  class="active">编辑</li>
    </ol>
    <div class="row" id="createType" style="height: 186px;">
        <div class="col-sm-6 col-md-3">
            <div class="jumbotron tcenter top-border-green tcenteractive">
                <span class="glyphicons file ultra text-green"></span>
                <br/>
                新建空白问卷
            </div>
        </div>
        <div class="col-sm-6 col-md-3">
            <div class="jumbotron tcenter top-border-purple">
                <span class="glyphicons more_items ultra text-purple"></span>
                <br/>
                复制现有问卷
            </div>
        </div>
        <div class="col-sm-6 col-md-3">
            <div class="jumbotron tcenter top-border-orange">
                <span class="glyphicons notes ultra text-orange"></span>
                <br/>
                挑选官方模板
            </div>
        </div>
        <div class="col-sm-6 col-md-3">
            <div class="jumbotron tcenter top-border-red">
                <span class="glyphicons upload ultra text-red"></span>
                <br/>
                上传委托
            </div>
        </div>
    </div><!--四大按钮结束-->
    <div class="jumbotron createcontent">
        <!--总共四TAB-->
        <div id="createTab" style="min-height: 200px;">
            <!--1新建问卷TAB-->
            <div class="createTabs">
                <div class="row">
                    <div class="col-xs-6">
                        <div class="input-group">
                            <span class="input-group-addon">问卷标题</span>
                            <input id="newSurveyTitle" type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                </div>

                <br/>
                <div class="row">
                    <div class="col-xs-6">
                        <div class="input-group">
                            <span class="input-group-addon">问卷类型</span>
                            <select id="newSurveyType" class="form-control">
                                <option value="1">电子商务</option>
                                <option value="2">市场调查</option>
                                <option value="3">客户调查</option>
                                <option value="4">人力资源</option>
                                <option value="5">校园调查</option>
                                <option value="6">其他</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-xs-push-5 col-xs-2">
                        <div id="createNewSurvey"class="btn btn-primary btn-lg">创建问卷</div>
                    </div>
                </div>
            </div>
            <!--2复制问卷TAB-->
            <div class="createTabs" style="display: none;">

                <div class="row">
                    <div class="col-xs-6">
                        <div class="input-group">
                            <span class="input-group-addon">现有问卷</span>
                            <select id="mySurveyList" size="6" class="form-control">
                                <option>大学生生活费调查</option>
                                <option>可口可乐贩卖机使用情况</option>
                                <option>家用电器调查</option>
                                <option>应届生就业情况调查</option>
                                <option>双十一 女性消费问卷</option>
                                <option>家用电器调查</option>
                                <option>大学生合租你怎么看?</option>
                                <option>中国手表市场问卷</option>
                                <option>奔驰汽车江浙沪地区市场调研</option>
                                <option>童装购买习惯调查</option>
                                <option>关于微博微信覆盖率的问卷</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-6">

                        <div class="row">
                            <div class="col-xs-12">
                                <div class="input-group">
                                    <span class="input-group-addon">问卷标题</span>
                                    <input id="mySurveyTitle" type="text" class="form-control" placeholder="">
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="input-group">
                                    <span class="input-group-addon">问卷类型</span>
                                    <select id="mySurveyType" class="form-control">
                                        <option value="1">电子商务</option>
                                        <option value="2">市场调查</option>
                                        <option value="3">客户调查</option>
                                        <option value="4">人力资源</option>
                                        <option value="5">校园调查</option>
                                        <option value="6">其他</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                <br/>

                <div class="row">
                    <div class="col-xs-push-5 col-xs-2">
                        <div id="copyAndNewSurvey"class="btn btn-primary btn-lg">打开问卷</div>
                    </div>
                </div>
            </div>


            <!--3模板问卷TAB-->
            <div class="createTabs" style="display: none;">
                <style>
                    .createTabs .nav-list{
                        font-size:12px;
                    }
                    .createTabs .nav > li > a{
                        padding:0 15px;
                    }
                </style>

                <div class="row">
                    <div id="leftMenu" class="well sidebar-nav col-xs-2">
                        <div class="nav-list">公开问卷  <span style="top:2px;" class="glyphicon glyphicon-minus"></span></div>
                        <ul class="nav nav-list">
                            <li><a href="javascript:void(0)">市场调查 <span class="badge">62</span></a></li>
                            <li><a href="javascript:void(0)">客户调查 <span class="badge">35</span></a></li>
                            <li><a href="javascript:void(0)">人力资源 <span class="badge">12</span></a></li>
                            <li><a href="javascript:void(0)">其他　　 <span class="badge">47</span></a></li>
                        </ul>
                        <div class="nav-list">模板问卷 <span style="top:2px;"  class="glyphicon glyphicon-minus"></span></div>
                        <ul class="nav nav-list">
                            <li><a href="javascript:void(0)">市场调查 <span class="badge">20</span></a></li>
                            <li><a href="javascript:void(0)">客户调查 <span class="badge">15</span></a></li>
                            <li><a href="javascript:void(0)">人力资源 <span class="badge">15</span></a></li>
                            <li><a href="javascript:void(0)">其他　　 <span class="badge">10</span></a></li>
                        </ul>
                    </div>
                    <div class="col-xs-4">
                            <select size="6" class="form-control">
                                <option>大学生生活费调查</option>
                                <option>可口可乐贩卖机使用情况</option>
                                <option>家用电器调查</option>
                                <option>应届生就业情况调查</option>
                                <option>双十一 女性消费问卷</option>
                                <option>家用电器调查</option>
                                <option>大学生合租你怎么看?</option>
                                <option>中国手表市场问卷</option>
                                <option>奔驰汽车江浙沪地区市场调研</option>
                                <option>童装购买习惯调查</option>
                                <option>关于微博微信覆盖率的问卷</option>
                            </select>
                    </div>
                    <div class="col-xs-6">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="input-group">
                                    <span class="input-group-addon">问卷标题</span>
                                    <input type="text" class="form-control" placeholder="">
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="input-group">
                                    <span class="input-group-addon">问卷类型</span>
                                    <select class="form-control">
                                        <option value="1">电子商务</option>
                                        <option value="2">市场调查</option>
                                        <option value="3">客户调查</option>
                                        <option value="4">人力资源</option>
                                        <option value="5">校园调查</option>
                                        <option value="6">其他</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <br/>

                <div class="row">
                    <div class="col-xs-push-5 col-xs-2">
                        <div id="copyOfficialSurvey"class="btn btn-primary btn-lg">创建问卷</div>
                    </div>
                </div>
            </div>


            <!--4未定义TAB-->


            <div class="createTabs" style="display: none;">
                <div class="row">
                    <div class="col-xs-6">
                        <div class="input-group">
                            <span class="input-group-addon">问卷标题4</span>
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-xs-6">
                        <div class="input-group">
                            <span class="input-group-addon">问卷类型</span>
                            <select class="form-control">
                                <option>产品测试</option>
                                <option>满意度调查</option>
                                <option>市场调研</option>
                                <option>人力资源</option>
                                <option>消费者分析</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</div>
<%@include file="dibu.jsp"%>

</body>
</html>