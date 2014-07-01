/**
 * Created by duel on 13-12-13.
 */



//绘制分页列表
function buildPage(iTotalItems,iCurrentPage,iItemEachPage){
    var oDiv=document.getElementById("page");

    iTotalItems = parseInt(iTotalItems);
    iCurrentPage = parseInt(iCurrentPage);
    iItemEachPage = parseInt(iItemEachPage);
    var iTotalPage=Math.ceil(iTotalItems/iItemEachPage);
    if( !iTotalItems || !iCurrentPage || !iItemEachPage ||  iCurrentPage>iTotalPage || iTotalItems < 0 || iItemEachPage<0 || iCurrentPage<0){
        //console.log("参数错误，参数必须是正整数，且当前页面不能超过总页面");
        return;
    }

    if(oDiv){
        var sPageHTML="";
        iTotalPage=Math.ceil(iTotalItems/iItemEachPage);
        //console.log("total:"+iTotalPage);
        //console.log("current:"+iCurrentPage);

        var i=0;

        if(iCurrentPage==1){
            sPageHTML+='<li class="disabled"><span>&laquo;</span></li>';
        }else{
            sPageHTML+='<li data-page="'+(iCurrentPage-1)+'"><a href="javascript:void(0);">&laquo;</a></li>';
        }


        if(iTotalPage<=10){
            for(i=0;i<iTotalPage;i++){
                var iPage=i+1;
                if(iPage==iCurrentPage){
                    sPageHTML+='<li class="active"><span>'+iPage+'</span></li>';
                }else{
                    sPageHTML+= '<li data-page="'+iPage+'"><a href="javascript:void(0)">'+iPage+'</a></li>' ;
                }
            }
        }

        else{
            if((iCurrentPage-5)<=1){
                for(i=1;i<=10;i++){
                    if(i==iCurrentPage){
                        sPageHTML+='<li class="active"><span>'+i+'</span></li>';
                    }else{
                        sPageHTML+= '<li data-page="'+i+'"><a href="javascript:void(0)">'+i+'</a></li>' ;
                    }
                }
                sPageHTML+= '<li data-page="'+iTotalPage+'"><a href="javascript:void(0)">...'+iTotalPage+'</a></li>' ;

            }
            else{
                sPageHTML+= '<li data-page="'+1+'"><a href="javascript:void(0)">1...</a></li>' ;

                var start=iCurrentPage-5;
                var sub= 0;
                if((iCurrentPage+4)>iTotalPage){
                    sub= ((iCurrentPage+4)-iTotalPage);
                    start-=sub;
                }
                for(i=start;i<=start+5+sub;i++){
                    if(i==iCurrentPage){
                        sPageHTML+='<li class="active"><span>'+i+'</span></li>';
                    }else{
                        sPageHTML+= '<li data-page="'+i+'"><a href="javascript:void(0)">'+i+'</a></li>' ;
                    }
                }
                if((iCurrentPage+4)<iTotalPage){
                    var start=iCurrentPage+1;
                    for(i=start;i<=start+3;i++){
                        if(i==iCurrentPage){
                            sPageHTML+='<li class="active"><span>'+i+'</span></li>';
                        }else{
                            sPageHTML+= '<li data-page="'+i+'"><a href="javascript:void(0)">'+i+'</a></li>' ;
                        }
                    }
                    sPageHTML+= '<li data-page="'+iTotalPage+'"><a href="javascript:void(0)">...'+iTotalPage+'</a></li>' ;
                }
                else{
                    var start=iCurrentPage+1;
                    for(i=start;i<=iTotalPage;i++){
                        if(i==iCurrentPage){
                            sPageHTML+='<li class="active"><span>'+i+'</span></li>';
                        }else{
                            sPageHTML+= '<li data-page="'+i+'"><a href="javascript:void(0)">'+i+'</a></li>' ;
                        }
                    }

                }
            }

        }

        if(iCurrentPage==iTotalPage){
            sPageHTML+='<li class="disabled"><span>&raquo;</span></li>';
        }else{
            sPageHTML+='<li data-page="'+(iCurrentPage+1)+'"><a href="javascript:void(0);">&raquo;</a></li>';
        }

        $("#page").empty().append(sPageHTML);

    }

}


/*获取浏览器参数parameter*/
function getParameter(sValue){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == sValue ){
            return KeyValuePair[1];
        }
    }
}

//获取指定元素的样式
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else{
        return document.defaultView.getComputedStyle(obj,null)[attr];
    }
}


//日期比较，返回相差的时间，刚刚、几分钟、几小时、几天、几月前；
function compareDate(date1,date2){
    //参数data1应当比data2小 ，也就是date1日期比date2早
    //data  yyyy-MM-dd hh-mm-ss
    //每个分 时 天 月 分别换算为秒数
    // return date1.substring(0,19);
    //把yyyy-MM-dd hh:mm:ss.0 替换成 yyyy/MM/dd hh:mm:ss 可以兼容火狐
    date1=date1.replace(/-/g,"/").substring(0,19);
    var eachMonth=2592000;
    var eachDay=86400;
    var eachHour=3600;
    var eachMinute=60;

    var sDate1=(new Date(date1).getTime())/1000;
    var sDate2=(new Date(date2).getTime())/1000;

    var dateSub=sDate2-sDate1;

    if(dateSub <= eachMinute){
        return "刚刚";
    }
    else if(dateSub <= eachHour){
        return  Math.floor(dateSub/eachMinute)+"分钟前";
    }
    else if(dateSub <= eachDay){
        return  Math.floor(dateSub/eachHour)+"小时前";
    }
    else if(dateSub <= eachMonth){
        return  Math.floor(dateSub/eachDay)+"天前";
    }
    else if(dateSub > eachMonth){
        return  Math.floor(dateSub/eachMonth)+"月前";
    }
}
