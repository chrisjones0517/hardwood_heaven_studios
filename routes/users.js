const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/User');

const User = mongoose.model('users');

router.get('/login', (req, res) => {
    console.log('login ran');
    res.sendStatus(200);
});

router.get('/register', (req, res) => {
    console.log('register ran');
});

module.exports = router;