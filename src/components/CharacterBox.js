import { useState, useId } from "react"
import './ComponentStyling.scss'

export default function CharacterBox({
        char
    }) {
    const id = useId()


    return (
        <div className='characterBox'>
            { char }   
        </div> 
    )
}