 	 
	 


$(document).ready(function() {
	
	//run animations	 
	    AOS.init({
	    once: true,
	    });

  		//add uplink
  		$("body").append("<div class='clickup' onClick=''><a data-aos='fade-up' href='#'<p class='fa fa-arrow-circle-o-up' style='position: fixed; right: 0; bottom: 0;'></p></a></div>");
		
		//When distance from top = 250px fade button in/out
        	$(window).scroll(function(){
         	   if ($(this).scrollTop() > 250) {
         	       $('.clickup').fadeIn(300);
         	   } else {
         	       $('.clickup').fadeOut(300);
         	   }
        	});
 	
        	//On click scroll to top of page t = 1000ms
        	$('.clickup').click(function(){
        	    $("html, body").animate({ scrollTop: 0 }, 1000);
        	    return false;
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
	

  	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  	ga('create', 'UA-91896922-1', 'auto');
  	ga('send', 'pageview');

	
	
});
