const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Product');

const Product = mongoose.model('products');

router.get('/store', (req, res) => {
    const hbsVars = {
        store: 'active',
        products: '',
        cart: ''
    };

    // if (loggedInUser) {
    //     query users for previous cart
    //     and set cart variable
    // }

    Product.find().exec((err, products) => {
        if (err) {
            res.json({error: 'There was an error processing your request.'});
        }
        hbsVars.products = products;
        res.render('store', hbsVars);
    });
    
    
});

module.exports = router;