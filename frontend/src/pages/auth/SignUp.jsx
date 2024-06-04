import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SignUp.module.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://127.0.0.1:3001/register', { username, email, password })
            .then(result => {
                if (result.data.message === 'User registered successfully') {
                    alert('Registered successfully! Please Login to proceed.');
                    navigate('/login');
                } else if (result.data.message === 'Email or Username already exists') {
                    alert('Email or Username already exists! Please Login to proceed.');
                    navigate('/login');
                } else {
                    alert('An error occurred. Please try again.');
                }
            })
            .catch(err => {
                console.error('Registration error:', err);
                alert('An error occurred. Please try again later.');
            });
    }

    return (
        <div className={styles.signUpPageContainer}>
            <div className={styles.signUpBox}>
                <h2 className={styles.signUpTitle}>Register</h2>
                <form onSubmit={handleSubmit} className={styles.spaceY}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.formLabel}>Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Enter your username"
                            className={styles.formInput} 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email"
                            className={styles.formInput} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className={styles.signUpButton}>Register</button>
                </form>
                <p className={styles.additionalLinks}>
                    Already have an account? <Link to='/login' className={styles.linkPrimary}>Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
