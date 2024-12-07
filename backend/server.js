const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const path = require('path'); // Required for serving static files
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static assets (images, CSS, JS, etc.) from the 'lib/assets' folder
app.use('/assets', express.static(path.join(__dirname, 'lib/assets')));

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'Vineeth04!', // Your MySQL password
  database: 'ecommerce_db'
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

// Signup Route (to create a new user)
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).send('Database query error');

    if (result.length > 0) {
      return res.status(400).send('Email already registered');
    }

    // Hash the password before saving
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send('Error hashing password');

      // Insert the new user into the database
      db.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).send('Error creating user');
          res.status(200).send('User created successfully');
        }
      );
    });
  });
});

// Login Route (to authenticate the user)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Retrieve the user from the database by email
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).send('Database query error');

    if (result.length === 0) {
      return res.status(400).send('Invalid email or password');
    }

    const user = result[0];

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Error comparing passwords');

      if (isMatch) {
        res.status(200).send('Login successful');
      } else {
        res.status(400).send('Invalid email or password');
      }
    });
  });
});

// Get all products
app.get('/products', (req, res) => {
  // Retrieve products from the database or use the dummy products array
  const products = [
    { id: 1, name: 'Laptop', price: 1200.00, imageUrl: 'lib/assets/laptop.jpg' },
    { id: 2, name: 'Smartphone', price: 700.00, imageUrl: 'lib/assets/smartphone.png' },
    { id: 3, name: 'Smartwatch', price: 150.00, imageUrl: 'lib/assets/smartwatch.jpg' },
    { id: 4, name: 'Keyboard', price: 50.00, imageUrl: 'lib/assets/keyboard.jpg' }
  ];

  res.json(products);  // Send products as JSON response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
