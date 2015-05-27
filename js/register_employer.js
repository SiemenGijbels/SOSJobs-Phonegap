$(function () {

    function init() {

        geoFindMe();

        $("form section header").on("click",function () {

            if($(this).parent().hasClass('open')){
                 $(this).parent().removeClass('open');
            }else{
                $(this).parent().addClass('open');
            }
        })
        
        $("#company").on("keyup",function () {
            $("#picture").val($(this).val()+".jpg");
        });

        $("#register_employer").submit(function(e) {

            e.preventDefault();

            var postData = $(this).serializeArray();
            console.log(postData);
            var formURL = $(this).attr("action");

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
                    console.log(jqXHR);  
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