const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Gallery');

const Gallery = mongoose.model('gallery');

router.get('/loadImages', (req, res) => {
    Gallery.find().exec((err, imageLinks) => {
        if (err) {
            console.log(err);
        } else {
            res.json({imageLinks});
        }
    });
});

router.get('/', (req, res) => {
    const hbsVars = {
        gallery: 'active'
    };
    console.log('gallery link ran');
    res.render('gallery', hbsVars);    
});

module.exports = router;