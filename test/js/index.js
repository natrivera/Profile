var questions = [];
var outresult = [];
var position = 0,
  correct = 0,
  asked = 0;
var trivial, correctanswer, question, anwer, category;
var number = 0;
var cat = 9;

$(document).ready(function() {
  //when the dom loads get the categories and generate the html
  var arr = [];
  $("#categories").html("<select id='cats'>");
  for (var i = 0; i < Object.keys(cats.test_categories).length; i++) {
    arr[i] = [];
    arr[i][0] = cats.test_categories[i].id;
    arr[i][1] = cats.test_categories[i].name;
    $("#cats").append(
      "<option value='" + arr[i][0] + "'>" + arr[i][1] + "</option>"
    );
  }
  $("#categories").append("</select>");
});

$("#nextbutton").click(function() {
  checkcurr();
  position++;
  //console.log(position);
  displayer(position);
});

$("#backbutton").click(function() {
  checkcurr();
  position--;
  //console.log(position);
  displayer(position);
});

$("#email").click(function() {
  var temp = $("#email").val();
  $("#copymail").val(temp);
  console.log(temp);
});

function displayer(n) {
  if (n < 0) {
    //do nothing
    position++;
  } else if (n < number - 1) {
    //normal ops
    $("#nextbutton").html("Next");
    display(n);
  } else if (n == number - 1) {
    //last question
    $("#nextbutton").html("Submit");
    display(n);
  } else if (n == number) {
    //results page
    finalout();
  }
}

function finalout() {
  //check how many were answered correct
  for (var i = 0; i < number; i++) {
    if (outresult[i][1] == outresult[i][3]) {
      correct++;
    }
  }
  //message to output the results of the quiz
  var finaloutmess =
    "Thank you for taking our quiz. <br><br>Next, we recccomend you send your results to the LRC and schedule an appointment so that we can assess your progress.<br><br>Category: <em>" +
    category +
    "</em><br><br>Your final score:     <em>" +
    correct +
    "/" +
    number +
    "<em><br><br>";
  //message to be sent via e-mail
  var messaging =
    "Total Score: " +
    correct +
    "/" +
    number +
    "\nCategory: " +
    category +
    "\n\n";
  for (var i = 0; i < outresult.length; i++) {
    messaging +=
      "Question " +
      (i + 1) +
      ": \n" +
      outresult[i][0] +
      "\nYour Answer: " +
      outresult[i][1] +
      "\nCorrect Answer: " +
      outresult[i][3] +
      "\nResult: " +
      outresult[i][2] +
      "\n\n\n";
  }

  $("#finalmessage").html(finaloutmess);
  $("#resultmessage").html(messaging);
  $("#board").css("display", "none");
  $("#result").css("display", "none");
  $("#final").css("display", "block");
  $("#resultmessage").attr("readonly", "readonly");
}

//check if the current question was anwered correct
function checkcurr() {
  outresult[position][1] = $("input[name=answer]:checked", "#ansform").val();
  if (outresult[position][1] === outresult[position][3]) {
    outresult[position][2] = "Correct";
  } else {
    outresult[position][2] = "Incorrect";
  }
}

$("#start").click(function() {
  number = $("#amount").val();
  cat = $("#cats").val();
  category = $("#cats option:selected").text();
  correct = 0;
  asked = 0;
  position = 0;
  load();
}); ////end of start//

function load() {
  //gettng the external JSON object with questions and answers
  trivial = jsonobject;
  for (var i = 0; i < number; i++) {
    //temp array to hold all the questions and answers
    questions[i] = [];
    questions[i][0] = trivial.results[i].question;
    questions[i][1] = trivial.results[i].correct_answer;
    questions[i][2] = trivial.results[i].incorrect_answers[0];
    questions[i][3] = trivial.results[i].incorrect_answers[1];
    questions[i][4] = trivial.results[i].incorrect_answers[2];

    //temp array to hold user selected answers
    outresult[i] = [];
    outresult[i][0] = trivial.results[i].question;
    outresult[i][3] = trivial.results[i].correct_answer;
    outresult[i][1] = "not an answer";
  }

  var time = setTimeout(function() {
    display(position);
  }, 1000);
}
//////
function display(n) {
  $("#welcome").css("display", "none");
  $("#result").css("display", "none");
  $("#board").css("display", "block");
  $("#ans1").html("");
  $("#ans2").html("");
  $("#ans3").html("");
  $("#ans4").html("");

  question = questions[n][0];
  answer = questions[n][1];
  var incorrect1 = questions[n][2];
  var incorrect2 = questions[n][3];
  var incorrect3 = questions[n][4];
  correctanswer = answer;
  var array = [answer, incorrect1, incorrect2, incorrect3];
  array = array.sort();

  $("#question").html(question);
  $("#ans1").html(array[0]);
  $("#ans2").html(array[1]);
  $("#ans3").html(array[2]);
  $("#ans4").html(array[3]);
  $("#1").val(array[0]);
  $("#2").val(array[1]);
  $("#3").val(array[2]);
  $("#4").val(array[3]);
  $("#marker").html("Question: " + (n + 1) + " of " + number);

  //uncheck all the radio buttons and check the radio that was answered by user
  var tempc = outresult[position][1];
  for (var i = 1; i < 5; i++) {
    if($("#" + i).val() === "") {
      $("#" + i).css("display" , "none");
    } else {
      $("#" + i).css("display" , "inline");  
    }
    document.getElementById(i).checked = false;
    var ter = $("#" + i).val();
    if (tempc == ter) {
      document.getElementById(i).checked = true;
    }
   
  }
}
