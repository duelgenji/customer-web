/**
 * Created by duel on 13-12-19.
 */
$(document).ready(function () {

    //请求数据
    var wjId=getParameter("sid");
    if(!wjId){
        alertify.alert("没有正确的问卷参数");
        //转入404
        return;
    }
    setQuestions();
    var iQid=$("#questionId option:selected").val();
    var qType=$("#questionId option:selected").attr("data-qt");

    if(qType==3){

        $("#answerContainer").show();
        $("#container").hide();
        buildTable(iQid);
    }
    else{
        $("#container").show();
        $("#answerContainer").hide();
        var object={};
        object.wtId = iQid;
        object.wjId = wjId;
        object.wjType=2;
        object.dataSort=1;
        object.chartType=100;
        object.dataType=1;
        object.dataGroup=2;
        showChart("1",getJsonData(object));
    }

    //切换图类型
    $("#myChartType").change(function(){
        rebuildChart();
    });


    //更改问卷 获取数据
    $("#questionId").change(function(){

        rebuildChart();
    });

    //更改 排序方式
    $("#sortType").change(function(){

        rebuildChart();
    });

    //更改 数据类型
    $("#dataType").change(function(){
        rebuildChart();
    });


    //分页点击
    $(document).on("click","#page li",function(){
        var iQid=$("#questionId option:selected").val();
        var iPage=$(this).attr("data-page");
        if(iPage){
            buildTable(iQid,iPage);
        }
        return;
    });



});

function rebuildChart(){
    var iQid=$("#questionId option:selected").val();
    var qType=$("#questionId option:selected").attr("data-qt");

    if(qType==3){

        $("#container").hide();
        $("#answerContainer").show();
        buildTable(iQid);
        return;
    }
    $("#container").show();
    $("#answerContainer").hide();
    var sType=$("#myChartType option:selected").val();
    var dataSort=$("#sortType option:selected").val();
    var dataType=$("#dataType option:selected").val();
    var object={};
    object.iChartType = sType;
    object.wtId = iQid;
    object.wjId = getParameter("sid");;
    object.dataSort=dataSort;
    object.dataType=dataType;

    object.wjType=2;
    object.chartType=100;
    object.dataGroup=2;
    showChart(sType,getJsonData(object));
}

function getJsonData(object){
    var jsonData;
    var iChartType = object.iChartType || 1;
    var iDateType= object.dataType||1;
    var oSendJson={};
    oSendJson = object;
    oSendJson.iSurveyId=44;

    var url="";

    if(iChartType==1){
        url="sjfx/getWtData.htm";
    }else if(iChartType==2){
        url="sjfx/getWtData.htm";
    }else if(iChartType==3){
        url="sjfx/getWtData.htm";
    }
    else if(iChartType==4){
        url="sjfx/getWjData4Excel.htm";
    }

    //console.log(JSON.stringify(oSendJson));

    $.ajax({
        url:url ,
        type: "POST",
        dataType: "json",
        async:false,
        data: {"json": JSON.stringify(oSendJson) },
        success: function (oJson) {
            var result = oJson.success;

            console.log(oJson);
            if (result == 1) {
                jsonData= oJson;
                if(iDateType==2){
                    jsonData.suffixValue="%";
                }
                else{
                    jsonData.suffixValue="";
                }
            }
            if (result == 0) {
                var msg = oJson.message;
            }


        }});
    return jsonData;
}



//题目下拉框 设置题目
function setQuestions(){

    var oSendJson={};
    oSendJson.iWjId = getParameter("sid");

    $.ajax({
        url:"dywj/wtlist.htm" ,
        type: "POST",
        dataType: "json",
        async:false,
        data: {"json": JSON.stringify(oSendJson) },
        success: function (oJson) {
            var result = oJson.success;
            //console.log(oJson);
            if (result == 1) {
                $("#questionId").empty();
                for(var i=0;i<oJson.aWt.length;i++){
                    $("#questionId").append('<option data-qt="'+oJson.aWt[i].iTypeId+'" value="'+oJson.aWt[i].iWtId+'">'+oJson.aWt[i].sTitle+'</option>');
                }
            }
            if (result == 0) {
                var msg = oJson.message;
                alertify.alert(msg);
            }
        }});
}


//问答题 绘制表格
function buildTable(qid,pno){

    var oSendJson={};

    oSendJson.wtId = qid;
    oSendJson.pageNo = pno || 1;
    oSendJson.dataGroup = 2;


    $.ajax({
        url:"sjfx/getWdData.htm" ,
        type: "POST",
        dataType: "json",
        async:false,
        data: {"json": JSON.stringify(oSendJson) },
        success: function (oJson) {
            var result = oJson.success;
            //console.log(oJson);
            if (result == 1) {

                $("#answerList").empty();
                for(var i=0;i<oJson.aData.length;i++){
                    $("#answerList").append('<tr><td data-aid="'+oJson.aData[i].iDjId+'">'+oJson.aData[i].sTitle+'</td><td>'+oJson.aData[i].sCreateTime.substring(0,19)+'</td></tr>')
                }
                buildPage(oJson.iTotalItems,oJson.iPageNo,10);
            }
            if (result == 0) {
                var msg = oJson.message;
                alertify.alert(msg);
            }
        }});
}



