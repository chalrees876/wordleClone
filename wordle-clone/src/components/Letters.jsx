import Guesses from "./Guesses.jsx"
import {useState} from "react";

function Letters(props) {

    const [letters, setLetters] = useState([]);
    const [letter, setLetter] = useState("");
    const [letterCount, setLetterCount] = useState(0);

    function handleChange(event) {
        const newLetter = event.target.value;
        setLetter(newLetter);
        setLetters((prevLetters) => [...prevLetters, newLetter]);
        setLetterCount((prevCount) => prevCount + 1);
        console.log("New letter: " + newLetter);
        console.log("Letter count: " + letterCount + 1);
        consol.log("Letters: " + letters);
    }

    return (
    <div className={"letter-container"}>
        <input type={"text"} maxLength="1" minLength="1" value={letter} id={letterCount} onChange={handleChange}></input>
    </div>
)
}

export default Letters;