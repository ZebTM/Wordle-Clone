'use client'
import Image from 'next/image'
import CharacterBox from '@/components/CharacterBox'
import Row from '@/components/Row'
import { useState } from 'react'
import { stringify } from 'postcss'

export default function Home() {
  const [ activeRow, setActiveRow ] = useState(0);
  const [ row1, setRow1] = useState([ '', '', '', '', '' ]);
  const [ row2, setRow2] = useState([ '', '', '', '', '' ]);
  const [ row3, setRow3] = useState([ '', '', '', '', '' ]);
  const [ row4, setRow4] = useState([ '', '', '', '', '' ]);
  const [ row5, setRow5] = useState([ '', '', '', '', '' ]);
  const [ row6, setRow6] = useState([ '', '', '', '', '' ]);

  function incrementRow() {
    if (activeRow < 5) {
      setActiveRow( activeRow + 1 )
      console.log('Row is now: ' + activeRow)
    }
    else {
      console.log('Can not increment row anymore game is over')
    }
    
  }

  return (
    <main>
        <Row chars={row1} setChars={setRow1} isRowActive={activeRow === 0} />
        <Row chars={row2} setChars={setRow2} isRowActive={activeRow === 1} />
        <Row chars={row3} setChars={setRow3} isRowActive={activeRow === 2} />
        <Row chars={row4} setChars={setRow4} isRowActive={activeRow === 3} />
        <Row chars={row5} setChars={setRow5} isRowActive={activeRow === 4} />
        <Row chars={row6} setChars={setRow6} isRowActive={activeRow === 5} />  
        <button onClick={incrementRow} > ENTER </button>
    </main>
  )
}


