const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chrisjones0517@gmail.com',
        pass: process.env.GMAIL_PASSWORD
    }
});

router.get('/', (req, res) => {
    const hbsVars = {
        contact: 'active'
    };
    res.render('contact', hbsVars);
});

router.post('/message', (req, res) => {
    
    let mailOptions = {
        from: `"${req.body.name}: ${req.body.email}" <foo@example.com>`,
        to: 'chrisjones0517@gmail.com',
        subject: req.body.subject,
        text: req.body.msg
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            res.json({success: true});
        }
        console.log('Message sent: %s', info.messageId);
    });
    
    console.log(req.body);
    console.log('message route ran');
    
    
});

module.exports = router;
