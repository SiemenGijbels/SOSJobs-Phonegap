$(function () {

	var prevScroll = 0;


	localStorage.setItem("id", 11);

	function init () {

		console.log("init");

		$(window).on("scroll",function () {

			console.log("scroll");

			var top = $(window).scrollTop();

			if(prevScroll+50 < top){

				$("header#main_head").addClass("close");
				$("footer nav").addClass("close");

				prevScroll = top;

			}

			if(prevScroll-20 > top){

				$("header#main_head").removeClass("close");
				$("footer nav").removeClass("close");

				//prevScroll = top;

			}	

		});


		$(document).on("scrollstop",function(){

			console.log("scroll stopped");
			var top = $(window).scrollTop();

			prevScroll = top;

		});

	}	

	init();
});