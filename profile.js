 	 
	 


$(document).ready(function() {
	
	//run animations	 
	    AOS.init({
	    once: true,
	    });

    //add animation to the form
  //  $(".conform").attr("data-aos","flip-up");
  //  $(".conform").attr("data-aos-delay","800");
  //  $(".conform").attr("data-aos-duration","3000");
	
	$(window).one('scroll',function() {
  
  		$("body").append("<div class='clickup'><a href='#'<p class='fa fa-arrow-circle-o-up' style='position: fixed; right: 0; bottom: 0;'></p></a></div>");
	});	
	
	
	$('a').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $(this).attr('href') ).offset().top
	    }, 800);
	    return false;
	});
	
	
	 //move picture on top
	$("#mask").click(function() {
	if ($("#introduction").css("z-index") == "10") {
		$("#introduction").css("z-index", "100");
	} else {
		$("#introduction").css("z-index", "10");
	 }
	});	 
		 
	//show the counter
	$(".bottomName").click(function() {
		 
		$("#counter").removeAttr("class");
	});
});
