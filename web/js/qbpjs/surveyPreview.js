/**
 * Created by duel on 13-12-14.
 */

window.onload=function(){
    var oDiv = $(".sortLeft .sortChoice").get(0);
    var h=  parseInt(getStyle(oDiv,"height"));
    $(".sortRight ul li").height(h);

}



$(document).ready(function(){

    var oSendJson={};
    var iQId=parseInt(getParameter("qid"));
    var iMId=parseInt(getParameter("mid"));
    if(iQId){

        oSendJson.wjId = iQId;
        $.ajax({
            url: ContextUrl+"dywj/wj.htm",
            type: "POST",
            dataType: "json",
            async: false,
            data: {"json": JSON.stringify(oSendJson) },
            success: function (oJson) {
                //console.log(oJson);
                var result = oJson.success;
                if (result == 1) {

                    buildSurvey(oJson);

                } else if (result == 0) {
                    var msg = oJson.message;
                    alertify.alert(msg);
                }
            }});
    }
    else if(iMId){

        oSendJson.childModelId = iMId;
        $.ajax({
            url: ContextUrl+"wjmb/getwjmb.htm",
            type: "POST",
            dataType: "json",
            async: false,
            data: {"json": JSON.stringify(oSendJson) },
            success: function (oJson) {
                //console.log(oJson);
                var result = oJson.success;
                if (result == 1) {
                    buildSurvey(oJson);

                } else if (result == 0) {
                    var msg = oJson.message;
                    alertify.alert(msg);
                }
            }});
    }
    else{
        alert("跳入问卷号错误页面");
    }


    //评分题的星星可以选择
    $(document).on("click",".gradeStars span",function(){
        $(this).removeClass("glyphicon-star-empty").addClass("glyphicon-star");
        $(this).prevAll().removeClass("glyphicon-star-empty").addClass("glyphicon-star");
        $(this).nextAll().removeClass("glyphicon-star").addClass("glyphicon-star-empty");
    });
});


function buildSurvey(oJson){
    if(oJson){
        var sSurveyHTML,sTitleHTML,sQuestionHTML;
        var i,j;

        sSurveyHTML='';
        sTitleHTML='';
        sQuestionHTML='';
        //装载头部
        sTitleHTML+='<div id="title" class="panel-heading">'+oJson.title+'</div>';
        sTitleHTML+='<div class="panel-body"><p>您好！本调查没有“对”、“错”之分，请您尽可能填写真实情况和想法予以回答。</p></div>';

        sSurveyHTML+= sTitleHTML;
        //装载身体
        sQuestionHTML+='<table id="question" class="table"><tbody>';

        for(i=0;i<oJson.questions.length;i++){
            sQuestionHTML+='<tr><td><div class="qTitleBar"><span>Q</span>' +
                '<span class="qIndex">'+oJson.questions[i].questionNo+'</span><span>. </span>' +
                '<span class="qTitle">'+oJson.questions[i].title+'</span></div>';



            //单选题
            if(oJson.questions[i].type==1){
                sQuestionHTML+='<div class="qChoicesDiv">';
                for(j=0;j<oJson.questions[i].choices.length;j++){
                    sQuestionHTML+='<div class="qChoice"><input type="radio" name="choice'+i+'" value=""/>' +
                        '<span class="choiceNo">'+oJson.questions[i].choices[j].choiceTitle+'</span>' +
                        '<span class="choiceTitle">'+oJson.questions[i].choices[j].choiceContent+'</span></div>';

                }
            }
            //多选题
            if(oJson.questions[i].type==2){
                sQuestionHTML+='<div class="qChoicesDiv">';
                for(j=0;j<oJson.questions[i].choices.length;j++){
                    sQuestionHTML+='<div class="qChoice"><input type="checkbox" name="choice'+j+'" value=""/>' +
                        '<span class="choiceNo">'+oJson.questions[i].choices[j].choiceTitle+'</span>' +
                        '<span class="choiceTitle">'+oJson.questions[i].choices[j].choiceContent+'</span></div>';

                }
            }
            //问答题
            if(oJson.questions[i].type==3){
                sQuestionHTML+='<div class="qChoicesDiv">';
                for(j=0;j<oJson.questions[i].choiceNumber;j++){
                    sQuestionHTML+='<div class="qChoice"><input type="text" />';
                }
            }
            //排序题
            if(oJson.questions[i].type==4){
                sQuestionHTML+='<div class="qChoicesDiv qSortDiv"><div class="sortLeft">';

                for(j=0;j<oJson.questions[i].choices.length;j++){
                    sQuestionHTML+='<div class="qChoice sortChoice">'+oJson.questions[i].choices[j].choiceContent+'</div>';
                }
                sQuestionHTML+='</div>';

                sQuestionHTML+='<div class="sortRight"><ul>';
                for(j=0;j<oJson.questions[i].choices.length;j++){
                    sQuestionHTML+='<li>'+j+'</li>';
                }
                sQuestionHTML+='</ul></div>';

            }
            //打分题
            if(oJson.questions[i].type==5){
                sQuestionHTML+='<div class="qChoicesDiv qSortDiv"><div class="sortLeft">';

                for(j=0;j<oJson.questions[i].innerQuestions.length;j++){
                    sQuestionHTML+='<div class="qChoice gradeChoice">'+oJson.questions[i].innerQuestions[j].questionTitle+'</div>';
                }
                sQuestionHTML+='</div>';

                sQuestionHTML+='<div class="sortRight"><ul>';
                for(j=0;j<oJson.questions[i].innerQuestions.length;j++){
                    sQuestionHTML+='<li class="gradeStars">';

                    for(var k=0;k<oJson.questions[i].choiceNumber;k++){
                        sQuestionHTML+='&nbsp;<span class="glyphicon glyphicon-star-empty"></span>';
                    }

                    sQuestionHTML+='</li>';
                }
                sQuestionHTML+='</ul></div>';

            }
            sQuestionHTML+='</div></td></tr>';
        }

        sQuestionHTML+='</tbody></table>';


        sSurveyHTML+= sQuestionHTML;
        $("#survey").empty().append(sSurveyHTML);

    }
}

