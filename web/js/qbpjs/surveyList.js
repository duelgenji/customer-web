/**
 * Created by duel on 13-12-13.
 */


//模板问卷页面 加载列表
function loadAllOfficialSurvey(iPage,iEachPageItems,iType){
    var oJson=getMbWj(iPage,iEachPageItems,iType);

    if(oJson){
        //取得数据
        var sSurveyListHTML,sSurveyItemHTML,sWjTitle,iWjId,sTypeTitle,iTypeId;
        var iTotalPage= oJson.iTotalPage;
        var iPageNo= oJson.iPageNo;
        var iTotalItems= oJson.iTotalItems;
        var i=0;
        var oSurveyData=oJson.data;
        var iEachPageItems=oSurveyData.length;

        sSurveyListHTML="";
        for( i=0 ; i< iEachPageItems;i++ ){
            sSurveyItemHTML="";
            sWjTitle = oSurveyData[i].sWjTitle;
            iWjId = oSurveyData[i].iWjId;
            sTypeTitle = oSurveyData[i].sTypeTitle;
            iTypeId = oSurveyData[i].iTypeId;
            sSurveyItemHTML='<li class="list-group-item" data-sid="'+iWjId+'">' +
                '<h4>'+sWjTitle+'</h4><span>分类：'+sTypeTitle+'</span></li>';
            sSurveyListHTML+=sSurveyItemHTML;

        }
        $("#surveyList").empty().append(sSurveyListHTML);
        buildPage(iTotalItems,iPageNo,iEachPageItems);
    }
    else{
        //没有取得数据
    }
}


//获取模板问卷
function getMbWj(iPage,iEachPageItems,iType) {

    var oSendJson={};
    oSendJson.pageNo=iPage || 1;
    oSendJson.type= arguments[2] || "";
    oSendJson.pageSize=iEachPageItems || 15;
    oSendJson.orderDir="DESC";

    var obj=null;
    $.ajax({
        url: "publicwj/getwjmblist.htm",
        type: "POST",
        dataType: "json",
        data: {"json": JSON.stringify(oSendJson) },
        async: false,
        success: function (oJson) {
            var result = oJson.success;
            if (result == 1) {
                obj = oJson;

            } else if (result == 0) {
                var msg = oJson.message;
                alertify.alert(msg);
                obj = null;
            }
        }});
    return obj;
}

//模板问卷页面 加载列表
function loadAllPublicSurvey(iPage,iEachPageItems,iType){
    var oJson=getGkWj(iPage,iEachPageItems,iType);

    if(oJson){
        //取得数据
        var sSurveyListHTML,sSurveyItemHTML,sWjTitle,iWjId,sTypeTitle,iTypeId;
        var iTotalPage= oJson.iTotalPage;
        var iPageNo= oJson.iPageNo;
        var iTotalItems= oJson.iTotalItems;
        var i=0;
        var oSurveyData=oJson.data;
        var iEachPageItems=oSurveyData.length;

        sSurveyListHTML="";
        for( i=0 ; i< iEachPageItems;i++ ){
            sSurveyItemHTML="";
            sWjTitle = oSurveyData[i].sWjTitle;
            iWjId = oSurveyData[i].iWjId;
            sTypeTitle = oSurveyData[i].sTypeTitle;
            iTypeId = oSurveyData[i].iTypeId;
            sSurveyItemHTML='<li class="list-group-item" data-sid="'+iWjId+'">' +
                '<a href="javascript:void(0);">'+sWjTitle+'</a><span>分类：'+sTypeTitle+'</span></li>';
            sSurveyListHTML+=sSurveyItemHTML;

        }
        $("#surveyList").empty().append(sSurveyListHTML);
        buildPage(iTotalItems,iPageNo,iEachPageItems);
    }
    else{
        //没有取得数据
    }
}


//获取模板问卷
function getGkWj(iPage,iEachPageItems,iType) {

    var oSendJson={};
    oSendJson.pageNo=iPage || 1;
    oSendJson.type= arguments[2] || "";
    oSendJson.pageSize=iEachPageItems || 15;
    oSendJson.orderDir="DESC";

    var obj=null;
    $.ajax({
        url: "publicwj/getwjlist.htm",
        type: "POST",
        dataType: "json",
        data: {"json": JSON.stringify(oSendJson) },
        async: false,
        success: function (oJson) {
            var result = oJson.success;
            if (result == 1) {
                obj = oJson;

            } else if (result == 0) {
                var msg = oJson.message;
                alertify.alert(msg);
                obj = null;
            }
        }});
    return obj;
}




//加载问卷库首页 列表， 模板 公开问卷各5个
function loadSurveyIndexList(){
    var oJson=getIndexList();
    //console.log(oJson);

    if(oJson){
        //取得数据
        var aMbwj = oJson.aMbwj;
        var aWj = oJson.aWj;
        var sSurveyListHTML,sSurveyItemHTML,sWjTitle,iWjId,sTypeTitle,iTypeId;
        var i=0;

        sSurveyListHTML="";
        for(i=0 ;i<aWj.length;i++){
            sSurveyItemHTML="";
            sWjTitle = aWj[i].sWjTitle;
            iWjId = aWj[i].iWjId;
            sTypeTitle = aWj[i].sTypeTitle;
            iTypeId = aWj[i].iTypeId;
            sSurveyItemHTML='<li class="list-group-item" data-sid="'+iWjId+'">' +
                '<h4>'+sWjTitle+'</h4><span>分类：'+sTypeTitle+'</span></li>';
            sSurveyListHTML+=sSurveyItemHTML;
        }

        $("#surveyList_g").empty().append(sSurveyListHTML);

        sSurveyListHTML="";

        for(i=0 ;i<aMbwj.length;i++){
            sSurveyItemHTML="";
            sWjTitle = aMbwj[i].sWjTitle;
            iWjId = aMbwj[i].iWjId;
            sTypeTitle = aMbwj[i].sTypeTitle;
            iTypeId = aMbwj[i].iTypeId;
            sSurveyItemHTML='<li class="list-group-item" data-sid="'+iWjId+'">' +
                '<h4>'+sWjTitle+'</h4><span>分类：'+sTypeTitle+'</span></li>';
            sSurveyListHTML+=sSurveyItemHTML;
        }

        $("#surveyList_m").empty().append(sSurveyListHTML);

    }
    else{
        //没有取得数据
    }
}

//问卷库首页列表，模板和公开问卷各5个
function getIndexList(){
    var obj=null;
    $.ajax({
        url: "publicwj/getindexlist.htm",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (oJson) {
            var result = oJson.success;
            if (result == 1) {
                obj = oJson;

            } else if (result == 0) {
                var msg = oJson.message;
                alertify.alert(msg);
                obj = null;
            }
        }});
    return obj;

}