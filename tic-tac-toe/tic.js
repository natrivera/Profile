var started = false;
var message = "Select a symbol (X or O)";
var x, number1, number2, blink;
var happy = 1000, mod;
var first = 0;
var count = 0;
var won1 = "";
var won2, won3, currId;
var arr = [];
var player_x_o = 'x'
   
//player = true means player = X
var player;

$(document).ready(function() {
  
  fill();
  $("#message").css("color", "yellow");

  var j = 0;
  setInterval(function() {
    var s = message.charAt(j);
    $("#message").append(s);

    if (j < message.length) {
      j++;
    }

  }, 100);
  
  blink = setInterval(function() {
    mod = happy % 2;
    if(mod === 1) {
      $("#choose").css("color" , "#fff");
    } else {
      $("#choose").css("color" , "yellow");
    }
    
    happy--;
  }, 1000);

});

$("#x").click(function() {
  if ($("#x").hasClass("chosen")) {
    $("#x").toggleClass("chosen");
    $("#o").toggleClass("chosen");
  } else if (!$("#o").hasClass("chosen") && !$("#x").hasClass("chosen")) {
    $("#o").toggleClass("chosen");
  }
  player = false;
  choose();
});
$("#o").click(function() {
  if ($("#o").hasClass("chosen")) {
    $("#x").toggleClass("chosen");
    $("#o").toggleClass("chosen");
  } else if (!$("#x").hasClass("chosen") && !$("#o").hasClass("chosen")) {
    $("#x").toggleClass("chosen");
  }
  player = true;
  choose();
});

function choose() {
  if (first === 0) {
    clearInterval(blink);
    $("#choose").css("color" , "#FFF");
    clear();
    first = 1;
  }

  $("#message").css("color", "#fff");
  if (started === false) {
    turn();
  }
}

//when the board is clicked
$(".board").click(function() {

  $("#message").css("color", "#fff");
  //check if box is empty
  if ($(this).html() === "") {

    $(this).toggleClass("current");
    game(1);
    $(this).toggleClass("current");
    computer();
  }
});

function computer() {
  //console.log(arr);
  var num;
  var random = [];
  var fiveseven;
  
  //if computer symbol is X, number looking for is 5
  //if computer symbol is O, number looking for is 7
  if (player)
    {
      fiveseven = 7;
    }
  else
    {
      fiveseven = 5;
    }

  //fill an array with empty spots
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var str = $("#" + i + j).html();
      if (str === "") {
        random.push("#" + i + j);
      }
    }
  }
  var audio = new Audio('http://natrivera.com/tic-tac-toe/button-09.mp3');
  audio.play();
  
  if(random.length > 0)
    {
      var checking = subarr(fiveseven);
      var randomize = "";
      //console.log("the answer is " + checking);
      if(checking !== "no")
        {
          randomize = "#" + checking;
        }
      else 
        {
          //randomize a number from open spots
          num = random.length;
          num = Math.floor(Math.random() * num);
          randomize = random[num];
        }

      //cumputer play after 1 sec
      setTimeout(function() {
        $(randomize).toggleClass("current");
        game(0);
        $(randomize).toggleClass("current");
      }, 800);
    }
 
}

function game(b) {
  play(b);
  check();
 //console.log(arr);
}

function play(b) {
  
  if(b != 0) {
    if (player) {
      player_x_o = 'x';
    } else {
      player_x_o = 'o';
    }
  }
  

  count++;

  //get the array position from id
  currId = $(".current").attr("id");
  number1 = (currId).slice(0, 1);
  number2 = (currId).slice(1, 2);

  //mark the board load the array x = true  o = false
  if (player === true) {
    $(".current").html("<i class='fa fa-5x fa-times' aria-hidden='true'></i>");
    arr[number1][number2] = true;

  } else {
    $(".current").html("<i class='fa fa-5x fa-circle-o' aria-hidden='true'></i>");
    arr[number1][number2] = false;
  }

  var audio = new Audio('http://natrivera.com/tic-tac-toe/button-3.mp3');
  audio.play();
  //cannot change playerSymbol after starting
  started = true;
  turn(); 
}

