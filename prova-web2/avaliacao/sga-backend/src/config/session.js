
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const sessionConfig = session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
        secure: false,
        httpOnly: true, 
        sameSite: false 
    }
});

module.exports = sessionConfig;