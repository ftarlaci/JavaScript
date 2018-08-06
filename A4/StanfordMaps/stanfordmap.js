"use strict";

const FRAME_WINDOW = 60;
const PIXEL = 4;
const INTERVAL = 10;
const MARGIN = 20;

var windowHeight = 0;
var windowWidth = 0;
var mapFrameHeight = 0;
var mapFrameWidth = 0;
var cursorX = 0;
var cursorY = 0;
var getX = 0;
var getY = 0;
var setCenterX = 0;
var setCenterY = 0;
var currImg = 0;
var isDragging = false;
var prevX;
var prevY;

var mapArray = [ 
					{ filename: "map-s.gif", width:1283, height: 997 },
					{ filename: "map-m.gif", width:2047, height: 1589 },
					{ filename: "map-l.gif", width:3063, height: 2373 },
					{ filename: "map-xl.gif",width:4084, height: 3164 },

				]

var mapFrame = document.getElementById("mapFrame");
var mapImg = document.getElementById("mapImg");

function preloadImages() {
	for(let i = 0; i < 4; i++){
		mapImg.src = mapArray[i].filename;
	}
	mapImg.src = mapArray[currImg].filename;
}







// updating the map
function changeMap(event) {
	prevX = cursorX;
	prevY = cursorY;
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	setCenterX = (mapFrameWidth + FRAME_WINDOW) / 2;
	setCenterY = (mapFrameHeight + FRAME_WINDOW) / 2;
	cursorX = event.clientX;
	cursorY = event.clientY;
}





function move(x, y, currX, currY, upDown) {
	var moveDown = currY - y;
	var moveRight = currX - x;
	var moveInterval = PIXEL;

	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);

	if(upDown) {
		setInterval(function() {
			getX = parseInt(mapImg.style.left);
			getY = parseInt(mapImg.style.top);

			if(moveRight > 0) {
				if(moveRight < moveInterval){
					mapImg.style.left = getX + moveRight + "px";
					moveRight = 0;
				} else {
					moveRight = moveRight - moveInterval;
					mapImg.style.left = getX + moveInterval + "px";
				}
			} else if(moveRight < 0){
				if(moveRight > -moveInterval){
					mapImg.style.left = getX + moveRight + "px";
					moveRight = 0;
				} else {
					moveRight = moveRight + moveInterval;
					mapImg.style.left = getX - moveInterval + "px";
				}
			}
			if(moveDown > 0){
				if(moveDown < moveInterval){
					mapImg.style.top = getY + moveDown + "px";
					moveDown = 0;
				} else {
					moveDown = (moveDown - moveInterval);
					mapImg.style.top = getY + moveInterval + "px";
				}
			} else if(moveDown < 0){
				if(moveDown > -moveInterval){
					mapImg.style.top = getY + moveDown + "px";
					moveDown = 0;
				} else {
					moveDown = moveDown + moveInterval;
					mapImg.style.top = getY - moveInterval + "px";
				}
			}
		}, INTERVAL )} else {
			mapImg.style.left = getX + moveRight + "px";
			mapImg.style.top = getY + moveDown + "px";
		}

}



// zoom in 
document.getElementById("zoomIn").addEventListener("click", function() {
	var previous = currImg;
	currImg++;
	if(currImg >= 4){ currImg = 3; }
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	mapImg.src = mapArray[currImg].filename;
	
	var currX = (mapFrameWidth / 2) - getX;
	var currWidth = mapArray[currImg].width / mapArray[previous].width;
	var currXPos = currWidth * currX;

	var currY = (mapFrameHeight / 2) - getY;
	var currHeight = mapArray[currImg].height / mapArray[previous].width;
	var currYPos = currHeight * currY;

	move(currXPos, currYPos, currX, currY);}, false);




// zoom out

document.getElementById("zoomOut").addEventListener("click", function() {
	var previous = currImg;
	currImg--;
	if(currImg <= 0) { currImg = 0;}
	getX =parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	mapImg.src = mapArray[currImg].filename;

	var currX = (mapFrameWidth / 2) - getX;
	var currWidth = mapArray[currImg].width / mapArray[previous].width;
	var currXPos = currWidth * currX;

	var currY = (mapFrameHeight / 2) - getY;
	var currHeight = mapArray[currImg].height / mapArray[previous].width;
	var currYPos = currHeight * currY;

	move(currXPos, currYPos, currX, currY);}, false);



// move up 
document.getElementById("up").addEventListener("click", function() {
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	move(0, 0, 0, -(mapFrameHeight / 2), true);
}, false);

// move down 
document.getElementById("down").addEventListener("click", function(){
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	move(0, 0, 0, -(mapFrameHeight / 2), true);
}, false);

// move right
document.getElementById("right").addEventListener("click", function(){
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	move(0, 0, -(mapFrameWidth / 2), 0, true);
}, false);

// move left
document.getElementById("left").addEventListener("click", function() {
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	move(0, 0, -(mapFrameWidth / 2), 0, true);
}
, false);


// resizing the frame 
window.addEventListener("resize",resizeFrame, false);
function resizeFrame() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	mapFrameWidth = windowWidth - FRAME_WINDOW;
	mapFrameHeight = windowHeight - FRAME_WINDOW;
	mapFrame.style.height = mapFrameHeight + "px";
	mapFrame.style.width = mapFrameWidth + "px";
}

window.addEventListener("load", resizeFrame, false);
window.addEventListener("load", preloadImages, false);




document.addEventListener("mousemove",handleMouseMove);
function handleMouseMove(event) {
	if(isDragging){
		changeMap(event);
		move(prevX, prevY, cursorX, cursorY);
	}
}


document.addEventListener("mousedown",handleMouseDown);
function handleMouseDown(event){
	cursorX = event.clientX;
	cursorY = event.clientY;
	event.preventDefault();

	var frameWidth = window.innerWidth;
	var frameHeight = window.innerHeight;
	var frameXcoord = frameWidth + MARGIN;
	var frameYcoord = frameHeight + MARGIN;
	var withinFrame = false;

	if((cursorY > MARGIN && cursorY < frameYcoord) && 
		( cursorX < frameXcoord && cursorX > MARGIN)) {
		withinFrame = true;
	} else {
		withinFrame = false;
	}

	if(withinFrame) {
		mapImg.style.cursor = "move";
		isDragging = true;
	}	
}


document.addEventListener("mouseup",handleMouseUp);
function handleMouseUp(event){
	if(isDragging){
		mapImg.style.cursor = "auto";
		changeMap(event);
		move(prevX, prevY, cursorX, cursorY);
		isDragging = false;
	}
}




document.addEventListener("dblclick",handleDblClick);
function handleDblClick(event) {
	changeMap(event);
	move(cursorX, cursorY, setCenterX, setCenterY);
}