function turn() { 
  //switch player
  if (player === true) {
    player = false;
    $("#message").html("O's turn");
  } else {
    player = true;
    $("#message").html("X's turn");
  }
   //show active player
  $("#x").toggleClass("chosen");
  $("#o").toggleClass("chosen");
}

function toggleWon(numb) {
  $("#" + won1 + "").toggleClass("won");
  $("#" + won2 + "").toggleClass("won");
  $("#" + won3 + "").toggleClass("won");
  if(numb == 1)
    {
      var audio = new Audio('http://natrivera.com/tic-tac-toe/bell-ringing-04.mp3');
      audio.play();
    }
}

$(".again").click(function() {
  clear();
  $(".again").css("background-color", "#333");
  $(".again").html("Reset");
  if (player === true) {
    $("#message").html("X's turn");
  } else {
    $("#message").html("O's turn");
  }
});

function fill() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var str = $("#" + i + j).html();
      if (str === "") {
        $("#" + i + j).html("<i style='color:#222;'class='fa fa-5x fa-square' aria-hidden='true'></i>");
      }
    }
  }
}

function clear() {
  arr = [
    [5,5,5],
    [5,5,5],
    [5,5,5]
  ];
  count = 0;
  $(".board").html("");
  started = false;
  if (won1 !== "") {
    toggleWon(0);
    won1 = "";
    won2 = "";
    won3 = "";
    
  }
}

function subarr(number) {
  var answer = "no";
  var arrsum = 0;
  var arrofsum = [];
  var arr0 = [arr[0][0] , arr[0][1] , arr[0][2]];
  var arr1 = [arr[1][0] , arr[1][1] , arr[1][2]];
  var arr2 = [arr[2][0] , arr[2][1] , arr[2][2]];
  var arr3 = [arr[0][0] , arr[1][0] , arr[2][0]];
  var arr4 = [arr[0][1] , arr[1][1] , arr[2][1]];
  var arr5 = [arr[0][2] , arr[1][2] , arr[2][2]];
  var arr6 = [arr[0][0] , arr[1][1] , arr[2][2]];
  var arr7 = [arr[0][2] , arr[1][1] , arr[2][0]];
  var aggregate =[arr0 ,arr1 ,arr2 ,arr3 ,arr4 ,arr5 ,arr6 , arr7];
  var complic = [["00", "10", "20", "00", "01", "02", "00", "02" ],
                 ["01", "11", "21", "10", "11", "12", "11", "11"],
                 ["02", "12", "22", "20", "21", "22", "22", "20"]];
  
  if(arr[1][1] === 5)
    {
      answer = "11";
    }
  
  //loop through all 8 possible winning combinations
  for (var i = 0; i < aggregate.length; i++)
    {
      var temp = aggregate[i];
      arrsum = temp[0] + temp[1] + temp[2];
      
      //if the sum adds up to 5 or 7
      // the row has one open space with two XX or two OO 
      // 0 + 0 + 5 = 5
      // 1 + 1 + 5 = 7
      if(arrsum == 5 || arrsum == 7)
        {
          //console.log("there is a " + arrsum + " at position " + i);
          //loop through the three positions and return the open one
          for(var j = 0; j < 3; j++)
            {
              //the array position with the open spot is = 5
              if(temp[j] == 5)
                {
                  //save the open position
                  answer = complic[j][i];
                  //check if the open position is a winning play and add to array
                  if(arrsum == number)
                    {
                      arrofsum.push(answer);
                      //console.log(arrofsum);
                    }
                } 
            }    
          //gonna check here if there is a winning play
          if(arrofsum.length > 0)
            {
              answer = arrofsum[0];
            }
        }
    }
  return answer;
}

