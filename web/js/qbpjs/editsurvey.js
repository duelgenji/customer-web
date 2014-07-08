/**
 * Created by duel on 13-12-2.
 */
$(document).ready(function () {

    //左侧菜单浮动效果

    (function($) {
        $.fn.extend({
            "MenuFixed": function(obj,obj2,top) {
                function Mf() {
                    var scrollT = $(this).scrollTop();
                    if (scrollT > top) {
                        //obj.attr('style','position:absolute; top:'+(scrollT-80)+'px;');
                        obj.attr('style', 'position:fixed; top:2px;z-index:1;');
                        obj2.addClass("col-xs-offset-2");

                    } else {
                        obj.attr('style', '');
                        obj2.removeClass("col-xs-offset-2");
                    }
                }
                Mf();
                $(window).scroll(function() {
                    Mf();
                });

            }
        });
    })(jQuery);

    $().MenuFixed($('#leftMenu'),$('#rightRow'), 325);



//            移动事件

    $("#leftMenu .btn").draggable({
        connectToSortable: "#mainFrame",
        helper:"clone",
        start: function(event, ui) {
            ui.helper.empty().removeClass("btn btn-xs btn-default").addClass("xuxiankuang");

        },
        revert: "invalid"
    });

    var createdObjIndex=100;
    var qTypeText=["单选题","多选题","问答题","排序题","打分题"];
    //各类题目的html
    var qSingleHTML='<div class="choices">' +
        '<div class="choicediv"><input type="radio" name="optionsRadios'+createdObjIndex+'" value="option1" />' +
        '<div class="singleChoice choice"><div class="cText editable">选项1</div></div></div>' +
        '<div class="choicediv"><input type="radio" name="optionsRadios'+createdObjIndex+'" value="option2">' +
        '<div class="singleChoice choice"><div class="cText editable">选项2</div></div></div>' +
        '</div>';

    var qMultiHTML='<div class="choices">' +
        '<div class="choicediv"><input type="checkbox" name="optionsChecks" value="option1" />' +
        '<div class="multiChoice choice"><div class="cText editable">选项1</div></div></div>' +
        '<div class="choicediv"><input type="checkbox" name="optionsChecks" value="option2">' +
        '<div class="multiChoice choice"><div class="cText editable">选项2</div></div></div>' +
        '</div>';

    var qSortHTML='<ul class="list-group choices sortChoice">' +
        '<li class="list-group-item choicediv"><div class="cText editable">选项1</div></li>' +
        '<li class="list-group-item choicediv"><div class="cText editable">选项2</div></li>' +
        '</ul>';

    var qQAHTML='<div class="choices">' +
        '<div class="choicediv"><div class="qaChoice choice"><div class="cText editable">选项1</div>' +
        '<input disabled class="qaInput" type="text"/></div></div>' +
        '<div class="choicediv"><div class="qaChoice choice"><div class="cText editable">选项2</div>' +
        '<input disabled class="qaInput" type="text"/></div></div>' +
        '</div>';

    var qGradeHTML='<div class="choices">' +
        '<div class="choicediv"><div class="gradeChoice choice"><div class="cText editable">选项1</div>' +
        '<div class="qPoints">'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '</div>' +
        '</div></div>' +
        '<div class="choicediv"><div class="gradeChoice choice"><div class="cText editable">选项2</div>' +
        '<div class="qPoints">'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '</div>' +
        '</div></div>' +
        '</div>'


    //批量增加选项的 html
    var choicesAddHTML='<div class="addChoicesDiv"><div>每行代表一个选项，可以添加多个选项</div>' +
        '<textarea rows="12" cols="37"></textarea>' +
        '<button type="button" class="btn btn-primary pull-right">保存</button>' +
        '</div>';

    //选项设置 评分题 html
    var qGradeSetHTML='<div class="qGradeSetDiv">' +
        '<div>评分为几档?<input class="numberOfStar" placeholder="填写2-10的数字" type="text"/></div><br/>' +
        '<button type="button" class="btn btn-primary pull-right">保存</button>' +
        '</div>';


    //题目列表区域
    $( "#mainFrame" ).sortable({
        revert: true ,
        distance:5,
        stop: function(event, ui) {

            //当从左侧菜单拖进来新问题时，添加题目
            if(!ui.item.hasClass("panel panel-default")){
                var qTypeContent=ui.item.html();
                var questionHTML;
                ui.item.removeClass("btn btn-xs btn-default");
                var qTypeIndex=ui.item.attr("qtype");

                questionHTML=
                    '<li class="ui-draggable panel panel-default">' +
                        '<div class="panel-body">' +
                        '<div class="qTitleBar"  data-qt="'+parseInt(qTypeIndex)+'"><span>0</span>.&nbsp;' +
                        '<div class="editable">'+qTypeText[qTypeIndex-1]+'</div></div>' +
                        '<div>';

                if(qTypeIndex=="1"){
                    questionHTML += qSingleHTML;
                }
                if(qTypeIndex=="2"){
                    questionHTML += qMultiHTML;
                }
                if(qTypeIndex=="3"){
                    questionHTML += qQAHTML;
                }
                if(qTypeIndex=="4"){
                    questionHTML += qSortHTML;
                }
                if(qTypeIndex=="5"){
                    questionHTML += qGradeHTML;
                }

                //工具栏
                questionHTML+='<div class="qToolbar">' +
                    '&nbsp; <span class="glyphicon glyphicon-plus choice-add" title="添加选项"></span>' +
                    '&nbsp; <span class="glyphicon glyphicon-plus-sign choices-add" title="批量添加"></span>' +
                    '&nbsp; <span class="glyphicon glyphicon-cog choice-set" title="选项设置"></span>' +
                    '&nbsp; <span class="glyphicon glyphicon-remove question-remove question-remove" title="删除本题"></span>' +
                    '</div>';
                //结尾
                questionHTML+='</div></div></li>'

                ui.item.after(questionHTML);
                ui.item.remove();

            }

            sortQIndex();


        }
    });


//
//            $( ".ui-draggable" ).draggable({
//                connectToSortable: "#mainFrame",
//                helper: "clone",
//                revert: "invalid"
//            });
//
//            $( ".ui-draggable ,#mainFrame" ).disableSelection();


    $(document).on("click",".editable",function(){

        //点击问题或者选项的标题,修改文本
        //同时只能存在一个修改内容，当eqTitle>0时表示已有。
        if($(".eqTitle").length>0){
            return;
        }
        var _this=this;
        //获取可编辑标示的父元素class ; choicediv为选项,qTitleBar为题目
        var parentType=$(_this).parent().attr("class");
        if(parentType.match("choice")){
            //console.log("选项");
        } else if(parentType.match("qTitleBar")){
            //console.log("题目");
        }

        var _text=$(_this).text();

        var editHtml=
            '<div id="eqTitle" class="eqTitle input-group">' +
                '<input type="text" class="form-control">' +
                '<span class="input-group-btn choiceTools">';
        editHtml+=parentType.match("choice")? '<button class="btn btn-default choice-down" type="button"><span class="glyphicon glyphicon-arrow-down" ></span></button>' +
            '<button class="btn btn-default choice-up" type="button"><span class="glyphicon glyphicon-arrow-up" ></span></button>' +
            '<button class="btn btn-default choice-remove" type="button"><span class="glyphicon glyphicon-remove" ></span></button>'
            :'';
        editHtml+= '<button class="btn btn-default choice-save" type="button"><span class="glyphicon glyphicon-floppy-disk"></span></button>' +
            '</span>' +
            '</div>';

        $(_this).empty().append(editHtml);
        $("#eqTitle input").val(_text);
        $("#eqTitle input").select();
        $("#eqTitle input").on("blur",function(){
//                    $(_this).text($(this).val());
//                    if($(this).val()==""){
//                        $(_this).text("标题");
//                    }
//                   $(this).remove();
//                   editFlag=true;
        });

    });
    //下移
    $(document).on("click",".choice-down",function(event){
        var _this=this;
        $(_this).closest(".choicediv").next().after($(_this).closest(".choicediv"));
        //阻止事件冒泡
        event.stopPropagation();
    });
    //上移
    $(document).on("click",".choice-up",function(event){
        var _this=this;
        $(_this).closest(".choicediv").prev().before($(_this).closest(".choicediv"));
        //阻止事件冒泡
        event.stopPropagation();

    });
    //保存
    $(document).on("click",".choiceTools .choice-save",function(event){

        var editdiv=$(this).closest(".input-group");
        var choicediv=editdiv.parent();
        var inputdiv=$(this).parent().prev(".form-control");
        var changedText=$(inputdiv).val();
        if(changedText==""){
            changedText="标题";
        }
        if(choicediv.hasClass("qaChoice"))
            changedText+="<input class='qaInput' type='text'/>";
        if(choicediv.hasClass("gradeChoice")) {
            var stars=$(this);
            changedText+="<div class='qPoints'>";
            for(var i=0;i<stars;i++){
                changedText+="&nbsp; <span class='glyphicon glyphicon-star-empty'></span>";
            }
            changedText+="</div>";
        }

        choicediv.html(changedText);
        $(editdiv).remove();
        //阻止事件冒泡
        event.stopPropagation();

    });

    //选项里的菜单  删除
    $(document).on("click",".choiceTools .choice-remove",function(event){
        var _this=this;
        $(_this).closest(".choicediv").remove();
        //阻止事件冒泡
        event.stopPropagation();
    });



    //题目菜单 添加选项
    $(document).on("click",".choice-add",function(){
        var _this=this;
        //选项数量
        var numberOfChoice=$(_this).parent().siblings(".choices").children().length+1;
        //新建选项，其实就是复制一个选项
        var temp=$(_this).parent().siblings(".choices").children().first().clone();
        //更改新建的选项文本，根据已有选项数量
        temp.find(".editable").html("选项"+numberOfChoice);
        $(_this).parent().siblings(".choices").append(temp);
        clearEditBox();
        $(temp).find(".editable").click();
    });


    //题目菜单 题目设置
    $(document).on("click",".choice-set",function(){
        clearEditBox();
        //批量添加按钮，点击显示输入框，隐藏其他的框
        var _this=$(this);
        //选项数量
        var numberOfChoice=$(_this).parent().siblings(".choices").children().length+1;
        if($(_this).parent().siblings(".choices").has(".gradeChoice").length>0){
            $(".choice-set").popover({
                html:true,
                delay:0,
                trigger:"manual",
                content: qGradeSetHTML
            });
            if($(this).next().hasClass("in")){
                $(this).popover("hide");
            }else{
                $(".choices-add").each(function(){
                    if( $(this)!=_this && $(this).next().hasClass("popover")){
                        $(this).popover('hide');
                    }
                });
                $(this).popover("show");
            }
        };

    });


    //题目菜单 批量添加选项
    $(document).on("click",".choices-add",function(){
        clearEditBox();
        //批量添加按钮，点击显示输入框，隐藏其他的框
        var _this=$(this);

        //点击批量添加按钮弹出框配置
        $(".choices-add").popover({
            html:true,
            delay:0,
            trigger:"manual",
            content: choicesAddHTML
        });

        if($(this).next().hasClass("in")){
            //console.log("有了，然后隐藏");
            $(this).popover("hide");
        }else{
            $(".choices-add").each(function(){
                if( $(this)!=_this && $(this).next().hasClass("popover")){
                    $(this).popover('hide');
                }
            });
            $(this).popover("show");
        }
    });
    $(".choices-add").on('click', function () {

    });

    //批量添加选项 模态框中的保存按钮
    $(document).on("click",".addChoicesDiv button",function(){
        var _this=this;
        var text=$(".addChoicesDiv textarea").val();
        var choices=text.split("\n");
        //寻找到选项列的父节点
        var choicesList=$(_this).closest(".qToolbar").prev(".choices");
        //批量添加框的节点
        var choicesAddDiv=$(_this).closest(".qToolbar").find(".choices-add");

        //更改新建的选项文本，根据已有选项数量
        for(var i=0;i<choices.length;i++){
            if(choices[i]==""){
                continue;
            }
            var temp=choicesList.children().first().clone();
            temp.find(".editable").html(choices[i]);
            choicesList.append(temp);
        }
        choicesAddDiv.popover("hide");
    });

    //评分题配置保存
    $(document).on("click",".qGradeSetDiv button",function(){
        var _this=this;
        var starHTML='&nbsp; <span class="glyphicon glyphicon-star-empty"></span>';
        var numberOfStar=$(".qGradeSetDiv .numberOfStar").val();

        if(!/^\d$/.test(numberOfStar) || numberOfStar <= 1 || numberOfStar>10){
            alert("只能填写的数字,范围(2~10)");
            return;
        }

        //寻找到选项列的父节点
        var choicesList=$(_this).closest(".qToolbar").prev(".choices");
        //批量添加框的节点
        var choiceSetDiv=$(_this).closest(".qToolbar").find(".choice-set");

        choicesList.children().each(function(){
            $(this).find(".qPoints").empty();
            for(var i=0;i<numberOfStar;i++){
                $(this).find(".qPoints").append(starHTML);
            }
        });
        choiceSetDiv.popover("hide");
    });

    //题目删除
    $(document).on("click",".question-remove",function(){
        var _this=this;
        $(_this).closest("li.panel").slideUp("500", function (){
            $(_this).closest("li.panel").remove();

            sortQIndex();
        });
    });

    //单击左边按钮 添加题目 事件
    $("#leftMenu div.btn").click(function(){
        var question={};
        question.iType= ($(this).attr("qtype")-0);
        newQuestion(question);
    });



    //键盘事件
    $(document).keydown(function(event){
        //console.log(event.keyCode);
        if(event.keyCode==13){
            //enter
            clearEditBox();
        }
        if(event.keyCode==27){
            //esc
            clearEditBox();
        }
        if(event.keyCode==38){
            //up arrow
            if($(".choice-up").length>0){
                $(".choice-up").click();
                return false;
            }
        }
        if(event.keyCode==40){
            //down arrow
            if($(".choice-down").length>0){
                $(".choice-down").click();
                return false;
            }
        }
    });

});
function sortQIndex(){
    $(".qTitleBar").each(function(i,e){
        //first 是为了防止 有标题编辑的时候产生的bug
        $(e).find("span").first().text(i+1);

    });
}

