const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
// const authenticate = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/contacts', contactRoutes);

app.listen(PORT, ()=>{
    console.log('Server is running on port', PORT);
});