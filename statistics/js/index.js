function runall() {
  generate();
  output();
}

//function to generate the data
function generate() {

  //get the user selected data size and max values
  var dataSize = document.getElementById("data_size").value;
  var maxValue = document.getElementById("max_value").value;

  //check if user entry isNAN
  if (isNaN(dataSize)) {
    var str =
      'Please enter a valid integer for Sample Size.\n"' +
      dataSize +
      '" is invalid.';
    document.getElementById("data1").value = str;
  } else {
    //create an array of random numbers
    var tempArray = [];
    for (var i = 0; i < dataSize; i++) {
      var tempnum = Math.floor(Math.random() * maxValue) + 1;
      tempArray.push(tempnum);
    }
    document.getElementById("data1").value = tempArray;
  } //end of else
} //end of generate

function output() {
  //erase any output
  document.getElementById("output").innerHTML = "";

  //get user selected class size
  var numClasses = document.getElementById("class_size").value;

  //get user selected confidence
  var conf = document.getElementById("confidence").value;

  //get text of confidence
  var confidence = document.getElementById("confidence");
  var confText = confidence.options[confidence.selectedIndex].text;

  //create an array from the data in the textarea
  var tempArray = document.getElementById("data1").value.split(",");

  //create an floating point number from all data
  for (var i = 0; i < tempArray.length; i++) {
    tempArray[i] = parseFloat(tempArray[i]);
  }

  //do the stat work
  var resultArray = doStat(tempArray, numClasses, conf, confText);

  //display the work
  display(resultArray);
} //end of output

function doStat(numbers, classes, conf, confText) {
  //intialize the variables
  var array = [];
  var secondArray = [];
  var mean = 0,
    median = 0,
    quart1 = 0,
    quart2 = 0,
    quart3 = 0,
    min = 0,
    max = 0,
    sum = 0,
    sumofvar = 0,
    sigma = 0,
    variance = 0,
    width = 0,
    upper = 0,
    lower = 0;

  //sort numbers in array from smallest to greatest
  numbers = numbers.sort(function(a, b) {
    return a - b;
  });

  //add up all the numbers in array
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  //get the mean and sum of square variances
  mean = sum / numbers.length;
  mean = Number(mean.toFixed(3));
  for (var i = 0; i < numbers.length; i++) {
    var temp = numbers[i] - mean;
    sumofvar += Math.pow(temp, 2);
  }

  //ccalculate the variance and sigma of data
  variance = sumofvar / (numbers.length - 1);
  variance = Number(variance.toFixed(3));
  sigma = Math.pow(variance, 0.5);
  sigma = Number(sigma.toFixed(3));

  //min and max of data
  min = numbers[0];
  max = numbers[numbers.length - 1];

  //calculate the class width
  width = (max - min) / classes;
  width = Math.ceil(width);

  //confidence interval
  upper = mean + conf * sigma / Math.pow(numbers.length, 0.5);
  lower = mean - conf * sigma / Math.pow(numbers.length, 0.5);
  upper = Number(upper.toFixed(3));
  lower = Number(lower.toFixed(3));

  //fill the histogram table
  for (var i = 0; i < classes; i++) {
    var count = 0;
    secondArray[i] = [];
    secondArray[i][0] = min + i * width;
    secondArray[i][1] = min + (i + 1) * width - 1;
    secondArray[i][2] = secondArray[i][0] - 0.5;
    secondArray[i][3] = secondArray[i][1] + 0.5;
    secondArray[i][4] = (secondArray[i][0] + secondArray[i][1]) / 2;
    for (var j = 0; j < numbers.length; j++) {
      if (numbers[j] > secondArray[i][2] && numbers[j] < secondArray[i][3]) {
        count++;
      }
    }
    secondArray[i][5] = count;
    secondArray[i][6] = count / numbers.length;
    secondArray[i][6] = Number(secondArray[i][6].toFixed(3));
  } //end of classes loop

  //sum up the itances of classes for histogram
  var addingfreq = 0;
  for (var i = 0; i < classes; i++) {
    addingfreq += secondArray[i][5];
    secondArray[i][7] = addingfreq;
  }
  var split = numbers.length % 2;
  var middle = numbers.length / 2;
  var quarts = numbers.length % 4;

  //work on median and quartiles
  if (split == 0) {
    median = (numbers[middle] + numbers[middle - 1]) / 2;
    var get1 = numbers.length * 0.25;
    var get2 = numbers.length * 0.5;
    var get3 = numbers.length * 0.75;
    get1 = Math.floor(get1);
    get2 = Math.floor(get2);
    get3 = Math.floor(get3);

    quart1 = numbers[get1 - 1];
    quart2 = numbers[get2 - 1];
    quart3 = numbers[get3 - 1];
  } else {
    median = numbers[Math.floor(middle)];
    var get1 = (numbers.length + 1) * 0.25;
    var get2 = (numbers.length + 1) * 0.5;
    var get3 = (numbers.length + 1) * 0.75;
    get1 = Math.floor(get1);
    get2 = Math.floor(get2);
    get3 = Math.floor(get3);

    quart1 = numbers[get1 - 1];
    quart2 = numbers[get2 - 1];
    quart3 = numbers[get3 - 1];
  }

  //fill array to return data
  array = [
    min,
    max,
    mean,
    median,
    quart1,
    quart2,
    quart3,
    sum,
    variance,
    sigma,
    secondArray,
    lower,
    upper,
    conf,
    numbers.length,
    confText
  ];
  return array;
} //end of doStat

