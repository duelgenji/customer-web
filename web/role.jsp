<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-12-10
  Time: 上午10:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>趣宝盆-积分规则</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <%@include file="package.jsp" %>
    <script type="text/javascript">
        $(document).ready(function () {
            //头部导航变色
            $("#footerLeftMenu .nav-list:eq(1) a").addClass("active");
        });

    </script>
</head>
<body>

<%@include file="toubu.jsp" %>


<div class="center footerCenter">
    <div class="row">

        <div class="col-xs-offset-1 col-xs-2">
            <%@include file="footerLeftMenu.jsp"%>
        </div>
        <div class="col-xs-8">
            <div class="panel panel-frozen">
                <div class="panel-heading">
                    <span class="panel-title">积分规则</span>
                </div>
                <div class="youwenben">
                    <div style="text-align: left;line-height:30px;width: 700px;margin-left: 20px">
                        <br/>
                        <br/>
                        <div class="rig_boxcon rig_boxconscor">
                            <h3 class="rig_h3" style="margin-top:0px">一、	积分的说明</h3>
                            <h4 class="rig_h4">1、积分是什么</h4>
                            &nbsp;&nbsp;&nbsp;&nbsp;用户通过在趣宝盆的一系列合法操作行为，能够获得网站奖励的一种虚拟分值，称为积分。
                            <h4 class="rig_h4">2、积分获得方式</h4>
                            &nbsp;&nbsp;&nbsp;&nbsp;每日签到；<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;进行趣测试的答题；<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;答题后分享；<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;邀请朋友；<br>

                            <h4 class="rig_h4">3、如何查询积分</h4>
                            &nbsp;&nbsp;&nbsp;&nbsp;登陆后，您可以在趣宝盆登陆后的"趣之家-我的资料 "中，查看您的累计积分。
                            <h4 class="rig_h4">4、积分可以干什么</h4>
                            &nbsp;&nbsp;&nbsp;&nbsp;目前用户可以使用一定量的积分，来进行趣抽奖，详情请看"主页-趣抽奖"页面。
                            <h3 class="rig_h3">二、 免责条款</h3>
                            &nbsp;&nbsp;&nbsp;&nbsp;感谢您访问趣宝盆的会员积分计划，本计划由上海众创商务信息咨询有限公司提供。以上计划条款和条件，连同计划有关的任何促销内容的相应条款和条件，构成本计划会员与趣宝盆之间关于制度的完整协议。如果您使用趣宝盆，您就参加了本计划并接受了这些条款、条件、限制和要求，请仔细阅读这些条款和条件。

                            <h4 class="rig_h4">1、协议的变更 </h4>
                            &nbsp;&nbsp;&nbsp;&nbsp;趣宝盆有可能变更本条款、趣宝盆的任何其它条款和条件、或您的计划会员资格的任何方面。对这些条款的修改将被包含在趣宝盆的更新的条款中。如果任何变更被认定为无效、废止或因任何原因不可执行，则该变更是可分割的，且不影响其它变更或条件的有效性或可执行性。在我们变更这些条款后，您可以选择继续使用趣宝盆，如果您选择继续使用趣宝盆则视为您对变更的接受；您亦可以选择不接受上述变更，如果您选择不接受上述变更，请及时注销您账户或拨打趣宝盆客服部电话，由客服人员协助您办理注销手续。
                            <h4 class="rig_h4">2、终止</h4>
                            &nbsp;&nbsp;&nbsp;&nbsp;如果您在趣宝盆的客户帐户被关闭，那么您也将丧失您的会员资格及积分计划。

                            <h4 class="rig_h4">3、责任限制 </h4>
                            &nbsp;&nbsp;&nbsp;&nbsp;除趣宝盆使用条件中规定的其它限制和除外情况之外，在中国法律法规所允许的限度内，趣宝盆仅承担因会员积分计划而引起的直接责任。


                            <h3 class="rig_h3">三、 常见问题</h3>
                            Q：怎样获得积分？<br>
                            A：每日首次登录签到、答题、分享、邀请朋友后可获得相应积分，积分不设上限。<br>
                            Q：在哪里查看积分?<br>
                            A：登录后，点击网站顶部"趣之家"，选择"我的资料"中查看。<br>
                            Q：积分能转让吗？<br>
                            A：不能，一个用户下的积分只能专属用户使用，不能转让。<br>
                            Q：积分能兑现吗？<br>
                            A：积分不能兑换现金。<br>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<%@include file="dibu.jsp" %>
</body>
</html>
