// JavascriptQuizzes.jsx

import React, { useState } from 'react';
import Container from '../components/Container';
import styles from './JavascriptQuizzes.module.css';
import Header from '../components/Header';
import javaquiz from '../assets/data'; // Import the JavaScript quiz data
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const JavascriptQuizes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [startQuiz, setStartQuiz] = useState(false);
  const navigate = useNavigate();

  // Handle quiz selection
  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz === selectedQuiz ? null : quiz);
  };

  // Start the quiz
  const handleStartQuiz = () => {
    if (selectedQuiz) {
      navigate(`/quiz/${selectedQuiz.id}`);
    } else {
      // Handle no quiz selected
    }
  };

  return (
    <>
      <h1 className={styles.pageTitle}>JavaScript Quizzes</h1>
      <br />
      <hr />
      <div className={styles.containerRow}>
        {javaquiz.map((quiz) => (
          <div key={quiz.id} className={styles.column}>
            <Container className={styles.rectangularContainer}>
              <h2
                className={styles.quizTitle}
                onClick={() => handleQuizClick(quiz)}
                style={{ cursor: 'pointer' }}
              >
                {quiz.title}
              </h2>
              <br />
              <hr />
              <div className={styles.quizBadge} style={{ backgroundColor: quiz.color }} />
              <img
                src={quiz.imageUrl}
                alt={quiz.title}
                onClick={() => handleQuizClick(quiz)}
                style={{ cursor: 'pointer' }}
                className={styles.quizImage}
              />
              <p>{quiz.description}</p>
            </Container>
            {selectedQuiz === quiz && (
              <div className={styles.quizDetails}>
                <h3>
                  <p>{quiz.longDescription}</p>
                  {quiz.title} Quiz
                </h3>
                <h2>If you are ready for the {quiz.title} Quiz, let's start.</h2><br/>
                <button onClick={handleStartQuiz} className={styles.startButton}>Start Quiz</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default JavascriptQuizes;
