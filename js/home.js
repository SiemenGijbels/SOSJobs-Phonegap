$(function  () {

	function init () {


		firstOpen();

		
		$.ajax({
		  url: "http://rachouanrejeb.be/sosjobs/api/vacancies/",
		  context: document.body
		}).done(function(data) {

		console.log("done");
		console.log(data);

		$(data).each(function (key,val) {

			var htmlString = "";

			htmlString += '<header class="color'+val.color_code+'"><a href="" class="info" id="'+val.id+'">';
			htmlString += '<img src="https://d13yacurqjgara.cloudfront.net/users/761348/avatars/normal/879463c21f43696a38c83a2e29034b0e.png?1424166156">';
			htmlString += '<div><h1>'+val.title+'</h1><h2>'+val.location+'</h2></div><span class="detail"></span>';
			htmlString += '</a></header>';
			htmlString += '<aside><header class="hide"><h1>vacancie options</h1></header>';
			htmlString += '<nav><header class="hide"><h1>vacancie navigation</h1></header>';
			htmlString += '<ul><li class="fav" id="'+val.id+'"><span class="hide">favorite</span></li><li class="share"><span class="hide">share</span></li><li><span class="apply">APPLY</span></li><li class="delete"><span class="hide">delete</span></li></ul>';
			htmlString += ' </nav> </aside>';

			var newSection = $('<section/>').html(htmlString).addClass("animated fadeInUp");

			$("article.feed").append(newSection);
		});


			$(".preloader").addClass("animated fadeOut");
			setTimeout(function  () {
				$(".preloader").removeClass("animated fadeOut");
				$(".preloader").addClass("hide");
			}, 1000);
			$("article section .info").on("click",function (e) {

				e.preventDefault();

				
				var loggedIn = localStorage.getItem("loggedIn");
				var user = JSON.parse(localStorage.getItem("user"));
				var student_id = parseInt(user.id);


				console.log(user);

				if(loggedIn){

					var sendInfo = {
                   achievement_id: 2,
                   student_id: student_id
               };

                $.ajax(
                {
                    url : "http://rachouanrejeb.be/sosjobs/api/getAchievement/",
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

            				var sendInfo = {
			                   achievement_id: data.achievement_id,
			                   student_id: student_id,
			                   min:min
			               };

	        				$.ajax(
			                {
			                    url : "http://rachouanrejeb.be/sosjobs/api/updateAchievement/",
			                    type: "POST",
			                    data : sendInfo,
			                    success:function(data, textStatus, jqXHR) 
			                    {

			            			console.log(data);

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
					                    url : "http://rachouanrejeb.be/sosjobs/api/unlockAchievement/",
					                    type: "POST",
					                    data : sendInfo,
					                    success:function(data, textStatus, jqXHR) 
					                    {
					            			console.log(data);
					            			$(".achievement_container section img").attr("src","pics/achievements/"+data.name+"-unlocked.svg");
					            			$(".achievement_container section h1").text(data.name);
					            			$(".achievement_container section p").text(data.description);

					            			$(".achievement_container").addClass("open");
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

				}else{
					window.location.replace("login.html");
				}
				


				console.log("clicked");

				var currentId = $(this).attr("id");
				var color = $(this).parent().attr("class");
				
				showDetail(currentId,color);
				
			});

			$(".detail header h1 .back").on("click",function () {
				$(".detail").addClass("close");

				$("meta[name='theme-color']").attr("content","#F9EACD");
			});
            
            var user = JSON.parse(localStorage.getItem('user'));

			$(".fav").on("click",function (e) {

				var fav = $(this);
				$("#vacancy_id").val($(this).attr('id'));
				$("#student_id").val(user.id);

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
	        			$(fav).addClass("checked");
	                },
	                error: function(jqXHR, textStatus, errorThrown) 
	                {
	                    console.log(textStatus);  
	                }
	            });

			});


		});
	}

	init();

	function showDetail (id,color) {

		console.log(id,color);

		$(".detail header").attr("class",color);
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





	function firstOpen () {

		var loggedIn = localStorage.getItem("loggedIn");

		if(loggedIn){

			var user = JSON.parse(localStorage.getItem("user"));
			var student_id = parseInt(user.id);

			var sendInfo = {
           achievement_id: 1,
           student_id: student_id
       };

        $.ajax(
        {
            url : "http://rachouanrejeb.be/sosjobs/api/getAchievement/",
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

    				var sendInfo = {
	                   achievement_id: data.achievement_id,
	                   student_id: student_id,
	                   min:min
	               };

    				$.ajax(
	                {
	                    url : "http://rachouanrejeb.be/sosjobs/api/updateAchievement/",
	                    type: "POST",
	                    data : sendInfo,
	                    success:function(data, textStatus, jqXHR) 
	                    {

	            			console.log(data);

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
			                    url : "http://rachouanrejeb.be/sosjobs/api/unlockAchievement/",
			                    type: "POST",
			                    data : sendInfo,
			                    success:function(data, textStatus, jqXHR) 
			                    {
			            			console.log(data);
			            			$(".achievement_container section img").attr("src","pics/achievements/"+data.name+"-unlocked.svg");
			            			$(".achievement_container section h1").text(data.name);
			            			$(".achievement_container section p").text(data.description);

			            			$(".achievement_container").addClass("open");
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

		}
	}

});