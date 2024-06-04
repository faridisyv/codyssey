import React, { useState } from 'react';
import styles from './AccountPage.module.css';

const MyFriends = ({ friend }) => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const handleClick = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };

  return (
    <div className={styles.friend} onClick={handleClick}>
      <img src={friend.photo} alt={friend.name} className={styles.friendPhoto} />
      <p className={styles.friendName}>{friend.name}</p>
      {showAdditionalInfo && (
        <div className={styles.additionalInfo}>
          <p>Level: {friend.level}</p>
          {/* Add more additional information as needed */}
        </div>
      )}
    </div>
  );
};

export default MyFriends;
