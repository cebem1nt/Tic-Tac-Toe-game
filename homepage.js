const reset = document.querySelector(".reset");
const output = document.querySelector(".output");
const fields = document.querySelectorAll(".b");

class Game {
	constructor(fieldElements, outputElement) {
		this.fields = fieldElements
		this.output = outputElement
		this.xTurn = true
		this.isGameOver = false
		this.b = [
			'', '', '', 
			'', '', '',
            '', '', '' 
		]
	}

	setOutput(text){
		this.output.innerHTML = text
	}

	checkWinner(){
		for (let i = 0; i < this.b.length; i += 3) {
		    if (this.b[i] !== '' && this.b[i] === this.b[i+1] && this.b[i+1] === this.b[i+2]) {
				this.setOutput(`Player <span class="won">${this.b[i]}</span> won!`)
				this.isGameOver = true;
		    }
		  }

	  	for (let j = 0; j < 3; j++) {
		    if (this.b[j] !== '' && this.b[j] === this.b[j+3] && this.b[j+3] === this.b[j+6]) {
				this.setOutput(`Player <span class="won">${this.b[j]}</span> won!`)
				this.isGameOver = true;
		    }
	  	}

	    if (this.b[0] !== '' && this.b[0] === this.b[4] && this.b[4] === this.b[8]) {
		    this.setOutput(`Player <span class="won">${this.b[0]}</span> won!`)
			this.isGameOver = true;
	  	}

	    if (this.b[2] !== '' && this.b[2] === this.b[4] && this.b[4] === this.b[6]) {
		    this.setOutput(`Player <span class="won">${this.b[2]}</span> won!`)
			this.isGameOver = true;
	  	}

	  	if (!this.b.includes('')){
			if(!this.isGameOver){
				this.setOutput('Draw!')
			}
		}
	}

	checkGameState(){
		this.checkWinner()
		if (this.isGameOver){
			for (let i = 0; i < this.fields.length; i++) {
				this.fields[i].disabled = true;	
			}
		}
	}

	resetBoard() {
		for(let i = 0; i < this.fields.length; i++){
			this.fields[i].disabled = false;
			this.fields[i].innerHTML = "";
		}
		this.isGameOver = false;
		this.b = ['', '', '', '', '', '', '', '', ''];   
		this.setOutput("Lets start!")
	}
}

ttt = new Game(fields, output)

function setFunctionality(ttt, btns, reset){
	for(let i = 0; i < btns.length ; i++){
		btns[i].addEventListener('click', ()=> {
			char = ttt.xTurn === true ? 'X' : 'O'
			nchar = !ttt.xTurn === true ? 'X' : 'O'

			btns[i].innerHTML = `<span class ="${char}">${char}</span>`
			ttt.setOutput(`Now player <span class ="${nchar}"> ${nchar} </span>!`)
			ttt.b[i] = char;
			ttt.checkGameState()

			btns[i].disabled = true;
			ttt.xTurn = !ttt.xTurn
		})
	}

	reset.addEventListener('click', ()=>{ ttt.resetBoard() })
}

setFunctionality(ttt, fields, reset)
