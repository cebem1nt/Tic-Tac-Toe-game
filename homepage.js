const reset = document.querySelector(".reset");
const output = document.querySelector(".output");
const btns = document.querySelectorAll(".b");

let count = 0;
let isFinished = false;

let board = [  '', '', '', 
			   '', '', '',
               '', '', ''  ];

function won() {
  for (let i = 0; i < board.length; i += 3) {
    if (board[i] !== '' && board[i] === board[i+1] && board[i+1] === board[i+2]) {
		output.innerHTML = `Player <span class="won">${board[i]}</span> won!`;
		isFinished = true;
    }
  }
  for (let j = 0; j < 3; j++) {
    if (board[j] !== '' && board[j] === board[j+3] && board[j+3] === board[j+6]) {
		output.innerHTML = `Player <span class="won">${board[j]}</span> won!`;
		isFinished = true;
    }
  }
    if (board[0] !== '' && board[0] === board[4] && board[4] === board[8]) {
    output.innerHTML = `Player <span class="won">${board[0]}</span> won!`;
	isFinished = true;
  }
    if (board[2] !== '' && board[2] === board[4] && board[4] === board[6]) {
    output.innerHTML = `Player <span class="won">${board[2]}</span> won!`;
	isFinished = true;
  }
  	if (!board.includes('')){
		if(!isFinished){
			output.innerHTML = 'Draw!'
		}
	}
}

function finish(){
	won()
	if (isFinished){
		for (let i = 0; i < btns.length; i++) {
			btns[i].disabled = true;	
		}
	}
}

for(let i = 0; i < btns.length ; i++){
	btns[i].addEventListener('click', ()=> {
		count++;

		 if (count % 2 === 0){
			 btns[i].innerHTML = '<span class ="O"> O </span>';
			  output.innerHTML = 'Now player <span class ="X"> X </span>!';
				 btns[i].disabled = true;
				  board[i] = "O";
				   finish()
		 } else {
			 btns[i].innerHTML = '<span class ="X"> X </span>'
		  	  output.innerHTML = 'Now player <span class ="O"> O </span>!'
			    btns[i].disabled = true;
				 board[i] = "X";
				  finish()
		 }
	});
}

function Reset(){
	for(let i = 0; i < btns.length ; i++){
		btns[i].disabled = false;
		 btns[i].innerHTML = "";
		  isFinished = false; 
		  output.innerHTML = "Lets start!";
		   board = ['', '', '', '', '', '', '', '', ''];   
	}
}

