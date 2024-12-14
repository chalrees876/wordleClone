
function Letters(props) {

    function handleChange(event){
            console.log("handling change, props.id: " + props.id);
            props.updateGuess(event.target.value, props.id);
            props.updateNextElement(props.id);
    }

    function isBackspace(event) {
        if (event.key === 'Backspace') {
            props.backspacePressed();
            console.log("true");
        }
    }

    const activeAutoFocus = (
        <input type={"text"}
               pattern={"^[a-zA-Z]+$"}
               maxLength="1"
               minLength="1"
               id={props.id}
               className={props.colors[props.id]}
               onChange={handleChange}
               onKeyDown={isBackspace} autoFocus></input>
    )

    const active = (
        <input type={"text"}
               pattern={"^[a-zA-Z]+$"}
               maxLength="1"
               minLength="1"
               id={props.id}
               className={props.colors[props.id]}
               onChange={handleChange}
               onKeyDown={isBackspace}></input>
    )

    const disabled = (
        <input type={"text"}
               pattern={"^[a-zA-Z]+$"}
               maxLength="1"
               minLength="1"
               id={props.id}
               className={props.colors[props.id]}
               onChange={handleChange}
               onKeyDown={isBackspace} disabled={true}></input>
    )


    return (
        <>{props.guessFormNumber !== props.guessNumber ?  disabled : (props.id === 0) ? activeAutoFocus : active}</>
)
}

export default Letters;