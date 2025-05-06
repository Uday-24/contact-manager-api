const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    let {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: 'All fields are required'});
    }

    try{
        let existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'Email already registered'});
        }

        let hash = await bcrypt.hash(password, 10);

        let user = await User.create({
            username,
            email,
            password: hash
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                userid: user._id,
                username: user.username,
                email: user.email
            }
        });

    }catch(error){
        console.error('Registration error', error.message);
        res.status(500).json({message: 'Server Error'});
    }
}

const loginUser = async (req, res) => {
    let {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: 'Invalid email or password'});
        }
        
        let isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(401).json({message: 'Invalid email or password'});
        }

        let access_token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
            message: 'Login successful',
            access_token,
            user: {
                id: user._id,
                username: user.username,
                email: user,email
            }
        });

    }catch(error){
        console.error('Login error', error.message);
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = {
    registerUser,
    loginUser,
}