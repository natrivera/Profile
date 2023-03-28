
 	 $(document).ready(function() {
 	   
 	   add_profile_row(
      'portfolio' , '#TidyTuesday' , 
      
      'https://github.com/natrivera/tidytuesday/tree/main/2023/2023-03-21' , 
      '###' , 
      'https://github.com/natrivera/tidytuesday/blob/main/2023/2023-03-21/all_languages_highres.png?raw=true',
      
      'https://github.com/natrivera/tidytuesday/tree/main/2023/2023-03-07' , 
      '###' , 
      'https://github.com/natrivera/tidytuesday/blob/main/2023/2023-03-07/numbats_table.png?raw=true',
      
      'https://github.com/natrivera/tidytuesday/tree/main/2023/2023-02-07' , 
      '###' , 
      'https://github.com/natrivera/tidytuesday/blob/main/2023/2023-02-07/stock_plot.png?raw=true');
      
      
      add_profile_row(
      'portfolio' ,'Tableau' , 
      
      'https://public.tableau.com/app/profile/natrivera/viz/EducationalAttainment_51/EducationalAttainment' , 
      'Educational Attainment' , 
      'http://natrivera.com/img/tab_edu.png',
      
      'https://public.tableau.com/app/profile/natrivera/viz/CPP_Degrees2013-2018/CalPolyDegrees' , 
      'Degrees Confered by Year' , 
      'http://natrivera.com/img/tab_cpp.png',
      
      'https://public.tableau.com/app/profile/natrivera/viz/CapsimInternalAnalysis/Dash' , 
      'Capsim Analysis' , 
      'http://natrivera.com/img/tab_cap.png' );
      
      
      
      add_profile_row(
      'portfolio' ,'D3.js' , 
      
      'https://codepen.io/natrivera/pen/bjZJWY' , 
      'Z-Test Visualization' , 
      'http://natrivera.com/img/cpn_stat.jpeg',
      
      'https://codepen.io/natrivera/pen/mjjmBm' , 
      'Climate Heatmap' , 
      'http://natrivera.com/img/cpn_clm.jpeg',
      
      'https://natrivera.github.io/2018-2019-top-university/' , 
      'op University Map' , 
      'http://natrivera.com/img/cpn_map.jpeg' );
      
      
      add_profile_row(
      'portfolio' ,'Web Development' , 
      
      'https://codepen.io/natrivera/pen/zEoBxY' , 
      'Paint with CSS' , 
      'http://natrivera.com/img/cpn_homer.jpeg',
      
      'https://natrivera.com/tic-tac-toe' , 
      'TIC-TAC-TOE' , 
      'http://natrivera.com/img/cpn_tic.jpeg',
      
      'https://natrivera.com/calculator' , 
      'Financial Calculator' , 
      'http://natrivera.com/img/cpn_calc.jpeg' );
      
      
      add_profile_row(
      'blog' ,'' , 
      
      'https://itsnatrivera.wordpress.com/2021/12/09/decision-tree-with-simulated-data/' , 
      'Decision Trees with Simulated Data' , 
      'https://itsnatrivera.files.wordpress.com/2021/12/image-11.png',
      
      'https://itsnatrivera.wordpress.com/2017/07/22/teach-your-app-to-beat-you-at-tic-tac-toe/', 
      'Teach Your App To Beat You At Tic-Tac-Toe' , 
      'https://itsnatrivera.files.wordpress.com/2017/07/arrays.png',
      
      'https://itsnatrivera.wordpress.com/2017/06/10/get-the-weather-with-this-java-app/' , 
      'GetThe Weather With This Java App' , 
      'https://itsnatrivera.files.wordpress.com/2017/06/capture.png' );
      
      

 	   (function(i, s, o, g, r, a, m) {
 	     i['GoogleAnalyticsObject'] = r;
 	     i[r] = i[r] || function() {
 	       (i[r].q = i[r].q || []).push(arguments)
 	     }, i[r].l = 1 * new Date();
 	     a = s.createElement(o),
 	       m = s.getElementsByTagName(o)[0];
 	     a.async = 1;
 	     a.src = g;
 	     m.parentNode.insertBefore(a, m)
 	   })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

 	   ga('create', 'UA-91896922-1', 'auto');
 	   ga('send', 'pageview');

 	 });



   //add uplink
   $("body").append("<div class='clickup' onClick=''><a data-aos='fade-up' href='#'<p class='fa fa-arrow-circle-o-up' style='position: fixed; right: 0; bottom: 0;'></p></a></div>");

   //When distance from top = 250px fade button in/out
   $(window).scroll(function() {
     if ($(this).scrollTop() > 250) {
       $('.clickup').fadeIn(300);
     } else {
       $('.clickup').fadeOut(300);
     }
   });

   //On click scroll to top of page t = 1000ms
   $('.clickup').click(function() {
     $("html, body").animate({
       scrollTop: 0
     }, 1000);
     return false;
   });
   
   
   

   
   
  function add_profile_row(port_blog, title , 
  first_link, first_hover , first_img , 
  second_link, second_hover, second_img, 
  third_link , third_hover, third_img) {
    
    var h4 = document.createElement('h4');
    h4.textContent = title;
    
    var div = document.createElement('div');
    div.setAttribute('class', 'row');
    
    div.appendChild(add_profile_items(first_link, first_hover, first_img))
    div.appendChild(add_profile_items(second_link, second_hover, second_img));
    div.appendChild(add_profile_items(third_link, third_hover, third_img));
    
    //out = h4 + div;
    //console.log(out.innerHTML);
    port = document.getElementById(port_blog);
    port.appendChild(h4)
    port.appendChild(div);

  } // end of add_profile_itmes
  
   
   
  function add_profile_items(link , hover, img) {
    
    var div = document.createElement('div');
    div.setAttribute('class', 'col-md-4 col-sm-12');
    
    var link_elem = document.createElement('a');
    link_elem.setAttribute('target', '_blank');
    link_elem.setAttribute('href', link);
    
    var img_elem = document.createElement('img');
    img_elem.setAttribute('src' , img);
    img_elem.setAttribute('class' , 'img img-responsive');
    
    var hide_div = document.createElement('div');
    hide_div.setAttribute('class' , 'hidehov responsive')
    
    var hover_div = document.createElement('div');
    hover_div.setAttribute('class' , 'center');
    hover_div.innerHTML = hover;
    hide_div.appendChild(hover_div);
    
    link_elem.appendChild(img_elem);
    link_elem.appendChild(hide_div);
    div.appendChild(link_elem);

    return div;
    
  } // end of add_profile_row
