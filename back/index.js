import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import employemodule from './models/usermodel.js';  // Employee model
import bd from './bd.js';  // Database connection

const app = express();
const port = 3000;

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'],  // Change this to your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Database connection
bd();

// Default route
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = await employemodule.create({ username, password: hashedPassword, email });
    res.json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await employemodule.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ email: user.email }, "secret_key", { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true });
    res.json({ token });  
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Middleware to verify the JWT token
const verify = (req, res, next) => {
  const token = req.cookies.token;  // Fetch token from cookies
  if (!token) {
    return res.status(401).send('Access denied');
  }
  try {
    // Verify the token
    const verified = jwt.verify(token, "secret_key");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Protected home route
app.post('/home', verify, (req, res) => {
  res.json('success');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

