 var loggedIn = localStorage.getItem("loggedIn");

if(!loggedIn){

$(function (){

	function init () {


               

                console.log("init");

                $("#login").submit(function(e) {

                    e.preventDefault();
                        $(".preloader").removeClass("hide");
                    $(".preloader").addClass("animated fadeIn");

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
                                        $(".preloader").removeClass("animated fadeIn");
                                        $(".preloader").addClass("animated fadeOut");
                                        setTimeout(function  () {
                                                $(".preloader").removeClass("animated fadeOut");
                                                $(".preloader").addClass("hide");
                                        }, 1000);
                                }

                    
                        },
                        error: function(jqXHR, textStatus, errorThrown) 
                        {
                            console.log(textStatus);  
                        }
                    });
                });

                

		
	}

	init();
});


}else{
    
    window.location.replace("profiel-Student.html");
}