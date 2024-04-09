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
		this.xTurn = true
	}
}

class Bot {
	
	emptySquares(board) {
		let emptySquares = []
		let i = 0
		board.forEach((square) => {
			if (square === '') {
				emptySquares.push(i)
			}
			i++
		})
		return emptySquares
	}
	
	evaluatePosition(board) {
		for (let i = 0; i < 9; i += 3) {
			if (board[i] !== '' && board[i] === board[i+1] && board[i+1] === board[i+2]) {
				return board[i]
			}
		}

		for (let i = 0; i < 3; i++) {
			if (board[i] !== '' && board[i] === board[i+3] && board[i+3] === board[i+6]) {
				return board[i]
			}
		}

		if (board[0] !== '' && board[0] === board[4] && board[4] === board[8]) {
			return board[0]
		}
		
		if (board[2] !== '' && board[2] === board[4] && board[4] === board[6]) {
			return board[2]
		}

		if (!board.includes('')) {
			return 'draw'
		}

		return null
	}
	
	findRandomMove(board) {
		const emptySquares = this.emptySquares(board)
		if (emptySquares.length === 0) {
			return -1
		}
		const randomIndex = Math.floor(Math.random() * emptySquares.length)
		return emptySquares[randomIndex]
	}
	
	findMove(board) {
		const emptySquares = this.emptySquares(board)
		if (emptySquares.length === 0) {
			return -1
		}

		let bestMove = -1
		let bestScore = -Infinity
		for (let i = 0; i < emptySquares.length; i++) {
			const move = emptySquares[i]
			board[move] = 'O'
			const score = this.minimax(board, 0, false)
			board[move] = ''
			if (score > bestScore) {
				bestScore = score
				bestMove = move
			}
		}
		return bestMove;
	}

	minimax(board, depth, isMaximizing) {
		const result = this.evaluatePosition(board)
		if (result !== null) {
			if (result === 'O') {
				return 10 - depth
			} else if (result === 'X') {
				return depth - 10
			} else {
				return 0
			}
		}
		
		if (isMaximizing) {
			let bestScore = -Infinity
			const emptyIndices = this.emptySquares(board)
			for (let i = 0; i < emptyIndices.length; i++) {
				const move = emptyIndices[i]
				board[move] = 'O'
				const score = this.minimax(board, depth + 1, false);
				board[move] = ''
				bestScore = Math.max(bestScore, score);
			}
			return bestScore;
		} else {
			let bestScore = Infinity
			const emptyIndices = this.emptySquares(board)
			for (let i = 0; i < emptyIndices.length; i++) {
				const move = emptyIndices[i]
				board[move] = 'X'
				const score = this.minimax(board, depth + 1, true)
				board[move] = ''
				bestScore = Math.min(bestScore, score)
			}
			return bestScore
		}
	}
}

const resetButton = document.querySelector(".reset")
const output = document.querySelector(".output")
const fields = document.querySelectorAll(".b")

function gameServe(game, btns, reset, bot) {
	for (let i = 0; i < btns.length ; i++) {
		btns[i].addEventListener('click', ()=> {
			const char = game.xTurn ? 'X' : 'O'
			const nchar = !game.xTurn ? 'X' : 'O'
			
			btns[i].innerHTML = `<span class ="${char}">${char}</span>`
			game.setOutput(`Now player <span class ="${nchar}">${nchar}</span>!`)
			game.b[i] = char
			game.checkGameState()

			btns[i].disabled = true
			game.xTurn = !game.xTurn
			
			let move = bot.findMove(game.b)
			if (!game.xTurn && move !== -1) {
				btns[move].click()
			}
		})
	}
}

function main() {
	let game = new Game(fields, output)
	let bot = new Bot()
	
	gameServe(game, fields, resetButton, bot)
	
	resetButton.addEventListener('click', () => {game.resetBoard()} )
}

main()