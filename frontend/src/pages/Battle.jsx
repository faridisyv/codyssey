// battle.jsx
import React, { useState, useEffect, useRef } from 'react';
import style from './Battle.module.css';
import { battleData } from '../assets/data';
import Header from '../components/Header';

const Battle = () => {
  const [randomData, setRandomData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({ left: {}, right: {} });
  const [leftTimer, setLeftTimer] = useState(60);
  const [rightTimer, setRightTimer] = useState(60);
  const leftIntervalRef = useRef(null);
  const rightIntervalRef = useRef(null);

  useEffect(() => {
    const data = getRandomBattleData(battleData);
    setRandomData(data);

    const initialAnswers = data.answers.reduce((acc, answer, index) => {
      acc[`blank${index + 1}`] = '';
      return acc;
    }, {});
    setUserAnswers({ left: initialAnswers, right: initialAnswers });

    // Start the timers
    leftIntervalRef.current = setInterval(() => {
      setLeftTimer(prev => {
        if (prev <= 1) {
          clearInterval(leftIntervalRef.current);
          checkAnswers('left', true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    rightIntervalRef.current = setInterval(() => {
      setRightTimer(prev => {
        if (prev <= 1) {
          clearInterval(rightIntervalRef.current);
          checkAnswers('right', true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(leftIntervalRef.current);
      clearInterval(rightIntervalRef.current);
    };
  }, []);

  const handleInputChange = (event, side) => {
    setUserAnswers({
      ...userAnswers,
      [side]: {
        ...userAnswers[side],
        [event.target.name]: event.target.value
      }
    });
  };

  const checkAnswers = (side, isTimeout = false) => {
    const { answers: correctAnswers } = randomData;
    const isCorrect = correctAnswers.every((answer, index) => userAnswers[side][`blank${index + 1}`] === answer);

    if (isCorrect) {
      clearInterval(side === 'left' ? leftIntervalRef.current : rightIntervalRef.current);
      alert(`${side.charAt(0).toUpperCase() + side.slice(1)} User is Correct!`);
    } else if (!isTimeout) {
      alert(`${side.charAt(0).toUpperCase() + side.slice(1)} User is Incorrect! Try Again.`);
    }
  };

  const handleSubmit = (side) => {
    checkAnswers(side);
  };

  if (!randomData) return null; // Wait for the data to load

  const { text, answers } = randomData;

  return (
    <>

    <div className={style['battle-container']}>
      <h1 className={style['title']}>Battle</h1>
      <hr />
      <p>
        {text.map((part, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className={style['blank']}>{`____`}</span>
            )}
            {part}
          </React.Fragment>
        ))}
      </p>
      <div className={style['battle-quiz']}>
        <div className={style['battle-side']}>
          <h2>Left User</h2>
          <p>Time remaining: {leftTimer}s</p>
          <ol>
            {answers.map((_, index) => (
              <li key={index}>
                <input
                  type="text"
                  name={`blank${index + 1}`}
                  placeholder=""
                  onChange={(e) => handleInputChange(e, 'left')}
                  value={userAnswers.left[`blank${index + 1}`]}
                />
              </li>
            ))}
          </ol>
          <button onClick={() => handleSubmit('left')}>Submit</button>
        </div>
        <div className={style['battle-side']}>
          <h2>Right User</h2>
          <p>Time remaining: {rightTimer}s</p>
          <ol>
            {answers.map((_, index) => (
              <li key={index}>
                <input
                  type="text"
                  name={`blank${index + 1}`}
                  placeholder=""
                  onChange={(e) => handleInputChange(e, 'right')}
                  value={userAnswers.right[`blank${index + 1}`]}
                />
              </li>
            ))}
          </ol>
          <button onClick={() => handleSubmit('right')}>Submit</button>
        </div>
      </div>
    </div>
  </>);
};

function getRandomBattleData(battleData) {
  const randomIndex = Math.floor(Math.random() * battleData.length);
  return battleData[randomIndex];
}

export default Battle;
