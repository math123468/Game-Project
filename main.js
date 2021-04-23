var loc1 = [0,0]
var loc2 = [0,0]
var player = 2
var vector = [0,0]
var gamePlaying = false
var readyForMove = false
function roll(times) {
	var num1 = Math.floor(Math.random()*5)
	var num2 = Math.floor(Math.random()*5)
	document.getElementById('num1').innerHTML = num1
	document.getElementById('num2').innerHTML = num2
	if(times == 0) {
		vector = [num1,num2]
		move()
		return
	}
	var delay
	if(times > 50) delay = 50
	else if(times > 20) delay = 100
	else if(times > 10) delay = 200
	else if(times > 5) delay = 250
	else if(times > 2) delay = 350
	else if(times == 2) delay = 500
	else if(times == 1) delay = 1000
	setTimeout(function() {roll(times - 1)}, delay)
}
function setUp() {
	for(i=0;i<10;i++) {
		for(j=0;j<10;j++) {
			document.getElementById(i.toString() + j).onclick = function(arg) {return function() {moveTo(arg);}}(10*i+j);
		}
	}
}
function moveTo(square, override = false) {
	if(document.getElementById(square).style.backgroundColor = 'black' || override) {
		unhighlightAll()
		if(player == 1) {
			loc1[0] = square.toString()[0]
			loc1[1] = square.toString()[1]
			document.getElementById('player1').appendChild(document.getElementById(loc1[0] + loc1[1]))
		}
		else if(player == 2) {
			loc2[0] = square.toString()[0]
			loc2[1] = square.toString()[1]
			document.getElementById('player2').appendChild(document.getElementById(loc2[0] + loc2[1]))
		}
		nextMove()
	}
}
function move() {
	var currentLoc
	if(player == 1) currentLoc = loc1
	else currentLoc = loc2
	highlightMoveable(currentLoc[0],currentLoc[1],vector)
}
function highlightMoveable(x,y,vector) {
	var left = x-vector[0]
	var right = x+vector[0]
	var up = y+vector[1]
	var down = y-vector[1]
	var canLeft = left >= 0
	var canRight = right < 10
	var canUp = up < 10
	var canDown = down >= 0
	if(canLeft && canDown) document.getElementById(left.toString() + down).style.backgroundColor = 'black'
	if(canLeft && canUp) document.getElementById(left.toString() + up).style.backgroundColor = 'black'
	if(canRight && canDown) document.getElementById(right.toString() + down).style.backgroundColor = 'black'
	if(canRight && canUp) document.getElementById(right.toString() + up).style.backgroundColor = 'black'
}
function unhighlightAll() {
	for(i=0;i<10;i++) {
		for(j=0;j<10;j++) {
			if(i==0 && j==0) {
				document.getElementById(i.toString() + j).style.backgroundColor = 'green'
			}
			else if(i + j >= 17) {
				document.getElementById(i.toString() + j).style.backgroundColor = 'red'
			}
			else {
				document.getElementById(i.toString() + j).style.backgroundColor = 'white'
			}
		}
	}
}
function nextMove(){
	player = (1 + (player == 1))
	alert('It is now player' + player + '\'s turn.')
	roll(100)
}
function setup() {
	unhighlightAll()
	setUp()
	gamePlaying = true
	nextMove()
}
