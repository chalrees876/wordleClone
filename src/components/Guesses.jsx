import {useEffect, useMemo, useState} from "react";
import Letters from "./Letters.jsx"

function Guesses(props) {

    const [guess, setGuess] = useState(["", "", "", "", ""]);
    const [colors, setColors] = useState(["grey", "grey", "grey", "grey", "grey"])
    const [backspace, triggerBackspace] = useState(false)
    const [letterIndex, setLetterindex] = useState(0);
    const [nextLetter, setNextLetter] = useState(letterIndex+1)

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
                console.log(newColors);
                props.alphabetMap[guess[i]]--;
            }
        }
        for ( let i = 0; i < colors.length; i++) {
            if (props.alphabetMap[guess[i]] > 0 && colors[i] !== "green") {
                console.log("setting yellow")
                newColors[i] = "yellow";
                props.alphabetMap[guess[i]]--;
            }
        }
        setColors(newColors);
    }

    function updateGuess(letter, i) {
        const newLetters = [...guess];
        newLetters[i] = letter;
        if(letter === "") {
            setLetterindex(letterIndex - 1);
            setNextLetter(nextLetter-1);
        }
        else {
            setLetterindex(letterIndex+1)
            setNextLetter(nextLetter+1);
        }
        setGuess(newLetters);
    }

    function updateNextElement(id) {
        const inputs = Array.from(document.querySelectorAll("input"));
        id = id + props.guessNumber * 5;

        console.log("id + props.guessNumber*5: " + id);

        if (!backspace) {
            // Ensure the next element exists and is not disabled
            if (inputs[id + 1] && !inputs[id + 1].disabled) {
                setTimeout(() => {
                    inputs[id + 1].focus();
                }, 0);
                setLetterindex(letterIndex + 1);
                setNextLetter(nextLetter + 1);
            }

        }
    }

    function backspacePressed(bool) {
        triggerBackspace(bool);
    }

    function updateLastElement(id) {
        if(backspace) {
            const inputs = Array.from(document.querySelectorAll("input"));
            id = id + props.guessNumber*5;
            console.log("update last element")
            console.log("letterIndex: " + letterIndex);
            if (id !== 0) {
                inputs[id-1].focus();
                setLetterindex(letterIndex-1);
                setNextLetter(nextLetter-11);
            }
            else {
                inputs[id].focus();
            }
            triggerBackspace(false);
        }
        console.log("out of updatelastelement")
    }

    useEffect (() => {
        console.log("use effect")
        updateLastElement(letterIndex);
    },[backspace])

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
                             isInactive={props.isInactive} letterIndex={letterIndex}/>)}
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