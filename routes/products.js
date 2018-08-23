const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Product');

const User = mongoose.model('products');

router.get('/store', (req, res) => {
    const active = {
        store: 'active'
    };
    console.log('store ran');
    res.render('store', active);
});

module.exports = router;