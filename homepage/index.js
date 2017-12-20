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
"mbuntu-3.jpg",
"mbuntu-5.jpg",
"mbuntu-6.jpg",
"mbuntu-7.jpg",
"mbuntu-9.jpg",
"sunset_river_by_jazbay1-d5w2hpw.jpg",
"wy6SjxK.jpg"]};

var ampm = "PM";
var retrievedColor, retrievedtemp;
var ftemp = 0;
var ctemp = 0;
var dtemp = 0;
var zip;
var displaystring = "";
var bool = true;
var iconP;
var city;
var links = [];
var opened = false;



window.onload = function( ) {
    

    //load the background image
    loadimg();
    
    //begin the time every 500 milliseconds
    ontime();
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
    
    var name = "";
    links = [['Google' , 'www.google.com'] , ['Youtube' , 'www.youtube.com'] , ['Facebook' , 'www.facebook.com']];
    
    var message = "Welcome: ";
    
    var elem = document.getElementById("message");
    
    
    var retrivedlinks = JSON.parse(localStorage.getItem("links"));
    var retrievedObject = JSON.parse(localStorage.getItem("namekey"));
    retrievedtemp = localStorage.getItem("temp");
    retrievedColor = JSON.parse(localStorage.getItem("colorkey"));

    if (retrievedObject == null) {
        name = prompt("Please enter your name: ");
        localStorage.setItem("namekey", JSON.stringify(name));
        retrievedObject = JSON.parse(localStorage.getItem("namekey"));    
    } else {
        name = retrievedObject;
    }
    
    if(retrievedColor == null) {
        localStorage.setItem("colorkey", JSON.stringify("white"));
        retrievedColor = JSON.parse(localStorage.getItem("colorkey"));
    } 
    
    if(retrivedlinks == null) {
        localStorage.setItem("links" , JSON.stringify(JSON.stringify(links)));
    } else {
        links = JSON.parse(retrivedlinks);
    }
    
    if(retrievedtemp == null) {
        localStorage.setItem("temp" , "f");
    }
    
    
    if(ampm == "PM") {
        message = "Good Afternoon, " + name + ".";
    } else {
        message = "Good Morning, " + name + ".";
    }    
    
    change(retrievedColor);
    elem.innerHTML = message;
    
    loadlinks(links);
    
}//end of welcome

function loadlinks(arr) {
    
    var elem = document.getElementById("linkplace");
    elem.innerHTML = "";
    arr.forEach(function(e) {
        
        var newdiv = document.createElement("div");
        var newaelem = document.createElement("a");
        var newselem = document.createElement("span");
                
        var templink = "http://" + e[1];
        newaelem.setAttribute("href" , templink);
        newaelem.setAttribute("target" , "_blank");
        newaelem.innerHTML = e[0];
        
        var funtxt = "loselink(\"" + e[0] + "\")";
        newselem.setAttribute("onclick" , funtxt);
        newselem.innerHTML = "&#10060";
        newselem.style.float = "right";
        newdiv.appendChild(newaelem);
        newdiv.appendChild(newselem);
        
        
        elem.appendChild(newdiv);
        
    });
}

function loselink(txt) {
    var text = txt.toString();
    for(var i = 0; i < links.length; i++) {
        if(links[i][0] == text) {
            links.splice(i , 1);
        }
          
    }
   
    
    loadlinks(links);
    localStorage.setItem("links" , JSON.stringify(JSON.stringify(links)));
    
   
}

function updatelinks() {
    var linkname = document.getElementById("linkname").value;
    var linkurl = document.getElementById("linkurl").value;
    var temparr = [linkname , linkurl];
    
    if(linkname == "" || linkurl == "") {
        
    } else {
        links.push(temparr);
        loadlinks(links);
        document.getElementById("linkname").value = "";
        document.getElementById("linkurl").value = "";
        localStorage.setItem("links" , JSON.stringify(JSON.stringify(links)));
    }
   
}

function addlink() {
    if(opened) {
        var elem = document.getElementById("addlink");
        var checking = elem.style.display;
        if(checking == "none") {
            elem.style.display = "block";
        } else {
            elem.style.display = "none";
        }
    }
    
}

function clearaddons() {
    setTimeout(function() {
        if(false) {
            document.getElementById("moreweather").style.display = "none";
            document.getElementById("colors").style.display = "none";
            document.getElementById("links").style.display = "none";
        }
    },200);    
}

function addondelay() {
    bool = false;
    setTimeout(function() {
        bool = true;
    },300);
}