function clearEditBox(){

    var editdiv=$(".eqTitle").first();
    var choicediv=editdiv.parent();
    var inputdiv=editdiv.children(".form-control");
    var changedText=$(inputdiv).val();
    choicediv.text(changedText);
    if(changedText==""){
        choicediv.text("标题");
    }
    $(editdiv).remove();
}




function saveSurvey(){
//    var oSendJson={};
//    oSendJson.sTitle="你使用的是什么手机？";   //必须:问卷标题
//    oSendJson.iCoin="10";     //可选:每份问卷的金币
//    oSendJson.iLimit="1000";      //可选:答卷人数限制
//    oSendJson.fEwbl="0.2";       //可选:答卷额外比例
//    oSendJson.aQuestions=[];
//    var oQuest1={};
//    oQuest1.aChoices=[];
//    var oChoice1={};
//    oChoice1.sContents="苹果";
//    oChoice1.sChoiceNo="A";
//    oQuest1.aChoices.push(oChoice1);
//    oQuest1.aChoices.push(oChoice1);
//    oSendJson.aQuestions.push(oQuest1);
//    oSendJson.aQuestions.push(oQuest1);
//
//    //console.log(oSendJson);
//    //console.log(JSON.stringify(oSendJson));

    clearEditBox();

    var aChoiceNoArray=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T"
        ,"U","V","W","X","Y","Z"];
    var oSendJson1={};
    oSendJson1.iWjType="1";
    var iType=$("#sType option:selected").val();
    var sTitle=$("#sTitle").attr("title");
    var iLimit=parseInt($("#sLimit").val());
    var iCoin=parseInt($("#sCoin").val());

    //错误提示 待增加

    oSendJson1.iWjType=iType;
    oSendJson1.sTitle=sTitle;   //必须:问卷标题
    oSendJson1.iCoin=iCoin;     //可选:每份问卷的金币
    oSendJson1.iLimit=iLimit;      //可选:答卷人数限制

    //oSendJson1.fEwbl="0.2";       //可选:答卷额外比例
    oSendJson1.aQuestions=[];
    $("#mainFrame li.panel").each(function(index,element){
        var oDivTitleBar=$(element).find(".qTitleBar");
        var oQuest1={};
        oQuest1.iAnswerTime="0";
        oQuest1.iType=oDivTitleBar.attr("data-qt");
        oQuest1.iQuestionNo=oDivTitleBar.find("span")[0].innerHTML;
        oQuest1.sQuestionContent=oDivTitleBar.find(".editable")[0].innerHTML;
        if(oQuest1.iType==2){
            oQuest1.iMaxChoice="";
        }
        if(oQuest1.iType==5){
            oQuest1.iIsMatrix=1;
            oQuest1.aInnerQuestions=[];

            var oDivChoices=$(element).find(".choices");
            var oDivChoice=oDivChoices.find(".choicediv");
            for(i=0;i<oDivChoice.length;i++){
                var oChoice1={};
                oChoice1.sQuestionContent=$(oDivChoice[i]).find(".editable")[0].innerHTML;
                oChoice1.iChoiceNumber=$(oDivChoice[i]).find(".qPoints span").length;
                oQuest1.aInnerQuestions.push(oChoice1);
            }

        }
        else{
            oQuest1.aChoices=[];
            var oDivChoices=$(element).find(".choices");
            oQuest1.iChoiceNumber=oDivChoices.find(".choicediv").length;
            var oDivChoice=oDivChoices.find(".choicediv");
            var i;
            for(i=0;i<oDivChoice.length;i++){
                var oChoice1={};
                oChoice1.sContents=$(oDivChoice[i]).find(".editable")[0].innerHTML;;
                oChoice1.sChoiceNo=aChoiceNoArray[i];
                oQuest1.aChoices.push(oChoice1);
            }
        }


        oSendJson1.aQuestions.push(oQuest1);
    });
    //console.log(oSendJson1);

    //获取问卷id 有id则保存问卷，否则新建问卷
    var iDywjId=getCurrentQid();
    if(iDywjId){
        oSendJson1.iDywjId= iDywjId;

        var spinner = new Spinner().spin(document.getElementById('loadingDiv'));
        $.ajax({
            url: ContextUrl+"dywj/modify.htm",
            type: "POST",
            dataType: "json",
            async: true,
            data: {"json": JSON.stringify(oSendJson1) },
            success: function (oJson) {
                //console.log(oJson);
                var result = oJson.success;
                if (result == 1) {
                    alertify.success("保存问卷成功");

                } else if (result == 0) {
                    var msg = oJson.message;
                    alertify.alert(msg);
                }
                spinner.stop();
            }
        });
    }else{

        var spinner = new Spinner().spin(document.getElementById('loadingDiv'));
        $.ajax({
            url: ContextUrl+"dywj/insert.htm",
            type: "POST",
            dataType: "json",
            async: false,
            data: {"json": JSON.stringify(oSendJson1) },
            success: function (oJson) {
                //console.log(oJson);
                var result = oJson.success;
                if (result == 1) {
                    alertify.success("新建问卷成功");
                    setCurrentQid(oJson.iDywjId);
                    $().redirect('editsurvey.html',{'qid':oJson.iDywjId},"get");

                } else if (result == 0) {
                    var msg = oJson.message;
                    alertify.alert(msg);
                }
                spinner.stop();
            }
        });
    }

}



