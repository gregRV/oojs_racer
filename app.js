$(document).ready(function(){
	game = gameInitialize('greg', 'tony danza', 10);
	game.render();
	$(document).on('keyup',function (e){
		game.onKeyUp(e);
	});
});

////////////////
// MISC METHODS
////////////////
function gameInitialize(player1, player2, trackLength){
	var game = new Game(new Player(player1), new Player(player2), trackLength);
	return game;
}

//////////////////
// PLAYER METHODS
//////////////////
function Player(name){
	this.name = name;
	this.position = 1;
}

Player.prototype.getPosition = function(){
	return this.position;
}

Player.prototype.advancePosition = function(spaces){
	this.position += spaces;
}

////////////////
// GAME METHODS
////////////////
function Game(player1, player2, trackLength){
	this.player1 = player1;
	this.player2 = player2;
	this.trackLength = trackLength;
	this.winner  = null;
}

Game.prototype.render = function(){
	var game = this;
	// clears strips for new rendering
	$('.player_strip').empty();
	// build race strips
	for(var i=0; i<= this.trackLength; i++){
		$('.player_strip').append("<td></td>")
	}
	// place player 1
	$("#p1 td:nth-child(" + game.player1.getPosition() + ")").addClass('active');
	// place player 2
	$("#p2 td:nth-child(" + game.player2.getPosition() + ")").addClass('active');
}

Game.prototype.onKeyUp = function(e){
	var g = this;
	if (g.winner != null){
		return;
	}
	else if (e.which == 81){ 		 // Q, player1
		g.player1.advancePosition(1);
	}
	else if (e.which == 80){ // P, player2
		g.player2.advancePosition(1);
	}
	this.render();
	g.gameDone();
}

Game.prototype.gameDone = function(){
	if (this.player1.getPosition() > this.trackLength){
		this.winner = this.player1.name;
		alert('Player 1 Wins!');
		return true;
	}
	if (this.player2	.getPosition() > this.trackLength){
		this.winner = this.player2.name;
		alert('Player 2 Wins!');
		return true;
	}
	else {
		return false;
	}
}

// DRIVER CODE
// p1 = new Player('greg');
// p2 = new Player('tony danza');
// game = new Game(p1,p2,10);
