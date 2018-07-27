// I've included both the universities full names and their nicknames
// use the nicknames for this assignment.  I've included the full names
// so those who aren't familiar with Bay Area universities will know
// what the names of the universities actually are.

var univArray = new Array(
		{name: "Stanford University", nickname: "Stanford", ownership: "private", SATh: 1570, SATl: 1380, tuition: 44757},
		{name: "University of California, Berkeley", nickname: "UC Berkeley", ownership: "public", SATh: 1500, SATl: 1250, tuition: 13844},
		{name: "University of California, Santa Cruz", nickname: "UC Santa Cruz", ownership: "public", SATh: 1280, SATl: 1000, tuition: 13398},
		{name: "San Francisco State University", nickname: "SFSU", ownership: "public", SATh: 1110, SATl: 880, tuition: 6468},
		{name: "San Jose State University", nickname: "SJSU", ownership: "public", SATh: 1160, SATl: 880, tuition: 9496},
		{name: "Sonoma State University", nickname: "Sonoma State", ownership: "public", SATh: 1090, SATl: 880, tuition: 7276},
		{name: "California State University, East Bay", nickname: "CalState East Bay", ownership: "public", SATh: 1010, SATl: 800, tuition: 6550, room: 6435},
		{name: "University of San Francisco", nickname: "USF", ownership: "private", SATh: 1270, SATl: 1070, tuition: 41450},
		{name: "Santa Clara University", nickname: "SCU", ownership: "private", SATh: 1380, SATl: 1190, tuition: 43812},
		{name: "Mills College", nickname: "Mills College", ownership: "private", SATh: 1250, SATl: 1040, tuition: 42918}
);


// using DOMContentLoaded because it is not working in any other way
document.addEventListener("DOMContentLoaded", function() {
	console.log("DEBUG: DOMContentLoaded, after the page loads ");
	var numschools = 0;
	var universities = univArray.length;

	var table = "";
	for(var i = 0; i < universities; i++) {
		
		// event loop
		if(numschools % 2 != 0){ 
			table = table + "<tr class=\"zebra\"><td>" + 
						  univArray[i].nickname + "</td><td>" + 
						  univArray[i].SATh + "</td><td>" + 
						  univArray[i].SATl + "</td><td>" + 
						  univArray[i].tuition + "</td></tr>"; 
						  console.log("DEBUG: create zebra table -- generate table");
		} else {
			// // the search criteria is combined as an "AND", so universities listed must match all criteria.
			table = table + "<tr><td>" + 
						univArray[i].nickname + "</td><td>" + 
						univArray[i].SATh + "</td><td>" + 
						univArray[i].SATl + "</td><td>" + 
						univArray[i].tuition + "</td> </tr>";
						console.log("DEBUG: generate table when page loads ");
		} 
		
		numschools++;
	}
	document.getElementById("generatedTable").innerHTML = table;
});


// window.addEventListener("load",generateTable, false);



// function generateTable() {
document.getElementById("updateBtn").addEventListener("click", function(){
	var isChecked = "";
	var universities = univArray.length;
	var numschools = 0;
	var options = document.getElementsByName("owner");
	console.log("get checked radio buttons");

	var table = "";
	for(var i = 0; i < 3; i++) {
		if(options[i].checked) {
			isChecked = options[i].value;
			break;
		}
	}



	// check which radio is selected
	var satmax = 10000000;  // arbitrarily large number 
	var maxsatinput = document.getElementById("MHS").value;
	if(maxsatinput != "") { satmax = document.getElementById("MHS").value; }


	var satmin = 10000000;
	var minsatinput = document.getElementById("MLS").value;
	if(minsatinput != "") { satmin = document.getElementById("MLS").value; }



	var tuit = 10000000;
	var maxtuitioninput = document.getElementById("MT").value;
	if( maxtuitioninput != "") { tuit = document.getElementById("MT").value; }
	console.log("DEBUG: calculate max tuition ");

	for(var i = 0; i < universities; i++) {

		// the search criteria is combined as an "AND", so universities listed must match all criteria.
		if( univArray[i].SATh <= satmax && 
			univArray[i].SATl >= satmin && 
			univArray[i].tuition <= tuit && 
			(isChecked == "" || univArray[i].ownership == isChecked)) {

			//event loop, creating table with Object properties
				if(numschools % 2 != 0){ 
							table = table + "<tr class=\"zebra\"><td>" + 
							univArray[i].nickname + "</td><td>" + 
							univArray[i].SATh + "</td><td>" + 
							univArray[i].SATl + "</td><td>" + 
							univArray[i].tuition + "</td></tr>"; 
				} else {
							table = table + "<tr><td>" + 
				  			univArray[i].nickname + "</td><td>" + 
				  			univArray[i].SATh + "</td><td>" + 
				  			univArray[i].SATl + "</td><td>" + 
				  			univArray[i].tuition + "</td></tr>"; 
				}
				console.log("DEBUG: does it get here?");
				numschools++;
		}
	}
	document.getElementById("generatedTable").innerHTML = table;
	console.log("DEBUG: after innerhtml = table, not sure why it is not loading sigh...");
});



// DOES NOT LOAD
// window.onload = function(){
// 	var buttoncheck = document.getElementById("uptadeBtn");
// 	if(buttoncheck){
// 		buttoncheck.addEventListener("click", generateTable, false);
// 	}
// }

// window.onload does not work!! 

// 
// console.log("DEBUG: after I attach generate table to dom ");




