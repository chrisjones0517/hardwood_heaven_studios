const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    image: {
        type: String
    }
}, {timestamps: true});

mongoose.model('gallery', GallerySchema);