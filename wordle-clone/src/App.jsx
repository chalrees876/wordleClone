import './App.css'
import Guesses from "./components/Guesses.jsx";
import {useState} from "react";

function App(props) {

    function getRandomInt(max) {
        const int = Math.random() * max;
        return Math.floor(int);
    }

    const [word, setWord] = useState(props.words[getRandomInt(5)]);

    function updateWord() {
        setWord(props.words[getRandomInt(5)]);
    }

    function checkGuess(guess) {
        return guess === word;
    }

  return (
    <>
    <h1>{word}</h1>
        <Guesses
        checkGuess={checkGuess}
        getRandomInt={getRandomInt}
        updateWord={updateWord}/>
    </>
  )
}

export default App
