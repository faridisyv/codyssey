import React, { useState } from 'react';
import Container from '../components/Container';
import styles from './Ranks.module.css';
import { ranks } from '../assets/data';
import Header from '../components/Header';

const Ranks = () => {
  const [selectedRank, setSelectedRank] = useState(null);

  // Function to handle click on rank name
  const handleRankClick = (rank) => {
    setSelectedRank(rank === selectedRank ? null : rank);
  };

  return (
    <>
      <h1 className={styles.pageTitle}>User Ranks</h1>
      <br />
      <hr />
      <div className={styles.containerRow}>
        {ranks.map((rank) => (
          <div key={rank.id} className={styles.column}>
            <Container className={styles.rectangularContainer}>
              <h2
                className={styles.rankTitle}
                onClick={() => handleRankClick(rank)}
                style={{ cursor: 'pointer' }}
              >
                {rank.name}
              </h2>
              <br />
              <hr />
              <div className={styles.rankBadge} style={{ backgroundColor: rank.color }} />
              <img src={rank.imageUrl} onClick={() => handleRankClick(rank)}
                style={{ cursor: 'pointer' }} alt={rank.name} className={styles.rankImage} />
              <p>{rank.description}</p>
            </Container>
            {/* Conditionally render the feature container */}
            {selectedRank === rank && (
              <div className={styles.rankFeatures}>
                <h3>{rank.name}<h2>Level({rank.level})</h2></h3>
                <ul><li><p >XP Range:({rank.xp})XP</p></li></ul>
                
                {/* Add more features as needed */}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Ranks;
