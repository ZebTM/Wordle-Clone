import { useState, useId } from "react"
import './ComponentStyling.css'

export default function CharacterBox(props) {
    const id = useId()
    const char = props.letter;
    const setChar = props.setChar;
    function ValidateInput(e) {
        console.log(e)
        setChar(e)
    }


    return (
        <input 
            id={id}
            maxLength={1}
            defaultValue={char}
            type="text"
            className="characterBox2"
            onChange={e => ValidateInput(e.target.value) }
        />
    )
}