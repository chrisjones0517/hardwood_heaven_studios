const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/User');

const User = mongoose.model('users');

router.get('/login', (req, res) => {
    console.log('login ran');
    res.sendStatus(200);
});

router.post('/register', (req, res) => {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
console.log(newUser);
    new User(newUser)
        .save((err) => {
            if (err) {
                console.log(err);
                res.json({ msg: 'That user already exists!', error: true});
            } else {
                res.json({msg: 'User added!', success: true});
            }
        });
    console.log('register ran');
    console.log(req.body.username);
    // res.sendStatus(200);
});

module.exports = router;