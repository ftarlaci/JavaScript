function calculateButton() {
	var totalPrice = 0;
	// var cars = document.getElementById("caroptions");
	// var dollarsign = "$";

	if(document.getElementById("radioman").checked) 
		totalPrice = totalPrice + 17790;
	if(document.getElementById("radioauto").checked) 
		totalPrice = totalPrice + 18590;
	if(document.getElementById("radiomangts").checked) 
		totalPrice = totalPrice + 22455;
	if(document.getElementById("radioautosport").checked) 
		totalPrice = totalPrice + 23155;

	if(document.getElementById("firstcombo").checked) 
		totalPrice = totalPrice + 1235;
	if(document.getElementById("secondcombo").checked) 
		totalPrice = totalPrice + 3354;
	if(document.getElementById("nocombo").checked) 
		totalPrice = totalPrice + 0;

	if(document.getElementById("stereo").checked) 
		totalPrice = totalPrice + 550;
	if(document.getElementById("security").checked) 
		totalPrice = totalPrice + 399;
	if(document.getElementById("dimming").checked) 
		totalPrice = totalPrice + 295;

	// totalPrice.toLocateString(); didn't work!!!
	document.getElementById("fullprice").value = totalPrice;


}

document.getElementById("theButton").addEventListener("click", calculateButton, false);



function changeColors() {
	let cars = document.getElementById("caroptions");
	let pic = document.getElementById("carpic");
	carpic.src = cars.colors.value;
}