function newQuestion(question){
    var questionHTML="";
    var qTypeText=["单选题","多选题","问答题","排序题","打分题"];
    var qTypeIndex=question.iType;
    questionHTML=
        '<li class="ui-draggable panel panel-default">' +
            '<div class="panel-body">' +
            '<div class="qTitleBar"  data-qt="'+(parseInt(qTypeIndex))+'"><span>0</span>.&nbsp;' +
            '<div class="editable">'+qTypeText[qTypeIndex-1]+'</div></div>' +
            '<div>';

    var createdObjIndex=100;
    //各类题目的html
    var qSingleHTML='<div class="choices">' +
        '<div class="choicediv"><input type="radio" name="optionsRadios'+createdObjIndex+'" value="option1" />' +
        '<div class="singleChoice choice"><div class="cText editable">选项1</div></div></div>' +
        '<div class="choicediv"><input type="radio" name="optionsRadios'+createdObjIndex+'" value="option2">' +
        '<div class="singleChoice choice"><div class="cText editable">选项2</div></div></div>' +
        '</div>';

    var qMultiHTML='<div class="choices">' +
        '<div class="choicediv"><input type="checkbox" name="optionsChecks" value="option1" />' +
        '<div class="multiChoice choice"><div class="cText editable">选项1</div></div></div>' +
        '<div class="choicediv"><input type="checkbox" name="optionsChecks" value="option2">' +
        '<div class="multiChoice choice"><div class="cText editable">选项2</div></div></div>' +
        '</div>';

    var qSortHTML='<ul class="list-group choices sortChoice">' +
        '<li class="list-group-item choicediv"><div class="cText editable">选项1</div></li>' +
        '<li class="list-group-item choicediv"><div class="cText editable">选项2</div></li>' +
        '</ul>';

    var qQAHTML='<div class="choices">' +
        '<div class="choicediv"><div class="qaChoice choice"><div class="cText editable">选项1</div>' +
        '<input disabled class="qaInput" type="text"/></div></div>' +
        '<div class="choicediv"><div class="qaChoice choice"><div class="cText editable">选项2</div>' +
        '<input disabled class="qaInput" type="text"/></div></div>' +
        '</div>';

    var qGradeHTML='<div class="choices">' +
        '<div class="choicediv"><div class="gradeChoice choice"><div class="cText editable">选项1</div>' +
        '<div class="qPoints">'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '</div>' +
        '</div></div>' +
        '<div class="choicediv"><div class="gradeChoice choice"><div class="cText editable">选项2</div>' +
        '<div class="qPoints">'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '</div>' +
        '</div></div>' +
        '</div>'


    //批量增加选项的 html
    var choicesAddHTML='<div class="addChoicesDiv"><div>每行代表一个选项，可以添加多个选项</div>' +
        '<textarea rows="12" cols="37"></textarea>' +
        '<button type="button" class="btn btn-primary pull-right">保存</button>' +
        '</div>';

    //选项设置 评分题 html
    var qGradeSetHTML='<div class="qGradeSetDiv">' +
        '<div>评分为几档?<input class="numberOfStar" placeholder="填写1-10的数字" type="text"/></div><br/>' +
        '<button type="button" class="btn btn-primary pull-right">保存</button>' +
        '</div>';


    if(qTypeIndex=="1"){
        questionHTML += qSingleHTML;
    }
    if(qTypeIndex=="2"){
        questionHTML += qMultiHTML;
    }
    if(qTypeIndex=="3"){
        questionHTML += qQAHTML;
    }
    if(qTypeIndex=="4"){
        questionHTML += qSortHTML;
    }
    if(qTypeIndex=="5"){
        questionHTML += qGradeHTML;
    }

    //工具栏
    questionHTML+='<div class="qToolbar">' +
        '&nbsp; <span class="glyphicon glyphicon-plus choice-add" title="添加选项"></span>' +
        '&nbsp; <span class="glyphicon glyphicon-plus-sign choices-add" title="批量添加"></span>' +
        '&nbsp; <span class="glyphicon glyphicon-cog choice-set" title="选项设置"></span>' +
        '&nbsp; <span class="glyphicon glyphicon-remove question-remove question-remove" title="删除本题"></span>' +
        '</div>';
    //结尾
    questionHTML+='</div></div></li>'

    $("#mainFrame").append(questionHTML);
    sortQIndex();
}




