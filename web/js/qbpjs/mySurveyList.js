/**
 * Created by duel on 13-12-18.
 */


$(document).ready(function () {

    //编辑问卷、修改问卷
    $(document).on("click",".glyphicon-edit",function(){
        var _this=this;
        var qid=$(_this).closest("tr").attr("data-sid");
        $().redirect('editsurvey.html',{'qid': qid},"get");
    });
    $(document).on("click",".sTitle",function(){
        var _this=this;
        var qid=$(_this).closest("tr").attr("data-sid");
        $().redirect('editsurvey.html',{'qid': qid},"get");
    });
    //预览问卷
    $(document).on("click",".glyphicon-eye-open",function(){
        var _this=this;
        var qid=$(_this).closest("tr").attr("data-sid");
        $().redirect('surveyPreview.html',{'qid': qid},"get","_blank");
    });
    //复制问卷
    $(document).on("click",".more_items",function(){
    });
    //问卷统计
    $(document).on("click",".glyphicon-stats",function(){
        var _this=this;
        var sid=$(_this).closest("tr").attr("data-sid");
        $().redirect('analyzeSurvey.html',{'sid': sid},"get");
    });


    //提交审核问卷
    $(document).on("click",".git_commit",function(){

        var oTr=$(this).closest("tr");
        reviewSurvey(oTr);
    });
    //删除问卷
    $(document).on("click",".glyphicon-trash",function(){
        var _this=this;
        var oTr=$(_this).closest("tr")
        var qid=oTr.attr("data-sid");
        alertify.set({ labels: {
            cancel : "否",
            ok     : "是"
        } });
        alertify.confirm("确定删除该问卷？", function (e) {
            if (e) {
                var oSendJson={};
                oSendJson.wjIds=[qid];
                oTr.animate({opacity:0},"slow",null,function(){
                    oTr.remove();
                });
                var spinner = new Spinner().spin(document.getElementById('loadingDiv'));
                $.ajax({
                    url: ContextUrl+"dywj/delete.htm",
                    type: "POST",
                    dataType: "json",
                    data: {"json": JSON.stringify(oSendJson) },
                    success: function (oJson) {
                        //console.log(oJson);
                        var result = oJson.success;
                        if (result == 1) {
                            alertify.success("删除成功");

                        } else if (result == 0) {
                            var msg = oJson.message;
                            alertify.alert(msg);
                        }
                        spinner.stop();

                    }});

            } else {
                alertify.error("删除操作取消");
            }
        });
    });
    //发布问卷
    $(document).on("click",".wifi_alt",function(){
        var oTr=$(this).closest("tr");
        publishSurvey(oTr);
    });



    //已发布问卷链接
    $(document).on("click",".glyphicon-link",function(){
        var oTr=$(this).closest("tr");
        var sUrl=location.host+"/cs/doSurvey.html?qid="+oTr.attr("data-sid");
//        $(this).zclip({
//            path:'js/zclip/ZeroClipboard.swf',
//            copy:sUrl
//        });
//        alertify.set({ labels: {
//            cancel : "取消",
//            ok     : "确定"
//        } });
//        alertify.prompt("问卷访问链接", function (e, str) {
//            // str is the input text
//            if (e) {
//
//            } else {
//            }
//        }, sUrl);
    });



    //分页点击
    $(document).on("click","#page li",function(){
        var iPage=$(this).attr("data-page");
        if(iPage){
            loadUserSurveyList(iPage);
        }
        return;
    });

});

