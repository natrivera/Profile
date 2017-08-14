function PV(future , n , int) {
  int = int / 100;
  var pv = future / (Math.pow((1 + int), n));
  pv = Math.round(pv * 100) / 100;
  return pv;
}
function FV(present , n , int) {
  int = int / 100;
  var fv = present * (Math.pow((1 + int), n));
  fv = Math.round(fv * 100) / 100;
  return fv;
}
function RATE(present , n , future) {
  var number = future / present;
  var rate = (Math.pow(number, (1 / n))) - 1;
  rate = Math.round(rate * 10000) / 100;
  return rate;
}
function TERM(present , rate , future) {
  rate = rate / 100;
  var number = future / present;
  var terms = Math.log(number) / Math.log(1 + rate);
  terms = Math.round(terms * 100) / 100;
  return terms;
}
function WACC(We , Re , Wd , Rd , Wp , Rp , tax) {
  var value = We + Wd + Wp;
  tax = tax / 100;
  We = We / value;
  Re = Re / 100;
  Wd = Wd / value; 
  Rd = Rd / 100;
  Wp = Wp / value;
  Rp = Rp / 100;
  var wacc = (We * Re) + (Wd * Rd) * (1 - tax) + (Wp * Rp);
  wacc = Math.round(wacc * 1000) / 10;
  return wacc;
}
function NPV(int , initial , arr) {
  var npv = 0;
  int = int / 100;
  
  for(var i = 0; i < arr.length; i++) {
    var number = parseFloat(arr[i]);
    var t = i + 1;
    npv += number / (Math.pow((1 + int) , t));
  }
  npv = npv - initial;
  npv = Math.round(npv * 100) / 100;
  return npv;
}
function YTM(pmt , future , present , terms) {
  //C+((F-P)/n))/(F+P)/2
  //($100+(($1,000-$920)/10))/($1,000+$920)/2
  var ytm = (pmt + ((future - present) / terms)) / ((future + present) / 2);
  ytm = Math.round(ytm * 10000) / 100;
  return ytm;
}
$(".options").click(function() {
  //get the current id
  var chosen = this.id;
  chosen = "#op" + chosen;
  //remove any calculator showing and display the chosen one
  $("#presentvalue").css("background-color" , "#0003");
  $("#futurevalue").css("background-color" , "#0003");
  $("#interestrate").css("background-color" , "#0003");
  $("#terms").css("background-color" , "#0003");
  $("#npv").css("background-color" , "#0003");
  $("#wacc").css("background-color" , "#0003");
  $("#bondytm").css("background-color" , "#0003");
  $(this).css("background-color" , "transparent");
  $("#default").css("display" , "none");
  $("#opnpv").css("display" , "none");
  $("#opwacc").css("display" , "none");
  $("#opfuturevalue").css("display" , "none");
  $("#oppresentvalue").css("display" , "none");
  $("#opterms").css("display" , "none");
  $("#opinterestrate").css("display" , "none");
  $("#opbondytm").css("display" , "none");
  $(chosen).css("display" , "block");
});
//run the present value calc
$("#prv").click(function() {
  var did = this.id;
  var interest = parseFloat($("#interest" + did).val());
  var terms = parseFloat($("#n" + did).val());
  var presentval = parseFloat($("#pv" + did).val());
  var futureval = parseFloat($("#fv" + did).val());
  var payment = parseFloat($("#pmt" + did).val());
  
  var pv = PV(futureval , terms , interest);
  if(isNaN(pv)) {
    $("#display" + did).val("ERROR");
  } else {
    	  
    $("#display" + did).val("$" + pv.toLocaleString() + " Present Value");
    $("#pv" + did).val(pv);
  }
  
});
$("#frv").click(function() {
  var did = this.id;
  var interest = parseFloat($("#interest" + did).val());
  var terms = parseFloat($("#n" + did).val());
  var presentval = parseFloat($("#pv" + did).val());
  var futureval = parseFloat($("#fv" + did).val());
  var payment = parseFloat($("#pmt" + did).val());
  
  var fv = FV(presentval , terms , interest);
  if(isNaN(fv)) {
    $("#display" + did).val("ERROR");
  } else {
  	  
    $("#display" + did).val("$" + fv.toLocaleString() + " Future Value");
    $("#fv" + did).val(fv);
  }
  
});
$("#rte").click(function() {
  var did = this.id;
  var interest = parseFloat($("#interest" + did).val());
  var terms = parseFloat($("#n" + did).val());
  var presentval = parseFloat($("#pv" + did).val());
  var futureval = parseFloat($("#fv" + did).val());
  var payment = parseFloat($("#pmt" + did).val());
  
  var rate = RATE(presentval , terms , futureval);
  if(isNaN(rate)) {
    $("#display" + did).val("ERROR");
  } else {
    $("#display" + did).val(rate + "% Rate");
    $("#interest" + did).val(rate);
  }
  
});
$("#trm").click(function() {
  var did = this.id;
  var interest = parseFloat($("#interest" + did).val());
  var terms = parseFloat($("#n" + did).val());
  var presentval = parseFloat($("#pv" + did).val());
  var futureval = parseFloat($("#fv" + did).val());
  var payment = parseFloat($("#pmt" + did).val());
  
  var terms = TERM(presentval , interest , futureval);
  if(isNaN(terms)) {
      $("#display" + did).val("ERROR");
  } else {
      $("#display" + did).val(terms + " Terms");
      $("#n" + did).val(terms);
  }
  
});
$("#wac").click(function() {
  var did = this.id;
  var we = parseFloat($("#we" + did).val());
  var re = parseFloat($("#re" + did).val());
  var wd = parseFloat($("#wd" + did).val());
  var rd = parseFloat($("#rd" + did).val());
  var wp = parseFloat($("#wp" + did).val());
  var rp = parseFloat($("#rp" + did).val());
  var tax = parseFloat($("#tax" + did).val());
  
  var wacc = WACC(we , re , wd , rd , wp , rp , tax);
  if(isNaN(wacc)) {
      $("#display" + did).val("ERROR");
  } else {
      $("#display" + did).val(wacc + "% WACC"); 
  }
});
$("#npvone").click(function() {
  var did = this.id;
  var interest = parseFloat($("#interest" + did).val());
  var init = parseFloat($("#init" + did).val());
  var cashflow = $("#cf" + did).val();
  
  var arr = cashflow.split(",");
  
  var npv = NPV(interest , init , arr);
  if(isNaN(npv)) {
    $("#display" + did).val("ERROR");
  } else {
    $("#display" + did).val("$" + npv.toLocaleString() + " NPV");
  }
});
$("#ytm").click(function() {
  var did = this.id;
  var interest = parseFloat($("#interest" + did).val());
  var terms = parseFloat($("#n" + did).val());
  var presentval = parseFloat($("#pv" + did).val());
  var futureval = parseFloat($("#fv" + did).val());
  var payment = parseFloat($("#pmt" + did).val());
  
  var terms = YTM(payment , futureval , presentval , terms);
  if(isNaN(terms)) {
      $("#display" + did).val("ERROR");
  } else {
      $("#display" + did).val(terms + "% YTM");
      $("#interest" + did).val(terms);
  }
  
});