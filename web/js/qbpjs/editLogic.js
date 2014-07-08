/**
 * Created by duel on 14-2-28.
 */

$(document).ready(function () {

    //按钮增加  hover 气泡提示框
    $('#btnAddLogic').popover({
        trigger: 'hover',
        html:true,
        placement:'top'
    });
    $('#btnSave').popover({
        trigger: 'hover',
        html:true,
        placement:'top'
    })

    $("#btnAddLogic").attr("data-content","快捷键 <kbd>n</kbd>");
    $("#btnSave").attr("data-content","快捷键 <kbd>s</kbd>");

    //创建逻辑按钮  点击
    $("#btnAddLogic").on("click",function(){
        addLogic();
    });
    //删除按钮 点击
    $(document).on("click",".close",function(){
        $(this).closest(".logic").remove();
        sortIndex();
    });

    //增加条件 +点击
    $(document).on("click",".addCondition",function(){
        var gid=$(this).closest(".logic").attr("id");
        addCondition(gid);
    });

    //删除条件 -点击
    $(document).on("click",".removeCondition",function(){
        //当前条件数量
        var conditionNumber=$(this).closest(".logicConditions").find(".logicCondition").length;
        if(conditionNumber<=1){
            alert("至少有一个条件");
            return;
        }
        var gid=$(this).closest(".logicCondition").attr("id");
        removeCondition(gid);


    });

});


//快捷键
$(document).keydown(function(event){

    //判断是否 focus的对象是整个body 不然快捷键失效
    if(document.body != document.activeElement){
        return;
    }

    console.log(event.keyCode);
    //shift+?
    if(event.shiftKey && event.keyCode==191){
        $("#myModal").modal('toggle');
    }
    //快捷键 n 创建逻辑
    if(event.keyCode==78){
        addLogic();
    }

    //快捷键s  保存逻辑
    if(event.keyCode==83){
        alert("save success");
    }
});


/**
 * 新增一条跳转逻辑
 */
function addLogic(){

    //整个逻辑的gid
    var gid=guid();
    var cgid=guid();

    var appendHTML='<div id='+gid+' class="row logic"></div>';

    var serialNo=$("#logicArea").find(".logic").length+1;
    $("#logicArea").append(appendHTML);
    //编号  1/12
    $("#"+gid).append('<div class="col-xs-1 serialNo">'+serialNo+'</div>');


    //条件+结果 11/12
    $("#"+gid).append('<div id=pre_'+gid+' class="col-xs-11 logicConditions"></div>');


    //添加条件
    addCondition(gid);


    //分割线
    $("#"+gid).append('<div class="result col-xs-push-1 col-xs-11 row ">');
    $("#"+gid+" .result").append('<div class="col-xs-12 line"></div>');


    //添加结果

    $("#"+gid+" .result").append('<div class="col-xs-2">跳至</div>');

    //结果题目 下拉框
    appendHTML='<div class="col-xs-4"><select id=suf_question_'+gid+' class="form-control"></select></div>';
    $("#"+gid+" .result").append(appendHTML);
    appendHTML="";
    for(var i=0;i<3;i++){
        appendHTML+='<option value="i">第'+(i+1)+'题</option>';
    }
    $("#suf_question_"+gid).append(appendHTML);


    //删除按钮
    appendHTML='<div class="col-lg-offset-2 col-xs-1">'+
//        '<button gid="'+gid+'" type="button" class="close"><span aria-hidden="true">&times;</span>' +
        ' <button type="button" class="btn btn-danger removeLogic">删除本条逻辑</button>'+
        '</button></div>';
    $("#"+gid+" .result").append(appendHTML);
}


/**
 * 跳转逻辑 编码排序
 */
function sortIndex(){
    $(".serialNo").each(function(i,e){
        //first 是为了防止 有标题编辑的时候产生的bug
        $(e).text(i+1);

    });
}


/**
 * 增加一个条件
 */
function addCondition(gid){



    var appendHTML='';
    var cgid=guid();
    //条件题目 下拉框
    var conditionNumber=$("#"+gid).find(".logicCondition").length;
    if(conditionNumber>=1){

        appendHTML='<div id='+cgid+' class="row logicCondition"></div>';

        $("#pre_"+gid).append(appendHTML);
        appendHTML='<div class="col-xs-2 relation">' +
            '<select class="form-control">' +
            '<option value="1">并且</option>' +
            '<option value="2">或者</option>' +
            '</select></div>';
        $("#"+cgid).append(appendHTML);
        appendHTML='<div class="col-xs-4">' +
            '<select id=pre_question_'+cgid+' class="form-control"></select></div>';
        $("#"+cgid).append(appendHTML);

    }else{
        appendHTML='<div id='+cgid+' class="row logicCondition"><div class="col-xs-offset-2 col-xs-4">' +
            '<select id=pre_question_'+cgid+' class="form-control"></select></div></div>';
        $("#pre_"+gid).append(appendHTML);
    }

    appendHTML="";
    for(var i=0;i<5;i++){
        appendHTML+='<option value="i">第'+(i+1)+'题</option>';
    }
    $("#pre_question_"+cgid).append(appendHTML);

    //“选”字
    appendHTML='<div class="col-xs-1">选</div>';
    $("#"+cgid).append(appendHTML);

    //条件选项 下拉框
    appendHTML='<div class="col-xs-3"><select id=pre_option_'+cgid+' class="form-control"></select></div>';
    $("#"+cgid).append(appendHTML);
    appendHTML="";
    for(var i=0;i<4;i++){
        appendHTML+='<option value="i">'+alphabet[i]+'</option>';
    }
    $("#pre_option_"+cgid).append(appendHTML);

    //+-  条件 增删按钮
    $("#"+cgid).append('<div class="col-xs-1">' +
        '<button type="button" class="btn btn-success addCondition">' +
        '<span class="glyphicon glyphicon-plus"></span>' +
        '</button></div>' +
        '<div class="col-xs-1">' +
        '<button type="button" class="btn btn-danger removeCondition">' +
        '<span class="glyphicon glyphicon-minus"></span>' +
        '</button></div>');




}

/**
 * 删除一个条件
 */
function removeCondition(gid){
    var firstId=$("#"+gid).closest(".logicConditions").children().eq(0).attr("id");
    if(firstId==gid){
        //删除的是第一个条件  要把下一个条件的  (并且/或者)给移除
        $("#"+gid).next().find(".relation").remove();
        $("#"+gid).next().children().first().addClass("col-xs-offset-2")
    }


    $("#"+gid).remove();

}



/**
 * 读取问卷
 */
function loadSurvey(){
    var oSendJson={};
    var iQId=parseInt(getParameter("qid"));
    var spinner = new Spinner().spin(document.getElementById('loadingDiv'));



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
