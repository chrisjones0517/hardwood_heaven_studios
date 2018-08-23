const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// require('../models/Gallery');

// const Gallery = mongoose.model('gallery');

router.get('/', (req, res) => {
    const active = {
        gallery: 'active'
    };
    console.log('gallery ran');
    res.render('gallery', active);
});

module.exports = router;