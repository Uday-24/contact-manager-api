const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

module.exports = {
    registerUser,
}