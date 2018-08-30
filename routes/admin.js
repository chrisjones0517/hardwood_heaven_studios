const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Product');

const Product = mongoose.model('products');

router.get('/', (req, res) => {
    const hbsVars = {
        products: ''
    };

    Product.find().exec((err, products) => {
        if (err) {
            res.json(err);
        } else {
            hbsVars.products = products;
        res.render('admin', hbsVars);
        }
    });
});

router.post('/addProduct', (req, res) => {
    const newProd = new Product({
        name: req.body.prodName,
        description: req.body.prodDesc,
        price: req.body.prodPrice,
        image: req.body.prodImg
    });
    newProd.save((err) => {
        if (err) {
            console.log(err);
            res.json({ error: true });
        } else {
            res.json({ success: true });
        }
    });
});

router.post('/update', (req, res) => {
    Product.findByIdAndUpdate(req.body._id, { $set: { name: req.body.name, description: req.body.description, image: req.body.image, price: req.body.price } }, (err, data) => {
        if (err) {
            res.json({ error: true });
        } else {
            res.sendStatus(200);
        }
    });
});

router.post('/delete', (req, res) => {
    Product.findByIdAndDelete(req.body.id, (err, data) => {
        if (err) {
            res.json({ error: true });
        } else {
            res.sendStatus(200);
        }
    });
});
module.exports = router;