import {useMemo, useState} from "react";
import Letters from "./Letters.jsx"

function Guesses(props) {

    const [guess, setGuess] = useState("");
    const [guessNumber, setGuessNumber] = useState(0);
    const [isCorrect, setCorrect] = useState(false);

    const letters = useMemo(
        () => Array.from({ length: 5 }, (_, i) => i),
        []
    )

    function handleChange() {
        setGuess(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setGuessNumber(guessNumber + 1);
        setCorrect(props.checkGuess(guess));
        if(props.checkGuess(guess)) {
            props.updateWord();
        }
        setGuess("");
    }

    const startingTemplate = (

        <form className={"guess-container"} onSubmit={handleSubmit}>
            <div>
                {letters.map(i => <Letters key={i}/>)}
            </div>
        </form>
    )

    return (
        <>
            {startingTemplate}
        </>
    )
}

export default Guesses;