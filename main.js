var loc1 = [0,0]
var loc2 = [0,0]
var player = 2
var vector = [0,0]
var gamePlaying = false
var readyForMove = false
var problems = [['How many columns are in a 3x5 matrix?'],['What is [1 3 5;2 4 6] * [5 -2;-1 9;8 2]?'],['What is the inverse of [3 4;4 5]?'],['If A = LU, where A = [4 3 -5;-4 -5 7;8 6 -8] and L is [1 0 0;-1 1 0;2 -5 1], what is U?']]
var solutions = [['5'],['[42 35;54 44]'],['[-5 4;4 -3]'],['[4 3 -5;0 -2 2;0 0 2]']]
var problemSquares = [[36,62,59,69,68,75,40,66,81,48,91,60,94,32,20,13,26,9,49],[17,84,86,65,87,11,04,19,31,57,41,50,74,23,24],[89,98,79,88,97,44,45,54,55,85,53,38],[99]]
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
	if(times > 50) delay = 37.5
	else if(times > 20) delay = 75
	else if(times > 10) delay = 150
	else if(times > 5) delay = 187.5
	else if(times > 2) delay = 262.5
	else if(times == 2) delay = 375
	else if(times == 1) delay = 600
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
	if(document.getElementById(square).style.backgroundColor != 'white' || override) {
		for(i=0;i<4;i++) {
			if(problemSquares[i].contains(square)) {
				var num = Math.floor(Math.random()*(problems[i].length))
				var answer = prompt(problems[i][num])
				if(answer != solutions[i][num]) {
					alert('Sorry! The correct answer was ' + solutions[i][num])
					nextMove()
				}
			}
		}
		unhighlightAll()
		if(square == 99) {
			alert('Player ' + player + 'has won!')
		}
		if(player == 1) {
			if(square.toString() == loc1[1] + loc1[0]) nextMove()
			loc1[0] = square.toString()[1]
			loc1[1] = square.toString()[0]
			document.getElementById(loc1[1] + loc1[0]).appendChild(document.getElementById('player1'))
			nextMove()
		}
		else if(player == 2) {
			if(square.toString() == loc2[1] + loc2[0]) nextMove()
			loc2[0] = square.toString()[1]
			loc2[1] = square.toString()[0]
			document.getElementById(loc2[1] + loc2[0]).appendChild(document.getElementById('player2'))
			nextMove()
		}
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
	if(canLeft && canDown) document.getElementById(down.toString() + left).style.backgroundColor = 'black'
	if(canLeft && canUp) document.getElementById(up.toString() + left).style.backgroundColor = 'black'
	if(canRight && canDown) document.getElementById(down.toString() + right).style.backgroundColor = 'black'
	if(canRight && canUp) document.getElementById(up.toString() + right).style.backgroundColor = 'black'
}
function unhighlightAll() {
	for(i=0;i<10;i++) {
		for(j=0;j<10;j++) {
			if(i==0 && j==0) {
				document.getElementById(i.toString() + j).style.backgroundColor = 'green'
			}
			else if(problemSquares[3].includes(i.toString() + j)) {
				document.getElementById(i.toString() + j).style.backgroundColor = 'red'
			}
			else if(problemSquares[0].includes(i.toString()+j)) {
				document.getElementById(i.toString() + j).style.backgeoundColor = 'lawngreen'
			}
			else if(problemSquares[1].includes(i.toString()+j)) {
				document.getElementById(i.toString() + j).style.backgeoundColor = 'yellow'
			}
			else if(problemSquares[2].includes(i.toString()+j)) {
				document.getElementById(i.toString() + j).style.backgeoundColor = 'orange'
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