//highChart
function showChart(sType,jParameter){
    switch (sType) {
        case "1":
            $(function () {
                var colors = Highcharts.getOptions().colors;

                function columnChartData(y, color,drilldown)
                {
                    this.y=arguments[0];
                    this.color=arguments[1];
                    if(arguments[2] && arguments[2]!="")
                        this.drilldown=arguments[2];
                }
                var myData=new Array();
                var aName=new Array();
                for(var i=0;i<jParameter.items.length;i++){
                    myData[i]=new columnChartData(parseFloat(jParameter.items[i].data),colors[i]);
                    aName[i]=jParameter.items[i].name;
                }

                function setChart(name, categories, data, color) {
                    chart.xAxis[0].setCategories(categories, false);
                    chart.series[0].remove(false);
                    chart.addSeries({
                        name: name,
                        data: data,
                        color: color || 'white'
                    }, false);
                    chart.redraw();
                }

                var chart = $('#container').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: jParameter.mainTitle
                    },
                    subtitle: {
                        text: jParameter.subTitle
                    },
                    xAxis: {categories: aName },
                    yAxis: { title:{ text:""} },
                    plotOptions: {
                        column: {
                            cursor: 'pointer',
                            point: {
                                events: {
                                    click: function() {
                                        var drilldown = this.drilldown;
                                        if (drilldown) { // drill down
                                            setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);
                                        } else { // restore
                                            return;
                                            setChart(name, categories, data);
                                        }
                                    }
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                color: colors[0],
                                style: {
                                    fontWeight: 'bold'
                                },
                                formatter: function() {
                                    return this.y+jParameter.suffixValue;
                                }
                            }
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            var point = this.point,
                                s = this.x +':<b>'+ this.y + jParameter.suffixValue +'</b><br/>';
                            if (point.drilldown) {
                                //s += 'Click to view '+ point.category +' versions';
                            } else {
                                // s += 'Click to return to browser brands';
                            }
                            return s;
                        }
                    },
                    legend:false,
                    series: [{
                        data: myData,
                        color: 'white'
                    }],
                    exporting: {
                        enabled: true
                    }
                })
                    .highcharts(); // return chart
            });
            break;
        case "2":
        function pieChartData(y, name)
        {
            this.y=arguments[0];
            this.name=arguments[1];
            if(arguments[2]){
                this.sliced=true;
                this.selected=true;
            }
        }

            var aMyData=new Array();
            var fMax=0;
            var i;
            for(i=0;i<jParameter.items.length;i++){
                if(parseFloat(jParameter.items[i].data)>fMax)
                    fMax=parseFloat(jParameter.items[i].data);
            }
            for(i=0;i<jParameter.items.length;i++){
                if(fMax==jParameter.items[i].data){
                    aMyData[i]=new pieChartData(parseFloat(jParameter.items[i].data),jParameter.items[i].name,true);
                }else{
                    aMyData[i]=new pieChartData(parseFloat(jParameter.items[i].data),jParameter.items[i].name);
                }
            }
            $('#container').highcharts({
                chart: {
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: jParameter.mainTitle
                },
                subtitle: {
                    text: jParameter.subTitle
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f} %</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            format: '<b>{point.name}</b>: {point.percentage:.2f} %'
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: '选中次数',
                    data: aMyData
                }]
            });
            break;
        case "3":
            $('#container').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: jParameter.mainTitle
                },
                subtitle: {
                    text: jParameter.subTitle
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    }
                },
                tooltip: {
                    enabled: false,
                    formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                            this.x +': '+ this.y +'°C';
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: 'Tokyo',
                    data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: 'London',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }]
            });
            break;
        case "4":
            $('#container').highcharts({
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Historic and Estimated Worldwide Population Distribution by Region'
                },
                subtitle: {
                    text: 'Source: Wikipedia.org'
                },
                xAxis: {
                    categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                },
                yAxis: {
                    title: {
                        text: 'Percent'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
                    shared: true
                },
                plotOptions: {
                    area: {
                        stacking: 'percent',
                        lineColor: '#ffffff',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#ffffff'
                        }
                    }
                },
                series: [{
                    name: 'Asia',
                    data: [502, 635, 809, 947, 1402, 3634, 5268]
                }, {
                    name: 'Africa',
                    data: [106, 107, 111, 133, 221, 767, 1766]
                }, {
                    name: 'Europe',
                    data: [163, 203, 276, 408, 547, 729, 628]
                }, {
                    name: 'America',
                    data: [18, 31, 54, 156, 339, 818, 1201]
                }, {
                    name: 'Oceania',
                    data: [2, 2, 2, 6, 13, 30, 46]
                }]
            });
            break;
        case "5":
            $('#container').highcharts({

                chart: {
                    type: 'bubble',
                    zoomType: 'xy'
                },

                title: {
                    text: 'Highcharts Bubbles'
                },

                series: [{
                    data: [[97,36,79],[94,74,60],[68,76,58],[64,87,56],[68,27,73],[74,99,42],[7,93,87],[51,69,40],[38,23,33],[57,86,31]]
                }, {
                    data: [[25,10,87],[2,75,59],[11,54,8],[86,55,93],[5,3,58],[90,63,44],[91,33,17],[97,3,56],[15,67,48],[54,25,81]]
                }, {
                    data: [[47,47,21],[20,12,4],[6,76,91],[38,30,60],[57,98,64],[61,17,80],[83,60,13],[67,78,75],[64,12,10],[30,77,82]]
                }]

            });
            break;
    }

}
