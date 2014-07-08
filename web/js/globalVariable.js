/**
 * Created with IntelliJ IDEA.
 * User: duel
 * Date: 13-9-17
 * Time: 上午10:56
 * To change this template use File | Settings | File Templates.
 */

ContextUrl="http://localhost:8080/cs";
//
//if(!(location.hostname).match("www.qubaopen.com.cn")){
//    location.hostname="www.qubaopen.com.cn";
//}
function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return decodeURI(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +encodeURI(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function checkCookie()
{
    username=getCookie('username')
    if (username!=null && username!="")
    {alert('Welcome again '+username+'!')}
    else
    {
        username=prompt('Please enter your name:',"")
        if (username!=null && username!="")
        {
            setCookie('username',username,365)
        }
    }
}

/*设置顶部登录栏*/
function setLogBar(){
    var tempCookie=getCookie("cookie1") ;
    ////console.log(tempCookie);
    if(tempCookie!="" && tempCookie!=null){
        var name=eval("("+tempCookie+")").nickname==""?"手机用户":eval("("+tempCookie+")").nickname;
        var onlineHtml=name+'，您好！ 　　<a href="javascript:void(0)" onclick="logout()">[退出]</a>';
        $("#zhuangtailan").empty().append(onlineHtml);

    }
}



/*登录*/
function logon(press){

    var dialogContent= '帐号：<input id="login-na" type="text" value="" />'
        + '<br />密码：<input id="login-pw" type="password" value="" />'
        + '<br/> <div style="margin-left:95px" >还没账号？<a href="javascript:void(0)" onclick="goRegister()">去注册</a></div>';
    art.dialog({
        id: 'logon-dialog',
        title: '登录',
        content: "<div id='dialogmsg'><br/></div>"+dialogContent
        ,
        initialize: function () {


            document.getElementById('login-na').focus();
        },
        lock: true,
        fixed: true,
        ok: function () {

            var na = document.getElementById('login-na');
            var pw = document.getElementById('login-pw');
            var phone=$("#login-na").val();
            var pwd=$("#login-pw").val();
            if (!/^((13[0-9])|(15[^4,\D])|(18[0,5-9]))\d{8}$/.test(phone)) {

                $("#dialogmsg").empty().append("<div style='color:#f71d16'>手机号格式不正确</div>");
                na.select();
                na.focus();
                return false;
            }
            if(pwd==""){
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>密码不能为空</div>");
                pw.focus();
                return false;

            }

            var jsonSent;
            jsonSent = '{"phone":"' + phone
                + '",' + '"pwd":"' + pwd
                + '"}';

            ////console.log(jsonSent);
            var msg="";
            $.ajax({
                url: ContextUrl+"/user/logon.htm",
                type: "POST",
                async:false,
                dataType: "json",
                data: {"json": jsonSent},
                success: function (data, textStatus, jqXHR) {

                    var result = data.success;
                    if (result == 1) {
                        setCookie("cookie1",JSON.stringify(data),new Date() );
                        self.location = location;
                    }
                    if (result == 0) {
                        msg = data.message;

                    }
                    ////console.log(result);

                }
            });
            if(msg!=""){
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>"+msg+"</div>");
                //changeDialogContent(dialogContent,msg);
            }



        },
        okValue: '登录',
        cancelValue:'取消',
        cancel: function () {
            if(press!="1")
                history.back();
        }
    });
}

/*登出*/
function logout(){
    $.ajax({
        url: ContextUrl+"/user/logout.htm",
        type: "POST",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {

            var result = data.success;
            if (result == 1) {
                setCookie("cookie1","");
                self.location = "index.html";
            }
            if (result == 0) {
                msg = data.message;

            }
            ////console.log(result);

        }
    });

}

/*修改收货地址*/
function shouhuodizhi(add){

    var dizhi='<br/>所在地区　<select id="s_province" name="s_province"></select>&nbsp;&nbsp; '+
        '<select id="s_city" name="s_city" ></select>&nbsp;&nbsp;'+
        '<select id="s_county" name="s_county"></select>'+
        '<script type="text/javascript">_init_area();</script>';

    var shr= typeof(add.name)=='undefined'?'':add.name;
    var sjh= typeof(add.phone)=='undefined'?'':add.phone;
    var ybdz= typeof(add.postcode)=='undefined'?'':add.postcode;
    var xxdz= typeof(add.address)=='undefined'?'':add.address;

    var dialogContent='收货人　　<input id="dizhi-shr" type="text" value="'+shr+'" />'
        + '<br />手机号码　<input id="dizhi-phone" type="text" value="'+sjh+'" />'
        + dizhi
        + '<br />邮编地址　<input id="dizhi-yb" type="text" value="'+ybdz+'" />'
        + '<br />详细地址　<input id="dizhi-dz" type="text" value="'+xxdz+'" />';

    var sf=add.province;
    var cs=add.city;
    var dq=add.district;


    art.dialog({
        id: 'dizhi-dialog',
        title: "修改地址",
        content: "<div id='dialogmsg'><br/></div>"+dialogContent,
        initialize: function () {
            _init_area();
            $("#s_province").find("option[value='"+sf+"']").attr("selected",true);
            change(1);
            $("#s_city").find("option[value='"+cs+"']").attr("selected",true);
            change(2);
            $("#s_county").find("option[value='"+dq+"']").attr("selected",true);


        },
        lock: true,
        fixed: true,
        ok: function () {
            var addressId = add.addressId;
            var province = $("#s_province").val();
            province= province=="省份"? "":province;
            var city = $("#s_city").val();
            city= city=="地级市"? "":city;
            var county = $("#s_county").val();
            county= county=="市、县级市"? "":county;



            var name = $("#dizhi-shr").val();
            var address = $("#dizhi-dz").val();
            var phone = $("#dizhi-phone").val();
            var postcode = $("#dizhi-yb").val();


            var name = $("#dizhi-shr").val();
            if(name==""){
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>收货人不能为空</div>");
                $("#dizhi-shr").focus();
                return false;
            }
            var phone = $("#dizhi-phone").val();
            if(!/^((13[0-9])|(15[^4,\D])|(18[0,5-9]))\d{8}$/.test(phone)){
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>手机号格式不正确</div>");
                $("#dizhi-phone").focus();
                return false;

            }
            var address = $("#dizhi-dz").val();
            if(address==""){
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>收货地址不能为空</div>");
                $("#dizhi-dz").focus();
                return false;

            }
            var yb = $("#dizhi-yb").val();
            if ( yb!="" && !/^[1-9]\d{5}$/.test(yb)) {
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>邮编不合法,请正确输入6位邮政编码</div>");
                $("#textfield_yb").focus();
                return false;
            }

            var flag = add.isDefalutAddress;


            var jsonSent = '{"addressId":"' + addressId
                + '",' + '"name":"' + name
                + '",' + '"province":"' + province
                + '",' + '"city":"' + city
                + '",' + '"district":"' + county
                + '",' + '"address":"' + address
                + '",' + '"addphone":"' + phone
                + '",' + '"postcode":"' + postcode
                + '",' + '"isDefalutAddress":"' + flag
                + '"}';
            ////console.log(jsonSent);



            $.ajax({
                url: ContextUrl+"/member/modifyaddress.htm",
                type: "POST",
                async:false,
                dataType: "json",
                data: {"json": jsonSent},
                success: function (data) {

                    var result = data.success;
                    if (result == 1) {
                        art.alert("修改成功!",function () { self.location="dizhiguanli.html"});
                    }
                    if (result == 0) {
                        art.alert(data.message);

                    }
                    ////console.log(result);

                }
            });



            return false;
        },
        okValue: '确认'  ,
        cancelValue:'取消',
        cancel: function () {}
    });
}

/*添加收货地址*/
function newdizhi(){

    var dizhi='<br/>所在地区　<select id="s_province" name="s_province"></select>&nbsp;&nbsp; '+
        '<select id="s_city" name="s_city" ></select>&nbsp;&nbsp;'+
        '<select id="s_county" name="s_county"></select>'+
        '<script type="text/javascript">_init_area();</script>';

    var tempCookie=getCookie("cookie1") ;
    var phone="";
    var name="";
    if(tempCookie!="" && tempCookie!=null){
        phone=eval("("+tempCookie+")").phone;
        name=eval("("+tempCookie+")").name;

    }
    var dialogContent='收货人　　<input id="dizhi-shr" type="text" value="'+name+'" />'
        + '<br />手机号码　<input id="dizhi-phone" type="text" value="'+phone+'" />'
        + dizhi
        + '<br />邮编地址　<input id="dizhi-yb" type="text" value="" />'
        + '<br />详细地址　<input id="dizhi-dz" type="text" value="" />';

    art.dialog({
        id: 'newdizhi-dialog',
        title: "新增地址",
        content: "<div id='dialogmsg'><br/></div>"+dialogContent,
        initialize: function () {
            _init_area();
            $("#dizhi-shr").focus();


        },
        lock: true,
        fixed: true,
        ok: function () {
            var name = $("#dizhi-shr").val();
            if(name==""){
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>收货人不能为空</div>");
                $("#dizhi-shr").focus();
                return false;
            }
            var phone = $("#dizhi-phone").val();
            if(!/^((13[0-9])|(15[^4,\D])|(18[0,5-9]))\d{8}$/.test(phone)){
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>手机号格式不正确</div>");
                $("#dizhi-phone").focus();
                return false;

            }
            var address = $("#dizhi-dz").val();
            if(address==""){
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>收货地址不能为空</div>");
                $("#dizhi-dz").focus();
                return false;

            }
            var yb = $("#dizhi-yb").val();
            if ( yb!="" && !/^[1-9]\d{5}$/.test(yb)) {
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>邮编不合法,请正确输入6位邮政编码</div>");
                $("#textfield_yb").focus();
                return false;
            }

            var province = $("#s_province").val();
            province= province=="省份"? "":province;
            var city = $("#s_city").val();
            city= city=="地级市"? "":city;
            var county = $("#s_county").val();
            county= county=="市、县级市"? "":county;




            var postcode = $("#dizhi-yb").val();
            var flag = 0 ;


            var jsonSent = '{"name":"' + name
                + '",' + '"province":"' + province
                + '",' + '"city":"' + city
                + '",' + '"district":"' + county
                + '",' + '"address":"' + address
                + '",' + '"addphone":"' + phone
                + '",' + '"postcode":"' + postcode
                + '",' + '"isDefalutAddress":"' + flag
                + '"}';
            ////console.log(jsonSent);



            $.ajax({
                url: ContextUrl+"/member/addaddress.htm",
                type: "POST",
                async:false,
                dataType: "json",
                data: {"json": jsonSent},
                success: function (data) {

                    var result = data.success;
                    if (result == 1) {
                        art.alert("添加成功!",function () { self.location="dizhiguanli.html"});
                    }
                    if (result == 0) {
                        art.alert(data.message);

                    }
                    ////console.log(result);

                }
            });



            return false;
        },
        okValue: '确认'  ,
        cancelValue:'取消',
        cancel: function () {}
    });
}

/*左菜单栏 趣之家 展开收缩箭头*/
function arrowChange(index){

    if( $(".down:eq("+index+")").length>0){
        $(".menu-child").parent().attr("style","display:none");
        $(".menu-child-s").parent().attr("style","display:none");
        $(".down:eq("+index+")").attr("class","up");
    }
    else if($(".up:eq("+index+")").length>0){
//        var content='<li> <a class="menu-child" href="zhanneixinliebiao.html">　站内信</a> </li>'+
//            '<li> <a class="menu-child" href="paihangbang.html">　积分排行榜</a></li>'+
//            ' <li> <a class="menu-child " href="uploadphoto.html">　更改头像</a></li> ';
//        $(".up:eq("+index+")").append(content);
        $(".menu-child").parent().removeAttr("style");
        $(".menu-child-s").parent().removeAttr("style");
        $(".up:eq("+index+")").attr("class","down");


    }


}

/*游客答题后登录*/
function guestLogon(jsonSent){

    setCookie("guestSent",JSON.stringify(jsonSent),new Date());


    var dialogContent= '<span>亲，登录查看答案，还能赢积分得大奖哟~</span><br/>'
        +'<br />帐号：<input id="login-na" type="text" value="" />'
        +'<br />密码：<input id="login-pw" type="password" value="" />'
        + '<br/> <div style="margin-left:95px" >还没账号？<a href="javascript:void(0)" onclick="goRegister()">去注册</a></div>';
    art.dialog({
        id: 'logon-dialog',
        title: '提示',
        content: "<div id='dialogmsg'><br/></div>"+dialogContent
        ,
        initialize: function () {


            document.getElementById('login-na').focus();
        },
        lock: true,
        fixed: true,
        ok: function () {

            var na = document.getElementById('login-na');
            var pw = document.getElementById('login-pw');
            var phone=$("#login-na").val();
            var pwd=$("#login-pw").val();
            if (!/^((13[0-9])|(15[^4,\D])|(18[0,5-9]))\d{8}$/.test(phone)) {

                $("#dialogmsg").empty().append("<div style='color:#f71d16'>手机号格式不正确</div>");
                na.select();
                na.focus();
                return false;
            }
            if(pwd==""){
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>密码不能为空</div>");
                pw.focus();
                return false;

            }

            var jsonSent;
            jsonSent = '{"phone":"' + phone
                + '",' + '"pwd":"' + pwd
                + '"}';

            ////console.log(jsonSent);
            var msg="";
            $.ajax({
                url: ContextUrl+"/user/logon.htm",
                type: "POST",
                async:false,
                dataType: "json",
                data: {"json": jsonSent},
                success: function (data, textStatus, jqXHR) {

                    var result = data.success;
                    if (result == 1) {
                        setCookie("cookie1",JSON.stringify(data),new Date() );
                        self.location = location;
                    }
                    if (result == 0) {
                        msg = data.message;

                    }
                    ////console.log(result);

                }
            });
            if(msg!=""){
                $("#dialogmsg").empty().append("<div style='color:#f71d16'>"+msg+"</div>");
                //changeDialogContent(dialogContent,msg);
                return false;
            }



        },
        okValue: '登录',
        cancelValue:'取消',
        cancel: function () {

        }
    });
}

/*去注册*/
function goRegister(){
    setCookie("preUrl",self.location.href,new Date());
    self.location="register.html";


}

/*小提示框*/
artDialog.tips = function (content, time) {
    return artDialog({
        id: 'Tips',
        title: false,
        cancel: false,
        fixed: true,
        lock: false
    })
        .content('<div style="padding: 0 0em;">' + content + '</div>')
        .time(time || 1500);
};

/*获取趣测试类型*/
function getWjType(){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == "type"){
            return KeyValuePair[1];
        }
    }
}

/*设置默认地址*/
function setDefault(add){
    var jsonSent = '{"addressId":"' + add.addressId
        + '",' + '"name":"' + add.name
        + '",' + '"province":"' + add.province
        + '",' + '"city":"' + add.city
        + '",' + '"district":"' + add.district
        + '",' + '"address":"' + add.address
        + '",' + '"addphone":"' + add.phone
        + '",' + '"postcode":"' + add.postcode
        + '",' + '"isDefalutAddress":"' + 1
        + '"}';
    $.ajax({
        url: ContextUrl+"/member/modifyaddress.htm",
        type: "POST",
        async:false,
        dataType: "json",
        data: {"json": jsonSent},
        success: function (data) {

            var result = data.success;
            if (result == 1) {
                art.alert("修改成功!",function () { self.location="dizhiguanli.html"});
            }
            if (result == 0) {
                art.alert(data.message,function () { self.location="dizhiguanli.html"});

            }

        }
    });

}

/*传入历史问卷id*/
function lishiwenjuan(wjid){

    setCookie("historyId",JSON.stringify(wjid),new Date());
    self.location="lishiwjneirong.html";
}