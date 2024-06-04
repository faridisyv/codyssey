import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import styles from './LoginPage.module.css';

const LoginPage = ({ setLogged, setUsername }) => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    if (isLoggedIn === 'true' && storedUsername) {
      setLogged(true);
      setUsername(storedUsername);
    }
  }, [setLogged, setUsername]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3001/login', { username, password });
      if (response.data.message === 'Success') {
        const user = response.data.user;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        setLogged(true);
        setUsername(user.username);
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const result = await axios.post('http://127.0.0.1:3001/google-login', { token: response.credential });
      if (result.data.message === 'Success') {
        const user = result.data.user; // Assuming the backend returns a user object
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        setLogged(true);
        setUsername(user.username);
        navigate('/');
      } else {
        alert('Google login failed. Please try again.');
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('An error occurred during Google login. Please try again later.');
    }
  };

  const handleGoogleFailure = (response) => {
    console.error('Google login failed:', response);
    alert('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="881754738179-3mg0pl3nugvjmun25oi562qmg123f4ko.apps.googleusercontent.com">
      <div className={styles.loginPageContainer}>
        <div className={styles.loginBox}>
          <h2 className={styles.loginTitle}>Login</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.formLabel}>Username</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Enter your username"
                className={styles.formInput} 
                value={username}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password"
                className={styles.formInput} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.loginButton}>Login</button>
          </form>
          <div className={styles.additionalLinks}>
            <p>Don't have an account? <Link to='/signup' className={styles.linkPrimary}>Sign up here</Link></p>
            <p>Forgot your password? <Link to='/forgotpassword' className={styles.linkPrimary}>Reset it here</Link></p>
          </div>
          <div className={styles.googleLoginContainer}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
