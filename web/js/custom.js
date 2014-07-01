$(document).ready(function () {
    $("#addQuestion").click(function () {
        //tableQuestion
        var length = $("#tableQuestion tr:first-child").children("td").length - 1;


        var tr = "<tr><td>输入子问题</td>";
        for (var i = 0; i < length; i++) {
            tr = tr + "<td> </td>";
        }
        tr = tr + "</tr>";
        $("#tableQuestion").append(tr);
        $("#tableQuestion tr:last-child").children("td:first-child").click(function () {
            $(this).parent("tr").remove();


        });


    });
    $("#addChoices").click(function () {

        $("#tableQuestion tr").each(function (index, element) {
            if (index == 0) {
                $(this).append("<td>输入选项</td>");
                $(this).children("td:last-child").click(function () {
                    var index = $(this).index();
                    $("#tableQuestion tr").each(function () {
                        $(this).children("td:eq(" + index + ")").remove();

                    });


                });


            } else {
                $(this).append("<td></td>");
            }


        });
    });


});