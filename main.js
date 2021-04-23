var loc1 = ['0','0']
var loc2 = ['0','0']
var player = 2
var vector = [0,0]
var gamePlaying = false
var readyForMove = false
var problems = [['How many columns are in a 3x5 matrix?','How many rows are in a 3x5 matrix?','What are the dimensions of [4 5 5;2 1 9]?',
		 'Are [3;5;1] and [-6;-10;2] linearly independent? y/n','Are [3;5;1] and [-6;-10;-2] linearly independent? y/n','Is [4 1 9 6 2;0 3 8 11 2;0 0 9 9 1] in echelon form? y/n',
		'Is [4 1 9 6 2;0 3 8 11 2;0 1 9 9 1] in echelon form? y/n','Is [1 0 0 0 4;0 1 0 0 1;0 0 1 0 3;0 0 0 1 5] in rref? y/n',
		'Enter the coefficient matrix for the system\nx1 + x2 + 3x3 = 5\n3x1 + 2x2 - x3 = 1\n-2x1 - x2 + 2x3 = -3',
		'Enter the augmented matrix for the system\n4x1 - x2 + 3x3 = -7\n-3x1 - 2x2 + x3 = -1\n-2x1 + 4x2 - x3 = 4',
		'Which of the following is not an elementary row operation:\nA: Switching two rows\nB:Adding 3 to all entries in a row\nC:Multiplying all entries in a row by 2\nD:Replacing a row with itself plus another row',
		'T/F:All elementary row operations are reversible','T/F:Matrix multiplication is commutative','T/F:Matrix multiplication is associative',
		 'T/F: All matrix transformations are linear','T/F: Matrix multiplication is left AND right distributive'],
		['What is [1 3 5;2 4 6] * [5 -2;-1 9;8 2]?','Is the transformation x->[1 0;2 1]\n A:vertical shear\nB:horizontal shear\nC:vertical dilation\nD:horizontal dilation?',
		 'Is the transformation x->[1 2;0 1]\nA:vertical shear\nB:horizontal shear\nC:vertical dilation\nD:horizontal dilation?',
		'How many pivot positions are in the matrix [1 2 3 4 5;0 0 3 2 -1;0 0 0 0 0]?','T/F: A linear system has a unique solution iff the rightmost column of it\'s augmented matrix is not a pivot column',
		'Are the following vectors linearly independent? [5;0;0],[7;2;-6],[9;4;-8] y/n','Are the following vectors linearly independent? [1;4;-2],[4;-1;3],[6;7;-1] y/n',
		'Is the transformation with matrix [1 3 -2 4;-5 1 -2 2;-1 -1 -1 7] one to one? y/n','T/F: (AB)^-1 = A^-1B^-1'],
		['What is the inverse of [3 4;4 5]?','Solve the equation [1 0 -2;-2 1 6;3 -2 -5]x = [-1;7;-3]','What is the inverse of [4 9;3 7]?',
		 'Solve the equation [1 2 4;0 1 5;-2 -4 -3]x = [-2;2;9]','Are the following vectors linearly independent? [1;-2;0],[0;1;2],[5;-6;8],[2;-1;6] y/n',
		 'What is the rref of [1 2 3 4;4 5 6 7;6 7 8 9]?'],
		['If A = LU, where A = [4 3 -5;-4 -5 7;8 6 -8] and L is [1 0 0;-1 1 0;2 -5 1], what is U?','What is the inverse of [1 0 -2;-3 1 4;2 -3 4]? Use fractions',
		'How many free variables are in the solution to [0 3 -6 6 4 -5;3 -7 8 -5 8 9;3 -9 12 -9 6 15]?']]
var solutions = [['5','3','2x3','y','n','y','n','y','[1 1 3;3 2 -1;-2 -1 2]','[4 -1 3 -7;-3 -2 1 -1;-2 4 -1 4]','B','T','F','T','T','T'],
		 ['[42 35;54 44]','A','B','2','F','y','n','n','F'],
		 ['[-5 4;4 -3]','[3;1;2]','[7 -9;-3 4]','[0;-3;1]','n','[1 0 -1 -2;0 1 2 3;0 0 0 0]'],
		 ['[4 3 -5;0 -2 2;0 0 2]','[8 3 1;10 4 1;7/2 3/2 1/2]','2']]
var problemSquares = [[36,62,59,69,68,75,40,66,81,48,91,60,94,32,20,13,26,9,49],[17,84,86,65,11,4,19,31,57,41,50,74,23,24],[79,88,97,44,45,54,55,85,53,38,78,87],[99,89,98]]
function testProb(i,j) {
	alert(problems[i][j])
	alert(solutions[i][j])
}
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
			document.getElementById(i.toString() + j).onclick = function(arg) {return function() {moveTo(arg);}}(i.toString()+j);
		}
	}
}
function moveTo(square, override = false) {
	if(document.getElementById(square).style.backgroundColor == 'black' || override) {
		for(i=0;i<4;i++) {
			if(problemSquares[i].includes(parseInt(square))) {
				var num = Math.floor(Math.random()*(problems[i].length))
				var answer = prompt(problems[i][num])
				if(answer != solutions[i][num]) {
					alert('Sorry! The correct answer was ' + solutions[i][num])
					unhighlightAll()
					nextMove()
					return
				}
			}
		}
		unhighlightAll()
		if(problemSquares[3].includes(parseInt(square))) {
			alert('Player ' + player + 'has won!')
			alert('Refresh the page to play again!')
			return
		}
		if(player == 1) {
			if(square == loc1[1] + loc1[0]) {
				nextMove()
				return
			}
			loc1[0] = square[1]
			loc1[1] = square[0]
			document.getElementById(loc1[1] + loc1[0]).appendChild(document.getElementById('player1'))
			nextMove()
		}
		else if(player == 2) {
			if(square == loc2[1] + loc2[0]) {
				nextMove()
				return
			}
			loc2[0] = square[1]
			loc2[1] = square[0]
			document.getElementById(loc2[1] + loc2[0]).appendChild(document.getElementById('player2'))
			nextMove()
		}
	}
}
function move() {
	var currentLoc
	if(player == 1) currentLoc = loc1
	else currentLoc = loc2
	highlightMoveable(parseInt(currentLoc[0]),parseInt(currentLoc[1]),vector)
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
			else if(problemSquares[3].includes(10 * i+j)) {
				document.getElementById(i.toString() + j).style.backgroundColor = 'red'
			}
			else if(problemSquares[0].includes(10 * i+j)) {
				document.getElementById(i.toString() + j).style.backgroundColor = 'lawngreen'
			}
			else if(problemSquares[1].includes(10 * i+j)) {
				document.getElementById(i.toString() + j).style.backgroundColor = 'yellow'
			}
			else if(problemSquares[2].includes(10 * i+j)) {
				document.getElementById(i.toString() + j).style.backgroundColor = 'orange'
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
