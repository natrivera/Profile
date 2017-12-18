var pictures = { "pics" : [
"01 - QztlVTN.jpg",
"02 - UjK4eUF.jpg",
"03 - euSCcXs.jpg",
"03696_hongkong_1920x1080.jpg",
"04 - thUYat9.jpg",
"04057_afterwork_1920x1080.jpg",
"05 - p7FgplN.jpg",
"06 - Wetf2Kh.jpg",
"07 - r8kYhVN.jpg",
"08 - 3PWMlhY.jpg",
"09 - GAjTwoj.jpg",
"10 - ZZOuSd4.jpg",
"1080.jpg",
"11 - oE8p5ow.jpg",
"12 - fzcgCeS.jpg",
"13 - vVJsn4l.jpg",
"14 - SYNuyyA.jpg",
"15 - iSBLrLw.jpg",
"16 - IHc8UiI.jpg",
"17 - vXS6x2C.jpg",
"18 - 8YbJNGx.jpg",
"19 - rbUCFdO.jpg",
"20 - yf2IHMV.jpg",
"21 - DBXyJdk.jpg",
"22 - 61CMKBo.jpg",
"23 - bGh4W9c.jpg",
"24 - mgvSRVi.jpg",
"25 - 37urx8z.jpg",
"2560 x 1440.jpg",
"26 - jH1nUGq.jpg",
"27 - yDpuXU0.jpg",
"28 - vRHGNcR.jpg",
"29 - BWJLwKl.jpg",
"30 - 7znnZsX.jpg",
"31 - O67jSK4.jpg",
"32 - Fpuv9qY.jpg",
"33 - cPZY6T3.jpg",
"34 - bNjhpyu.jpg",
"35 - pV6wotZ.jpg",
"36 - rnKPcCe.jpg",
"37 - HXlhj03.jpg",
"38 - yQaUk3m.jpg",
"39 - EhRXoo3.jpg",
"40 - N6xvTmA.jpg",
"41 - 4h5uyOF.jpg",
"42 - Y4XCPHS.jpg",
"43 - TZvQmee.jpg",
"44 - uP0Rm9G.jpg",
"45 - iU2VpFg.jpg",
"46 - fxDfE91.jpg",
"47 - 2cRQltQ.jpg",
"48 - aBtClJG.jpg",
"49 - fvNSPtS.jpg",
"50 - O3abuTO.jpg",
"Bridge - 2880x1800.jpg",
"Cities (11).jpg",
"Cities (3).jpg",
"Cities (7).jpg",
"New York New York 1920x1080.png",
"Night Life 1920x1080.png",
"Stand & Listen.jpg",
"Starrynight - 2880x1800.jpg",
"Stas Ovsky mod.jpg",
"Sunriseoverbomboheadland - 2880x1800 (Large).jpg",
"Sunsetamenity - 2880x1800 (Large).jpg",
"Sunsetatstorebaelt - 2880x1800 (Large).jpg",
"Sunsetfromsuttonbank - 2880x1800 (Large).jpg",
"Tim Gouw mod.jpg",
"apple_mac_os_x_el_capitan-wide.jpg",
"mbuntu-11.jpg",
"mbuntu-3.jpp	",
"mbuntu-5.jpg",
"mbuntu-6.jpg",
"mbuntu-7.jpg",
"mbuntu-8.jpp",
"mbuntu-9.jpg",
"sunset_river_by_jazbay1-d5w2hpw.jpg",
"wy6SjxK.jpg"]};

var ampm = "PM";



window.onload = function( ) {
    

    //load the background image
    loadimg();
    
    //begin the time every 500 milliseconds
    setInterval(function() {     
        ontime();
    }, 1000 );
    
    setTimeout(function() {
        //load the weather
        weather();
    }, 100);
    
    
    //load the welcome message
    welcome();
        
}//end of onload

function loadimg() {
    
    var randomer = Math.floor((Math.random() * pictures.pics.length) + 1);


    var image = pictures.pics[randomer];

    var main = document.getElementById("main");

    document.body.style.backgroundImage = "url('http://natrivera.com/wallpapers/" + image + "')";
    
}//end of loading

function welcome() {
    
    var message = "Welcome: ";
    
    var elem = document.getElementById("message");
    
    
    
    var retrievedObject = JSON.parse(localStorage.getItem("namekey"));

    if (retrievedObject == null) {
        var name = prompt("Please enter your name: ");
        localStorage.setItem("namekey", JSON.stringify(name));
        retrievedObject = JSON.parse(localStorage.getItem("namekey"));
    } else {
        name = retrievedObject;
    }
    
    if(ampm == "PM") {
        message = "Good Afternoon, " + name + ".";
    } else {
        message = "Good Morning, " + name + ".";
    }
    
    elem.innerHTML = message;
    
}//end of welcome

function ontime() {
    
    var now = new Date();
     
    //calculate mins and seconds
    ampm = "PM";
    var date = now.toDateString();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
        if(seconds < 10) {
        seconds = "0" + seconds.toString();
        }
        if (minutes < 10) {
        minutes = "0" + minutes.toString();
        }
        if(hours > 12) {
            hours -= 12;
            ampm = "PM";
        } else {
            if(hours == 12) {
               
               } else {
                   ampm = "AM";
               }     
        }    
    
    var elem = document.getElementById("time");
    
    elem.innerHTML = date + "<br>" + hours + ":" + minutes + ":" + seconds + " " + ampm;
}//end of ontime


function weather() {
    
    $("#weather").html("Hello World!!!");
    var lat, long, zip;
    var localApi = "http://ip-api.com/json?callback=?";
   
    
        $.getJSON(localApi, function(pos) {
            lat = pos.lat;
            long = pos.lon;
            zip = pos.zip;
    
        //lat = 34.00;
        //long = -117.00;
        //zip = 91763;
            
            var wapi = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=6ee606a8d671c5b28060f5bd4eb31d7c";
            
        setTimeout(function() {
            
             $.getJSON(wapi, function(num) {  

                  //parse out all the needed info
                  var city = num.name;

                  var weatherType = num.weather[0].description;
                  var icon = num.weather[0].icon;
                  var label = num.weather[0].id;
                  var ktemp = num.main.temp;
                  var speed = num.wind.speed;
                  var direction = num.wind.deg;
                  var ftemp = Math.round((ktemp * (9 / 5)) - 459.67);
                  var ctemp = Math.round(ktemp - 273);

                  //get and load the icon url
                  var iconP = "<img src='http://openweathermap.org/img/w/" + icon + ".png'>";
                  
                 var elem = document.getElementById("weather");
                 elem.innerHTML = ftemp + "&#176; " + iconP + "<br>" + zip;
                   
                });
            
        },100);
            
            
            
      }); //end of getJSON
}

function search() {
    
    var input = document.getElementById("searchinput").value;
    var google = "https://www.google.com/search?q=" + input;
    
    var elem = document.getElementById("hide");
    
    elem.innerHTML = "<a id='click' target='_blank' href='" + google + "'></a>";
    document.getElementById("click").click();
     
}//end of search 

function keyUp(event) {
    
    var x = event.keyCode;
    if(x == 13) {
        search();
    }
}


