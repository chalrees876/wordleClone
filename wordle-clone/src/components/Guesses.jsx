import {useState} from "react";


function Guesses(props) {

    const [guess, setGuess] = useState("");

    function handleChange() {
        setGuess(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setCorrect(props.checkGuess(guess));
        if(props.checkGuess(guess)) {
            props.updateWord();
        }
        setGuess("");
    }

    const [isCorrect, setCorrect] = useState(false);

    const correctTemplate = (
        <div>
            <h1>Congratulations! You solved the puzzle</h1>
            <button type="button" onClick={() => setCorrect(false)}>Play Again?</button>
        </div>
    )

    const incorrectTemplate = (

        <form className={"guess-container"} onSubmit={handleSubmit}>
            <h1>{props.answer}</h1>
            <div>
                <input type={"text"} maxLength="5" minLength="5" id="1" value={guess}  onChange={handleChange}></input>
            </div>
        </form>
    )

    return (
        <>
        {isCorrect ? correctTemplate : incorrectTemplate}
        </>
    )
}

export default Guesses;