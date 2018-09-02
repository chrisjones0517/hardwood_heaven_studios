const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();

const products = require('./routes/products');
const users = require('./routes/users');
const gallery = require('./routes/gallery');
const contact = require('./routes/contact');
const admin = require('./routes/admin');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Mongo database connection successful!');
});

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/products', products);
app.use('/gallery', gallery);
app.use('/contact', contact);
app.use('/admin', admin);

app.get('/', (req, res) => {
    const active = {
        home: 'active'
    };
    res.render('index', active);
});


const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
});

