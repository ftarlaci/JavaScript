// book array as object

var mann = {
	author: "Thomas Mann",
	title: "Death in Venice",
	description: "One of the most famous literary works of the twentieth century, this novella embodies themes that preoccupied Thomas Mann in much of his work: the duality of art and life, the presence of death and disintegration in the midst of existence, the connection between love and suffering and the conflict between the artist and his inner self."

};


var joyce = {
	author: "James Joyce",
	title: "A portrait of the artist as a young man",
	description: "This book is a fictional re-creation of the Irish writer's own life and early environment. The experiences of the novel's young hero, unfold in astonishingly vivid scenes that seem freshly recalled from life and provide a powerful portrait of the coming of age of a young man of unusual intelligence, sensitivity and character."
};


var forster = {
	author: "E. M. Forster",
	title: "A room with a view",
	description: "This work displays an unusually perceptive view of British society in the early 20th century.It is a social comedy set in Florence, Italy, and Surrey, England. Its heroine, Lucy Honeychurch, struggling against straitlaced Victorian attitudes of arrogance, narroe mindedness and sobbery, falls in love - while on holiday in Italy - with the socially unsuitable George Emerson."
};


var allende = {
	author: "Isabel Allende",
	title: "The house of spirits",
	description: "Allende describes the life of three generations of a prominent family in Chile and skillfully combines with this all the main historical events of the time, up until Pinochet's dictatorship."
};


var allende2 = {
	author: "Isabel Allende",
	title: "Of love and shadows",
	description: "The whole world of Irene Beltran, a young reporter in Chile at the time of the dictatorship, is destroyed when she discovers a series  of killings carried out by government soldiers. With the help of a  photographer, Francisco Leal, and risking her life, she tries to come up with evidence against the dictatorship."
};


var books = [mann, joyce, forster, allende, allende2];

function findbook() {
	var author = document.getElementById("author").value;
	var title = document.getElementById("title").value;

	for(var i = 0; i < 5; i++) {
		if(author == books[i].author) {
			if(title == books[i].title) {
				document.getElementById("textarea").value = books[i].description;
			} else {
				document.getElementById("textarea").value = "Book Title: " + books[i].title + "  " + books[i].description;
			}
			return;
		}
	}

	for (var i = 0; i < 5; i++) {
		if(title == books[i].title) {
			if(author == books[i].author) {
				document.getElementById("textarea").value = books[i].description;
			} else {
				document.getElementById("textarea").value = "Author name: "  + books[i].author + " \n" + "Description:" + " " + books[i].description;
			}
			return;
		}
	}
	document.getElementById("textarea").value = "Could not find the book/author you are looking for. ";
}

document.getElementById("findbook").addEventListener("click", findbook ,false);


 function clearform() {
 	document.getElementById("textarea").value = " ";
 	document.getElementById("title").value = " ";
 	document.getElementById("author").value = " ";

 }

 document.getElementById("clear").addEventListener("click",clearform,false);



