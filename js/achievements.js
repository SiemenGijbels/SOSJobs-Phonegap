$(function(){
    
    
    function init(){
        $("#blur").hide();
        $("#popup").hide();
        $(".info").on("click",function () {
            showDetail();
		});
        
        $(".close").on("click",function () {
            hideDetail();
		});
        
        $("#blur").on("click",function () {
            hideDetail();
		});
    }
    
    init();
    
    function hideDetail() {
        $("#blur").hide();
        $("#popup").hide();
    };
    
    function showDetail() {
        $("#blur").show();
        $("#popup").show();
    }
});