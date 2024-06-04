import React, { useState, useEffect } from 'react';
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = ({ logged, setLogged }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsername(storedUser.username);
      setLogged(true);
    }
  }, [setLogged]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLogged(false);
    setIsMobileMenuOpen(false); // Close the menu after logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="./src/assets/hero/logomain.png" alt="Logo" />
        </Link>
      </div>
      <div className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`} onClick={toggleMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`${styles.navMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        {!logged ? (
          <div className={styles.wrap}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}><span>Home</span></Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}><span>About us</span></Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}><span>Contact us</span></Link>
            <Link to="/ranks" onClick={() => setIsMobileMenuOpen(false)}><span>Ranks</span></Link>
            <div className={styles.right}>
              <Link to="/login" className={styles.login} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/signup" className={styles.login} onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
            </div>
          </div>
        ) : (
          <>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}><span>Home</span></Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}><span>About us</span></Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}><span>Contact us</span></Link>
            <Link to="/language" onClick={() => setIsMobileMenuOpen(false)}><span>Languages</span></Link>
            <Link to="/allquizes" onClick={() => setIsMobileMenuOpen(false)}><span>Quizes</span></Link>
            <Link to="/ranks" onClick={() => setIsMobileMenuOpen(false)}><span>Ranks</span></Link>
            <Link to="/battle" onClick={() => setIsMobileMenuOpen(false)}><span>Battle</span></Link>
            <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)}><span>Explore</span></Link>
            
            <div className={styles.userInfo}>
              <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}><span>Account</span></Link>
              <button onClick={handleLogout} className={styles.logout}>Logout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
