
$(function(){
	var swiper = new Swiper('.swiper-container', {
	    pagination: '.swiper-pagination',
		paginationType : 'progress',
	    paginationClickable: true,
	    direction: 'vertical',
	    // loop : true,
	    paginationProgressRender: function (swiper, progressbarClass) {
	      return '<span class="selfDefine" style="width:20%;"></span>';
	   },
	   onSlideChangeStart: function(swiper){
		      switch(swiper.activeIndex){
	    		case 0:
	    		$(".selfDefine").css("width","20%");
	    		showPage1();
	    		break;
	    		case 1:
	    		$(".selfDefine").css("width","40%");
	    		showPage2();
	    		break;
	    		case 2:
	    		$(".selfDefine").css("width","60%");
	    		showPage3();
	    		break;
	    		case 3:
	    		$(".selfDefine").css("width","80%");
	    		showPage4();
	    		break;
	    		default:
	    		$(".selfDefine").css("width","100%");
	    		showPage5();
	    	}
	    }
	});



		var $face = $(".face");
		var $smog = $(".smog");
		var $ready = $(".ready");
		var $child = $(".child");
		var $text1 = $(".text1");

		var $harm = $(".harm");
		var $illness = $(".illness");
		var $children = $(".children");
		var $rectangle = $(".rectangle");
		var $text3 = $(".text3");

		var $what = $(".what");
		var $text2 = $(".text2");

		var $freshair = $(".freshair");
		var $cascade = $(".cascade");
		var $session = $(".session");
		var $text4 = $(".text4");

		var $text7 = $(".text7");
		var $radius = $(".radius");
		var $pic1 = $(".pic1");
		var $pic2 = $(".pic2");
		var $pic4 = $(".pic4");
		var $pic3 = $(".pic3");
		var $love = $(".love");
		var $text6 = $(".text6");

		$face.css("display","none");
		$smog.css("display","none");
		$ready.css("display","none");
		$child.css("display","none");
		$text1.css("display","none");

	showPage1();

	function showPage1(){

		$what.css("display","none");
		$text2.css("display","none");

	    setTimeout(function(){
	        $face.css("display","block").addClass("animated bounceInLeft");
	    },100)
	    setTimeout(function(){
	        $smog.css("display","block").addClass("animated bounceInRight");
	    },100)
	    setTimeout(function(){
	        $ready.css("display","block").addClass("animated zoomIn");
	    },100)
	    setTimeout(function(){
	        $child.css("display","block").addClass("animated fadeInLeftBig");
	    },400)
	    setTimeout(function(){
	        $text1.css("display","block").addClass("animated bounceIn");
	    },300)
	}

	function showPage2(){

		$face.css("display","none");
		$smog.css("display","none");
		$ready.css("display","none");
		$child.css("display","none");
		$text1.css("display","none");

		$harm.css("display","none");
		$illness.css("display","none");
		$children.css("display","none");
		$rectangle.css("display","none");
		$text3.css("display","none");		

	    setTimeout(function(){
	        $what.css("display","block").addClass("animated bounceInLeft");
	    },100)
	    setTimeout(function(){
	        $text2.css("display","block").addClass("animated flipInX");
	    },100)
	}

	function showPage3(){

		$what.css("display","none");
		$text2.css("display","none");

		$freshair.css("display","none");
		$cascade.css("display","none");
		$session.css("display","none");
		$text4.css("display","none");		

	    setTimeout(function(){
	        $harm.css("display","block").addClass("animated bounceIn");
	    },100)
	    setTimeout(function(){
	        $illness.css("display","block").addClass("animated fadeIn");
	    },200)
	    setTimeout(function(){
	        $children.css("display","block").addClass("animated fadeIn");
	    },300)
	    setTimeout(function(){
	        $rectangle.css("display","block").addClass("animated fadeIn");
	    },400)
	    setTimeout(function(){
	        $text3.css("display","block").addClass("animated fadeIn");
	    },500)
	}



	function showPage4(){

		$harm.css("display","none");
		$illness.css("display","none");
		$children.css("display","none");
		$rectangle.css("display","none");
		$text3.css("display","none");		
		
		$text7.css("display","none");
		$radius.css("display","none");
		$pic1.css("display","none");
		$pic2.css("display","none");
		$pic4.css("display","none");
		$pic3.css("display","none");
		$love.css("display","none");
		$text6.css("display","none");			


	    setTimeout(function(){
	        $freshair.css("display","block").addClass("animated bounceIn");
	    },100)
	    setTimeout(function(){
	        $cascade.css("display","block").addClass("animated fadeInDown");
	    },100)
	    setTimeout(function(){
	        $session.css("display","block").addClass("animated fadeIn");
	    },200)
	    setTimeout(function(){
	        $text4.css("display","block").addClass("animated fadeIn");
	    },500)
	}


	function showPage5(){


		$freshair.css("display","none");
		$cascade.css("display","none");
		$session.css("display","none");
		$text4.css("display","none");

	    setTimeout(function(){
	        $text7.css("display","block").addClass("animated fadeInLeft");
	    },0)
	    setTimeout(function(){
	        $radius.css("display","block").addClass("animated fadeIn");
	    },100)
	    setTimeout(function(){
	        $pic1.css("display","block").addClass("animated fadeInLeft");
	    },200)
	    setTimeout(function(){
	        $pic2.css("display","block").addClass("animated fadeInRight");
	    },200)
	    setTimeout(function(){
	        $pic4.css("display","block").addClass("animated fadeInLeft");
	    },200)
	    setTimeout(function(){
	        $pic3.css("display","block").addClass("animated fadeInRight");
	    },200)
	    setTimeout(function(){
	        $love.css("display","block").addClass("animated bounceInLeft");
	    },300)
	    setTimeout(function(){
	        $text6.css("display","block").addClass("animated zoomIn");
	    },300)
	}
})




autoPlay();
function playSound(soundfile) {
    if (window.mp3) {
        if (window.mp3.paused) {
            window.mp3.loop = true;
            window.mp3.play();
        }
        else window.mp3.pause();
    } else {
        window.mp3 = new Audio(soundfile);
        window.mp3.loop = true;
        window.mp3.play();
    }
}
$('.audio-icon').on("tap",function () {
    if ($(this).is('.audio-xuan')) {
        $(this).removeClass('audio-xuan');
    } else {
        $(this).addClass('audio-xuan');
    }
    playSound('bgmusic.mp3');
});
function autoPlay(){
    $('.audio-icon').addClass('audio-xuan');
    playSound('bgmusic.mp3?v=1');
}