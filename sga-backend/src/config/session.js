
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

// Em produção (HTTPS), o cookie precisa de secure:true e sameSite:'none'
// para funcionar entre domínios diferentes (Vercel → Render).
// Em desenvolvimento (HTTP), usa secure:false e sameSite:'lax'.
const isProduction = process.env.NODE_ENV === 'production';

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 horas
        secure: isProduction,          // true em produção (HTTPS obrigatório)
        httpOnly: true,                // impede acesso via JavaScript no navegador
        sameSite: isProduction ? 'none' : 'lax' // 'none' necessário para cross-site em HTTPS
    }
});

module.exports = sessionConfig;