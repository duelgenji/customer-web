/**
 * Created by duel on 13-12-14.
 */

window.onload = function () {
    var oDiv = $(".sortLeft .sortChoice").get(0);
    var h = parseInt(getStyle(oDiv, "height"));
    $(".sortRight ul li").height(h);

}


$(document).ready(function () {

    var oSendJson = {};
    var iQId = parseInt(getParameter("qid"));
    var iMId = parseInt(getParameter("mid"));
    if (iQId) {

        oSendJson.wjId = iQId;
        $.ajax({
            url: "publicwj/getwj.htm",
            type: "POST",
            dataType: "json",
            async: false,
            data: {"json": JSON.stringify(oSendJson) },
            success: function (oJson) {
                //console.log(JSON.stringify(oJson));
                var result = oJson.success;
                if (result == 1) {

                    buildSurvey(oJson);

                } else if (result == 0) {
                    var msg = oJson.message;
                    alertify.alert(msg);
                }
            }});
    }
    else if (iMId) {

        oSendJson.childModelId = iMId;
        $.ajax({
            url: "wjmb/getwjmb.htm",
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
    else {
        alert("跳入问卷号错误页面");
    }


    //评分题的星星可以选择
    $(document).on("click", ".gradeStars span", function () {
        $(this).removeClass("glyphicon-star-empty").addClass("glyphicon-star");
        $(this).prevAll().removeClass("glyphicon-star-empty").addClass("glyphicon-star");
        $(this).nextAll().removeClass("glyphicon-star").addClass("glyphicon-star-empty");
    });

    var bIsActive=true;
    $("div#submitSurvey").bind("click touchend", function () {


        if(!bIsActive){
            return;
        }
        var iWjid = $("div#title").attr('wjid');
        var oSendObj = {iWjId: iWjid, aQuestions: []};
        var checkShouldSend = true;
        $("tr[iswtmatrix]").each(function (index) {

            if ($(this).attr('iswtmatrix') == '0') {
                var iWtType = $(this).find("div.qChoicesDiv").attr('wttype');
                var iWtId = $(this).attr('wtid');

                var oSentWtObj = { iWtId: iWtId, aAnswerIds: [] };

                switch (iWtType) {
                    case '1':
                        var iAnswerid = "";
                        $(this).find("input[type='radio']").each(function () {

                            if ($(this).is(':checked') == true) {

                                iAnswerid = $(this).val();

                            }
                        });
                        if (iAnswerid != "") {
                            oSentWtObj.aAnswerIds[oSentWtObj.aAnswerIds.length] = iAnswerid;
                        } else {
                            alertify.alert("您还有题目没有完成");
                            checkShouldSend = false;
                            return false;
                        }
                        break;
                    case '2':
                        $(this).find("input[type='checkbox']").each(function () {

                            if ($(this).is(':checked') == true) {

                                oSentWtObj.aAnswerIds[oSentWtObj.aAnswerIds.length] = $(this).val();
                            }
                        });
                        if (oSentWtObj.aAnswerIds.length == 0) {
                            alertify.alert("您还有题目没有完成");
                            checkShouldSend = false;
                            return false;
                        }

                        break;
                    case '3':
                        $(this).find("textarea").each(function () {

                            if ($(this).val().trim() != "") {

                                oSentWtObj.aAnswerIds[oSentWtObj.aAnswerIds.length] = $(this).val();
                            }
                        });
//                        if (oSentWtObj.aAnswerIds.length == 0) {
//                            alertify.alert("您还有题目没有完成");
//                            checkShouldSend = false;
//                            return false;
//                        }
                        break;
                    case '4':
                        $(this).find("div.qChoice[choiceid]").each(function () {

                            oSentWtObj.aAnswerIds[oSentWtObj.aAnswerIds.length] = $(this).attr('choiceid');
                        });


                        break;
                }
                //save the object
                oSendObj.aQuestions[oSendObj.aQuestions.length] = oSentWtObj;
            } else {
                var iWtType = $(this).find("div[wttype]").attr('wttype');
                //var iWtId = $(this).attr('wtid');
                if (iWtType == "5") {
                    $(this).find("li.gradeStars[wtid]").each(function () {
                        var iWtId = $(this).attr('wtid');
                        var oSentWtObj = { iWtId: iWtId, aAnswerIds: [] };


                        var iScores = $(this).children("span.glyphicon.glyphicon-star").length;
                        if (iScores == 0) {
                            alertify.alert("您还有题目没有完成");
                            checkShouldSend = false;
                            return false;
                        }
                        oSentWtObj.aAnswerIds[oSentWtObj.aAnswerIds.length] = iScores;
                        oSendObj.aQuestions[oSendObj.aQuestions.length] = oSentWtObj;
                    });


                }


            }


        });
        if (checkShouldSend) {
            var spinner = new Spinner().spin(document.getElementById('loadingDiv'));
            //console.log(JSON.stringify(oSendObj));
            bIsActive=false;
            $("#submitSurvey").removeClass("btn-primary").addClass("btn-default");
            $.ajax({
                url: 'publicwj/submmit.htm',
                type: "POST",
                dataType: "json",
                data: {"json": JSON.stringify(oSendObj)},
                success: function (data) {
                    var result = data.success;
                    if (result == 1) {
                        setTimeout(function () {
                            location.href = "publicSurvey.jsp";
                        }, 1000);
                    } else if (result == 0) {
                        var msg = data.message;
                        alertify.alert(msg);
                        bIsActive=true;
                        $("#submitSurvey").removeClass("btn-default").addClass("btn-primary");
                    }
                    spinner.stop();
                }});


        }


    });


});


function buildSurvey(oJson) {
    if (oJson) {
        var sSurveyHTML, sTitleHTML, sQuestionHTML;
        var i, j;

        sSurveyHTML = '';
        sTitleHTML = '';
        sQuestionHTML = '';
        //装载头部
        sTitleHTML += '<div id="title" class="panel-heading" wjid="' + oJson.wjId + '">' + oJson.title + '</div>';
        sTitleHTML += '<div class="panel-body"><p>您好！本调查没有“对”、“错”之分，请您尽可能填写真实情况和想法予以回答。</p></div>';

        sSurveyHTML += sTitleHTML;
        //装载身体
        sQuestionHTML += '<table id="question" class="table"><tbody>';

        for (i = 0; i < oJson.questions.length; i++) {
            sQuestionHTML += '<tr iswtmatrix="' + oJson.questions[i].isMatrix + '" wtId="'
                + oJson.questions[i].questionId + '"><td><div class="qTitleBar"><span>Q</span>' +
                '<span class="qIndex">' + oJson.questions[i].questionNo + '</span><span>. </span>' +
                '<span class="qTitle">' + oJson.questions[i].title + '</span></div>';


            //单选题
            if (oJson.questions[i].type == 1) {
                sQuestionHTML += '<div class="qChoicesDiv" wttype="' + oJson.questions[i].type + '">';
                for (j = 0; j < oJson.questions[i].choices.length; j++) {
                    sQuestionHTML += '<div class="qChoice"><input type="radio" name="choice' + i
                        + '" value="' + oJson.questions[i].choices[j].choiceId + '"/>' +
                        '<span class="choiceNo">' + oJson.questions[i].choices[j].choiceTitle + '</span>' +
                        '<span class="choiceTitle">' + oJson.questions[i].choices[j].choiceContent + '</span></div>';

                }
            }
            //多选题
            if (oJson.questions[i].type == 2) {
                sQuestionHTML += '<div class="qChoicesDiv" wttype="' + oJson.questions[i].type + '">';
                for (j = 0; j < oJson.questions[i].choices.length; j++) {
                    sQuestionHTML += '<div class="qChoice"><input type="checkbox" name="choice' + j + '" value="'
                        + oJson.questions[i].choices[j].choiceId + '"/>' +
                        '<span class="choiceNo">' + oJson.questions[i].choices[j].choiceTitle + '</span>' +
                        '<span class="choiceTitle">' + oJson.questions[i].choices[j].choiceContent + '</span></div>';

                }
            }
            //问答题
            if (oJson.questions[i].type == 3) {
                sQuestionHTML += '<div class="qChoicesDiv" wttype="' + oJson.questions[i].type + '">';
                for (j = 0; j < oJson.questions[i].choiceNumber; j++) {
                    sQuestionHTML += '<div class="qChoice"><textarea rows="2" cols="60" />';
                }
            }
            //排序题
            if (oJson.questions[i].type == 4) {
                sQuestionHTML += '<div class="qChoicesDiv qSortDiv" wttype="' + oJson.questions[i].type + '"><div class="sortLeft">';

                for (j = 0; j < oJson.questions[i].choices.length; j++) {
                    sQuestionHTML += '<div class="qChoice sortChoice" choiceid="'
                        + oJson.questions[i].choices[j].choiceId + '">'
                        + oJson.questions[i].choices[j].choiceContent + '</div>';
                }
                sQuestionHTML += '</div>';

                sQuestionHTML += '<div class="sortRight"><ul>';
                for (j = 0; j < oJson.questions[i].choices.length; j++) {
                    sQuestionHTML += '<li>' + j + '</li>';
                }
                sQuestionHTML += '</ul></div>';

            }
            //打分题
            if (oJson.questions[i].type == 5) {
                sQuestionHTML += '<div class="qChoicesDiv qSortDiv" wttype="' + oJson.questions[i].type + '"><div class="sortLeft">';

                for (j = 0; j < oJson.questions[i].innerQuestions.length; j++) {
                    sQuestionHTML += '<div class="qChoice gradeChoice" wtid="' + oJson.questions[i].innerQuestions[j].questionId + '">' + oJson.questions[i].innerQuestions[j].questionTitle + '</div>';
                }
                sQuestionHTML += '</div>';

                sQuestionHTML += '<div class="sortRight"><ul>';
                for (j = 0; j < oJson.questions[i].innerQuestions.length; j++) {
                    sQuestionHTML += '<li class="gradeStars" wtid="'
                        + oJson.questions[i].innerQuestions[j].questionId + '">';

                    for (var k = 0; k < oJson.questions[i].choiceNumber; k++) {
                        sQuestionHTML += '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>';
                    }

                    sQuestionHTML += '</li>';
                }
                sQuestionHTML += '</ul></div>';

            }
            sQuestionHTML += '</div></td></tr>';
        }

        sQuestionHTML += '</tbody></table>';


        sSurveyHTML += sQuestionHTML;
        $("#survey").empty().append(sSurveyHTML);

    }
}

