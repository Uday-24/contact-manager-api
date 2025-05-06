const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const authenticate = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/protected', authenticate, (req, res)=>{
    res.json(req.user);
});

app.listen(PORT, ()=>{
    console.log('Server is running on port', PORT);
});