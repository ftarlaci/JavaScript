
// arrays are objects. 
var cards = new Array("1clubs.png", 
					  "1hearts.png", 
					  "2clubs.png", 
					  "2hearts.png", 
					  "3clubs.png", 
					  "3hearts.png"
					  );


// Generates a random int within the range given (inclusive) 
//retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}



// array off cards that are flipped (will be replaced by back or clear.png)
var flippedDeck = new Array();



function play(Image, value) {

	if(flippedDeck.length < 2 && Image.getAttribute("src") == "back.png"){
		// console.log(card.getAttribute("src"))
		// console.log("get attribute back.png")
		Image.src = value;

		var flippedDeckSize = flippedDeck.length;
		
		if(flippedDeck.length == 1) {
			flippedDeck.push(value);

			var index0 = flippedDeck[0].charAt(0);  
			var index1 = flippedDeck[1].charAt(0);

				// console.log(flipped[0]);
				// console.log(flipped[1]);

			// found a match, make disappear
			if(index0 == index1) {
				setTimeout(() => {
					document.getElementById(flippedDeck[0]).src = "clear.png";
					// console.log(flipped[0]);
					document.getElementById(flippedDeck[1]).src = "clear.png";
					// console.log(flipped[1]);
					flippedDeck = [];
				}, 1500);
			} else {
				// no match, turn it back
					setTimeout(() => {
						if(flippedDeck.length == 2){
							document.getElementById(flippedDeck[0]).src = "back.png";
							// console.log(flipped);
							document.getElementById(flippedDeck[1]).src = "back.png";
							flippedDeck = [];
						}
					}, 1500);
			}
		} else if(flippedDeck.length == 0){ 
			// push is an array method that I can use here
			flippedDeck.push(value); 
		} 
	}
}

// classic swap function for generating randomness
function swapCards(matchingcards){
	var randomize;
	var hold;
	var cardLength = matchingcards.length;
	while(cardLength > 0){
		cardLength--;
		randomize = randomInt(0, cardLength);
		hold = matchingcards[cardLength];
		matchingcards[cardLength] = matchingcards[randomize];
		matchingcards[randomize] = hold;
	}
}

// on page load
document.addEventListener("DOMContentLoaded", function() {
	swapCards(cards);
	flippedDeck = [];

	var len = cards.length;
	var printCard = '';
	for(var i = 0; i < len; i++){
		printCard = printCard + '<img id="' + cards[i] + '"src="' + "back.png" + '"alt="image" onclick = "play(this ,\'' + cards[i] + '\')">';
	}
	document.getElementById('matchingcards').innerHTML = printCard;

});



document.getElementById("restart").addEventListener("click", function() {
	swapCards(cards);
	flippedDeck = [];

	var len = cards.length;
	var printCard = '';
	for(var i = 0; i < len; i++){
		printCard = printCard + '<img id="' + cards[i] + '" src="' + "back.png" + '"alt="image" onclick = "play(this ,\'' + cards[i] + '\')">';
	}
	document.getElementById('matchingcards').innerHTML = printCard;
});



