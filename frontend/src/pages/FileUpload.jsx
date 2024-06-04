import React, { useState } from 'react';
import styles from './AccountPage.module.css';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpload = () => {
    if (file && description) {
      onFileUpload({ file, description });
      setFile(null);
      setDescription('');
    } else {
      alert('Please select a file and enter a description.');
    }
  };

  return (
    <div className={styles.fileUpload}>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter file description"
        value={description}
        onChange={handleDescriptionChange}
        className={styles.descriptionInput}
      />
      <button onClick={handleUpload} className={styles.uploadButton}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
