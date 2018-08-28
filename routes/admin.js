const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Product');

const Product = mongoose.model('products');

router.post('/addProduct', (req, res) => {
    console.log(req.body);
    const newProd = new Product({
        name: req.body.prodName,
        description: req.body.prodDesc,
        price: req.body.prodPrice,
        image: req.body.prodImg
    });
    newProd.save((err) => {
        if (err) {
            console.log(err);
            res.json({error: true});
        } else {
            res.json({success: true});
        }
    });
});

module.exports = router;