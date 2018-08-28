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
        type: String
    },
    image: {
        type: String
    }
}, {timestamps: true});

mongoose.model('products', ProductSchema);