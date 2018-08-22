const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String 
    },
    price: {
        type: Number
    }
}, {timestamps: true});

mongoose.model('products', ProductSchema);