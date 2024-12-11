import {useMemo, useState} from "react";
import Letters from "./Letters.jsx"

function Guesses(props) {

    const [guess, setGuess] = useState(["", "", "", "", ""]);
/*    const [guessNumber, setGuessNumber] = useState(props.guessNumber);*/
    const [isCorrect, setCorrect] = useState(false);
    const [colors, setColors] = useState(["grey", "grey", "grey", "grey", "grey"])
    const [backspace, triggerBackspace] = useState(false)

    const letters = useMemo(
        () => Array.from({ length: 5 }, (_, i) => i),
        []
    )

    function handleSubmit() {
        event.preventDefault();
        checkColors(guess);
        if(props.checkGuess(guess)) {
            setCorrect(true);
            props.updateWord();
            setColors(["grey", "grey", "grey", "grey", "grey"]);
        }

    }

    function checkColors(guess) {
        let newColors = colors;
        for ( let i = 0; i < colors.length; i++) {
            // eslint-disable-next-line react/prop-types
            console.log("guess[i]: " + guess[i]);
            console.log("answer[i]: " + props.answer[i]);
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
    }

    function updateGuess(letter, i) {
        const newLetters = [...guess];
        newLetters[i] = letter;
        setGuess(newLetters);
    }

    function updateNextElement(id) {
        const inputs = Array.from(document.querySelectorAll("input"));
        id = id + props.guessNumber*5
        console.log("id + props.gueesNumber*4: " + id)
        if(!backspace) {
            inputs[id + 1].focus();
        }
        else {
            if(id !== 0) {
                inputs[id-1].focus();
            }
            else {
                inputs[id].focus();
            }
            triggerBackspace(false);
        }
    }

    function backspacePressed() {
        triggerBackspace(true);
    }

    const startingTemplate = (

        <form className={"guess-container"} onSubmit={handleSubmit}>
            <h1>{props.guessNumber}</h1>
            <div>
                {letters.map(i =>
                    <Letters key={i}
                             guess={guess}
                             updateGuess={updateGuess}
                             id={i}
                             answer={props.answer}
                             colors={colors}
                             guessNumber={props.guessNumber}
                             updateNextElement={updateNextElement}
                             backspacePressed={backspacePressed}
                             isInactive={props.isInactive}/>)}
            </div>
            <button type="submit" id={props.id} disabled={props.isInactive}>Submit</button>
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