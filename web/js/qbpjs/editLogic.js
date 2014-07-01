/**
 * Created by duel on 14-2-28.
 */

$(document).ready(function () {

    $("#btnAddLogic").on("click",function(){

        alert(1);

    });

});

function loadSurvey(){
    var oSendJson={};
    var iQId=parseInt(getParameter("qid"));
    var spinner = new Spinner().spin(document.getElementById('loadingDiv'));



    oSendJson.wjId = iQId;

    $.ajax({
        url: "dywj/wj.htm",
        type: "POST",
        dataType: "json",
        async:false,
        data: {"json": JSON.stringify(oSendJson) },
        success: function (oJson) {
            //console.log(oJson);
            var result = oJson.success;
            if (result == 1) {
               console.log(oJson);
                buildOption(oJson);


            } else if (result == 0) {
                var msg = oJson.message;
                alertify.alert(msg);

            }

            spinner.stop();

        }});
}


function buildOption(oJson){

    if(oJson){

        //标题 类型 人数 金币
        var sTitle=oJson.title;
        var iCoin=oJson.coin;
        var iLimit=oJson.limit;
        var iTypeId=oJson.typeId;
        if(sTitle){
            if(sTitle.length>=10){
                $("#sTitle").empty().append(sTitle.substring(0,10)+"...");
            }
            else{
                $("#sTitle").empty().append(sTitle);
            }
            $("#sTitle").attr("title",sTitle);

        }

        $("#sCoin").val(iCoin);
        $("#sLimit").val(iLimit);
        $("#sType").val(iTypeId);

        $("#mainFrame").empty();
        for(var i=0;i<oJson.questions.length;i++){
            //loadQuestion(oJson.questions[i]);
            $("#sQuestion").append("<option value='"+oJson.questions[i].questionId+"'>Q"+
                oJson.questions[i].questionNo+ ". "+oJson.questions[i].title+"</option>");


        }
    }

}
