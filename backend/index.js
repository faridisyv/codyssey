const cors = require('cors');
const express = require('express');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library'); 
const path = require("path");


const app = express();

app.use(express.json());
app.use(cors());

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'farid123',
    database: 'codyssey',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'faridisyvmainkr@gmail.com',
        pass: 'Moeyobo097'
    }
});

// Google OAuth client setup
const client = new OAuth2Client('881754738179-3mg0pl3nugvjmun25oi562qmg123f4ko.apps.googleusercontent.com');

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})
app.get('/account', async (req, res) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [req.session.user_id]);
      if (rows.length) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error occurred while fetching user data:', err);
      res.status(500).json({ message: 'An error occurred while fetching user data. Please try again later.' });
    }
  });

// Endpoint for sending email
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;
    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

// Endpoint for user registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
        if (rows.length) {
            res.status(409).json({ message: 'Email or Username already exists' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (err) {
        console.error('Error occurred during registration:', err);
        res.status(500).json({ message: 'An error occurred during registration. Please try again later.' });
    }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length) {
            const match = await bcrypt.compare(password, rows[0].password);
            if (match) {
                res.status(200).json({ message: 'Success', user: rows[0] });
            } else {
                res.status(401).json({ message: 'Wrong password' });
            }
        } else {
            res.status(404).json({ message: 'No records found' });
        }
    } catch (err) {
        console.error('Error occurred during login:', err);
        res.status(500).json({ message: 'An error occurred during login. Please try again later.' });
    }
});
// Endpoint for Google login
app.post('/google-login', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '881754738179-3mg0pl3nugvjmun25oi562qmg123f4ko.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length) {
            res.status(200).json({ message: 'Success' });
        } else {
            await pool.execute('INSERT INTO users (username, email) VALUES (?, ?)', [name, email]);
            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.error('Google login failed:', error);
        res.status(400).json({ message: 'Google login failed' });
    }
});

app.get('/api/users/:user', async (req, res) => {
    const { user } = req.params;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '881754738179-3mg0pl3nugvjmun25oi562qmg123f4ko.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length) {
            res.status(200).json({ message: 'Success' });
        } else {
            await pool.execute('INSERT INTO users (username, email) VALUES (?, ?)', [name, email]);
            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.error('Google login failed:', error);
        res.status(400).json({ message: 'Google login failed' });
    }
});

// Define a route for updating XP
app.patch('/api/users/xp/:userId', (req, res) => {
    const userId = req.params.userId;
    const xp = req.body.xp;
  
    // Update the XP value in the MySQL database
    pool.query('UPDATE users SET XP = XP + ? WHERE user_id = ?', [xp, userId], (error) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating user XP');
      } else {
        console.log(`Updated XP for user ${userId} by ${xp}`);
        res.sendStatus(200);
      }
    });
  });
  
  // Start the server
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

  app.listen(3001, () => {
    console.log('Server listening on port 3001');
  })



  // localstorage i sifirlayib yeni useri elave elemelisen  - xp deyisende