import React, { useState } from 'react';
import Container from '../components/Container';
import styles from './LanguagesQuizes.module.css';
import Header from '../components/Header';
import PythonQuizes from './PythonQuizes'; // Import the PythonQuizes component
import quizes from '../assets/data'; // Import the quiz data
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const LanguagesQuizes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [startQuiz, setStartQuiz] = useState(false);
  const navigate = useNavigate();

  // Handle quiz selection
  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz === selectedQuiz ? null : quiz);
  };


  // Start the quiz
  const handleStartQuiz = () => {
    navigate('/pythonquizes');
  };

  return (
    <>
  
      <h1 className={styles.pageTitle}>Quizes</h1>
      <br />
      <hr />
      
          <div className={styles.containerRow}>
            {quizes.map((quiz) => (
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
                
                  {quiz.title} Quiz
                </h3>
                <h2>If you are ready for the {quiz.title} Quiz, let's start.</h2><br/>
                <button onClick={handleStartQuiz} className={styles.startButton}>Start Quiz</button>
              </div>
            )}
              </div>
            ))}
          </div>
        
        {startQuiz && <PythonQuizes />}

    </>
  );
}

export default LanguagesQuizes;