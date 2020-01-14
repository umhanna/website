
$(window).load(function() {
    $("html").css("overflow-y","hidden");
    $('#intro').fadeOut();
    $("html").css("overflow-y","scroll");
    //list
    listPosition();
});
//listPosition
function listPosition(){
    imgList = $(".grid-item");
    imgStack = [0, 0];
    colWidth = 400;
    for(i = 0; i < imgList.length; i++) {
        minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
        x = colWidth * minIndex;
        y = imgStack[minIndex];
        imgStack[minIndex] += ($(imgList[i]).find("img").height() + 150);
        $(imgList[i]).css({top : `${y}px`});
        if(i === imgList.length - 1) {
        $(".grid").css({height : `${Math.max.apply(0, imgStack)}px`});
        }
        if(i%2 == 0){
        $(imgList[i]).css({left:"0px"});
        }else{
        $(imgList[i]).css({right:"0px",marginTop:"5%"});
        }
    }
}

$(window).ready(function(){
    $(window).resize(function(){
        listPosition();
    });
    //nav link
    var headHeight = $("header .header_fix").height();
    $("#gnb li a").on({
        "click": function(){
            $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top - headHeight }, 500);
            $(".menu_btn").removeClass("on");
            $("#gnb, .gnb_bg").fadeOut();
        },
        "mouseenter": function(){
            var thisTxt = $(this).text();
            $(".gnb_bg .bg_txt").html(thisTxt);
            TweenMax.to($(".gnb_bg .bg_txt"), 0.4, {opacity:0.1,marginLeft:0});
        },
        "mouseleave": function(){
            $(".gnb_bg .bg_txt").html("");
            TweenMax.to($(".gnb_bg .bg_txt"), 0.4, {opacity:0,marginLeft:50});
        }
	});
    //menu_btn click event
    $(".menu_btn a").on("click", function(){
        if($(this).parent().hasClass("on")){
            $(".menu_btn").removeClass("on");
            $("#gnb, .gnb_bg").fadeOut();
        }else{
            $(this).parent().addClass("on");
            $("#gnb, .gnb_bg").fadeIn();
        }
    });
    //list hover event
    $(".work_list .grid .grid-item a").on({
        mouseenter : function(e){
            $(this).closest(".grid-item").addClass("hover");
            TweenMax.to($(this).find(".hover_box dl"), 0.3, {opacity:1,marginTop:0,delay:0.3});
            TweenMax.to($(this).find(".thumb_img img"), 0.9, {scale:1.1});
            TweenMax.to($(this), 0.9, {cursor:'url(../website/images/list_cursor.png) 30 30,auto', ease: Circ.easeInOut});
            TweenMax.to($(this).find(".pj_cont"), 0.4, {top:-35});
        },
        mouseleave : function(e){
            $(".work_list .grid .grid-item").removeClass("hover");
            TweenMax.to($(".hover_box dl"), 0.2, {opacity:0,marginTop:-20});
            TweenMax.to($(this).find(".thumb_img img"), 0.5, {scale:1});
            TweenMax.to($(this).find(".pj_cont"), 0.3, {top:0});
        }
    });

    $(window).scroll(function(){
		wscroll = $(window).height() + $(window).scrollTop();
        if(headHeight < $(window).scrollTop()){
            $(".header_fix").addClass("scroll_on");
        }else{
            $(".header_fix").removeClass("scroll_on");
        }
		$(".inner_box").each(function(){
			var link = $(this);
			if (wscroll > link.offset().top)
			{
				link.parent(".grid-item").addClass("on");
			}else if(wscroll < link.offset().top){
				link.parent(".grid-item").removeClass("on");
			}
        });
        //view scroll event
        if($(".view .screen_sec").length){
            var screenTop = $(".view .screen_sec").offset().top;
        }
		$(".view .screen_sec .scroll_img").each(function(){
            var thisImg = $(this);
            var thisImght = thisImg.find("span").height();
            if(wscroll > screenTop + $(".screen_sec ").height()){
                $(".view .screen_sec").addClass("on");
                TweenMax.to(thisImg.find("span"), 2, {top:-thisImght + thisImg.height()});
            }else{
                $(".view .screen_sec").removeClass("on");
                TweenMax.to(thisImg.find("span"), 2, {top:0});
            }
        });
    });

    $(".view .mv").height($(window).height());
    TweenMax.to($(".view .mv .bg"), 1.2, {scale:1});
    $(window).resize(function(){
        $(".view .mv").height($(window).height());
    });
    TweenMax.to($(".mv .arrow .icon"), 0.5, {bottom:0, yoyo:true, repeat:-1});
});