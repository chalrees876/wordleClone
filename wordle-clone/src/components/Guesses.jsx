import {useMemo, useState} from "react";
import Letters from "./Letters.jsx"

function Guesses(props) {

    const [guess, setGuess] = useState(["", "", "", "", ""]);
    const [colors, setColors] = useState(["grey", "grey", "grey", "grey", "grey"])
    const [backspace, triggerBackspace] = useState(false)
    const [letterIndex, setLetterindex] = useState(0);

    const letters = useMemo(
        () => Array.from({ length: 5 }, (_, i) => i),
        []
    )

    function handleSubmit() {
        if(props.checkGuessInAnswers(guess)) {
            console.log("handle submit");
            checkColors(guess);
            console.log("in handle submit: " + colors);
            if(props.checkGuess(guess)) {
                props.updateCorrect(true);
                props.updateWord();
            }
        }
        console.log("preventing default")
        event.preventDefault();
    }



    function checkColors(guess) {
        let newColors = colors;
        console.log("new colors: " + newColors);
        for ( let i = 0; i < colors.length; i++) {
            // eslint-disable-next-line react/prop-types
            console.log("guess[i]: " + guess[i]);
            console.log("answer[i]: " + props.answer[i]);
            console.log("alphabet map [i]: " + props.alphabetMap[guess[i]])
            if (guess[i] === props.answer[i] && props.alphabetMap[guess[i]] > 0) {
                console.log("setting green")
                newColors[i] = "green";
                setColors(newColors);
                console.log(newColors);
                props.alphabetMap[guess[i]]--;
            }
            else {
                if (props.alphabetMap[guess[i] > 0]) {
                    newColors[i] = "yellow";
                    props.alphabetMap[guess[i]]--;
                }
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
        console.log("id + props.guessNumber*4: " + id)
        if(!backspace) {
            inputs[id + 1].focus();
            setLetterindex(letterIndex+1)
            console.log("letter index: " + letterIndex)
        }
        else {
            if(id !== 0) {
                inputs[id-1].focus();
                setLetterindex(letterIndex-1)
                console.log("letter index: " + letterIndex)
            }
            else {
                inputs[id].focus();
            }
        }
        triggerBackspace(false);
    }

    function backspacePressed() {
        triggerBackspace(true);
    }

    const startingTemplate = (

        <form className={"guess-container"} onSubmit={handleSubmit}>
            <div>
                {letters.map(i =>
                    <Letters key={i}
                             guess={guess}
                             updateGuess={updateGuess}
                             id={i}
                             guessFormNumber={props.id}
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

    return (
        <>
            {startingTemplate}
        </>
    )
}

export default Guesses;