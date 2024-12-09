function Letters(props) {

    function handleChange(event){
        // eslint-disable-next-line react/prop-types
        console.log("current index: " + props.letterIndex);
        // eslint-disable-next-line react/prop-types
        props.updateGuess(event.target.value, props.letterIndex)
    }

    return (
    <div className={"letter-container"}>
        <input type={"text"} maxLength="1" minLength="1" id={props.letterIndex} onChange={handleChange}></input>
    </div>
)
}

export default Letters;