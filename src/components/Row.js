import CharacterBox from "./CharacterBox";
import { useEffect, useState } from "react";
import './ComponentStyling.css'

export default function Row(props) {
    const setRow = props.setChars;
    const chars = props.chars;
    // const [char1, setChar1] = useState(chars[0]);
    // const [char2, setChar2] = useState(chars[1]);
    // const [char3, setChar3] = useState(chars[2]);
    // const [char4, setChar4] = useState(chars[3]);
    // const [char5, setChar5] = useState(chars[4]);
    // const setCharacterBoxes  = [setChar1, setChar2, setChar3, setChar4, setChar5]


    // useEffect(() => {
    //     setRow([char1, char2, char3, char4, char5])
    //     console.log([char1, char2, char3, char4, char5])
    // }, [char1, char2, char3, char4, char5])


    const setChars = props.setChars;
    let isRowActive = props.isRowActive;

    return (
        <div className="row">
            {chars.map((char, index) => 
                <div className={'characterBox ' + ( isRowActive ? 'activeRow' : '')} key={char}>
                    <CharacterBox  letter={char} setChar={setCharacterBoxes[index]} />
                </div>  
            )}
        </div>
    )
}