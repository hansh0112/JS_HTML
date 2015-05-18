var canvas = document.createElement("canvas"); 
var ctx = canvas.getContext("2d"); 
canvas.width = 550; 
canvas.height = 480; 
document.body.appendChild(canvas); 

var bgReady = false; 
var bgImage = new Image(); 
bgImage.onload = function(){
	bgReady = true; 
}; 
bgImage.src="game-background.png"

var pikachuReady = false; 
var bgImage1 = new Image(); 
bgImage1.onload = function(){
	pikachuReady = true; 
}; 
bgImage1.src="pikachu.gif"

var appleReady = false; 
var bgImage2 = new Image(); 
bgImage2.onload = function(){
	appleReady = true; 
}; 
bgImage2.src="apples.png"

var pikachu = {
	speed: 300, 
	x: 0, 
	y: 0 
};

var apple= {
	x:0,
	y:0 
}; 

var applesCaught = 0; 


var keysDown = {};

//this game will be played by using keyboard arrow keys 
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false); 

//Reset the game

var reset = function(){
	var count = 0; 
	if(count = 0)
	{
		pikachu.x = 32 + (Math.random() * (canvas.width-64)); 
		pikachu.y = 32 + (Math.random() * (canvas.height - 64)); 
		apple.x = canvas.width/2; 
		apple.y = canvas.height/2; 	
	}
	else
	{
		apple.x = 32 + (Math.random() * (canvas.width-64)); 
		apple.y = 32 + (Math.random() * (canvas.height - 64)); 	
		
	}
	
	count += 1; 
}

// Character moves as the user presses the key
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		pikachu.y -= pikachu.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		pikachu.y += pikachu.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		pikachu.x -= pikachu.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		pikachu.x += pikachu.speed * modifier;
	}

	// If the pikachu touches apple, reset the game. 
	if (
		pikachu.x <= (apple.x + 32)
		&& apple.x <= (pikachu.x + 32)
		&& pikachu.y <= (apple.y + 32)
		&& apple.y <= (pikachu.y + 32)
	) {
		++applesCaught;
		reset();
	}
};

// Draw everything on the canvas... 
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (pikachuReady) {

		ctx.drawImage(bgImage1, pikachu.x, pikachu.y);
	}

	if (appleReady) {
		ctx.drawImage(bgImage2, apple.x, apple.y);
	}

	// Score keeping - font size and such 
	ctx.fillStyle = "white";
	ctx.font = "18px Arial, sans-serif";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Apples ate " + applesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// This will play from here. 
var then = Date.now();
reset();
main();

