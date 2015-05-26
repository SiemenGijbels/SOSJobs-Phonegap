$(function () {

    var achievements = [1,1,1,1,1,5,10,1,1,1,5];

    function init() {

        geoFindMe();

        $("form section header").on("click",function () {

            if($(this).parent().hasClass('open')){
                 $(this).parent().removeClass('open');
            }else{
                $(this).parent().addClass('open');
            }
        })
        $('article div.slider_container').on('click', function () {

            if ($(this).find('.slider').hasClass('on')) {
                $(this).find('.slider').removeClass('on');

                $('article form .gender').val('V');

            } else {
                $('article form .gender').val('M');
                $(this).find('.slider').addClass('on');
            }

        });

        $("#name").on("keyup",function () {
            $("#picture").val($(this).val()+".jpg");
        });

        $.each(achievements,function  () {

                        console.log("achievement");
                    });

        $("#register_student").submit(function(e) {

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
                    console.log(data);

                    var id = 1;

                    $.each(achievements,function (key,val) {

                        var sendInfo = {
                           achievement_id: key,
                           student_id: data.id,
                           max: val
                       };

                       id++;

                        $.ajax(
                        {
                            url : "http://localhost:8888/sosjobs/api/insertAchievement/",
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

                    });
                    
                },
                error: function(jqXHR, textStatus, errorThrown) 
                {
                    console.log(textStatus);  
                }
            });
        });

    }



    function geoFindMe() {


      if (!navigator.geolocation){
        $(".preloader header h1").text("Geolocation is not supported by your browser");
        return;
      }

      function success(position) {

        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;

        console.log(latitude,longitude);

        $(".lat").val(latitude);
        $(".lng").val(longitude);

      };

      function error() {
        alert("We couldn't find you");
      };

      navigator.geolocation.getCurrentPosition(success, error);


    }

    init();

});