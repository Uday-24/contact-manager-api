const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { createContact } = require('../controllers/contactController');

router.post('/', authenticate, createContact);


module.exports = router;