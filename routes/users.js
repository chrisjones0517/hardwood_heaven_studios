const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/User');

const User = mongoose.model('users');

router.get('/login', (req, res) => {
    const hbsVars = {
        admin: true
    };
console.log('login get route ran');
    res.render('index', hbsVars);
});

router.post('/login', (req, res) => {
    console.log(req.body.username, req.body.password);
    console.log('login ran');
    User.findOne({ username: req.body.username })
        .where('password').equals(req.body.password)
        .exec((err, user) => {
            if (err || user === null) {
                console.log(err);
                res.json({ msg: 'That user/password was not found!', error: true })
            } else {
                if (user.admin) {
                    res.json({ admin: true});
                } else {
                    console.log('user: ', user);
                    res.sendStatus(200);
                }
            }
        });
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
                res.json({ msg: 'That user already exists!', error: true });
            } else {
                res.json({ msg: 'User added!', success: true });
            }
        });
    console.log('register ran');
    console.log(req.body.username);
    // res.sendStatus(200);
});



module.exports = router;