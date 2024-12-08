import './App.css'
import Guesses from "./components/Guesses.jsx";
import {useEffect, useMemo, useState} from "react";

function App(props) {

    const[answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('./public/answers.txt');
            const text = await response.text();
            const lines = text.split("\n");
            setAnswers(lines);
        };
        fetchData();
    }, []);

    useEffect( () => {
        if (answers.length > 0) {
            setAnswer(answers[getRandomInt(answers.length)])
        }
    }, [answers]);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function updateWord() {
        setAnswer(answers[getRandomInt(answers.length)]);
    }

    function checkGuess(guess) {
        return guess === true;
    }

    const guesses = useMemo(
        () => Array.from({ length: 6 }, (_, i) => i),
        []
    )

  return (
    <>
        {answer}
        {guesses.map(i =>
            <Guesses
            answer={answer}
        checkGuess={checkGuess}
        getRandomInt={getRandomInt}
        updateWord={updateWord}
            key={i}/>)}
    </>
  )
}

export default App