function loadQuestion(question){


    var iType=parseInt(question.type);
    var iQid =question.questionId;
    var sTitle= question.title;
    var aChoices=question.choices;
    var questionHTML=
        '<li class="ui-draggable panel panel-default">' +
            '<div class="panel-body">' +
            '<div class="qTitleBar"  data-qt="'+iType+'"><span>0</span>.&nbsp;' +
            '<div class="editable">'+sTitle+'</div></div>' +
            '<div>';

    //各类题目的html
    var choiceHTML="";
    var i;
    if(iType==1){
        choiceHTML+='<div class="choices">';
        for(i=0;i<aChoices.length;i++){
            choiceHTML+='<div class="choicediv"><input type="radio" name="optionsRadios'+iQid+'" value="option1" />' +
            '<div class="singleChoice choice"><div class="cText editable">'+aChoices[i].choiceContent+'</div></div></div>';
}
        choiceHTML+='</div>';
    }
    if(iType==2){
        choiceHTML+='<div class="choices">';
        for(i=0;i<aChoices.length;i++){
            choiceHTML+='<div class="choicediv"><input type="checkbox" name="optionsChecks" value="option1" />' +
                '<div class="multiChoice choice"><div class="cText editable">'+aChoices[i].choiceContent+'</div></div></div>';
        }
        choiceHTML+='</div>';
    }
    if(iType==3){
        choiceHTML+='<div class="choices">';
        for(i=0;i<question.choiceNumber;i++){
            choiceHTML+=' <div class="choicediv"><div class="qaChoice choice"><div class="cText editable">选项'+(i+1)+'</div>' +
            '<input disabled class="qaInput" type="text"/></div></div>';
        }
        choiceHTML+='</div>';
    }
    if(iType==4){
        choiceHTML+='<ul class="list-group choices sortChoice">';
        for(i=0;i<aChoices.length;i++){
            choiceHTML+='<li class="list-group-item choicediv"><div class="cText editable">'+aChoices[i].choiceContent+'</div></li>';
        }
        choiceHTML+='</ul>';
    }


    var qGradeHTML='<div class="choices">' +
        '<div class="choicediv"><div class="gradeChoice choice"><div class="cText editable">选项1</div>' +
        '<div class="qPoints">'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '</div>' +
        '</div></div>' +
        '<div class="choicediv"><div class="gradeChoice choice"><div class="cText editable">选项2</div>' +
        '<div class="qPoints">'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>'+
        '</div>' +
        '</div></div>' +
        '</div>'

    if(iType==5){
        choiceHTML+='<div class="choices">';
        for(i=0;i<question.innerQuestions.length;i++){
            choiceHTML+='<div class="choicediv"><div class="gradeChoice choice">' +
                '<div class="cText editable">'+question.innerQuestions[i].questionTitle+'</div>' +
                '<div class="qPoints">';
            for(var j=0;j<question.choiceNumber;j++){
                choiceHTML+= '&nbsp;<span class="glyphicon glyphicon-star-empty"></span>';
            }
            choiceHTML+='</div></div></div>';
        }
        choiceHTML+='</div>';
    }



    questionHTML+=choiceHTML;

    //工具栏
    questionHTML+='<div class="qToolbar">' +
        '&nbsp; <span class="glyphicon glyphicon-plus choice-add" title="添加选项"></span>' +
        '&nbsp; <span class="glyphicon glyphicon-plus-sign choices-add" title="批量添加"></span>' +
        '&nbsp; <span class="glyphicon glyphicon-cog choice-set" title="选项设置"></span>' +
        '&nbsp; <span class="glyphicon glyphicon-remove question-remove question-remove" title="删除本题"></span>' +
        '</div>';
    //结尾
    questionHTML+='</div></div></li>'

    $("#mainFrame").append(questionHTML);
    sortQIndex();
}


