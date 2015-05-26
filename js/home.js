$(function  () {

	function init () {



		$.ajax({
		  url: "http://rachouanrejeb.be/sosjobs/api/vacancies/",
		  context: document.body
		}).done(function(data) {

			console.log("done");
			console.log(data);

			$(data).each(function  (key,val) {

				var htmlString = "";

				htmlString += '<header class="color'+val.color_code+'"><a href="" class="info" id="'+val.id+'">';
				htmlString += '<img src="https://d13yacurqjgara.cloudfront.net/users/180760/avatars/normal/TEC---Dribble-Avatar-Red-01.png">';
				htmlString += '<div><h1>'+val.title+'</h1><h2>'+val.location+'</h2></div><span class="detail"></span>';
				htmlString += '</a></header>';
				htmlString += '<aside><header class="hide"><h1>vacancie options</h1></header>';
				htmlString += '<nav><header class="hide"><h1>vacancie navigation</h1></header>';
				htmlString += '<ul><li class="fav" id="'+val.id+'"><span class="hide">favorite</span></li><li class="share"><span class="hide">>share</span></li><li><span>APPLY</span></li><li class="delete"><span class="hide">>delete</span></li></ul>';
				htmlString += ' </nav> </aside>';

				var newSection = $('<section/>').html(htmlString);

				$("article.feed").append(newSection);
			});

			$("article section .info").on("click",function (e) {

				e.preventDefault();

				var student_id = parseInt(localStorage.getItem("id"));

				var sendInfo = {
                   achievement_id: 2,
                   student_id: student_id
               };

                $.ajax(
                {
                    url : "http://localhost:8888/sosjobs/api/getAchievement/",
                    type: "POST",
                    data : sendInfo,
                    success:function(data, textStatus, jqXHR) 
                    {
            			var min = parseInt(data.min);
            			var max = parseInt(data.max);

            			console.log(data.min,data.max);

            			if( min < max){

            				min++;

            				console.log("update achievement");
            				var student_id = parseInt(localStorage.getItem("id"));

            				var sendInfo = {
			                   achievement_id: data.achievement_id,
			                   student_id: student_id,
			                   min:min
			               };

	        				$.ajax(
			                {
			                    url : "http://localhost:8888/sosjobs/api/updateAchievement/",
			                    type: "POST",
			                    data : sendInfo,
			                    success:function(data, textStatus, jqXHR) 
			                    {

			            			console.log(data);

	                                var student_id = parseInt(localStorage.getItem("id"));
	                                var id = parseInt(data.student_id);

	                                console.log(id,student_id);

	                                if(id == student_id){
	                                	var sendInfo = {
						                   achievement_id: data.achievement_id,
						                   student_id: student_id,
						                   unlock:1
						               };

			        				$.ajax(
					                {
					                    url : "http://localhost:8888/sosjobs/api/unlockAchievement/",
					                    type: "POST",
					                    data : sendInfo,
					                    success:function(data, textStatus, jqXHR) 
					                    {

					            			console.log(data);
					                    },
					                    error: function(jqXHR, textStatus, errorThrown) 
					                    {
					                        console.log(textStatus);  
					                    }
					                });
	                                }
			                    },
			                    error: function(jqXHR, textStatus, errorThrown) 
			                    {
			                        console.log(textStatus);  
			                    }
			                });

            			}
            			
                    },
                    error: function(jqXHR, textStatus, errorThrown) 
                    {
                        console.log(textStatus);  
                    }
                });


				console.log("clicked");

				var currentId = $(this).attr("id");
				
				showDetail(currentId);
				
			});

			$(".detail header h1 .back").on("click",function () {
				$(".detail").addClass("close");

				$("meta[name='theme-color']").attr("content","#F9EACD");
			});

			$(".fav").on("click",function (e) {

				$("#vacancy_id").val($(this).attr('id'));
				$("#student_id").val(2);

				var postData = $(favourite_form).serializeArray();
	            var formURL = $(favourite_form).attr("action");

	            $.ajax(
	            {
	                url : formURL,
	                type: "POST",
	                data : postData,
	                success:function(data, textStatus, jqXHR) 
	                {
	                    console.log(data);
	                },
	                error: function(jqXHR, textStatus, errorThrown) 
	                {
	                    console.log(textStatus);  
	                }
	            });

			});

			/*$(".detail header .job").text(data.title);
			$(".detail header .jobinfo .locatie").text(data.location);
			$(".detail header .jobinfo .soort").text(data.category);
			$(".detail aside .info").text(data.description);*/


		});
	}

	init();

	function showDetail (id) {

		console.log(id);
		var url = "http://rachouanrejeb.be/sosjobs/api/vacancies/"+id;

		$.ajax({
		  url: url,
		  context: document.body
		}).done(function(data) {

			console.log("done");
			console.log(data.title);

			$(".detail header .job").text(data.title);
			$(".detail header .jobinfo .locatie").text(data.location);
			$(".detail header .jobinfo .soort").text(data.category);
			$(".detail aside .info").html(data.description);

		  $(".detail").removeClass("close");

		});

		

		$("meta[name='theme-color']").attr("content","#44474D");
	}

});