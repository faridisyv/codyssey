import React, { useRef, useState, useEffect } from 'react';
import styles from './PythonQuizes.module.css';
import { data } from '../assets/data';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PythonQuizes = () => {
    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState(null);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [timer, setTimer] = useState(0);
    const [xp, setXp] = useState(0);
    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);
    const optionArray = [Option1, Option2, Option3, Option4];
    let interval; // Define interval variable

    useEffect(() => {
        resetQuiz(); // Initial setup on component mount
    }, []);

    useEffect(() => {
        if (!result) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            updateXP();
        }
    }, [result]);

    const resetQuiz = () => {
        const shuffledData = shuffleArray(data);
        const selectedQuestions = shuffledData.slice(0, 10); // Select the first 10 questions
        setQuestions(selectedQuestions);
        setIndex(0);
        setQuestion(selectedQuestions[0]);
        setScore(0);
        setLock(false);
        setResult(false);
        setTimer(0);
        setXp(0);
    };

    const shuffleArray = (array) => {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    const calculateXp = () => {
        const correctAnswers = score;
        const totalQuestions = questions.length;
        const timeTaken = timer;
        const xpEarned = (correctAnswers / totalQuestions / timeTaken) * 1000;
        setXp(xpEarned);
        return xpEarned; // Return the calculated XP
    };

    const updateXP = () => {
        const xpEarned = calculateXp(); // Calculate XP and get the value

        // Assuming you have a function to get the user ID (userData.user_id)
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const userId = storedUser.user_id;

        // Update the XP in the local storage
        const updatedUser = { ...storedUser, xp: storedUser.xp + xpEarned }; // Add new XP to existing XP
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Make an API call to update XP on the server
        axios.patch(`http://localhost:3000/api/users/xp/${userId}`, { xp: xpEarned })
            .then(response => {
                console.log('XP updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating user XP:', error);
            });
    };
    
    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add(styles.correct);
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add(styles.wrong);
                setLock(true);
                optionArray[question.ans - 1].current.classList.add(styles.correct);
            }
        }
    };

    const next = () => {
        if (lock) {
            if (index === questions.length - 1) {
                setResult(true);
                return;
            }
            setIndex(prevIndex => prevIndex + 1);
            setQuestion(questions[index + 1]);
            setLock(false);
            optionArray.forEach((option) => {
                option.current.classList.remove(styles.wrong);
                option.current.classList.remove(styles.correct);
            });
        }
    };
    
    const reset = () => {
        clearInterval(interval); // Stop the timer
        resetQuiz(); // Reset quiz state
    };

    return (
        <div className={styles.title}>
            <h1>Python Quiz</h1>
            <div className={styles.container}>
            {result ? "" : <h1>Question {index + 1}</h1> }
                <h3 className={styles.timetaken}>Time taken: {timer} seconds</h3>
                <hr />
                {result ? (
                    <>
                        <h2>You scored {score} out of {questions.length} </h2>
                        <h2>XP Earned: {xp.toFixed(2)}</h2>
                        <button onClick={reset} className={styles.button}>Reset</button>
                        <Link to='/python' className={styles.takeQuizButton}>Back</Link>
                        <Link to='/' className={styles.back}>Home</Link>
                    </>
                ) : (
                    <>
                        <h2>{question && (index + 1)}. {question && question.question}</h2>
                        <ul className={styles.options}>
                            {question && (
                                <>
                                    <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                                    <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                                    <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                                    <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                                </>
                            )}
                        </ul>
                        <button onClick={next} className={styles.button}>Next</button>
                        <div className={styles.index}>{index + 1} of {questions.length}</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PythonQuizes;
