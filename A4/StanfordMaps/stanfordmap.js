"use strict";

// const FRAME_WINDOW = 100;
const PIXEL = 6;
const INTERVAL = 10;
const MARGIN = 20;
const FRAME_MARGIN = 60;
const HALF = 2;


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
					{ filename: "map-s.gif", height: 997, width:1283 },
					{ filename: "map-m.gif", height: 1589, width:2047 },
					{ filename: "map-l.gif", height: 2373, width:3063 },
					{ filename: "map-xl.gif", height: 3164, width:4084 },

				]


document.addEventListener("mousedown", handleMouseDown);
function handleMouseDown(event){
	cursorX = event.clientX;
	cursorY = event.clientY;
	event.preventDefault();
	var inBox;
	if((cursorY > MARGIN && cursorY < (mapFrameHeight + MARGIN)) && 
		( cursorX < (mapFrameWidth + MARGIN) && cursorX > MARGIN)){
		inBox = true;
	} else {
		inBox = false;
	}

	if(inBox) {
		mapImg.style.cursor = "move";
		isDragging = true;
	}	
}



document.addEventListener("mouseup", handleMouseUp);
function handleMouseUp(event){
	if(isDragging){
		mapImg.style.cursor = "auto";
		prevX = cursorX;
		prevY = cursorY;
		getX = parseInt(mapImg.style.left);
		getY = parseInt(mapImg.style.top);
		setCenterX = (mapFrameWidth + FRAME_MARGIN) / HALF;
		setCenterY = (mapFrameHeight + FRAME_MARGIN) / HALF;
		cursorX = event.clientX;
		cursorY = event.clientY;
		change(prevX, prevY, cursorX, cursorY);
		isDragging = false;
	}
}


document.addEventListener("mousemove", handleMouseMove);
function handleMouseMove(event) {
	if(isDragging){
		prevX = cursorX;
		prevY = cursorY;
		getX = parseInt(mapImg.style.left);
		getY = parseInt(mapImg.style.top);
		setCenterX = (mapFrameWidth + FRAME_MARGIN) / HALF;
		setCenterY = (mapFrameHeight + FRAME_MARGIN) / HALF;
		cursorX = event.clientX;
		cursorY = event.clientY;
		change(prevX, prevY, cursorX, cursorY);
	}
}

document.addEventListener("dblclick", handleDblClick);
function handleDblClick(event) {
	prevX = cursorX;
	prevY = cursorY;
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	setCenterX = (mapFrameWidth + FRAME_MARGIN) / HALF;
	setCenterY = (mapFrameHeight + FRAME_MARGIN) / HALF;
	cursorX = event.clientX;
	cursorY = event.clientY;
	change(cursorX, cursorY, setCenterX, setCenterY);
}


function change(cursorx, cursory, currX, currY, smoothScroll) {
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);

	var intervalValue = PIXEL;
	var moveDown = currY - cursory;
	var moveRight = currX - cursorx;

	if(smoothScroll == true) {
		setInterval(
			() => {
				getX = parseInt(mapImg.style.left);
				getY = parseInt(mapImg.style.top);

				// var leftStyle = mapImg.style.left;
				// var topStyle = mapImg.style.top;


				if(moveDown > 0){
					
					if(moveDown < intervalValue){
						mapImg.style.top = getY + moveDown + "px";
						moveDown = 0;
					} else {
						moveDown = moveDown - intervalValue;
						mapImg.style.top = getY + intervalValue + "px";
						// mapImg.style.top = parseInt(window.getComputedStyle(mapImg).getPropertyValue("top"))
					}

				} else if(moveDown < 0){
					if(moveDown > -intervalValue){
						mapImg.style.top = getY + moveDown + "px";
						moveDown = 0;
					} else {
						moveDown = moveDown + intervalValue;
						mapImg.style.top = getY - intervalValue + "px";
						// mapImg.style.top = parseInt(window.getComputedStyle(mapImg).getPropertyValue("top")) 
					}
				}


				if(moveRight > 0) {
					if(moveRight < intervalValue){
						mapImg.style.left = getX + moveRight + "px";
						moveRight = 0;
					} else {
						moveRight = moveRight - intervalValue;
						mapImg.style.left = getX + intervalValue + "px";
					}
				} else if(moveRight < 0){
					if(moveRight > -intervalValue){
						mapImg.style.left = getX + moveRight + "px";
						moveRight = 0;
					} else {
						moveRight = moveRight + intervalValue;
						mapImg.style.left = getX - intervalValue + "px";
					}
				}
				
			}, INTERVAL )} else {
								mapImg.style.left = getX + moveRight + "px";
								mapImg.style.top = getY + moveDown + "px";
						   }
}


var mapImg = document.getElementById("mapImg");
var mapFrame = document.getElementById("mapFrame");

document.getElementById("zoomIn").addEventListener("click", function() {
	var previous = currImg;
	currImg++;
	if(currImg >= 4){ currImg = 3; }
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	mapImg.src = mapArray[currImg].filename;


	var frameWSize = mapFrameWidth / HALF;
	var currX = frameWSize - getX;
	var currWidth = mapArray[currImg].width / mapArray[previous].width;
	var currXPos = currWidth * currX;

	var frameHSize = mapFrameWidth / HALF;
	var currY = frameHSize - getY;
	var currHeight = mapArray[currImg].height / mapArray[previous].height;
	var currYPos = currHeight * currY;
	change(currXPos, currYPos, currX, currY);
}, false);


document.getElementById("zoomOut").addEventListener("click", function() {
	var previous = currImg;
	currImg--;
	if(currImg <= 0) { currImg = 0;}
	getX =parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	mapImg.src = mapArray[currImg].filename;

	var frameWSize = mapFrameWidth / HALF;
	var currX = frameWSize - getX;
	var currWidth = mapArray[currImg].width / mapArray[previous].width;
	var currXPos = currWidth * currX;

	var frameHSize = mapFrameWidth / HALF;
	var currY = frameHSize - getY;
	var currHeight = mapArray[currImg].height / mapArray[previous].height;
	var currYPos = currHeight * currY;
	change(currXPos, currYPos, currX, currY);}, false);



function moveLeft() {

	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	var frameSize = mapFrameWidth / HALF;
	change(0, 0, frameSize, 0, true);
}

function moveUp() {
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	var frameSize = mapFrameWidth / HALF;
	change(0, 0, 0, frameSize, true);
}

function moveDown() {
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	var frameSize = mapFrameWidth / HALF;
	change(0, 0, 0, -frameSize, true);
}

function moveRight() {
	getX = parseInt(mapImg.style.left);
	getY = parseInt(mapImg.style.top);
	var frameSize = mapFrameWidth / HALF;
	change(0, 0, -frameSize, 0, true);
}


function reSize() {
  	mapFrameHeight = window.innerHeight - FRAME_MARGIN;
  	mapFrameWidth = window.innerWidth - FRAME_MARGIN;
  	mapFrame.style.height = mapFrameHeight + "px";
	mapFrame.style.width = mapFrameWidth + "px";
}

function preloadImages() {
	for(let i = 0; i < 4; i++) {
		mapImg.src = mapArray[i].filename;
	}
	mapImg.src = mapArray[currImg].filename;
}


document.getElementById("right").addEventListener("click", moveRight);
document.getElementById("left").addEventListener("click", moveLeft);
document.getElementById("up").addEventListener("click", moveUp);
document.getElementById("down").addEventListener("click", moveDown);


window.addEventListener("load", preloadImages, false);
window.addEventListener("load", reSize, false);
window.addEventListener("resize", reSize, false);

