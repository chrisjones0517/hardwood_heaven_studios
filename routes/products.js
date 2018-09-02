const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.SECRET_KEY_TEST);

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
        } else {
            hbsVars.products = products;
            res.render('store', hbsVars);
        }
    });
});

router.post('/payment', (req, res) => {
    console.log('checkout route ran!');
    console.log(req.body.test);
    
    res.sendStatus(200);
});

// const charge = stripe.charges.create({
//     amount: 999,
//     currency: 'usd',
//     source: 'tok_visa',
//     receipt_email: 'jenny.rosen@example.com',
//   });

//   setTimeout(() => {
//     console.log(charge);
//   }, 5000);
  

// router.get('/payment', (req, res) => {
//     console.log(req.body);
//     console.log('payment redirect ran');
// });

module.exports = router;