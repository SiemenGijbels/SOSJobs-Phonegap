$(function (){

	currentPage = 0;

	colors = ["#644D52","#909EA2","#F9CE5E"];

	function init () {
			
		console.log("init employer");
		setPackage();

		$(window).on("keyup",function  (e) {
			console.log(e.keyCode);
			switch(e.keyCode){
				case 39:
					nextPackage();
				break;

				case 37:
					prevPackage();
				break;
			}
		});

		$(".left").on("click",prevPackage);
		$(".right").on("click",nextPackage);

	}

	init();

	function nextPackage () {

		currentPage++;

		if(currentPage > 2){
			currentPage = 0;
		}
		setPackage();
	}

	function prevPackage () {
		currentPage--;
		if(currentPage < 0){
			currentPage = 2;
		}

		setPackage();
	}

	function setPackage () {



		var mainWidth = $(".packages aside").width()+($(window).width()/8.6);
		console.log(mainWidth*currentPage);
		$(".packages").css("left","-"+mainWidth*currentPage+"px");

		$(".packages aside").each(function  (key,val) {

			$(val).removeClass("selected");

			if(key == currentPage){
				$(val).addClass("selected");
			}

		});


		$('.left').css('background-color',colors[currentPage-1]);

		if(currentPage-1 < 0){
			$('.left').css('background-color',colors[2]);
		}

		$('.right').css('background-color',colors[currentPage+1]);

		if(currentPage+1 > 2){
			$('.right').css('background-color',colors[0]);
		}
	}

});