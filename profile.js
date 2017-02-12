 	 
	 


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
	
	
	 // Add smooth scrolling to all links
  	$("a").on('click', function(event) {
	
	    // Make sure this.hash has a value before overriding default behavior
	    if (this.hash !== "") {
	      // Prevent default anchor click behavior
	      event.preventDefault();
	
	      // Store hash
	      var hash = this.hash;
	
	      // Using jQuery's animate() method to add smooth page scroll
	      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	      $('html, body').animate({
	        scrollTop: $(hash).offset().top
	      }, 800, function(){
	   
	        // Add hash (#) to URL when done scrolling (default click behavior)
	        window.location.hash = hash;
	      });
	    } // End if
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
