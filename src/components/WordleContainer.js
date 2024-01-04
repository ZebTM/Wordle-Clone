'use client'
import Row from '@/components/Row'
import { CharacterState } from '@/enums/CharacterState';
import { useState, useEffect } from 'react'

export default function WordleContainer( props ) {
	const secretWord = 'Texts';
	const emptyRow = '     ';
    const [ activeRowIndex, setActiveRowIndex ] = useState(0);
	const [ activeRow, setActiveRow] = useState( '     ' );
	const [ curRowIndex, setCurRowIndex ] = useState(0);
	const [ previousRowsString, setPreviousRowsString ] = useState([]);
	const [ columnStates, setColumnStates ] = useState([
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
	])

	function setCharAt( str, index, chr ) {
		if(index > str.length-1) return str;
		return str.substring(0,index) + chr + str.substring(index+1);
	}



	useEffect(() => {
		function eventKeyDown( e ) {
			if ( e.keyCode === 8 && curRowIndex >= 0 ) {
				let tmpRow = activeRow
				tmpRow = setCharAt(tmpRow, curRowIndex, ' ')
				setActiveRow(tmpRow)
				if (curRowIndex !== 0) {
					setCurRowIndex(curRowIndex - 1);
				}
				
				return
			}

			if (curRowIndex > 5 ) {
				return
			}

			if ( e.keyCode < 65 || e.keyCode > 90 ) {
				return
			}

			console.log(e);
			let tmpRow = activeRow
			tmpRow = setCharAt(tmpRow, curRowIndex, e.key)
			setActiveRow(tmpRow)
			setCurRowIndex(curRowIndex + 1);
		}

		document.addEventListener('keydown', eventKeyDown )

		return () => {
			document.removeEventListener('keydown', eventKeyDown )
		} 
	})

	function verifyRow(row) {
		let retVal = true
		for (let i = 0; i < 5; i++) {
			if (secretWord.charAt(i) !== row.charAt(i)) {
				retVal = false
				break
			}
		}
		return retVal;
	}

	function createNewColumnStates(row) {
		let columnStates = []
		for (let i = 0; i < 5; i++) {
			if (secretWord.charAt(i).toUpperCase() === row.charAt(i).toUpperCase()) {
				columnStates[i] = CharacterState.Correct
			} else {
				let includesChar = secretWord.toUpperCase()
					.includes(row.charAt(i).toUpperCase());
				if (includesChar) {
					columnStates[i] = CharacterState.Partial
				} else {
					columnStates[i] = CharacterState.Wrong
				}
			}
		}

		let partialIndex = columnStates.find((state) => state === CharacterState.Partial);
		if (partialIndex !== undefined) {
			let occurenceOfRow = countOccurenceOfLetters(row);
			let occurenceOfSecret = countOccurenceOfLetters(secretWord);
			// need to just count up the number times a letter appears in the word and secret word
			let indexsOfPartial = []
			let indexsOfCorrect = []
			for (let i = 0; i < 5; i++) {
				if (columnStates[i] === CharacterState.Partial) {
					indexsOfPartial.push(i);
				} else if (columnStates[i] === CharacterState.Correct) {
					indexsOfCorrect.push(i);
				}
			}

			console.log('CORRECT INDEXES: ' + indexsOfCorrect);
			console.log('PARTIAL INDEXES: ' + indexsOfPartial);
			let charThatNeedCorrected = [];
			for (let i = 0; i < indexsOfPartial.length; i++) {
				let index = indexsOfPartial[i]
				let char = row.charAt(i).toUpperCase();
				if (occurenceOfRow[char] > occurenceOfSecret[char] ) {
					charThatNeedCorrected.push(char)
				}
			}
			// for (let i = 0; i < charThatNeedCorrected.length; i++) {
			// 	lastIndexOfChar = 0;
			// 	foundChar = 0;
			// 	for(let j = 0; j < 5; j++) {
			// 		if (  )
			// 	}
			// }
			console.log('CHAR THAT NEED CORRECTED: ' + charThatNeedCorrected);
		}
		
		return columnStates;
	}

	function countOccurenceOfLetters(word) {
		let occurenceOfLetters = {}
		let typeOf = typeof(word) 
		switch (typeOf) {
			case 'string':
				for (let i = 0; i < 5; i++) {
					let char = word.charAt(i).toUpperCase();
					if (char in occurenceOfLetters) {
						occurenceOfLetters[char] += 1
					} else {
						occurenceOfLetters[char] = 1
					}
				}
				break;
			case 'object':
				if (Array.isArray(word)) {
					for (let i = 0; i < 5; i++) {
						let char = word[i].toUpperCase();
						if (char in occurenceOfLetters) {
							occurenceOfLetters[char] += 1
						} else {
							occurenceOfLetters[char] = 1
						}
					}
				}
				else {
					console.log('Can not do this type')
				}
				break;
			default:
				console.log('Can not do this type')
		}

		return occurenceOfLetters
	}
	

	function clearActiveRow() {
		setActiveRow(emptyRow)
	}

	function submitRow() {
		if (activeRowIndex < 5) {
			// Verify the row does not contain any empty strings=
			if ( !activeRow.includes(' ') ) {
				if ( verifyRow(activeRow) ) {
					alert("YOU WIN")
					console.log('YOU WIN')
				} else {
					columnStates[activeRowIndex] = createNewColumnStates(activeRow)
					setColumnStates(columnStates)
					previousRowsString.push(activeRow)
					setPreviousRowsString(previousRowsString)
					console.log(previousRowsString)
					clearActiveRow();
					setCurRowIndex(0)
					setActiveRowIndex(activeRowIndex + 1);

					console.log(columnStates);
				}
			} else {
				console.log("Fill out all the boxes")
			}
		}
		else {
			console.log('Can not increment row anymore game is over')
			console.log('Start a new game to continue')
		}
	};


	return (
		<main>
			<div className='center'>
				<div className='game-container'>
					<Row className="row" string={activeRowIndex === 0 ? activeRow : activeRowIndex > 0 ? previousRowsString[0] : emptyRow } columnStatuses={ columnStates[0] } rowIndex='1' />
					<Row className="row" string={activeRowIndex === 1 ? activeRow : activeRowIndex > 1 ? previousRowsString[1] : emptyRow } columnStatuses={ columnStates[1] } rowIndex='2'/>
					<Row className="row" string={activeRowIndex === 2 ? activeRow : activeRowIndex > 2 ? previousRowsString[2] : emptyRow } columnStatuses={ columnStates[2] } rowIndex='3'/>
					<Row className="row" string={activeRowIndex === 3 ? activeRow : activeRowIndex > 3 ? previousRowsString[3] : emptyRow } columnStatuses={ columnStates[3] } rowIndex='4'/>
					<Row className="row" string={activeRowIndex === 4 ? activeRow : activeRowIndex > 4 ? previousRowsString[4] : emptyRow } columnStatuses={ columnStates[4] } rowIndex='5'/>
					<Row className="row" string={activeRowIndex === 5 ? activeRow : activeRowIndex > 5 ? previousRowsString[5] : emptyRow } columnStatuses={ columnStates[5] } rowIndex='6'/>
				</div>	
			</div>
			<button onClick={submitRow} > ENTER </button>
			<button className='newGame' onClick={newGame}> New Game </button>
		</main>
	)
};

function newGame() {
  	clearRows()
};

function clearRows() {

};