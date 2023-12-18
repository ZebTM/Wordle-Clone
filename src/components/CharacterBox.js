import { useState, useId } from "react"
import './ComponentStyling.css'

export default function CharacterBox(props) {
    const id = useId()
    const letter = props.letter ? props.letter : ''
    const [char, setChar] = useState(letter)

    function ValidateInput(value) {
        value = value.replace(/\W|\d/g, '').substr(0, 1).toUpperCase();
        console.log(value)
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