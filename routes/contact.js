const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { createContact, getContacts, getContactById, updateContact } = require('../controllers/contactController');

router.post('/', authenticate, createContact);
router.get('/', authenticate, getContacts);
router.get('/:id', authenticate, getContactById);
router.put('/:id', authenticate, updateContact);


module.exports = router;