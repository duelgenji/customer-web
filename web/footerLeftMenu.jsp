<%--
  Created by IntelliJ IDEA.
  User: duel
  Date: 13-12-10
  Time: 上午10:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<script type="text/javascript">
    $(document).ready(function () {
        $(".nav-list li:eq("+'<%=request.getParameter("type")==null?0:request.getParameter("type")%>'+")").toggleClass("active");

    });

</script>

<div id="footerLeftMenu" class="well sidebar-nav">
    <div class="nav-list"><a href="about.jsp">关于我们</a></div>
    <br/>
    <div class="nav-list"><a href="role.jsp">积分规则</a></div>
    <br/>
    <div class="nav-list"><a href="contact.jsp">联系我们</a></div>
    <br/>
    <div class="nav-list"><a href="privacy.jsp">隐私说明</a></div>
    <br/>
    <div class="nav-list"><a href="job.jsp">人才招聘</a></div>
</div>