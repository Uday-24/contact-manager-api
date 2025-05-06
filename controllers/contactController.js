const Contact = require('../models/Contact');

const createContact = async (req, res) => {
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

const getContacts = async (req, res) => {
    try{
        
        let contacts = await Contact.find({userId: req.user.userId});
        res.status(200).json(contacts);

    }catch(error){
        console.error('Get contacts error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

const getContactById = async (req, res) =>{
    try{
        let id = req.params.id;
        let contact = await Contact.findOne({_id: id, userId: req.user.userId});

        if(!contact){
            return res.status(404).json({messgae: 'Contact not found'});
        }
        res.status(200).json({ contact });
    }catch(error){
        console.error('Get contact by id error', error.message);
        res.status(500).json({message: 'Server Error'});
    }
}

const updateContact = async (req, res) => {
    
    let { id } = req.params;
    try{
        let { name, email, phone } = req.body;
        let contact = await Contact.findOne({_id: id, userId: req.user.userId});
        if(!contact){
            return res.status(404).json({ message: 'Contact not found or unauthorized' });
        }

        contact.name = name || contact.name;
        contact.email = email || contact.email;
        contact.phone = phone || contact.phone;

        let updatedContact = await contact.save();

        res.status(200).json({message: 'Contact updated successfully', contact: updatedContact});
    }catch(error){
        res.status(500).json({message: 'Server Error'});
    }
}

const deleteContact = async (req, res) => {
    let id = req.params.id;
    try{
        let contact = await Contact.findOneAndDelete({_id: id, userId: req.user.userId});
        if(!contact){
            return res.status(404).json({message: 'Contact not found'});
        }
        res.status(200).json({message: 'Contact deleted successfully', contact: contact});
    }catch(error){
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
}