function togglelink() {
    
    addondelay();
    var check = document.getElementById("links");
    var checking = check.style.display;
    
    if(checking == "none") {
        check.style.display = "block";
        setTimeout(function() {
            opened = true;    
        },300);
        
    } else {
        check.style.display = "none";
        setTimeout(function() {
            opened = false;    
        },300);
        
    }
    
}

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
    
    var lat, long;
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
                  city = num.name;

                  var weatherType = num.weather[0].description;
                  var main = num.weather[0].main;
                  var icon = num.weather[0].icon;
                  var label = num.weather[0].id;
                  var ktemp = num.main.temp;
                  var speed = num.wind.speed;
                  var direction = num.wind.deg;
                
                  direction = getCardinal(direction);
                 
                  ftemp = Math.round((ktemp * (9 / 5)) - 459.67);
                  ctemp = Math.round(ktemp - 273);
                  var sunrise = num.sys.sunrise;
                  var sunset = num.sys.sunset;
                  var time = new Date().getTime();
                  time = time / 1000;
                  var daynight = "day";
                 
                  if(time < sunset && time > sunrise) {
                      
                  } else {
                      daynight = "night";
                  }

                  //get and load the icon url
                  iconP = "<i onclick='showmore();' class=' hoverable wi wi-owm-" + daynight + "-" + label + "'></i>";
                 
                 retrievedtemp = localStorage.getItem("temp");
                 setTimeout(function() {
                     if(retrievedtemp == "f") {
                        displaystring = ftemp + "&#176; F   " + iconP + "<br>" + city; 
                        forf(); 
                     } else {
                         displaystring = ctemp + "&#176; C  " + iconP + "<br>" + city;
                         forc();
                    }
                    temperature(displaystring);
                     
                 },100);
                 
                 var element = document.getElementById("description");
                 element.innerHTML = weatherType;
                 
                 element = document.getElementById("wind");
                 element.innerHTML = "Winds: " + speed + "mph " + direction;
                 
                 element = document.getElementById("unit");
                 element.innerHTML =  "Units: <i class='hoverable chosen' id='farenheight' onclick='forf();'>F&#176;</i>    <i class='hoverable' id='celcius' onclick='forc();'>C&#176;</i>";
                   
                });
            
        },200);          
            
      }); //end of getJSON
}

function temperature(str) {
    var elem = document.getElementById("weather");
    elem.innerHTML = str;
}

function showmore() {
    addondelay();
    var check = document.getElementById("moreweather");
    var checking = check.style.display;
    
    if(checking == "none") {
        check.style.display = "block";
    } else {
        check.style.display = "none";
    }
}

function forc() {
    document.getElementById("farenheight").classList.remove("chosen");
    document.getElementById("celcius").classList.add("chosen");
    displaystring = ctemp + "&#176; C   " + iconP + "<br>" + city;
    localStorage.setItem("temp" , "c");
    
    temperature(displaystring);
    retrievedtemp = localStorage.getItem("temp");
}

function forf() {
    document.getElementById("celcius").classList.remove("chosen");
    document.getElementById("farenheight").classList.add("chosen");
    displaystring = ftemp + "&#176; F   " + iconP + "<br>" + city;
    localStorage.setItem("temp" , "f");
    
    temperature(displaystring);
    retrievedtemp = localStorage.getItem("temp");
}

function search() {
    
    var input = document.getElementById("searchinput").value;
    var google = "https://www.google.com/search?q=" + input;
    
    var elem = document.getElementById("hide");
    
    elem.innerHTML = "<a id='click' target='_blank' href='" + google + "'></a>";
    document.getElementById("click").click();
     
}//end of search 

function optionUp() {
    addondelay();
    var check = document.getElementById("colors");
    var checking = check.style.display;
    if(checking == "none") {
        check.style.display = "block";
        document.getElementById("options").innerHTML = "&#8897";
    } else {
        check.style.display = "none";
        document.getElementById("options").innerHTML = "&#8896";
    }
}//end of optionUp

function change(color) {
    var text = "5px solid " +  color;
    document.body.style.color = color;
    document.getElementById("searchinput").style.color = color;
    document.getElementById("searchbutton").style.color = color;
    document.getElementById("options").style.color = color;
    document.getElementById("settingbutton").style.color = color;
    $(".search").css("border-bottom", text);
    localStorage.setItem("colorkey", JSON.stringify(color));
    $("a").css("color" , color);
}//end of change


function keyUp(event) {
    
    var x = event.keyCode;
    if(x == 13) {
        search();
    }
}

function opensettings() {
    addondelay();
    var check = document.getElementById("resetdiv");
    var checking = check.style.display;
    
    if(checking == "none") {
        check.style.display = "block";
    } else {
        check.style.display = "none";
    }
}

function reset() {
    localStorage.setItem("namekey", JSON.stringify(null));
    localStorage.setItem("links", JSON.stringify(null));
    localStorage.setItem("colorkey", JSON.stringify(null));
    localStorage.setItem("temp", JSON.stringify(null));
    window.location.reload(true);
    
}


 //function to show wind direction
 function getCardinal(angle) {
        //easy to customize by changing the number of directions you have 
       // thank you basarat from github     
        var directions = 8;
        
        var degree = 360 / directions;
        angle = angle + degree/2;
        
        if (angle >= 0 * degree && angle < 1 * degree)
            return "N";
        if (angle >= 1 * degree && angle < 2 * degree)
            return "NE";
        if (angle >= 2 * degree && angle < 3 * degree)
            return "E";
        if (angle >= 3 * degree && angle < 4 * degree)
            return "SE";
        if (angle >= 4 * degree && angle < 5 * degree)
            return "S";
        if (angle >= 5 * degree && angle < 6 * degree)
            return "SW";
        if (angle >= 6 * degree && angle < 7 * degree)
            return "W";
        if (angle >= 7 * degree && angle < 8 * degree)
            return "NW";
        //Should never happen: 
        return "N";
    }