function loadUserSurveyList(iPage,sOrderDir,sOrderBy,iPageSize){
    var oSendJson={};

    var spinner = new Spinner().spin(document.getElementById('loadingDiv'));
//    "pageNo":"value",     //要第几页 从1开始
//        "pageSize":"value",   //一页多少条记录
//        "orderBy":"value",    //按照哪一列来进行排序可选项见 com.qubaopen.survey.domain.Dywj 中的属性
//        "orderDir":"value"    //"desc" 降序  "asc" 升序
    oSendJson.pageNo = iPage || "1";
    oSendJson.orderDir = sOrderDir || "";
    oSendJson.orderBy = sOrderBy || "";
    oSendJson.pageSize = iPageSize || "10";

    $.ajax({
        url: ContextUrl+"dywj/list.htm",
        type: "POST",
        dataType: "json",
        data: {"json": JSON.stringify(oSendJson) },
        success: function (oJson) {
            //console.log(oJson);
            var result = oJson.success;
            if (result == 1) {
                buildMySurveyList(oJson);

            } else if (result == 0) {
                var msg = oJson.message;
                alertify.alert(msg);

            }

            spinner.stop();

        }});

}
function buildMySurveyList(oJson){

//        "aData": [
//        {
//            "iTitle": "aadsas",    //问卷标题
//            "sCreateTime": "2013-11-20 14:52:00.0",   //创建时间
//            "sRemark": "asasdasd",   //备注
//            "iStatus": "0",     //问卷状态 问卷状态值:0  初始状态  1 审核中     2 审核通过      3 审核未通过     4 上线状态      5  关闭状态
//            "iWjId": 1      //问卷ID
//        }
//    ]
    //0  初始状态  1 审核中     2 审核通过      3 审核未通过     4 上线状态      5  关闭状态
    var aStatus=["未审核","审核中","审核通过","审核未通过","已发布","关闭"];
    var iTotalItems= oJson.iTotalItems;
    var iTotalPage= oJson.iTotalPage;
    var iPageNo= oJson.iPageNo;
    var aData= oJson.aData;

    var sSurveyListHTML="";
    var sToolBarHTML =
        '<td> <span title="编辑" class="glyphicon glyphicon-edit"></span>' +
        '&nbsp; <span title="预览" class="glyphicon glyphicon-eye-open "></span>' +
//        '&nbsp; <span title="复制" class="glyphicons more_items"></span>' +
        '&nbsp; <span title="统计" class="glyphicon glyphicon-stats"></span>' +
        '&nbsp; <span title="删除" class="glyphicon glyphicon-trash"></span>' +
        ' </td>';

    var sToolReviewHTML='&nbsp; 　<span title="提交审核" class="glyphicons git_commit"></span>';
    var sToolPublishHTML='&nbsp; <span title="发布" class="glyphicons wifi_alt"></span>';
    var sToolLinkHTML='&nbsp; 　<span title="获取问卷链接" class="glyphicon glyphicon-link"></span>';



    for(var i=0;i<aData.length;i++) {
        sSurveyListHTML+='<tr data-sid="'+aData[i].iWjId+'">';
        var sTitle=aData[i].sTitle;
        if(aData[i].sTitle.length>18){
            sTitle=aData[i].sTitle.substring(0,18)+"...";
        }
        sSurveyListHTML+='<td class="sTitle" title="'+aData[i].sTitle+'">'+sTitle+'</td>';

        var sCreateTime=aData[i].sCreateTime.substring(0,10);


        var oDateNow=new Date();
        var sDateSub=compareDate(aData[i].sLastModified,oDateNow);


        sSurveyListHTML+='<td>'+sCreateTime+'</td>';
        sSurveyListHTML+='<td>'+sDateSub+'</td>';

        if(aData[i].iStatus==0){
            sSurveyListHTML+='<td>'+aStatus[aData[i].iStatus-0]+ sToolReviewHTML +'</td>';
        }else if(aData[i].iStatus==2){
            sSurveyListHTML+='<td>'+aStatus[aData[i].iStatus-0]+ sToolPublishHTML +'</td>';
        }else if(aData[i].iStatus==4){
            sSurveyListHTML+='<td>'+aStatus[aData[i].iStatus-0]+ sToolLinkHTML +'</td>';
        }else{
            sSurveyListHTML+='<td>'+aStatus[aData[i].iStatus-0] +'</td>';
        }
        sSurveyListHTML+='<td>'+aData[i].iCompleted+'</td>';
        sSurveyListHTML+=sToolBarHTML;

        sSurveyListHTML+="</tr>";
    }
    $("#surveyList").empty().append(sSurveyListHTML);
    var sUrl=location.host+"cs/doSurvey.html?qid";
//    $(".glyphicon-link").zclip({
//        path:'js/zclip/ZeroClipboard.swf',
//        copy:sUrl+$(this).closest("tr").attr("data-sid")
//    });
    $(".glyphicon-link").each(function(){
        var sid=$(this).closest("tr").attr("data-sid");
        $(this).zclip({
            path:'js/zclip/ZeroClipboard.swf',
            copy: sid,
            afterCopy:function(){
                alertify.log("成功复制到剪贴板");
            }
        });
    });

    buildPage(iTotalItems,iPageNo,10);

}


function reviewSurvey(object){

    if(!object){
        alertify.alert("参数错误");
        return;
    }
    var oSendJson={};
    var sid=object.attr("data-sid");
    oSendJson.iWjId=sid;

    var spinner = new Spinner().spin(document.getElementById('loadingDiv'));

    $.ajax({
        url: ContextUrl+"shfb/tjsh.htm",
        type: "POST",
        dataType: "json",
        data: {"json": JSON.stringify(oSendJson) },
        success: function (oJson) {
            //console.log(oJson);
            var result = oJson.success;
            if (result == 1) {
                alertify.success("成功提交审核");
                object.find("td").eq(3).empty().append("审核中");

            } else if (result == 0) {
                var msg = oJson.message;
                alertify.alert(msg);
            }
            spinner.stop();

        }});
}


function publishSurvey(object){

    if(!object){
        alertify.alert("参数错误");
        return;
    }
    var oSendJson={};
    var sid=object.attr("data-sid");
    oSendJson.iWjId=sid;

    alertify.set({ labels: {
        cancel : "否",
        ok     : "是"
    } });

    alertify.confirm("确定发布问卷？", function (e) {
        if (e) {
            var spinner = new Spinner().spin(document.getElementById('loadingDiv'));
            $.ajax({
                url: ContextUrl+"shfb/nmfb.htm",
                type: "POST",
                dataType: "json",
                data: {"json": JSON.stringify(oSendJson) },
                success: function (oJson) {
                    //console.log(oJson);
                    var result = oJson.success;
                    if (result == 1) {
                        var sToolLinkHTML='&nbsp; 　<span title="获取问卷链接" class="glyphicon glyphicon-link"></span>';
                        alertify.success("发布成功");
                        object.find("td").eq(3).empty().append("已发布"+sToolLinkHTML);

                    } else if (result == 0) {
                        var msg = oJson.message;
                        alertify.alert(msg);
                    }
                    spinner.stop();

                }});

        } else {
            alertify.error("取消发布");
        }
    });
}






