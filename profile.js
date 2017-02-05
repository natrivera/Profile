  //run animations	 
	    AOS.init();
		 
		 
	   //move picture on top	 
	   	$("#mask").click(function() {
	   	if ($("#introduction").css("z-index") == "10") {
		    	$("#introduction").css("z-index", "100");
		    }
		    else {
		    	$("#introduction").css("z-index", "10");
		    }
	   });	 
		 
		//show the counter
		 $(".bottomName").click(function() {
		 
			 $("#counter").removeAttr("class");
		 
		 });

$(document).ready(function() {

    //add animation to the form
    $(".conform").attr("data-aos","flip-up");
    $(".conform").attr("data-aos-delay","800");
    $(".conform").attr("data-aos-duration","3000");
});