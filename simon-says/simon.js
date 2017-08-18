var arr = [];
var arr1 = [];
var welcome = "";
var x = 0;
var stopp = 0;
var random, wait, m, y, sound, audio, winner, checker, temp;
var started = false;
var playable = false;
var pause = false;
var sound1 = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
var sound2 = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
var sound3 = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
var sound4 = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
var sound0 = "";

var soundarray = [sound0, sound1, sound2, sound3, sound4];

//flash and unflash the cell
function setDelay() {
  $("#" + arr[x]).css("opacity", ".1");
  $("#" + arr[x]).css("opacity", ".1");
  audio = new Audio(soundarray[arr[x]]);
  audio.play();

  setTimeout(function() {
    $(".one").css("opacity", ".9");
    $(".two").css("opacity", ".9");
    $(".three").css("opacity", ".9");
    $(".four").css("opacity", ".9");
  }, 400);
} //end of setDelay

function move(num) {
  x++;
  wait = setInterval(function() {
    if (!pause) {
      var y = x - 2;
      if (x < num) {
        temp = $("#counter").html();
        temp = parseInt(temp);
        if (temp < x) {
          $("#counter").html(x);
          playable = true;
        } else {
          playable = false;
        }

          setDelay();

        x++;
      }
      if (check(x)) {
        arr1 = [];
        x = 1;
        num++;
      }
      if (num >= 22) {
        clearInterval(wait);
        $("#counter").html("You Win!!!");
      } //
      var numb = arr1.length + 1;
      if (numb >= 1 && !check(numb)) {
        checker = arr1.join("");
        winner = arr.join("");
        winner = winner.substring(1, numb);
        if (checker !== winner) {
          pause = true;
          arr1 = [];
          x = 1;
          $("#counter").html("|| ||");
          var reUp = setTimeout(function() {
            $("#counter").html("0");
            pause = false;
          }, 800);
          playable = false; 
        }
      }
    }
  }, 600);
}

function game() {
  move(2);
} // end of Game////

function check(h) {
  var bool = false;
  checker = arr1.join("");
  winner = arr.join("");
  winner = winner.substring(1, h);
  //console.log("" + checker + "---" + winner);
  if (winner == checker) {
    bool = true;
  }
  return bool;
}

function stop() {
  if (started) {
    arr = [];
    $("#counter").html("0");
  }
  $(".one").css("background-color", "green");
  $(".two").css("background-color", "red");
  $(".three").css("background-color", "yellow");
  $(".four").css("background-color", "blue");
  $(".one").css("opacity", ".9");
  $(".two").css("opacity", ".9");
  $(".three").css("opacity", ".9");
  $(".four").css("opacity", ".9");
  clearInterval(wait);
  x = 0;
  stopp = 20;
  started = false;
  checker = "";
  arr1 = [];
}

//start the game
$("#start").click(function() {
  
  //add 20 numbers to an array
  for (var i = 0; i < 20; i++) {
    random = Math.floor(Math.random() * 4) + 1;
    arr.unshift(random);
  }
  stop();
  started = true;
  game();
});

//reset the game
$("#stop").click(function() {
  stop();
});

//when a piece is clicked display and add move to user array
$(".piece").click(function() {
  if (started && playable) {
    pause = true;
    //get the id of the clicked piece and show it
    var aydee = this.id;
    $("#" + aydee).css("opacity", ".2");
    $("#" + aydee).css("opacity", ".2");
    arr1.push(aydee);
    
    audio = new Audio(soundarray[aydee]);
    audio.play();

    //delay the return to opacity
    var piecewait = setInterval(function() {
      $("#" + aydee).css("opacity", ".9");
      pause = false;
    }, 400); //
  }
});