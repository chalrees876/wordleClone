import {useMemo, useState} from "react";
import Letters from "./Letters.jsx"

function Guesses(props) {

    const [guess, setGuess] = useState(["", "", "", "", ""]);
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
        console.log("submitting")
        setGuessNumber(guessNumber + 1);
        if(props.checkGuess(guess)) {
            setCorrect(true);
            props.updateWord();
        }
        setGuess("");
        setGuessNumber(0);
    }

    function updateGuess(letter, i) {
        const newLetter = [...guess];
        newLetter[i] = letter;
        setGuess(newLetter);
    }

    const startingTemplate = (

        <form className={"guess-container"} onSubmit={handleSubmit}>
            <div>
                {letters.map(i => <Letters key={i} guess={guess} updateGuess={updateGuess} letterIndex={i}/>)}
            </div>
            <button type="submit">Submit</button>
        </form>
    )

    const correctTemplate = (
        <>
            <h1>Congrats! you solved the puzzle</h1>
            <button onClick={() => setCorrect(false)}>Play Again?</button>
        </>
    )

    return (
        <>
            {isCorrect ? correctTemplate : startingTemplate}
        </>
    )
}

export default Guesses;