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
		return columnStates;
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
			<Row columns={activeRowIndex === 0 ? activeRow : activeRow > 0 ? previousRows[0] : emptyRow } setColumns={setActiveRow} columnStatuses={ columnStates[0] } />
			<Row columns={activeRowIndex === 1 ? activeRow : activeRow > 1 ? previousRows[1] : emptyRow } setColumns={setActiveRow} columnStatuses={ columnStates[1] } />
			<Row columns={activeRowIndex === 2 ? activeRow : activeRow > 2 ? previousRows[2] : emptyRow } setColumns={setActiveRow} columnStatuses={ columnStates[2] } />
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