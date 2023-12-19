'use client'
import Row from '@/components/Row'
import { useState } from 'react'

export default function WordleContainer( props ) {
	const secretWord = 'Texts';
    const [ activeRowIndex, setActiveRowIndex ] = useState(0);
	const [ row, setRow] = useState([ '', '', '', '', '' ]);
	// const [ row2, setRow2] = useState([ '', '', '', '', '' ]);
	// const [ row3, setRow3] = useState([ '', '', '', '', '' ]);
	// const [ row4, setRow4] = useState([ '', '', '', '', '' ]);
	// const [ row5, setRow5] = useState([ '', '', '', '', '' ]);
	// const [ row6, setRow6] = useState([ '', '', '', '', '' ]);
	// const rows = [ row1, row2, row3, row4, row5, row6 ];
	
	function verifyRow(row) {
		row.map((letter, index) => {
			if (letter === secretWord.charAt(index)) {

			}
		});
	}

	function submitRow() {
		if (activeRowIndex < 5) {
			let activeRow = rows[activeRowIndex]
			// Verify the row does not contain any empty strings
			// let tmp = activeRow.find((item) => item === '');
			if ( activeRow.find((item) => item === '') === undefined ) {
				verifyRow(activeRow);
				setActiveRowIndex( activeRowIndex + 1 )
			} else {

			}



			
			console.log('Row is now: ' + activeRowIndex)
		}
		else {
			console.log('Can not increment row anymore game is over')
			console.log('Start a new game to continue')
		}
	};

	return (
		<main>
			<Row chars={row} setChars={setRow} isRowActive={activeRowIndex === 0} />
			{/* <Row chars={row2} setChars={setRow2} isRowActive={activeRowIndex === 1} />
			<Row chars={row3} setChars={setRow3} isRowActive={activeRowIndex === 2} />
			<Row chars={row4} setChars={setRow4} isRowActive={activeRowIndex === 3} />
			<Row chars={row5} setChars={setRow5} isRowActive={activeRowIndex === 4} />
			<Row chars={row6} setChars={setRow6} isRowActive={activeRowIndex === 5} />   */}
			<button onClick={submitRow} > ENTER </button>
			<button className='newGame' onClick={newGame}> New Game </button>
		</main>
	)
};

// function enter(activeRow, setActiveRow) {
// 	if (activeRow < 5) {
// 		setActiveRow( activeRow + 1 )
// 		console.log('Row is now: ' + activeRow)
// 	}
// 	else {
// 		console.log('Can not increment row anymore game is over')
// 	}
// };

function newGame() {
  	clearRows()
};

function clearRows() {




};