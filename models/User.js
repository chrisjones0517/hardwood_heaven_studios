const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true});

mongoose.model('users', UserSchema);