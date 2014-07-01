//Download by http://www.codefans.net
jQuery(function(a) {
    a(function() {
        var b;
        a("#rcslider").hover(function() {
            clearInterval(b)
        },
        function() {
            b = setInterval(function() {
                var b = a("#rcslider"),
                c = b.find("li:last").height();
                b.animate({
                    marginTop: c + 3 + "px"
                },
                1e3,
                function() {
                    b.find("li:last").prependTo(b),
                    b.find("li:first").hide(),
                    b.css({
                        marginTop: 0
                    }),
                    b.find("li:first").fadeIn(1e3)
                })
            },
            3e3)
        }).trigger("mouseleave")
    }),
    a(document).ready(function() {
        a("#rcslider li").css({
            opacity: ".6"
        }),
        a("#rcslider li").hover(function() {
            a(this).stop().fadeTo(300, 1)
        },
        function() {
            a(this).stop().fadeTo(300, .6)
        })
    })
});