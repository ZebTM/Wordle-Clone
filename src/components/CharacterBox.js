import { useState, useId } from "react"
import './ComponentStyling.scss'

export default function CharacterBox({
        char,
        status
    }) {
    const id = useId()
    

    return (
        <div className={`characterBox ${status}`}>
            { char }   
        </div> 
    )
}