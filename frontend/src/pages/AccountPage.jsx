import React, { useState, useEffect } from 'react';
import styles from './AccountPage.module.css';
import Header from '../components/Header';
import FileUpload from './FileUpload';
import Contact from '../components/Contact';

const AccountPage = () => {
  const [userData, setUserData] = useState({});
  const [selectedItem, setSelectedItem] = useState('Profile');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [username, setUsername] = useState('');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [XP, setXP] = useState(0);
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserData(storedUser);
      setUsername(storedUser.username);
      setEmail(storedUser.email);
      setXP(storedUser.xp);
      setProfilePhoto(getProfilePhoto(storedUser.user_id));
    } else {
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setXP(storedUser.xp); // Update XP from local storage whenever it changes
    }
  }, [userData]);

  const getProfilePhoto = (userId) => {
    switch (userId) {
      case 1:
        return './src/assets/userphotos/elmira.jpeg';
      case 2:
        return './src/assets/userphotos/messi.jpg';
      case 3:
        return './src/assets/userphotos/grtx.png';
      default:
        return './src/assets/userphotos/pp.jpeg';
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleFileUpload = ({ file, description }) => {
    const newFile = {
      id: uploadedFiles.length + 1,
      file,
      description,
      url: URL.createObjectURL(file)
    };
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  const handleFileDownload = (file) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.name);
    document.body.appendChild(link);
    link.click();
  };

  const handleProfilePhotoChange = () => {
    setIsConfirmationDialogOpen(true);
  };

  const handleConfirmChange = (confirmed) => {
    setIsConfirmationDialogOpen(false);
    if (confirmed) {
      // Implement the logic to change the profile photo here
      // For demonstration, we'll just set a default profile photo
      setProfilePhoto('./src/assets/userphotos/default.jpg');
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.userInfo}>
            <img
              src={profilePhoto}
              alt="User"
              className={styles.userPhoto}
              onClick={handleProfilePhotoChange}
            />
            <div className={styles.userInfoText}>
              <p>{username}</p>
              <p className={styles.userEmail}>{userData.email}</p>
              <p className={styles.followStats}>
                {/* Add follow stats here if any */}
              </p>
            </div>
          </div>
          <nav className={styles.sidebarNav}>
            <ul className={styles.sidebarList}>
              <li className={styles.sidebarItem} onClick={() => handleItemClick('Profile')}>Profile</li>
              <li className={styles.sidebarItem} onClick={() => handleItemClick('Settings')}>Settings</li>
              <li className={styles.sidebarItem} onClick={() => handleItemClick('My Friends')}>My Friends</li>
              <li className={styles.sidebarItem} onClick={() => handleItemClick('Contact Us')}>Contact Us</li>
              <li className={styles.sidebarItem} onClick={() => handleItemClick('My Files')}>My Files</li>
              <li className={styles.sidebarItem} onClick={() => handleItemClick('Share')}>Share</li>
            </ul>
          </nav>
        </div>
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>{selectedItem}</h1>
          <div className={styles.settings}>
            {selectedItem === 'Profile' && (
              <div className={styles.profile}>
                <div className={styles.profileInfo}>
                  <img
                    src={profilePhoto}
                    alt="User"
                    className={styles.profilePhoto}
                    onClick={() => document.getElementById('profilePhotoInput').click()}
                  />
                  <div className={styles.profileText}>
                    <input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      className={styles.userNameInput}
                    />
                    <p className={styles.userEmail}>
                      {userData.email}</p> <span>XP:{XP}</span> 
                    <p className={styles.followStats}>
                      {/* Add follow stats here if any */}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {selectedItem === 'Settings' && (
              <div>
                {/* Placeholder for Settings content */}
                <p>Settings content goes here</p>
              </div>
            )}
            {selectedItem === 'My Friends' && (
              <FriendsList />
            )}
            {selectedItem === 'Contact Us' && (
              <div className={styles.contact}>
                <Contact />
              </div>
            )}
            {selectedItem === 'Share' && (
              <div>
                <FileUpload onFileUpload={handleFileUpload} />
              </div>
            )}
            {selectedItem === 'My Files' && (
              <div className={styles.tableContainer}>
                <table className={styles.fileTable}>
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Description</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedFiles.map((fileItem, index) => (
                      <tr key={index}>
                        <td>{fileItem.file.name}</td>
                        <td>{fileItem.description}</td>
                        <td>
                          <button
                            className={styles.downloadButton}
                            onClick={() => handleFileDownload(fileItem.file)}
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className={styles.sidebar}>
          {selectedItem === 'Saves' && (
            <div className={styles.saves}>
              <h2 className={styles.savesTitle}>Saved</h2>
              <MediaGallery media={savedData} />
            </div>
          )}
        </div>
      </div>
      {isConfirmationDialogOpen && (
        <div className={styles.confirmationDialog}>
          <p>Are you sure you want to change your profile photo?</p>
          <button onClick={() => handleConfirmChange(true)}>Yes</button>
          <button onClick={() => handleConfirmChange(false)}>No</button>
        </div>
      )}
    </>
  );
}

export default AccountPage;
