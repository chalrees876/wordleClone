import './App.css'
import Guesses from "./components/Guesses.jsx";
import {useEffect, useMemo, useState} from "react";

function App(props) {

    const[answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState("");
    const [validAnswers, setValidAnswers] = useState([])
    const [guessNumber, setGuessNumber] = useState(0);
    const [isCorrect, setCorrect] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const alphabetMap = {};
    for (let i = 0; i < 26; ++i) {
        alphabetMap[String.fromCharCode(i + 97)] = 0;
    }

    useEffect(() => {
        const inputs = Array.from(document.querySelectorAll("input"));
        if (guessNumber <= 5 && !isCorrect) {
            inputs[guessNumber*5].focus();
        }
    }, [guessNumber]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('./public/answers.txt');
            const text = await response.text();
            const lines = text.split("\n");
            setAnswers(lines);
        };
        let fetchData2 = async () => {
            const response = await fetch('./public/answers.txt');
            const text = await response.text();
            const lines = text.split("\n");
            setValidAnswers(lines);
        };
        fetchData();
        fetchData2();
    }, [refreshTrigger]);

    useEffect( () => {
        if (answers.length > 0) {
            setAnswer(answers[getRandomInt(answers.length)])
        }
    }, [answers]);

    useEffect( () => {
        for (let c of answer) {
            console.log(answer);
            alphabetMap[c]++;
        }
        console.log(alphabetMap);
    }, [guessNumber, answer]);

    function checkGuessInAnswers(guess) {
        const guessToString = guess[0] + guess[1] + guess[2] + guess[3] + guess[4];
        console.log("guess: " + guess);
        console.log("validAnswers: " + validAnswers);
        return validAnswers.includes(guessToString);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function updateWord() {
        setAnswer(answers[getRandomInt(answers.length)]);
    }

    function checkGuess(guess) {
        const guessToString = guess[0] + guess[1] + guess[2] + guess[3] + guess[4]
        setGuessNumber(guessNumber + 1);
        return guessToString === answer;
    }

    function updateCorrect(bool) {
        setCorrect(bool);
    }

    const guesses = useMemo(
        () => Array.from({ length: 6 }, (_, i) => i),
        []
    )

    const singleAttempt = "1 attempt.";

    const multAttempts = guessNumber + " attempts.";

    function handleRefresh() {
        setRefreshTrigger(!refreshTrigger)
    }

    const correctTemplate = (
        <>
            <h1>Congrats! You solved the puzzle in {guessNumber === 1 ? singleAttempt : multAttempts}</h1>
            <button type={"submit"} onClick={() => {setCorrect(false); setGuessNumber(0)}}>Play Again?</button>
        </>
    );

    const guessTemplate = (
    <>
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
                isInactive={guessNumber!==i}
                updateCorrect={updateCorrect} checkGuessInAnswers={checkGuessInAnswers}/>)}
    </>
    )

    const gameOver = (
        <>
            <h1>The word was {answer}</h1>
            <button type={"submit"} onClick={() => {handleRefresh(); setGuessNumber(0)}}>Play Again?</button>
        </>
    );


    return (
    <>
        {isCorrect ? correctTemplate : (guessNumber < 6) ? guessTemplate : gameOver}
    </>
  )
}

export default App
