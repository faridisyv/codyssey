import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // All Quizzes, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
    const [quizs, setQuizs] = useState([]);
    const [question, setQuestion] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [marks, setMarks] = useState(0);

    // Display Controlling States
    const [showStart, setShowStart] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showResult, setShowResult] = useState(false);

    // Load JSON Data
    useEffect(() => {
        // Fetch quiz data from a JSON file named quizData.json
        fetch('quizData.json')
            .then(res => res.json())
            .then(data => setQuizs(data))
            .catch(error => console.error('Error fetching quiz data:', error));
    }, []);

    // Set a Single Question
    useEffect(() => {
        if (quizs.length > questionIndex) {
            setQuestion(quizs[questionIndex]);
        }
    }, [quizs, questionIndex])

    // Other functions remain unchanged...

    return (
        <DataContext.Provider value={{
            startQuiz,
            showStart,
            showQuiz,
            question,
            quizs,
            checkAnswer,
            correctAnswer,
            selectedAnswer,
            questionIndex,
            nextQuestion,
            showTheResult,
            showResult,
            marks,
            startOver
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;
