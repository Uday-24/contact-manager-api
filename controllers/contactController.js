const Contact = require('../models/Contact');

const createContact = async (req, res)=>{
    let {name, email, phone} = req.body;

    if(!name || !phone){
        return res.status(400).json({message: 'Name and phone number are require'});
    }

    try{
        let newContact = await Contact.create({
            userId: req.user.userId,
            name,
            email,
            phone
        });

        res.status(201).json({
            message: 'New contact created successfully',
            contact: newContact
        });

    }catch(error){
        console.error('Contact does not crated', error.message);
        res.status(500).json({message: 'Server Error'});
    }

    res.json({message: 'Contact created'});
}

module.exports = {
    createContact,
}