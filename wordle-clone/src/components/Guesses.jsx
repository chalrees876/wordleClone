import {useMemo, useState} from "react";
import Letters from "./Letters.jsx"

function Guesses(props) {

    const [guess, setGuess] = useState(["", "", "", "", ""]);
    const [guessNumber, setGuessNumber] = useState(props.guessNumber);
    const [isCorrect, setCorrect] = useState(false);
    const [colors, setColors] = useState(["grey", "grey", "grey", "grey", "grey"])
    const [letterReadOnly, setLetterReadOnly] = useState([false, true, true, true, true]);
    const [letterIndex, setLetterIndex] = useState(-1);

    const letters = useMemo(
        () => Array.from({ length: 5 }, (_, i) => i),
        []
    )

    function handleSubmit(event) {
        event.preventDefault();
        setGuessNumber(guessNumber + 1);
        let newColors = colors;
        for ( let i = 0; i < colors.length; i++) {
            // eslint-disable-next-line react/prop-types
            console.log("guess[i]: " + guess[i]);
            console.log(props.alphabetMap);
            if (guess[i] === props.answer[i] && props.alphabetMap[guess[i]] > 0) {
                newColors[i] = "green";
                setColors(newColors);
                props.alphabetMap[guess[i]]--;
            }
        }
        for (const c in guess ) {
            if (props.alphabetMap[guess[c]] > 0) {
                newColors[c] = "yellow";
                props.alphabetMap[guess[c]]--;
            }
        }
        if(props.checkGuess(guess)) {
            setCorrect(true);
            props.updateWord();
            setColors(["grey", "grey", "grey", "grey", "grey"]);
        }
    }

    function updateGuess(letter, i) {
        const newLetters = [...guess];
        newLetters[i] = letter;
        setGuess(newLetters);
    }

    function updateReadOnly(i) {
        if (i === 0) {
        setLetterReadOnly([false,false,true,true,true])
        }
        else if (i>0 && i<4) {
            const temp = [true, true, true, true, true];
            temp[i] = false;
            temp[i+1] = false;
            setLetterReadOnly(temp)
        }
        else {
            setLetterReadOnly([true, true, true, true, true])
        }
    }

    function handleBackspace(i) {
        if (i === 0 || i === 1 ) {
            setLetterReadOnly([false, true, true, true, true]);
        }
        else if (i === 2) {
            setLetterReadOnly([true, false, false, true, true]);
        }
        else if (i === 3) {
            setLetterReadOnly([true, true, false, false, true])
        }
    }

    const startingTemplate = (

        <form className={"guess-container"} onSubmit={handleSubmit}>
            <h1>{guessNumber}</h1>
            <div>
                {letters.map(i =>
                    <Letters key={i}
                             guess={guess}
                             updateGuess={updateGuess}
                             id={i}
                             letterIndex={letterIndex}
                             answer={props.answer}
                             colors={colors}
                             guessNumber={guessNumber}
                             letterReadOnly={letterReadOnly}
                             updateReadOnly={updateReadOnly}
                             handleBackspace={handleBackspace}/>)}
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