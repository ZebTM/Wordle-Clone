import CharacterBox from "./CharacterBox";
import { useEffect, useState } from "react";
import './ComponentStyling.scss'

/**
 * 
 * @param {Object}  
 * @returns 
 */
export default function Row({
        rowIndex,
        string,
        columnStatuses
    }) {
        
    return (
        <div className="row">
            {string.split("").map((char, index) => 
                <CharacterBox 
                    char={char}
                    key={`${rowIndex}` + `${index}`}
                    status={columnStatuses[index]}
                    /> 
            )}
        </div>
    )
}