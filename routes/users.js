const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        .exec((err, user) => {
            if (err || user === null) {
                console.log(err);
                res.json({ msg: 'That user was not found!', error: true })
            } else {
                console.log('user: ', user);
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        if (user.admin) {
                            res.json({ admin: true });
                        } else {
                            console.log('user: ', user);
                            res.sendStatus(200);
                        }
                    } else {
                        res.json({ msg: 'Incorrect password!', error: true });
                    }
                });
            }
        });
});

router.post('/register', (req, res) => {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: ''
    };

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) { console.log(err); }
            newUser.password = hash;

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
    });
});



module.exports = router;