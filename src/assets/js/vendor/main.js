require.config({
    paths: {
        jquery: ["http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min", '../jquery.min'] //配置第三方库，不能加.js后缀
    }
});
require(["jquery"], function ($) {
    $(function () {
        window.onscroll = function () {
            var scrollTop = document.body.scrollTop;
            if (scrollTop >= 200) {
                $(".gotop").css('display', 'block');
            } else {
                $(".gotop").css('display', 'none');
            }
        };
    });
});

function goTop(){
    $("html,body").animate({scrollTop: 0}, 500);
}


