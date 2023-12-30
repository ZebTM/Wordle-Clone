import CharacterBox from "./CharacterBox";
import { useEffect, useState } from "react";
import './ComponentStyling.scss'

/**
 * 
 * @param {Object}  
 * @returns 
 */
export default function Row({
        columnStatuses,
        columns,
        setColumns,
    }) {

    return (
        <div className="row">
            {columns.map((column, index) => 
                <div className='characterBox'>
                    <CharacterBox
                        status={columnStatuses[index]}
                        letter={column}
                        setColumn={setColumns}
                        index={index}
                        columns={columns}
                    />
                </div>  
            )}
        </div>
    )
}