function display(array) {
  //use this div to write to output
  var dynamicDiv = document.createElement("div");
  
  //add a tittle to the output
  var tittleDiv = document.createElement("div");
  var tittleh1 = document.createElement("h1");
  var tittle = "Descriptive Statistics";
  var tittleNode = document.createTextNode(tittle);
  tittleh1.appendChild(tittleNode);
  tittleDiv.appendChild(tittleh1);
  dynamicDiv.appendChild(tittleDiv);

  //create two divs to write output
  var rowDiv = document.createElement("div");
  var leftDiv = document.createElement("div");
  var rightDiv = document.createElement("div");

  //table to output the summary stats
  var outTable = document.createElement("table");

  //adding mean to table
  var tableRow = document.createElement("tr");
  var tableD = document.createElement("td");
  var messageString = "Mean";
  var messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  tableD = document.createElement("td");
  messageString = array[2];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  outTable.appendChild(tableRow);

  //adding median to table
  tableRow = document.createElement("tr");
  tableD = document.createElement("td");
  messageString = "Median";
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  tableD = document.createElement("td");
  messageString = array[3];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  outTable.appendChild(tableRow);

  //adding variance to table
  tableRow = document.createElement("tr");
  tableD = document.createElement("td");
  messageString = "Variance";
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  tableD = document.createElement("td");
  messageString = array[8];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  outTable.appendChild(tableRow);

  //adding sigma to table
  tableRow = document.createElement("tr");
  tableD = document.createElement("td");
  messageString = "Sigma";
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  tableD = document.createElement("td");
  messageString = array[9];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  outTable.appendChild(tableRow);

  //adding sample size to table
  tableRow = document.createElement("tr");
  tableD = document.createElement("td");
  messageString = "Sample Size";
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  tableD = document.createElement("td");
  messageString = array[14];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  outTable.appendChild(tableRow);

  //adding min value to table
  tableRow = document.createElement("tr");
  tableD = document.createElement("td");
  messageString = "Min";
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  tableD = document.createElement("td");
  messageString = array[0];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  outTable.appendChild(tableRow);

  //adding max to table
  tableRow = document.createElement("tr");
  tableD = document.createElement("td");
  messageString = "Max";
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  tableD = document.createElement("td");
  messageString = array[1];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  outTable.appendChild(tableRow);

  //adding quartile 1 to table
  tableRow = document.createElement("tr");
  tableD = document.createElement("td");
  messageString = "Quart 1";
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  tableD = document.createElement("td");
  messageString = array[4];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  outTable.appendChild(tableRow);

  //adding quartile 3 to table
  tableRow = document.createElement("tr");
  tableD = document.createElement("td");
  messageString = "Quart 3";
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  tableD = document.createElement("td");
  messageString = array[6];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  outTable.appendChild(tableRow);

  //adding lower bound to table
  tableRow = document.createElement("tr");
  tableD = document.createElement("td");
  messageString = "Lower Bound " + array[15];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  tableD = document.createElement("td");
  messageString = array[11];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  outTable.appendChild(tableRow);

  //adding uppper Bound to table
  tableRow = document.createElement("tr");
  tableD = document.createElement("td");
  messageString = "Upper Bound " + array[15];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  tableD = document.createElement("td");
  messageString = array[12];
  messageNode = document.createTextNode(messageString);
  tableD.appendChild(messageNode);
  tableRow.appendChild(tableD);
  outTable.appendChild(tableRow);

  //adding bootstrap classes to table
  outTable.classList.add("table");
  outTable.classList.add("table-inverse");

  //add table to div
  leftDiv.appendChild(outTable);
  rowDiv.appendChild(leftDiv);
  dynamicDiv.appendChild(rowDiv);

  //create and fill the table for histogram
  var temparr = array[10];
  var histTable = document.createElement("table");
  var headerRow = document.createElement("tr");

  var thd = document.createElement("th");
  messageString = "Classes";
  messageNode = document.createTextNode(messageString);
  thd.appendChild(messageNode);
  thd.setAttribute("colspan", "2");
  headerRow.appendChild(thd);
  histTable.appendChild(headerRow);

  thd = document.createElement("th");
  messageString = "Bounderies";
  messageNode = document.createTextNode(messageString);
  thd.appendChild(messageNode);
  thd.setAttribute("colspan", "2");
  headerRow.appendChild(thd);
  histTable.appendChild(headerRow);

  thd = document.createElement("th");
  messageString = "Mid";
  messageNode = document.createTextNode(messageString);
  thd.appendChild(messageNode);
  headerRow.appendChild(thd);
  histTable.appendChild(headerRow);

  thd = document.createElement("th");
  messageString = "Freq.";
  messageNode = document.createTextNode(messageString);
  thd.appendChild(messageNode);
  headerRow.appendChild(thd);
  histTable.appendChild(headerRow);

  thd = document.createElement("th");
  messageString = "Rel. Frq";
  messageNode = document.createTextNode(messageString);
  thd.appendChild(messageNode);
  headerRow.appendChild(thd);
  histTable.appendChild(headerRow);

  thd = document.createElement("th");
  messageString = "Sum";
  messageNode = document.createTextNode(messageString);
  thd.appendChild(messageNode);
  headerRow.appendChild(thd);
  histTable.appendChild(headerRow);
  
  //array to store the height of bars of histogram
  var heightArray = [];
  var xvalues = [];

  //loop through array and fill data of table
  for (var i = 0; i < temparr.length; i++) {
    var tempRow = document.createElement("tr");
    
    //this array is for use in histogram
    heightArray.push(temparr[i][5]);
    xvalues.push(temparr[i][2]);
    
    for (var j = 0; j < temparr[i].length; j++) {
      var tempD = document.createElement("td");
      messageString = temparr[i][j];
      messageNode = document.createTextNode(messageString);
      tempD.appendChild(messageNode);
      tempRow.appendChild(tempD);
    }
    histTable.appendChild(tempRow);
  }//end of lop to fill the data table
  
  xvalues.push(temparr[temparr.length - 1][3]);

  //style the table with bootstrap
  histTable.classList.add("table");
  histTable.classList.add("table-inverse");

  //add histogram table to div
  rightDiv.appendChild(histTable);
  rowDiv.appendChild(rightDiv);
  dynamicDiv.appendChild(rowDiv);
  
  //create histogram
  var histogram = document.createElement("div");
  histogram.classList.add("histogram");
  
  //add a tittle to the output
  var histDiv = document.createElement("div");
  var histh1 = document.createElement("h1");
  var histtittle = "Histogram";
  var histNode = document.createTextNode(histtittle);
  histh1.appendChild(histNode);
  histDiv.appendChild(histh1);
  dynamicDiv.appendChild(histDiv);//
  
  //create the inside of the histogram
  var inHist = document.createElement("div");
  inHist.id = "histogram";
  inHist.classList.add("tableDisplay");
  
  //set the width of bars 
  var numb = 100 / (temparr.length);
  var width = numb + "%;";
  var spanwidth = Math.floor((640 / (temparr.length)) - 31);
  spanwidth = spanwidth + "px;";
  
  //sort numbers in array from smallest to greatest
  heightArray = heightArray.sort(function(a, b) {
    return a - b;
  });
  
  var maxheight = heightArray[heightArray.length - 1] ;
  var percent = 1 / maxheight; 
  
  //loop through array and create a bar in histogram
  temparr.forEach(function(element) {
    
    var height = element[5]; 
    var tempper = Math.floor(height * percent * 360);
    var margin = 360 - tempper;
    tempper = "top: " + margin + "px; height: " + tempper + "px;";
    
    //create an inner div fo each bar
    var outDiv = document.createElement("div");
    var tempDiv = document.createElement("div");
    var pdiv = document.createElement("p");
    var str = height;
    var node = document.createTextNode(str);
    tempDiv.appendChild(node);
    pdiv.appendChild(node);
    tempDiv.appendChild(pdiv);
    outDiv.appendChild(tempDiv);
    inHist.appendChild(outDiv);
    outDiv.classList.add("outpiece");
    tempDiv.classList.add("piece");
    tempDiv.setAttribute("style" , tempper);
    
  });//end of foreach of temparr////
  
  var x = document.createElement("div");
  for(var i = 0; i < xvalues.length; i++) {
    var tempspan = document.createElement("span");
    var stringer = xvalues[i];
    var noder = document.createTextNode(stringer);
    tempspan.appendChild(noder);
    tempspan.classList.add("xspan");
    x.appendChild(tempspan);
  }
  x.classList.add("xlabel");
  histogram.appendChild(x);
  
  
  //add histogram to main display div
  histogram.appendChild(inHist);
  dynamicDiv.appendChild(histogram);
  
  
  //create a bbutton that will generate and run stats
  var newdiv = document.createElement("div");
  var newMessage = "To randomize a new data set and run statistics click the button bellow."
  var newMessageNode = document.createTextNode(newMessage);
  newdiv.appendChild(newMessageNode);
  var space = document.createElement("br");
  newdiv.appendChild(space);
  space = document.createElement("br");
  newdiv.appendChild(space);
  var button = document.createElement("button");
  var buttonstring = "Click Here!";
  var buttonNode = document.createTextNode(buttonstring);
  button.appendChild(buttonNode);
  button.setAttribute("onClick" , "runall();");
  button.setAttribute("style" , "float: left;");
  button.classList.add("btn_block");
  button.classList.add("btn-default");
  newdiv.appendChild(button);
  newdiv.classList.add("messagediv");
  dynamicDiv.appendChild(newdiv);
  

  //add classes to the divs
  //rowDiv.classList.add("row");
  //rightDiv.classList.add("col-sm-12");
  //rightDiv.classList.add("col-md-8");
  //leftDiv.classList.add("col-sm-12");
  //leftDiv.classList.add("col-md-4");
  rightDiv.classList.add("margins");
  leftDiv.classList.add("margins");
  dynamicDiv.classList.add("output");
  
  //create css node and insert it
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".outpiece { width: " + width + " }";
  css.innerHTML += ".xspan { margin-right: " + spanwidth +  "}";
  document.body.appendChild(css);

  //get output element and write div to output
  var element = document.getElementById("output");
  element.appendChild(dynamicDiv);
}
window.onLoad = generate(); //
