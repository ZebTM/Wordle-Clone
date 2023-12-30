'use client'
import Row from '@/components/Row'
import { CharacterState } from '@/enums/CharacterState';
import { useState } from 'react'

export default function WordleContainer( props ) {
	const secretWord = 'Texts';
    const [ activeRowIndex, setActiveRowIndex ] = useState(0);
	const [ activeRow, setActiveRow] = useState([ '', '', '', '', '' ]);
	const [ previousRows, setPreviousRows ] = useState([]);
	const [ columnStates, setColumnStates ] = useState([
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
		[ CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered, CharacterState.Unanswered ],
	])

	function verifyRow(row) {
		let retVal = true
		for (let i = 0; i < 5; i++) {
			if (secretWord.charAt(i) !== row[i]) {
				retVal = false
				break
			}
		}
		return retVal;
	}

	function createNewColumnStates(row) {
		let columnStates = []
		for (let i = 0; i < 5; i++) {
			if (secretWord.charAt(i).toUpperCase() === row[i].toUpperCase()) {
				columnStates[i] = CharacterState.Correct
			} else {
				let includesChar = secretWord.toUpperCase()
					.includes(row[i].toUpperCase());
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
				let char = row[index].toUpperCase();
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
		setActiveRow(['', '', '', '', ''])
	}

	function submitRow() {
		if (activeRowIndex < 5) {
			// Verify the row does not contain any empty strings=
			if ( activeRow.find((item) => item === '') === undefined ) {
				if ( verifyRow(activeRow) ) {
					alert("YOU WIN")
				} else {
					columnStates[activeRowIndex] = createNewColumnStates(activeRow)
					setColumnStates(columnStates)
					previousRows.push(activeRow)
					setPreviousRows(previousRows)
					console.log(previousRows)
					clearActiveRow();
					setActiveRowIndex(activeRowIndex + 1);

					console.log(columnStates);
				}
			} else {
				console.log("Fill out all the boxes")
			}

			console.log('Row is now: ' + activeRowIndex)
		}
		else {
			console.log('Can not increment row anymore game is over')
			console.log('Start a new game to continue')
		}
	};
	const emptyRow = [ '', '', '', '', '']
	return (
		<main>
			<Row className="row" columns={activeRowIndex === 0 ? activeRow : activeRow > 0 ? previousRows[0] : emptyRow } setColumns={setActiveRow} columnStatuses={ columnStates[0] } />
			<Row className="row" columns={activeRowIndex === 1 ? activeRow : activeRow > 1 ? previousRows[1] : emptyRow } setColumns={setActiveRow} columnStatuses={ columnStates[1] } />
			<Row className="row" columns={activeRowIndex === 2 ? activeRow : activeRow > 2 ? previousRows[2] : emptyRow } setColumns={setActiveRow} columnStatuses={ columnStates[2] } />
			<Row className="row" columns={activeRowIndex === 3 ? activeRow : activeRow > 3 ? previousRows[3] : emptyRow } setColumns={setActiveRow} columnStatuses={ columnStates[3] } />
			<Row className="row" columns={activeRowIndex === 4 ? activeRow : activeRow > 4 ? previousRows[4] : emptyRow } setColumns={setActiveRow} columnStatuses={ columnStates[4] } />
			<Row className="row" columns={activeRowIndex === 5 ? activeRow : activeRow > 5 ? previousRows[5] : emptyRow } setColumns={setActiveRow} columnStatuses={ columnStates[5] } />
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