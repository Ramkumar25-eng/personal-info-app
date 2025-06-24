const express = require('express');
const router = express.Router();
const { createUser, getUserByEmail } = require('../controllers/userController');

router.post('/signup', createUser);
router.get('/user/:email', getUserByEmail);

module.exports = router;