function check() {

  if (arr[0][0] === true & arr[0][1] === true & arr[0][2] === true) {
    message = "X WINS!";
    won1 = "00";
    won2 = "01";
    won3 = "02";

  }
  if (arr[1][0] === true & arr[1][1] === true & arr[1][2] === true) {
    message = "X WINS!";
    won1 = "10";
    won2 = "11";
    won3 = "12";
  }
  if (arr[2][0] === true & arr[2][1] === true & arr[2][2] === true) {
    message = "X WINS!";
    won1 = "20";
    won2 = "21";
    won3 = "22";
  }
  if (arr[0][0] === true & arr[1][0] === true & arr[2][0] === true) {
    message = "X WINS!";
    won1 = "00";
    won2 = "10";
    won3 = "20";
  }
  if (arr[0][1] === true & arr[1][1] === true & arr[2][1] === true) {
    message = "X WINS!";
    won1 = "01";
    won2 = "11";
    won3 = "21";
  }
  if (arr[0][2] === true & arr[1][2] === true & arr[2][2] === true) {
    message = "X WINS!";
    won1 = "02";
    won2 = "12";
    won3 = "22";
  }
  if (arr[0][0] === true & arr[1][1] === true & arr[2][2] === true) {
    message = "X WINS!";
    won1 = "00";
    won2 = "11";
    won3 = "22";
  }
  if (arr[0][2] === true & arr[1][1] === true & arr[2][0] === true) {
    message = "X WINS!";
    won1 = "02";
    won2 = "11";
    won3 = "20";
  }
  if (arr[0][0] === false & arr[0][1] === false & arr[0][2] === false) {
    message = "O WINS!";
    won1 = "00";
    won2 = "01";
    won3 = "02";
  }
  if (arr[1][0] === false & arr[1][1] === false & arr[1][2] === false) {
    message = "O WINS!";
    won1 = "10";
    won2 = "11";
    won3 = "12";
  }
  if (arr[2][0] === false & arr[2][1] === false & arr[2][2] === false) {
    message = "O WINS!";
    won1 = "20";
    won2 = "21";
    won3 = "22";
  }
  if (arr[0][0] === false & arr[1][0] === false & arr[2][0] === false) {
    message = "O WINS!";
    won1 = "00";
    won2 = "10";
    won3 = "20";
  }
  if (arr[0][1] === false & arr[1][1] === false & arr[2][1] === false) {
    message = "O WINS!";
    won1 = "01";
    won2 = "11";
    won3 = "21";
  }
  if (arr[0][2] === false & arr[1][2] === false & arr[2][2] === false) {
    message = "O WINS!";
    won1 = "02";
    won2 = "12";
    won3 = "22";
  }
  if (arr[0][0] === false & arr[1][1] === false & arr[2][2] === false) {
    message = "O WINS!";
    won1 = "00";
    won2 = "11";
    won3 = "22";
  }
  if (arr[0][2] === false & arr[1][1] === false & arr[2][0] === false) {
    message = "O WINS!";
    won1 = "02";
    won2 = "11";
    won3 = "20";
  }
  
  if (won1 !== "") {
    if(message == 'X WINS!' && player_x_o == 'x' ) {
      outmessage = 'You Win!';
    } else if(message == "O WINS!" && player_x_o == 'o' ) {
      outmessage = 'You Win!';
    } else {
      outmessage = 'Computer Wins!';
    }
    
    
    $("#message").html(outmessage);
    //$("#message").html("Player " +  message);
    $(".again").html("Play Again");
    $(".again").css("background-color", "rgba(255, 255, 255, 0.5)");
    toggleWon(1);
    fill();
  }

  if (count === 9) {
    if (won1 === "") {
      $("#message").html("Draw!");
      $(".again").html("Play Again");
      $(".again").css("background-color", "rgba(255, 255, 255, 0.5)");
      var audio = new Audio('http://natrivera.com/tic-tac-toe/Error.mp3');
      audio.play();
      audio.play();
    }

  }
}
