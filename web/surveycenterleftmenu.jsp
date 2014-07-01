<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-11-18
  Time: 下午4:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<script type="text/javascript">
    $(document).ready(function () {
        <%-- $(".nav-list li:eq("+'<%=request.getParameter("type")==null?0:request.getParameter("type")%>'+")").toggleClass("active");--%>

    });

</script>

    <div id="leftMenu" class="well sidebar-nav">
        <div class="nav-list">公开问卷  <span style="top:2px;" class="glyphicon glyphicon-minus"></span></div>
        <ul class="nav nav-list">
            <li><a href="publicSurvey.jsp">所有类型</a></li>
            <li><a href="publicSurvey.jsp?type=1">电子商务</a></li>
            <li><a href="publicSurvey.jsp?type=2">市场调查</a></li>
            <li><a href="publicSurvey.jsp?type=3">客户调查</a></li>
            <li><a href="publicSurvey.jsp?type=4">人力资源</a></li>
            <li><a href="publicSurvey.jsp?type=5">校园调查</a></li>
            <li><a href="publicSurvey.jsp?type=6">其他</a></li>
        </ul>
        <br/>
        <div class="nav-list">模板问卷 <span style="top:2px;"  class="glyphicon glyphicon-plus"></span></div>
        <ul class="nav nav-list" style="display: none">
            <li><a href="officialSurvey.jsp">所有类型</a></li>
            <li><a href="officialSurvey.jsp?type=1">电子商务</a></li>
            <li><a href="officialSurvey.jsp?type=2">市场调查</a></li>
            <li><a href="officialSurvey.jsp?type=3">客户调查</a></li>
            <li><a href="officialSurvey.jsp?type=4">人力资源</a></li>
            <li><a href="officialSurvey.jsp?type=5">校园调查</a></li>
            <li><a href="officialSurvey.jsp?type=6">其他</a></li>
        </ul>
    </div>