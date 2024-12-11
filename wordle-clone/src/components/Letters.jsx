
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

    const active = (
        <input type={"text"}
               maxLength="1"
               minLength="1"
               id={props.id}
               className={props.colors[props.id]}
               onChange={handleChange}
               onKeyDown={isBackspace}></input>
    )

    const inactive = (
        <input type={"text"}
               maxLength="1"
               minLength="1"
               id={props.id}
               className={props.colors[props.id]}
               onChange={handleChange}
               onKeyDown={isBackspace} readOnly></input>
    )


    return (
        <>{props.isInactive ? inactive : active}</>
)
}

export default Letters;