function buildSurvey(oJson){

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
            loadQuestion(oJson.questions[i]);
        }
    }

}

function loadSurvey(){
    var oSendJson={};
    var iCopyId = arguments[0];
    var iQId=parseInt(getParameter("qid")) || iCopyId;
    var iMId=parseInt(getParameter("mid"));

    var spinner = new Spinner().spin(document.getElementById('loadingDiv'));

    if(iQId){

        oSendJson.wjId = iQId;

        $.ajax({
            url: ContextUrl+"dywj/wj.htm",
            type: "POST",
            dataType: "json",
            async:false,
            data: {"json": JSON.stringify(oSendJson) },
            success: function (oJson) {
                //console.log(oJson);
                var result = oJson.success;
                if (result == 1) {

                    //传入参数新建问卷，否则修改问卷
                    if(!iCopyId){
                        setCurrentQid(oJson.wjId);
                    }
                    buildSurvey(oJson);

                } else if (result == 0) {
                    var msg = oJson.message;
                    alertify.alert(msg);

                }

                spinner.stop();

            }});
    }
    else if(iMId){

        oSendJson.childModelId = iMId;
        $.ajax({
            url: ContextUrl+"wjmb/getwjmb.htm",
            type: "POST",
            dataType: "json",
            data: {"json": JSON.stringify(oSendJson) },
            success: function (oJson) {
                //console.log(oJson);
                var result = oJson.success;
                if (result == 1) {
                    setCurrentQid(oJson.wjId);
                    buildSurvey(oJson);

                } else if (result == 0) {
                    var msg = oJson.message;
                    alertify.alert(msg);
                }

                spinner.stop();
            }});
    }
    else{
        alert("跳入问卷号错误页面");

        spinner.stop();
    }
}

function setCurrentQid(iQid){
    if(!isNaN(parseInt(iQid))){
        window.iQid=iQid;
    }
}
function getCurrentQid(){
   return window.iQid;
}

//跳转至编辑逻辑页面
function editLogic(){
    var qid=getCurrentQid();
    $().redirect('editLogic.html',{'qid': qid},"get");
}
