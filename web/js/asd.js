$(document).ready(function () {
    $("[name=email]").bind({focus: function () {
        showTips("email", "account_000")
    }, blur: function () {
        if (!/^[A-Za-z0-9][\w\.\-]+@[\w\.\-]+(\.[\w\.\-]+)+$/.test($(this).val())) {
            showWarningMsg("email", "account_001")
        } else {
            var a = $.trim($("[name=email]").val());
            checkEmail(a, function () {
                showWarningMsg("email", "account_002")
            }, function () {
                showTips("email", "account_000")
            })
        }
    }});
    $("[name=password]").bind({focus: function () {
        showTips("password", "account_006")
    }, blur: function () {
        if ($(this).val().indexOf(" ") > 0) {
            showWarningMsg("password", "account_007")
        } else {
            if ($(this).val().length > 16 || $(this).val().length < 6) {
                showWarningMsg("password", "account_006")
            } else {
                showTips("password", "account_006")
            }
        }
    }})
});
function agreementBtnFn() {
    var a = $("#agreement:checked").length > 0;
    $("#submitBtn").removeClass("btn-gray");
    if (!a) {
        $("#submitBtn").addClass("btn-gray")
    }
}
function formSubmit() {
    var b = $("#agreement:checked").length > 0;
    if (!b) {
        return false
    }
    if ($("[name=password]").val().indexOf(" ") > 0) {
        showWarningMsg("password", "account_007");
        return false
    } else {
        if ($("[name=password]").val().length > 16 || $("[name=password]").val().length < 6) {
            showWarningMsg("password", "account_006");
            return false
        }
    }
    if (!/^[A-Za-z0-9][\w\.\-]+@[\w\.\-]+(\.[\w\.\-]+)+$/.test($("[name=email]").val())) {
        showWarningMsg("email", "account_001");
        return false
    } else {
        var a = $.trim($("[name=email]").val());
        checkEmail(a, function () {
            showWarningMsg("email", "account_002");
            return false
        }, function () {
            $(".missing-in").removeClass("missing-in");
            $("[name=password]").unbind("blur");
            $("[name=password]").val(hex_md5($("[name=password]").val()))
        })
    }
    return true
};