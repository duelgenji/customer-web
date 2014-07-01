<html>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
    <title>趣宝盆</title>
    <%--<meta name="viewport" content="width=device-width, initial-scale=1.0">--%>
    <!-- Bootstrap -->
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!-- Include all compiled plugins (below), or include individual files as needed -->

    <!--[endif]-->
    <%@include file="package.jsp"%>

    <script type="text/javascript">
        $(document).ready(function () {
            function browserRedirect() {
                var sUserAgent = navigator.userAgent.toLowerCase();
                var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                var bIsMidp = sUserAgent.match(/midp/i) == "midp";
                var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
                var bIsAndroid = sUserAgent.match(/android/i) == "android";
                var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
                var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

               // alert(sUserAgent);
                if(bIsIpad || bIsIphoneOs){
                    location.href="https://itunes.apple.com/app/id729136011";
                    return;
                }
                if(bIsAndroid){
                    location.href="install/latest/qubaopen.apk";
                    return;
                }
                if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
                    window.location.href="download.jsp";
                }
            }
            browserRedirect();


        });

    </script>
</head>

</html>



</html>