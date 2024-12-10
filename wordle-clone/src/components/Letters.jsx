import {useEffect, useState} from "react";

function Letters(props) {

    function handleChange(event){
            props.updateGuess(event.target.value, props.letterIndex);
            props.updateReadOnly(props.letterIndex);
    }

    return (
    <div className={"letter-container"}>
        <input type={"text"}
               maxLength="1"
               minLength="1"
               id={props.letterIndex}
               className={props.colors[props.letterIndex]}
               onChange={handleChange}
        readOnly={props.letterReadOnly[props.letterIndex]}></input>
    </div>
)
}

export default Letters;