
function Letters(props) {

/*    function handleChange(event){
            console.log("handling change, props.id: " + props.id);
            event.preventDefault();
            props.updateGuess(event.target.value, props.id);
            props.updateNextElement(props.id);
            console.log("nextLetter: " + props.nextLetter);
            console.log("props.id: " + props.id)
    }*/

    function isBackspace(event) {
        if (event.key === 'Backspace') {
            props.backspacePressed(true);
            console.log("true");
        }
        else {
            props.backspacePressed(false);
            console.log("false");
        }
    }

    function validateInput(event) {
        const value = event.target.value;
        if(!/^[a-zA-Z]?$/.test(value)) {
            event.target.value = "";
        }
        else {
            console.log("handling change, props.id: " + props.id);
            event.preventDefault();
            props.updateGuess(event.target.value, props.id);
            props.updateNextElement(props.id);
        }

    }

    const activeAutoFocus = (
        <input type={"text"}
               pattern={"^[a-zA-Z]+$"}
               maxLength="1"
               minLength="1"
               id={props.id}
               className={props.colors[props.id]}
/*               onChange={handleChange}*/
               onKeyDown={isBackspace}
               autoFocus
               onInput={validateInput}
               tabIndex={-1}></input>
    )

    const active = (
        <input type={"text"}
               pattern={"^[a-zA-Z]+$"}
               maxLength="1"
               minLength="1"
               id={props.id}
               className={props.colors[props.id]}
/*               onChange={handleChange}*/
               onKeyDown={isBackspace}
               onInput={validateInput}
               tabIndex={-1}></input>
    )

    const disabled = (
        <input type={"text"}
               pattern={"^[a-zA-Z]+$"}
               maxLength="1"
               minLength="1"
               id={props.id}
               className={props.colors[props.id]}
/*               onChange={handleChange}*/
               onKeyDown={isBackspace} disabled={true}></input>
    )


    return (
        <>{props.guessFormNumber !== props.guessNumber ?  disabled : (props.id === 0) ? activeAutoFocus : active}</>
)
}

export default Letters;