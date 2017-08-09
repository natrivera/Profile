 	 
function hideOut(num) {
	var information = "catalog" + num.toString();
var x = document.getElementById(information);
	alert(information);
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}	 


$(document).ready(function() {
	
	$("head").append("<script src='//cdn.rawgit.com/web-animations/web-animations-js/2.2.2/web-animations.min.js'></script><script src='//cdn.rawgit.com/gibbok/animatelo/1.0.1/dist/animatelo.min.js'></script>)");
	

	//run animations	 
	    AOS.init({
	    once: true,
	    });
	
//	$('form').attr('data-aos', 'flip-down');
//	$('form').attr('data-aos-duration', '400');
//	$('form').attr('data-aos-delay', '600');     
	
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
	
	
	 //move picture on top
	$("#mask").click(function() {
	if ($("#introduction").css("z-index") == "10") {
		$("#introduction").css("z-index", "100");
	} else {
		$("#introduction").css("z-index", "10");
	 }
	});	 
	
	//hide the catalog info in academic work page
	$(".catalog").click(function() {
		var i = this.id;
		alert("This is the info    " + i);
		hideOut(i);
	}); 
	

  	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-91896922-1', 'auto');
  	ga('send', 'pageview');
	
});

