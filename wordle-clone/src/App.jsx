import './App.css'
import Guesses from "./components/Guesses.jsx";
import {useEffect, useMemo, useState} from "react";

function App(props) {

    const[answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState("");
    const [guessNumber, setGuessNumber] = useState(0);
    const [isInactive, setInactive] = useState(true);

    const alphabetMap = {};
    for (let i = 0; i < 26; ++i) {
        alphabetMap[String.fromCharCode(i + 97)] = 0;
    }

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

    useEffect( () => {
        for (const c in answer) {
            alphabetMap[answer[c]]++;
        }
        console.log(alphabetMap);
    }, [answer]);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function updateWord() {
        setAnswer(answers[getRandomInt(answers.length)]);
    }

    function checkGuess(guess) {
        const guessToString = guess[0] + guess[1] + guess[2] + guess[3] + guess[4]
        setGuessNumber(guessNumber + 1);
        updateInactive()
        return guessToString === answer;
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
            alphabetMap={alphabetMap}
            key={i}
            guessNumber={guessNumber}
            id={i}
/*            updateInactive={updateInactive}*/
            isInactive={guessNumber!==i}/>)}
    </>
  )
}

export default App
