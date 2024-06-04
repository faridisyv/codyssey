import React, { useState } from 'react';
import styles from './Contact.module.css';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:3001/send-email', formData)
      .then((response) => {
        console.log(response.data);
        alert('Message sent successfully!');
      })
      .catch((error) => {
        console.error('There was an error sending the message!', error);
        alert('Failed to send the message, please try again later.');
      });

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}> <h1>Contact Information</h1><hr />
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className={styles.customLabel}>Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter Your Name" required value={formData.name} onChange={handleChange} />

          <label htmlFor="email" className={styles.customLabel}>Email:</label>
          <input type="email" id="email" name="email" placeholder="email@example.com" required value={formData.email} onChange={handleChange} />

          <label htmlFor="message" className={styles.customLabel}>Message:</label>
          <textarea id="message" name="message" rows="4" placeholder="Enter Your Query Here" required value={formData.message} onChange={handleChange}></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.container}>
        <div className={styles.column}>
         
          <hr color='white'/>
          <p><strong>Address:</strong><a href = "https://www.google.com/maps/place/Inha+University,+Yonghyeon+Campus/data=!4m6!3m5!1s0x357b79ab3057fc7f:0xe3e29f05aba35eb0!8m2!3d37.4500221!4d126.653488!16zL20vMDVzeDZw?entry=ttu" style={{ color: '#fff' }}>100 Inha-ro, Michuhol-gu, Incheon</a></p> <hr/>
          <p><strong>Email:</strong> <a href="mailto:codysseymain@gmail.com" style={{ color: '#fff' }}>codyssey@gmail.com</a></p><hr/>
          <p><strong>Website:</strong> <a href="http://www.example.com" target="_blank" style={{ color: '#fff' }}>www.example.com</a></p><hr/>
          <p style={{ color: '#fff' }}>Feel free to contact us for any inquiries or assistance.</p>
        </div>
      </div>
     </div>
  );
};

export default Contact;
