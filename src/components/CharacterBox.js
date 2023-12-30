import { useState, useId } from "react"
import './ComponentStyling.scss'

export default function CharacterBox({
        column,
        setColumn,
        index,
        columns,
        status
    }) {
    const id = useId()
    
    function setCharAt( str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }

    function ValidateInput(e) {
        console.log(e)
        let newColumns = columns
        newColumns[index] = e
        setColumn(newColumns)
        console.log(columns)
    }


    return (
        <input 
            id={id}
            maxLength={1}
            defaultValue={column}
            type="text"
            className={"characterBox2 " + status} 
            onChange={e => ValidateInput(e.target.value) }
        />
    )
}