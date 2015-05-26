$(function (){

	function init () {


                var loggedIn = localStorage.getItem("loggedIn");

                if(!loggedIn){

                console.log("init");

                $("#login").submit(function(e) {

                    e.preventDefault();

                    var postData = $(this).serializeArray();
                    var formURL = $(this).attr("action");

                    $.ajax(
                    {
                        url : formURL,
                        type: "POST",
                        data : postData,
                        success:function(data, textStatus, jqXHR) 
                        {
                            console.log($(data).length);

                                if($(data).length > 0){
                                        var dataToStore = JSON.stringify(data);
                                                localStorage.setItem('user', dataToStore);
                                                localStorage.setItem('loggedIn',true);

                                                window.location.replace("index.html");
                                }else{
                                        console.log("user doesn't exist");
                                }

                    
                        },
                        error: function(jqXHR, textStatus, errorThrown) 
                        {
                            console.log(textStatus);  
                        }
                    });
                });

                }else{
                        window.location.replace("profiel-Student.html");
                }

		
	}

	init();
});