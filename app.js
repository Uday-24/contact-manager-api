const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Contact manager api is working');
});

app.listen(PORT, ()=>{
    console.log('Server is running on port', PORT);
});