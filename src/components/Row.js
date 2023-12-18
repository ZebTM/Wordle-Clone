import CharacterBox from "./CharacterBox";
import './ComponentStyling.css'

export default function Row(props) {
    let chars = props.chars;
    let setChars = props.setChars;
    let isRowActive = props.isRowActive;

    return (
        <div className="row">
            {chars.map((char) => 
                <div className={'characterBox ' + ( isRowActive ? 'activeRow' : '')} key={char}>
                    <CharacterBox  letter={char} />
                </div>  
            )}
        </div>
    )
}