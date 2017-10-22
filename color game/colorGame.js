// random colors then added to the squares
function generateColors(num) {
	var arr = [], r, g, b;
	for (var i = 0; i < num; ++i){
		r = Math.floor(Math.random()*256)
		g = Math.floor(Math.random()*256)
		b = Math.floor(Math.random()*256)
		arr[i] = "rgb(" + r + ", " + g + ", " + b + ")";
	}
	return arr;
}
function changeColors(color) {
	for (var i = 0; i < squares.length; ++i) {
		squares[i].style.backgroundColor = color;
	}
}
function resetGame(){
	colors = generateColors(numSquares);
	for (var i = 0; i < squares.length; ++i){
		squares[i].style.backgroundColor = colors[i];
	}
	index = Math.floor(Math.random()*numSquares);
	targetColor = colors[index];
	target.textContent = targetColor;
	target.style.color = "#c78283";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
}
var squares = document.querySelectorAll(".square");
var numSquares = 6;
var colors = generateColors(numSquares);
for (var i = 0; i < squares.length; ++i){
	squares[i].style.backgroundColor = colors[i];
}
// select random color from the 6 and make it the target color
var index = Math.floor(Math.random()*numSquares);
var targetColor = colors[index];
var target = document.getElementById("target");
var messageDisplay = document.getElementById("message");
target.textContent = targetColor;
for (var i = 0; i < squares.length; ++i){
	squares[i].addEventListener("click", function(){
		if (this.style.backgroundColor === targetColor) {
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again?";
			changeColors(targetColor);
			target.style.color = targetColor;
		}
		else {
			messageDisplay.textContent = "Try Again!";
			this.style.backgroundColor = "white";
		}
	});
}
var resetButton = document.querySelector("#new");
resetButton.addEventListener("click", function(){
	resetGame();
});
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");
easyBtn.addEventListener("click", function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numSquares = 3;
	colors = generateColors(numSquares);
	index = Math.floor(Math.random()*numSquares);
	targetColor = colors[index];
	target.textContent = targetColor;
	for (var i = 0; i < squares.length; ++i){
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	messageDisplay.textContent = "";
}
);
hardBtn.addEventListener("click", function(){
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	numSquares = 6;
	colors = generateColors(numSquares);
	index = Math.floor(Math.random()*numSquares);
	targetColor = colors[index];
	target.textContent = targetColor;
	for (var i = 0; i < squares.length; ++i){
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}
	messageDisplay.textContent = "";
});